import React, { useState } from "react";

import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
  Linking
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "SPV_REPORTS_V31";

const TRANSLATIONS = {
  it: {
    title: "Segnala un problema",
    intro:
      "Crea una segnalazione con categoria, descrizione, fotografia e posizione GPS.",

    category: "Categoria",
    description: "Descrizione",
    descriptionPlaceholder: "Descrivi il problema...",

    photo: "Fotografia",
    takePhoto: "Scatta foto",
    gallery: "Galleria",
    removePhoto: "Rimuovi foto",

    location: "Posizione GPS",
    detectLocation: "Rileva posizione",
    locationAcquired: "Posizione acquisita",
    latitude: "Latitudine",
    longitude: "Longitudine",
    accuracy: "Precisione",
    approximately: "circa",

    save: "Salva segnalazione locale",
    saved: "Segnalazione salvata",

    missingCategory: "Categoria mancante",
    selectCategory: "Seleziona una categoria.",

    missingDescription: "Descrizione mancante",
    enterDescription:
      "Inserisci una descrizione di almeno 5 caratteri.",

    cameraPermission: "Fotocamera",
    cameraPermissionMessage:
      "Autorizza l'accesso alla fotocamera.",

    locationPermission: "Posizione",
    locationPermissionMessage:
      "Autorizzazione alla posizione non concessa.",

    locationError:
      "Impossibile acquisire la posizione.",

    saveErrorTitle: "Errore",
    saveError:
      "Non è stato possibile salvare la segnalazione.",

    storedMessage:
      "La segnalazione è stata memorizzata localmente sul dispositivo.",

    openHistory: "Apri storico",
    ok: "OK",

    localDraft: "Bozza locale"
  },

  en: {
    title: "Report a problem",
    intro:
      "Create a report with category, description, photo and GPS location.",

    category: "Category",
    description: "Description",
    descriptionPlaceholder: "Describe the problem...",

    photo: "Photo",
    takePhoto: "Take photo",
    gallery: "Gallery",
    removePhoto: "Remove photo",

    location: "GPS location",
    detectLocation: "Detect location",
    locationAcquired: "Location acquired",
    latitude: "Latitude",
    longitude: "Longitude",
    accuracy: "Accuracy",
    approximately: "about",

    save: "Save local report",
    saved: "Report saved",

    missingCategory: "Missing category",
    selectCategory: "Select a category.",

    missingDescription: "Missing description",
    enterDescription:
      "Enter a description of at least 5 characters.",

    cameraPermission: "Camera",
    cameraPermissionMessage:
      "Allow access to the camera.",

    locationPermission: "Location",
    locationPermissionMessage:
      "Location permission was not granted.",

    locationError:
      "Unable to acquire the location.",

    saveErrorTitle: "Error",
    saveError:
      "Unable to save the report.",

    storedMessage:
      "The report has been stored locally on the device.",

    openHistory: "Open history",
    ok: "OK",

    localDraft: "Local draft"
  },

  de: {
    title: "Problem melden",
    intro:
      "Erstellen Sie eine Meldung mit Kategorie, Beschreibung, Foto und GPS-Position.",

    category: "Kategorie",
    description: "Beschreibung",
    descriptionPlaceholder: "Beschreiben Sie das Problem...",

    photo: "Foto",
    takePhoto: "Foto aufnehmen",
    gallery: "Galerie",
    removePhoto: "Foto entfernen",

    location: "GPS-Position",
    detectLocation: "Position ermitteln",
    locationAcquired: "Position erfasst",
    latitude: "Breitengrad",
    longitude: "Längengrad",
    accuracy: "Genauigkeit",
    approximately: "ca.",

    save: "Lokale Meldung speichern",
    saved: "Meldung gespeichert",

    missingCategory: "Kategorie fehlt",
    selectCategory: "Wählen Sie eine Kategorie.",

    missingDescription: "Beschreibung fehlt",
    enterDescription:
      "Geben Sie eine Beschreibung mit mindestens 5 Zeichen ein.",

    cameraPermission: "Kamera",
    cameraPermissionMessage:
      "Erlauben Sie den Zugriff auf die Kamera.",

    locationPermission: "Position",
    locationPermissionMessage:
      "Die Standortberechtigung wurde nicht erteilt.",

    locationError:
      "Die Position konnte nicht ermittelt werden.",

    saveErrorTitle: "Fehler",
    saveError:
      "Die Meldung konnte nicht gespeichert werden.",

    storedMessage:
      "Die Meldung wurde lokal auf dem Gerät gespeichert.",

    openHistory: "Verlauf öffnen",
    ok: "OK",

    localDraft: "Lokaler Entwurf"
  }
};

const CATEGORIES = [
  {
    id: "roads",
    it: "Strade",
    en: "Roads",
    de: "Straßen"
  },
  {
    id: "lighting",
    it: "Illuminazione",
    en: "Street lighting",
    de: "Straßenbeleuchtung"
  },
  {
    id: "waste",
    it: "Rifiuti",
    en: "Waste",
    de: "Abfälle"
  },
  {
    id: "green",
    it: "Verde pubblico",
    en: "Public green areas",
    de: "Öffentliche Grünflächen"
  },
  {
    id: "signage",
    it: "Segnaletica",
    en: "Road signs",
    de: "Beschilderung"
  },
  {
    id: "accessibility",
    it: "Barriere architettoniche",
    en: "Accessibility barriers",
    de: "Barrieren für Menschen mit Behinderungen"
  },
  {
    id: "public-buildings",
    it: "Edifici pubblici",
    en: "Public buildings",
    de: "Öffentliche Gebäude"
  },
  {
    id: "other",
    it: "Altro",
    en: "Other",
    de: "Sonstiges"
  }
];

const DESTINATIONS = {
  impregico: {
    url:
      "https://www.impregico.it/san-pietro-vernotico/"
  },

  police: {
    url:
      "https://www.spv.br.it/orario-pubblico"
  }
};

const ROUTING_TEXT = {
  it: {
    destinationTitle: "Destinazione della segnalazione",
    protocolDestination: "Protocollo comunale",
    continue: "Salva e continua",
    stored:
      "La segnalazione è stata salvata nello storico locale.",
    openImpregico: "Apri IMPREGICO",
    openPolice: "Apri Polizia Locale",
    wasteDestination:
      "Per questa categoria puoi proseguire sulla pagina del gestore della raccolta rifiuti.",
    policeDestination:
      "Per questa categoria puoi consultare i recapiti e gli orari della Polizia Locale.",
    localDestination:
      "La segnalazione resta salvata come bozza locale. Potrà essere successivamente inoltrata al Protocollo comunale.",
    openError:
      "Non è stato possibile aprire la pagina del servizio."
  },

  en: {
    destinationTitle: "Report destination",
    protocolDestination: "Municipal Protocol Office",
    continue: "Save and continue",
    stored:
      "The report has been saved in the local history.",
    openImpregico: "Open IMPREGICO",
    openPolice: "Open Local Police",
    wasteDestination:
      "For this category you can continue on the waste collection operator's page.",
    policeDestination:
      "For this category you can view Local Police contacts and opening hours.",
    localDestination:
      "The report remains saved as a local draft and can later be sent to the municipal Protocol Office.",
    openError:
      "The service page could not be opened."
  },

  de: {
    destinationTitle: "Empfänger der Meldung",
    protocolDestination: "Protokollstelle der Gemeinde",
    continue: "Speichern und fortfahren",
    stored:
      "Die Meldung wurde im lokalen Verlauf gespeichert.",
    openImpregico: "IMPREGICO öffnen",
    openPolice: "Ortspolizei öffnen",
    wasteDestination:
      "Für diese Kategorie können Sie auf der Seite des Abfallentsorgers fortfahren.",
    policeDestination:
      "Für diese Kategorie können Sie Kontakte und Öffnungszeiten der Ortspolizei aufrufen.",
    localDestination:
      "Die Meldung bleibt als lokaler Entwurf gespeichert und kann später an die Protokollstelle der Gemeinde gesendet werden.",
    openError:
      "Die Serviceseite konnte nicht geöffnet werden."
  }
};

function getDestination(category) {
  if (category === "waste") {
    return {
      id: "impregico",
      status: "to-forward-impregico",
      statusLabel: "Da inoltrare a IMPREGICO"
    };
  }

  if (
    category === "roads" ||
    category === "lighting" ||
    category === "signage"
  ) {
    return {
      id: "police",
      status: "to-forward-police",
      statusLabel: "Da inoltrare alla Polizia Locale"
    };
  }

  return {
    id: "local",
    status: "local-draft",
    statusLabel: "Bozza locale"
  };
}

function makeId() {
  const d = new Date();

  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const sec = String(d.getSeconds()).padStart(2, "0");

  return `SPV-${y}${m}${day}-${h}${min}${sec}`;
}

export default function ReportScreen({
  language = "it",
  onSaved
}) {
  const t =
    TRANSLATIONS[language] ||
    TRANSLATIONS.it;

  const routingText =
    ROUTING_TEXT[language] ||
    ROUTING_TEXT.it;

  const [category, setCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [photo, setPhoto] =
    useState(null);

  const [location, setLocation] =
    useState(null);

  const [findingLocation, setFindingLocation] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const takePhoto = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        t.cameraPermission,
        t.cameraPermissionMessage
      );

      return;
    }

    const result =
      await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.7
      });

    if (!result.canceled) {
      setPhoto(
        result.assets[0].uri
      );
    }
  };

  const choosePhoto = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 0.7
      });

    if (!result.canceled) {
      setPhoto(
        result.assets[0].uri
      );
    }
  };

  const getLocation = async () => {
    try {
      setFindingLocation(true);

      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (
        permission.status !== "granted"
      ) {
        Alert.alert(
          t.locationPermission,
          t.locationPermissionMessage
        );

        return;
      }

      const position =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High
        });

      setLocation({
        latitude:
          position.coords.latitude,

        longitude:
          position.coords.longitude,

        accuracy:
          position.coords.accuracy
      });

    } catch {
      Alert.alert(
        t.locationPermission,
        t.locationError
      );

    } finally {
      setFindingLocation(false);
    }
  };

  const openDestination = async (url) => {
    try {
      const supported =
        await Linking.canOpenURL(url);

      if (!supported) {
        throw new Error(
          "Unsupported URL"
        );
      }

      await Linking.openURL(url);

    } catch {
      Alert.alert(
        t.saveErrorTitle,
        routingText.openError
      );
    }
  };

  const saveReport = async () => {
    if (!category) {
      Alert.alert(
        t.missingCategory,
        t.selectCategory
      );

      return;
    }

    if (
      description.trim().length < 5
    ) {
      Alert.alert(
        t.missingDescription,
        t.enterDescription
      );

      return;
    }

    try {
      setSaving(true);

      const raw =
        await AsyncStorage.getItem(
          STORAGE_KEY
        );

      const reports =
        raw
          ? JSON.parse(raw)
          : [];

      const selectedCategory =
        CATEGORIES.find(
          (item) =>
            item.id === category
        );

      const destination =
        getDestination(category);

      const report = {
        id: makeId(),

        category,

        categoryLabel:
          selectedCategory
            ? selectedCategory[
                language
              ] ||
              selectedCategory.it
            : category,

        language,

        description:
          description.trim(),

        photo,

        location,

        destination:
          destination.id,

        status:
          destination.status,

        statusLabel:
          destination.statusLabel,

        createdAt:
          new Date().toISOString()
      };

      reports.unshift(report);

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(reports)
      );

      setCategory("");
      setDescription("");
      setPhoto(null);
      setLocation(null);

      let message =
        `ID: ${report.id}\n\n` +
        routingText.stored;

      const buttons = [];

      if (
        destination.id ===
        "impregico"
      ) {
        message +=
          `\n\n${routingText.wasteDestination}`;

        buttons.push({
          text:
            routingText.openImpregico,
          onPress: () =>
            openDestination(
              DESTINATIONS.impregico.url
            )
        });

      } else if (
        destination.id ===
        "police"
      ) {
        message +=
          `\n\n${routingText.policeDestination}`;

        buttons.push({
          text:
            routingText.openPolice,
          onPress: () =>
            openDestination(
              DESTINATIONS.police.url
            )
        });

      } else {
        message +=
          `\n\n${routingText.localDestination}`;
      }

      buttons.push({
        text: t.openHistory,
        onPress: () =>
          onSaved?.()
      });

      buttons.push({
        text: t.ok
      });

      Alert.alert(
        t.saved,
        message,
        buttons
      );

    } catch {
      Alert.alert(
        t.saveErrorTitle,
        t.saveError
      );

    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        {t.title}
      </Text>

      <Text style={styles.intro}>
        {t.intro}
      </Text>

      <Text style={styles.section}>
        1. {t.category}
      </Text>

      <View style={styles.categories}>
        {CATEGORIES.map((item) => {
          const active =
            category === item.id;

          const label =
            item[language] ||
            item.it;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.chip,
                active &&
                  styles.chipActive
              ]}
              onPress={() =>
                setCategory(item.id)
              }
            >
              <Text
                style={[
                  styles.chipText,
                  active &&
                    styles.chipTextActive
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {!!category && (
        <View style={styles.routingBox}>
          <Text style={styles.routingTitle}>
            {routingText.destinationTitle}
          </Text>

          {getDestination(category).id ===
          "impregico" ? (
            <>
              <Text style={styles.routingDescription}>
                {routingText.wasteDestination}
              </Text>

              <TouchableOpacity
                style={styles.routingButton}
                onPress={() =>
                  openDestination(
                    DESTINATIONS.impregico.url
                  )
                }
                accessibilityRole="link"
              >
                <Ionicons
                  name="trash-outline"
                  size={21}
                  color="#ffffff"
                />

                <Text style={styles.routingButtonText}>
                  {routingText.openImpregico}
                </Text>
              </TouchableOpacity>
            </>
          ) : getDestination(category).id ===
            "police" ? (
            <>
              <Text style={styles.routingDescription}>
                {routingText.policeDestination}
              </Text>

              <TouchableOpacity
                style={styles.routingButton}
                onPress={() =>
                  openDestination(
                    DESTINATIONS.police.url
                  )
                }
                accessibilityRole="link"
              >
                <Ionicons
                  name="shield-outline"
                  size={21}
                  color="#ffffff"
                />

                <Text style={styles.routingButtonText}>
                  {routingText.openPolice}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.protocolName}>
                {routingText.protocolDestination}
              </Text>

              <Text style={styles.routingDescription}>
                {routingText.localDestination}
              </Text>
            </>
          )}
        </View>
      )}

      <Text style={styles.section}>
        2. {t.description}
      </Text>

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder={
          t.descriptionPlaceholder
        }
        multiline
        maxLength={1000}
        style={styles.input}
      />

      <Text style={styles.counter}>
        {description.length}/1000
      </Text>

      <Text style={styles.section}>
        3. {t.photo}
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.primaryHalf}
          onPress={takePhoto}
        >
          <Ionicons
            name="camera-outline"
            size={21}
            color="#ffffff"
          />

          <Text style={styles.primaryText}>
            {t.takePhoto}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryHalf}
          onPress={choosePhoto}
        >
          <Ionicons
            name="images-outline"
            size={21}
            color="#0f4c81"
          />

          <Text style={styles.secondaryText}>
            {t.gallery}
          </Text>
        </TouchableOpacity>
      </View>

      {photo && (
        <View style={styles.photoBox}>
          <Image
            source={{ uri: photo }}
            style={styles.photo}
          />

          <TouchableOpacity
            style={styles.remove}
            onPress={() =>
              setPhoto(null)
            }
          >
            <Ionicons
              name="trash-outline"
              size={19}
              color="#b91c1c"
            />

            <Text style={styles.removeText}>
              {t.removePhoto}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.section}>
        4. {t.location}
      </Text>

      <TouchableOpacity
        style={styles.fullButton}
        onPress={getLocation}
      >
        {findingLocation ? (
          <ActivityIndicator
            color="#ffffff"
          />
        ) : (
          <>
            <Ionicons
              name="location-outline"
              size={21}
              color="#ffffff"
            />

            <Text style={styles.primaryText}>
              {t.detectLocation}
            </Text>
          </>
        )}
      </TouchableOpacity>

      {location && (
        <View style={styles.locationBox}>
          <Text style={styles.locationTitle}>
            {t.locationAcquired}
          </Text>

          <Text>
            {t.latitude}:{" "}
            {location.latitude.toFixed(6)}
          </Text>

          <Text>
            {t.longitude}:{" "}
            {location.longitude.toFixed(6)}
          </Text>

          {location.accuracy != null && (
            <Text>
              {t.accuracy}:{" "}
              {t.approximately}{" "}
              {Math.round(
                location.accuracy
              )}{" "}
              m
            </Text>
          )}
        </View>
      )}

      <TouchableOpacity
        style={styles.saveButton}
        onPress={saveReport}
        disabled={saving}
      >
        {saving ? (
          <ActivityIndicator
            color="#ffffff"
          />
        ) : (
          <>
            <Ionicons
              name="save-outline"
              size={22}
              color="#ffffff"
            />

            <Text style={styles.saveText}>
              {routingText.continue}
            </Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: "#f4f7fa"
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#0f4c81"
  },

  intro: {
    marginTop: 6,
    marginBottom: 12,
    color: "#4b5563",
    lineHeight: 20
  },

  section: {
    marginTop: 18,
    marginBottom: 9,
    fontWeight: "700",
    color: "#1f2937"
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccd6df",
    marginRight: 8,
    marginBottom: 8
  },

  chipActive: {
    backgroundColor: "#0f4c81",
    borderColor: "#0f4c81"
  },

  chipText: {
    color: "#374151",
    fontSize: 13
  },

  chipTextActive: {
    color: "#ffffff",
    fontWeight: "700"
  },

  routingBox: {
    marginTop: 10,
    padding: 14,
    backgroundColor: "#eaf2f8",
    borderWidth: 1,
    borderColor: "#b7d0e3",
    borderRadius: 12
  },

  routingTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#17354f"
  },

  routingDescription: {
    marginTop: 7,
    color: "#374151",
    lineHeight: 20
  },

  protocolName: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    color: "#0f4c81"
  },

  routingButton: {
    marginTop: 12,
    minHeight: 48,
    paddingHorizontal: 12,
    backgroundColor: "#0f4c81",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },

  routingButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    textAlign: "center"
  },

  input: {
    minHeight: 125,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccd6df",
    borderRadius: 12,
    padding: 13,
    textAlignVertical: "top",
    fontSize: 15
  },

  counter: {
    textAlign: "right",
    color: "#6b7280",
    fontSize: 11,
    marginTop: 4
  },

  row: {
    flexDirection: "row",
    gap: 10
  },

  primaryHalf: {
    flex: 1,
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: "#0f4c81",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7
  },

  secondaryHalf: {
    flex: 1,
    minHeight: 48,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#0f4c81",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7
  },

  primaryText: {
    color: "#ffffff",
    fontWeight: "700"
  },

  secondaryText: {
    color: "#0f4c81",
    fontWeight: "700"
  },

  photoBox: {
    marginTop: 12
  },

  photo: {
    width: "100%",
    height: 220,
    borderRadius: 12
  },

  remove: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7
  },

  removeText: {
    marginLeft: 5,
    color: "#b91c1c"
  },

  fullButton: {
    minHeight: 50,
    borderRadius: 10,
    backgroundColor: "#0f4c81",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7
  },

  locationBox: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 10
  },

  locationTitle: {
    color: "#166534",
    fontWeight: "700",
    marginBottom: 4
  },

  saveButton: {
    marginTop: 24,
    minHeight: 54,
    borderRadius: 12,
    backgroundColor: "#14733c",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },

  saveText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15
  }
});
