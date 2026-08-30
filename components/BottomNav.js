import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function Item({ label, icon, active, onPress }) {
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Ionicons name={icon} size={22} color={active ? "#0f4c81" : "#777"} />
      <Text style={[styles.label, active && styles.active]}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function BottomNav({ activeScreen, onChange }) {
  return (
    <View style={styles.bar}>
      <Item label="Home" icon="home-outline" active={activeScreen === "home"} onPress={() => onChange("home")} />
      <Item label="Servizi" icon="apps-outline" active={activeScreen === "services"} onPress={() => onChange("services")} />
      <Item label="Segnala" icon="warning-outline" active={activeScreen === "report"} onPress={() => onChange("report")} />
      <Item label="Storico" icon="time-outline" active={activeScreen === "history"} onPress={() => onChange("history")} />
      <Item label="Contatti" icon="call-outline" active={activeScreen === "contacts"} onPress={() => onChange("contacts")} />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 68,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#d8dee5"
  },
  item: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  label: {
    fontSize: 9,
    marginTop: 3,
    color: "#777"
  },
  active: {
    color: "#0f4c81",
    fontWeight: "700"
  }
});
