import React from "react";

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";

import {
  Ionicons
} from "@expo/vector-icons";

const TRANSLATIONS = {
  it: {
    home: "Home",
    services: "Servizi",
    search: "Cerca",
    territory: "Territorio",
    report: "Segnala",
    history: "Storico",
    contacts: "Contatti"
  },

  en: {
    home: "Home",
    services: "Services",
    search: "Search",
    territory: "Territory",
    report: "Report",
    history: "History",
    contacts: "Contacts"
  },

  de: {
    home: "Home",
    services: "Dienste",
    search: "Suche",
    territory: "Gebiet",
    report: "Melden",
    history: "Verlauf",
    contacts: "Kontakte"
  }
};

function Item({
  label,
  icon,
  active,
  onPress
}) {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={onPress}
    >
      <Ionicons
        name={icon}
        size={21}
        color={
          active
            ? "#0f4c81"
            : "#777"
        }
      />

      <Text
        style={[
          styles.label,
          active && styles.active
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function BottomNav({
  language = "it",
  activeScreen,
  onChange
}) {
  const t =
    TRANSLATIONS[language] ||
    TRANSLATIONS.it;

  return (
    <View style={styles.bar}>
      <Item
        label={t.home}
        icon="home-outline"
        active={activeScreen === "home"}
        onPress={() =>
          onChange("home")
        }
      />

      <Item
        label={t.search}
        icon="search-outline"
        active={activeScreen === "search"}
        onPress={() =>
          onChange("search")
        }
      />

      <Item
        label={t.territory}
        icon="map-outline"
        active={activeScreen === "territory"}
        onPress={() =>
          onChange("territory")
        }
      />

      <Item
        label={t.report}
        icon="warning-outline"
        active={activeScreen === "report"}
        onPress={() =>
          onChange("report")
        }
      />

      <Item
        label={t.contacts}
        icon="call-outline"
        active={activeScreen === "contacts"}
        onPress={() =>
          onChange("contacts")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 68,
    flexDirection: "row",
    backgroundColor: "#ffffff",
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
