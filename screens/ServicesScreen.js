import React from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LINKS } from "../config/links";

const ITEMS = [
  [
    "Portale del Comune",
    "globe-outline",
    LINKS.home
  ],
  [
    "Guida ai Servizi",
    "information-circle-outline",
    LINKS.guidaServizi
  ],
  [
    "Area Tecnica",
    "construct-outline",
    LINKS.areaTecnica
  ],
  [
    "Modulistica",
    "document-text-outline",
    LINKS.modulistica
  ],
  [
    "Carta d'Identità",
    "card-outline",
    LINKS.cartaIdentita
  ],
  [
    "Albo Presidenti di Seggio",
    "people-outline",
    LINKS.presidentiSeggio
  ],
  [
    "Albo Scrutatori",
    "people-circle-outline",
    LINKS.scrutatori
  ],
  [
    "ANAC",
    "shield-checkmark-outline",
    LINKS.anac
  ],
  [
    "Albo Pretorio",
    "newspaper-outline",
    LINKS.alboPretorio
  ],
  [
    "Amministrazione Trasparente",
    "search-outline",
    LINKS.trasparenza
  ],
  [
    "Servizi Demografici",
    "person-outline",
    LINKS.serviziDemografici
  ],
  [
    "Trasparenza Rifiuti / TARI",
    "trash-outline",
    LINKS.tariArera
  ]
];

export default function ServicesScreen({
  openWebView
}) {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>
        Servizi
      </Text>

      <Text style={styles.note}>
        Collegamenti ai servizi e alle pagine
        istituzionali del Comune di San Pietro Vernotico.
      </Text>

      {ITEMS.map(
        ([title, icon, url]) => (
          <TouchableOpacity
            key={title}
            style={styles.row}
            onPress={() =>
              openWebView(title, url)
            }
          >
            <Ionicons
              name={icon}
              size={24}
              color="#0f4c81"
            />

            <Text style={styles.rowText}>
              {title}
            </Text>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f4f7fa"
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#0f4c81"
  },

  note: {
    marginTop: 6,
    marginBottom: 18,
    color: "#4b5563",
    lineHeight: 20
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 1
  },

  rowText: {
    flex: 1,
    marginLeft: 12,
    fontWeight: "600",
    color: "#1f2937"
  }
});
