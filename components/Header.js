import React from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";

const TRANSLATIONS = {
  it: {
    title: "Comune di San Pietro Vernotico",
    subtitle: "App civica sperimentale V3.1"
  },

  en: {
    title: "Municipality of San Pietro Vernotico",
    subtitle: "Experimental civic app V3.1"
  },

  de: {
    title: "Gemeinde San Pietro Vernotico",
    subtitle: "Experimentelle Bürger-App V3.1"
  }
};

export default function Header({
  language = "it"
}) {
  const t =
    TRANSLATIONS[language] ||
    TRANSLATIONS.it;

  return (
    <View style={styles.header}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          SPV
        </Text>
      </View>

      <View style={styles.textBox}>
        <Text style={styles.title}>
          {t.title}
        </Text>

        <Text style={styles.subtitle}>
          {t.subtitle}
        </Text>
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

  textBox: {
    flex: 1
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
