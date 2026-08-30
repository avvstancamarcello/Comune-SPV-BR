import React from "react";
import { ScrollView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ITEMS = [
  ["Portale del Comune", "globe-outline", "https://www.spv.br.it/"],
  ["Amministrazione e servizi", "business-outline", "https://www.spv.br.it/"],
  ["Notizie e avvisi", "newspaper-outline", "https://www.spv.br.it/"],
  ["Trasparenza", "search-outline", "https://www.spv.br.it/"]
];

export default function ServicesScreen({ openWebView }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Servizi</Text>
      <Text style={styles.note}>
        In V3.1 i pulsanti puntano al dominio ufficiale. I collegamenti profondi potranno essere sostituiti dopo la verifica con il Comune.
      </Text>

      {ITEMS.map(([title, icon, url]) => (
        <TouchableOpacity key={title} style={styles.row} onPress={() => openWebView(title, url)}>
          <Ionicons name={icon} size={24} color="#0f4c81" />
          <Text style={styles.rowText}>{title}</Text>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#f4f7fa" },
  title: { fontSize: 25, fontWeight: "700", color: "#0f4c81" },
  note: { marginTop: 6, marginBottom: 18, color: "#4b5563", lineHeight: 20 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1
  },
  rowText: { flex: 1, marginLeft: 12, fontWeight: "600", color: "#1f2937" }
});
