import React, {
  useCallback,
  useState
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "SPV_REPORTS_V31";

const TRANSLATIONS = {
  it: {
    title: "Storico locale",
    savedSingle: "segnalazione salvata",
    savedPlural: "segnalazioni salvate",
    empty: "Nessuna segnalazione salvata.",

    status: "Stato",
    gps: "GPS",

    deleteTitle: "Elimina segnalazione",
    deleteMessage:
      "Vuoi eliminare questa segnalazione locale?",

    clearTitle: "Cancella storico",
    clearMessage:
      "Vuoi cancellare tutte le segnalazioni locali?",

    cancel: "Annulla",
    delete: "Elimina",
    clear: "Cancella",

    localDraft: "Bozza locale"
  },

  en: {
    title: "Local history",
    savedSingle: "saved report",
    savedPlural: "saved reports",
    empty: "No saved reports.",

    status: "Status",
    gps: "GPS",

    deleteTitle: "Delete report",
    deleteMessage:
      "Do you want to delete this local report?",

    clearTitle: "Clear history",
    clearMessage:
      "Do you want to delete all local reports?",

    cancel: "Cancel",
    delete: "Delete",
    clear: "Clear",

    localDraft: "Local draft"
  },

  de: {
    title: "Lokaler Verlauf",
    savedSingle: "gespeicherte Meldung",
    savedPlural: "gespeicherte Meldungen",
    empty: "Keine Meldungen gespeichert.",

    status: "Status",
    gps: "GPS",

    deleteTitle: "Meldung löschen",
    deleteMessage:
      "Möchten Sie diese lokale Meldung löschen?",

    clearTitle: "Verlauf löschen",
    clearMessage:
      "Möchten Sie alle lokalen Meldungen löschen?",

    cancel: "Abbrechen",
    delete: "Löschen",
    clear: "Alles löschen",

    localDraft: "Lokaler Entwurf"
  }
};

const CATEGORY_TRANSLATIONS = {
  roads: {
    it: "Strade",
    en: "Roads",
    de: "Straßen"
  },

  lighting: {
    it: "Illuminazione",
    en: "Street lighting",
    de: "Straßenbeleuchtung"
  },

  waste: {
    it: "Rifiuti",
    en: "Waste",
    de: "Abfälle"
  },

  green: {
    it: "Verde pubblico",
    en: "Public green areas",
    de: "Öffentliche Grünflächen"
  },

  signage: {
    it: "Segnaletica",
    en: "Road signs",
    de: "Beschilderung"
  },

  accessibility: {
    it: "Barriere architettoniche",
    en: "Accessibility barriers",
    de: "Barrieren für Menschen mit Behinderungen"
  },

  "public-buildings": {
    it: "Edifici pubblici",
    en: "Public buildings",
    de: "Öffentliche Gebäude"
  },

  other: {
    it: "Altro",
    en: "Other",
    de: "Sonstiges"
  }
};

function getCategoryLabel(report, language) {
  const category = report?.category;

  if (
    category &&
    CATEGORY_TRANSLATIONS[category]
  ) {
    return (
      CATEGORY_TRANSLATIONS[category][language] ||
      CATEGORY_TRANSLATIONS[category].it
    );
  }

  /*
   * Compatibilità con vecchie segnalazioni V3.1:
   * category poteva essere direttamente "Strade",
   * "Illuminazione", ecc.
   */
  if (category) {
    return category;
  }

  /*
   * Ulteriore fallback per eventuali dati
   * con categoryLabel già salvato.
   */
  if (report?.categoryLabel) {
    return report.categoryLabel;
  }

  return "-";
}

function getStatusLabel(report, language, t) {
  if (report?.status === "local-draft") {
    return t.localDraft;
  }

  /*
   * Compatibilità con vecchi record:
   * status: "Bozza locale"
   */
  if (report?.status) {
    return report.status;
  }

  if (report?.statusLabel) {
    return report.statusLabel;
  }

  return "-";
}

function formatDate(value, language) {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (
    Number.isNaN(date.getTime())
  ) {
    return String(value);
  }

  const locale =
    language === "de"
      ? "de-DE"
      : language === "en"
        ? "en-GB"
        : "it-IT";

  return date.toLocaleString(locale);
}

export default function HistoryScreen({
  language = "it",
  refreshKey
}) {
  const t =
    TRANSLATIONS[language] ||
    TRANSLATIONS.it;

  const [reports, setReports] =
    useState([]);

  const loadReports =
    useCallback(async () => {
      try {
        const raw =
          await AsyncStorage.getItem(
            STORAGE_KEY
          );

        setReports(
          raw
            ? JSON.parse(raw)
            : []
        );

      } catch {
        setReports([]);
      }
    }, []);

  React.useEffect(() => {
    loadReports();
  }, [
    loadReports,
    refreshKey
  ]);

  const removeOne = (id) => {
    Alert.alert(
      t.deleteTitle,
      t.deleteMessage,
      [
        {
          text: t.cancel,
          style: "cancel"
        },

        {
          text: t.delete,
          style: "destructive",

          onPress: async () => {
            const next =
              reports.filter(
                (report) =>
                  report.id !== id
              );

            setReports(next);

            await AsyncStorage.setItem(
              STORAGE_KEY,
              JSON.stringify(next)
            );
          }
        }
      ]
    );
  };

  const clearAll = () => {
    if (!reports.length) {
      return;
    }

    Alert.alert(
      t.clearTitle,
      t.clearMessage,
      [
        {
          text: t.cancel,
          style: "cancel"
        },

        {
          text: t.clear,
          style: "destructive",

          onPress: async () => {
            await AsyncStorage.removeItem(
              STORAGE_KEY
            );

            setReports([]);
          }
        }
      ]
    );
  };

  const savedText =
    reports.length === 1
      ? t.savedSingle
      : t.savedPlural;

  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <View style={styles.headingText}>
          <Text style={styles.title}>
            {t.title}
          </Text>

          <Text style={styles.subtitle}>
            {reports.length} {savedText}
          </Text>
        </View>

        <TouchableOpacity
          onPress={loadReports}
          style={styles.iconButton}
        >
          <Ionicons
            name="refresh"
            size={21}
            color="#0f4c81"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={clearAll}
          style={styles.iconButton}
        >
          <Ionicons
            name="trash-outline"
            size={21}
            color="#b91c1c"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={
          styles.list
        }
      >
        {!reports.length && (
          <View style={styles.empty}>
            <Ionicons
              name="file-tray-outline"
              size={42}
              color="#9ca3af"
            />

            <Text style={styles.emptyText}>
              {t.empty}
            </Text>
          </View>
        )}

        {reports.map((report) => (
          <View
            key={report.id}
            style={styles.card}
          >
            <View style={styles.cardTop}>
              <Text style={styles.id}>
                {report.id}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  removeOne(report.id)
                }
              >
                <Ionicons
                  name="trash-outline"
                  size={19}
                  color="#b91c1c"
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.category}>
              {getCategoryLabel(
                report,
                language
              )}
            </Text>

            <Text style={styles.description}>
              {report.description}
            </Text>

            {report.photo && (
              <Image
                source={{
                  uri: report.photo
                }}
                style={styles.thumb}
              />
            )}

            {report.location && (
              <Text style={styles.meta}>
                {t.gps}:{" "}
                {Number(
                  report.location.latitude
                ).toFixed(5)}
                ,{" "}
                {Number(
                  report.location.longitude
                ).toFixed(5)}
              </Text>
            )}

            <Text style={styles.meta}>
              {t.status}:{" "}
              {getStatusLabel(
                report,
                language,
                t
              )}
            </Text>

            <Text style={styles.meta}>
              {formatDate(
                report.createdAt,
                language
              )}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fa"
  },

  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingBottom: 8
  },

  headingText: {
    flex: 1
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#0f4c81"
  },

  subtitle: {
    marginTop: 3,
    color: "#6b7280"
  },

  iconButton: {
    padding: 8
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 30
  },

  empty: {
    alignItems: "center",
    paddingTop: 70
  },

  emptyText: {
    marginTop: 10,
    color: "#6b7280"
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 1
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  id: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f4c81"
  },

  category: {
    marginTop: 8,
    fontWeight: "700",
    fontSize: 16,
    color: "#1f2937"
  },

  description: {
    marginTop: 5,
    color: "#374151",
    lineHeight: 20
  },

  thumb: {
    width: "100%",
    height: 140,
    borderRadius: 9,
    marginTop: 10
  },

  meta: {
    marginTop: 6,
    color: "#6b7280",
    fontSize: 11
  }
});
