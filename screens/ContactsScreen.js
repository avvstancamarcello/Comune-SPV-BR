import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LINKS } from "../config/links";

export default function ContactsScreen({ openWebView }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contatti</Text>
      <Text style={styles.text}>
        Per la V3.1 manteniamo i contatti come collegamento al portale ufficiale, così evitiamo di incorporare dati che potrebbero cambiare.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => openWebView("Contatti Comune SPV", LINKS.home)}
      >
        <Ionicons name="globe-outline" size={22} color="#fff" />
        <Text style={styles.buttonText}>Apri il sito ufficiale</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f4f7fa" },
  title: { fontSize: 25, fontWeight: "700", color: "#0f4c81" },
  text: { marginTop: 8, color: "#4b5563", lineHeight: 21 },
  button: {
    marginTop: 20,
    backgroundColor: "#0f4c81",
    minHeight: 50,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },
  buttonText: { color: "#fff", fontWeight: "700" }
});
