import React from "react";
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LINKS } from "../config/links";

function Card({ title, subtitle, icon, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Ionicons name={icon} size={30} color="#0f4c81" />
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ onNavigate, openWebView }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Servizi al cittadino</Text>
      <Text style={styles.intro}>
        Prototipo leggero per consultare il portale comunale e testare le segnalazioni geolocalizzate.
      </Text>

      <View style={styles.grid}>
        <Card
          title="Sito comunale"
          subtitle="Apri www.spv.br.it"
          icon="globe-outline"
          onPress={() => openWebView("Comune SPV", LINKS.home)}
        />
        <Card
          title="Segnala"
          subtitle="Foto, GPS e descrizione"
          icon="warning-outline"
          onPress={() => onNavigate("report")}
        />
        <Card
          title="Storico"
          subtitle="Segnalazioni salvate"
          icon="time-outline"
          onPress={() => onNavigate("history")}
        />
        <Card
          title="Servizi"
          subtitle="Collegamenti comunali"
          icon="apps-outline"
          onPress={() => onNavigate("services")}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f4f7fa" },
  title: { fontSize: 26, fontWeight: "700", color: "#0f4c81" },
  intro: { marginTop: 7, marginBottom: 18, color: "#4b5563", lineHeight: 21 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  card: {
    width: "48%",
    minHeight: 145,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 2
  },
  cardTitle: { marginTop: 10, fontSize: 16, fontWeight: "700", color: "#1f2937" },
  cardText: { marginTop: 5, fontSize: 12, color: "#6b7280", lineHeight: 17 }
});
