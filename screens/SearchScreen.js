import React, { useMemo, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { SEARCH_INDEX } from "../config/searchIndex";
import { t } from "../config/translations";

const LOCAL_TEXT = {
  it: {
    language: "Lingua",
    noResults: "Nessun risultato trovato."
  },

  en: {
    language: "Language",
    noResults: "No results found."
  },

  de: {
    language: "Sprache",
    noResults: "Keine Ergebnisse gefunden."
  }
};

function LanguageButton({
  label,
  active,
  onPress
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.languageButton,
        active && styles.languageButtonActive
      ]}
    >
      <Text
        style={[
          styles.languageButtonText,
          active && styles.languageButtonTextActive
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function SearchScreen({
  language = "it",
  onLanguageChange,
  onNavigate
}) {
  const [query, setQuery] = useState("");

  const localText =
    LOCAL_TEXT[language] ||
    LOCAL_TEXT.it;

  const results = useMemo(() => {
  const normalized =
    query.trim().toLowerCase();

  if (!normalized) {
    return [];
  }

  return SEARCH_INDEX.filter((item) => {
    const title =
      item.title?.[language] ||
      item.title?.it ||
      "";

    const keywords =
      item.keywords?.[language] ||
      item.keywords?.it ||
      "";

    const text =
      `${title} ${keywords}`
        .toLowerCase();

    return text.includes(normalized);
  });
}, [query, language]);


  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>
        {t(language, "search")}
      </Text>

      <Text style={styles.languageLabel}>
        {localText.language}
      </Text>

      <View style={styles.languages}>
        <LanguageButton
          label="IT"
          active={language === "it"}
          onPress={() =>
            onLanguageChange?.("it")
          }
        />

        <LanguageButton
          label="EN"
          active={language === "en"}
          onPress={() =>
            onLanguageChange?.("en")
          }
        />

        <LanguageButton
          label="DE"
          active={language === "de"}
          onPress={() =>
            onLanguageChange?.("de")
          }
        />
      </View>

      <View style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={22}
          color="#6b7280"
        />

        <TextInput
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          placeholder={t(
            language,
            "searchPlaceholder"
          )}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {query.length > 0 && (
          <TouchableOpacity
            onPress={() =>
              setQuery("")
            }
          >
            <Ionicons
              name="close-circle"
              size={21}
              color="#6b7280"
            />
          </TouchableOpacity>
        )}
      </View>

      {query.length > 0 &&
        results.length === 0 && (
          <Text style={styles.empty}>
            {localText.noResults}
          </Text>
        )}

      {results.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.result}
          onPress={() =>
            onNavigate(item.screen)
          }
        >
          <Ionicons
            name="search-outline"
            size={20}
            color="#0f4c81"
          />

          <Text style={styles.resultText}>
           {item.title?.[language] || item.title?.it} 
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 35,
    backgroundColor: "#f4f7fa"
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0f4c81",
    marginBottom: 15
  },

  languageLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8
  },

  languages: {
    flexDirection: "row",
    marginBottom: 18
  },

  languageButton: {
    minWidth: 60,
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginRight: 9,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ccd6df"
  },

  languageButtonActive: {
    backgroundColor: "#0f4c81",
    borderColor: "#0f4c81"
  },

  languageButtonText: {
    textAlign: "center",
    color: "#374151",
    fontWeight: "700"
  },

  languageButtonTextActive: {
    color: "#ffffff"
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 13,
    minHeight: 52,
    elevation: 1
  },

  input: {
    flex: 1,
    marginHorizontal: 9,
    fontSize: 16,
    color: "#1f2937"
  },

  result: {
    marginTop: 10,
    minHeight: 58,
    paddingHorizontal: 14,
    borderRadius: 11,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    elevation: 1
  },

  resultText: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "600",
    color: "#1f2937"
  },

  empty: {
    marginTop: 25,
    textAlign: "center",
    color: "#6b7280"
  }
});
