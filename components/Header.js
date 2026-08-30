import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header() {
  return (
    <View style={styles.header}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>SPV</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>Comune di San Pietro Vernotico</Text>
        <Text style={styles.subtitle}>App civica sperimentale V3.1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f4c81",
    paddingHorizontal: 14,
    paddingVertical: 12
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12
  },
  badgeText: {
    color: "#0f4c81",
    fontWeight: "800",
    fontSize: 16
  },
  title: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700"
  },
  subtitle: {
    color: "#dce8f3",
    fontSize: 12,
    marginTop: 3
  }
});
