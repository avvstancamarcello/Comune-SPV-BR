import React from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import PersonaggiIllustri from "../components/PersonaggiIllustri";

import {
  AvvisiComune,
  BeniArchitettonici,
  ContattiComunali,
  FarmacieServiziSanitari
} from "../components/HomeDirectories";

const TRANSLATIONS = {
  it: {
    title: "Servizi al cittadino",
    intro:
      "Consulta il portale comunale e accedi ai principali servizi dell'App.",
    website: "Sito Ufficiale del Comune",
    websiteSub: "Apri www.spv.br.it",
    search: "Cerca e scegli la Lingua",
    searchSub: "Ricerca e selezione IT · EN · DE",
    territory: "Territorio: Farmacie - Luoghi di Culto - Cimitero Comunale",
    territorySub: "Consulta luoghi e servizi sul territorio",
    report: "Segnala luoghi e Richiedi Interventi",
    reportSub: "Invia posizione, foto e richiesta",
    history: "Storico tue Segnalazioni",
    historySub: "Consulta le segnalazioni salvate",
    services: "Servizi Comunali",
    servicesSub: "Accedi ai servizi del Comune"
  },

  en: {
    title: "Citizen services",
    intro:
      "Access the municipal portal and the main services available in the app.",
    website: "Municipal website",
    websiteSub: "Open www.spv.br.it",
    search: "Search and choose language",
    searchSub: "Search and select IT · EN · DE",
    territory: "Territory",
    territorySub: "Places and points of interest",
    report: "Report",
    reportSub: "Photo, GPS and description",
    history: "History",
    historySub: "Saved reports",
    services: "Services",
    servicesSub: "Municipal links"
  },

  de: {
    title: "Bürgerservice",
    intro:
      "Greifen Sie auf das Gemeindeportal und die wichtigsten Dienste der App zu.",
    website: "Gemeinde-Website",
    websiteSub: "www.spv.br.it öffnen",
    search: "Suchen und Sprache wählen",
    searchSub: "Suche und Auswahl IT · EN · DE",
    territory: "Gemeindegebiet",
    territorySub: "Orte und Sehenswürdigkeiten",
    report: "Problem melden",
    reportSub: "Foto, GPS und Beschreibung",
    history: "Verlauf",
    historySub: "Gespeicherte Meldungen",
    services: "Dienste",
    servicesSub: "Kommunale Links"
  }
};

function Card({
  title,
  subtitle,
  icon,
  onPress
}) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      accessibilityRole="button"
    >
      <Ionicons
        name={icon}
        size={30}
        color="#0f4c81"
      />

      <Text style={styles.cardTitle}>
        {title}
      </Text>

      <Text style={styles.cardText}>
        {subtitle}
      </Text>
    </TouchableOpacity>
  );
}

export default function HomeScreen({
  language = "it",
  onNavigate,
  openWebView
}) {
  const t =
    TRANSLATIONS[language] ||
    TRANSLATIONS.it;

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>
        {t.title}
      </Text>

      <Text style={styles.intro}>
        {t.intro}
      </Text>

      <View style={styles.grid}>
        <Card
          title={t.website}
          subtitle={t.websiteSub}
          icon="globe-outline"
          onPress={() =>
            openWebView(
              t.website,
              "https://www.spv.br.it/"
            )
          }
        />

        <Card
          title={t.search}
          subtitle={t.searchSub}
          icon="search-outline"
          onPress={() =>
            onNavigate("search")
          }
        />

        <BeniArchitettonici
          language={language}
        />

        <PersonaggiIllustri
          language={language}
        />

        <AvvisiComune
          language={language}
          openWebView={openWebView}
        />

        <FarmacieServiziSanitari
          language={language}
        />

        <Card
          title={t.report}
          subtitle={t.reportSub}
          icon="warning-outline"
          onPress={() =>
            onNavigate("report")
          }
        />

        <Card
          title={t.history}
          subtitle={t.historySub}
          icon="time-outline"
          onPress={() =>
            onNavigate("history")
          }
        />

        <Card
          title={t.services}
          subtitle={t.servicesSub}
          icon="apps-outline"
          onPress={() =>
            onNavigate("services")
          }
        />

        <ContattiComunali
          language={language}
          openWebView={openWebView}
        />

        <Card
          title={t.territory}
          subtitle={t.territorySub}
          icon="map-outline"
          onPress={() =>
            onNavigate("territory")
          }
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f4f7fa"
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0f4c81"
  },

  intro: {
    marginTop: 7,
    marginBottom: 18,
    color: "#4b5563",
    lineHeight: 21
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },

  card: {
    width: "48%",
    minHeight: 145,
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 2
  },

  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: "#1f2937"
  },

  cardText: {
    marginTop: 5,
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 17
  }
});
