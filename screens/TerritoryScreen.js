import React from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking
} from "react-native";

import {
  Ionicons
} from "@expo/vector-icons";

import {
  PLACES
} from "../config/places";

const TRANSLATIONS = {
  it: {
    title: "Territorio",
    subtitle:
      "Scopri luoghi e punti di interesse del Comune e di Campo di Mare.",
    category: "Categoria",
    status: "Stato",
    address: "Indirizzo",
    maps: "Apri mappa"
  },

  en: {
    title: "Territory",
    subtitle:
      "Discover places and points of interest in the municipality and Campo di Mare.",
    category: "Category",
    status: "Status",
    address: "Address",
    maps: "Open map"
  },

  de: {
    title: "Gemeindegebiet",
    subtitle:
      "Entdecken Sie Orte und Sehenswürdigkeiten der Gemeinde und von Campo di Mare.",
    category: "Kategorie",
    status: "Status",
    address: "Adresse",
    maps: "Karte öffnen"
  }
};

export default function TerritoryScreen({
  language = "it"
}) {
  const t =
    TRANSLATIONS[language] ||
    TRANSLATIONS.it;

  const openMap = (place) => {
    if (place.googleMapsUrl) {
      Linking.openURL(
        place.googleMapsUrl
      );
      return;
    }

    const url =
      `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;

    Linking.openURL(url);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>
        {t.title}
      </Text>

      <Text style={styles.subtitle}>
        {t.subtitle}
      </Text>

      {PLACES.map((place) => (
        <View
          key={place.id}
          style={styles.card}
        >
          <Text style={styles.placeTitle}>
            {place.title || place.name}
          </Text>

          {place.subtitle && (
            <Text style={styles.placeSubtitle}>
              {place.subtitle}
            </Text>
          )}

          <Text style={styles.description}>
            {place.description}
          </Text>

          <Text style={styles.meta}>
            {t.category}: {place.category}
          </Text>

          {place.status && (
            <Text style={styles.meta}>
              {t.status}: {place.status}
            </Text>
          )}

          {place.address && (
            <Text style={styles.meta}>
              {t.address}: {place.address}
            </Text>
          )}

          <TouchableOpacity
            style={styles.mapButton}
            onPress={() =>
              openMap(place)
            }
          >
            <Ionicons
              name="map-outline"
              size={20}
              color="#ffffff"
            />

            <Text style={styles.mapText}>
              {t.maps}
            </Text>
          </TouchableOpacity>
        </View>
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
    color: "#0f4c81"
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 18,
    color: "#4b5563",
    lineHeight: 20
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 13,
    marginBottom: 14,
    elevation: 2
  },

  placeTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937"
  },

  placeSubtitle: {
    marginTop: 4,
    color: "#0f4c81",
    fontWeight: "600"
  },

  description: {
    marginTop: 10,
    color: "#374151",
    lineHeight: 20
  },

  meta: {
    marginTop: 7,
    fontSize: 12,
    color: "#6b7280"
  },

  mapButton: {
    marginTop: 14,
    minHeight: 46,
    backgroundColor: "#0f4c81",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7
  },

  mapText: {
    color: "#ffffff",
    fontWeight: "700"
  }
});
