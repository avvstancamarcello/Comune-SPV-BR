import React from "react";

import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  BackHandler,
  Platform
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
    territory: "Beni ambientali",
    territorySub: "Canale SIEDI, flora, fauna e costa",
    report: "Segnala luoghi e Richiedi Interventi",
    reportSub: "Invia posizione, foto e richiesta",
    history: "Storico tue Segnalazioni",
    historySub: "Consulta le segnalazioni salvate",
    services: "Servizi Comunali",
    servicesSub: "Accedi ai servizi del Comune"
    ,media: "Video e testimonianze",
    mediaSub: "Il paese, Domenico Modugno e i ricordi degli artisti"
    ,exit: "Esci e chiudi App",
    exitSub: "Termina la sessione e chiudi l'applicazione",
    exitTitle: "Chiudere l'App?",
    exitMessage: "Vuoi uscire e chiudere l'applicazione?",
    cancel: "Annulla",
    confirmExit: "Esci",
    iosExit: "Su iPhone puoi uscire dall'App utilizzando il gesto di sistema."
  },

  en: {
    title: "Citizen services",
    intro:
      "Access the municipal portal and the main services available in the app.",
    website: "Municipal website",
    websiteSub: "Open www.spv.br.it",
    search: "Search and choose language",
    searchSub: "Search and select IT · EN · DE",
    territory: "Environmental heritage",
    territorySub: "SIEDI canal, flora, fauna and coast",
    report: "Report",
    reportSub: "Photo, GPS and description",
    history: "History",
    historySub: "Saved reports",
    services: "Services",
    servicesSub: "Municipal links"
    ,media: "Videos and testimonials",
    mediaSub: "The town, Domenico Modugno and artists' memories"
    ,exit: "Exit and close App", exitSub: "End the session and close the application",
    exitTitle: "Close the App?", exitMessage: "Do you want to exit and close the application?",
    cancel: "Cancel", confirmExit: "Exit", iosExit: "On iPhone, leave the App using the system gesture."
  },

  de: {
    title: "Bürgerservice",
    intro:
      "Greifen Sie auf das Gemeindeportal und die wichtigsten Dienste der App zu.",
    website: "Gemeinde-Website",
    websiteSub: "www.spv.br.it öffnen",
    search: "Suchen und Sprache wählen",
    searchSub: "Suche und Auswahl IT · EN · DE",
    territory: "Naturerbe",
    territorySub: "SIEDI-Kanal, Flora, Fauna und Küste",
    report: "Problem melden",
    reportSub: "Foto, GPS und Beschreibung",
    history: "Verlauf",
    historySub: "Gespeicherte Meldungen",
    services: "Dienste",
    servicesSub: "Kommunale Links"
    ,media: "Videos und Erinnerungen",
    mediaSub: "Der Ort, Domenico Modugno und Künstlerstimmen"
    ,exit: "App verlassen", exitSub: "Sitzung beenden und Anwendung schließen",
    exitTitle: "App schließen?", exitMessage: "Möchten Sie die Anwendung verlassen und schließen?",
    cancel: "Abbrechen", confirmExit: "Beenden", iosExit: "Auf dem iPhone verlassen Sie die App mit der Systemgeste."
  }
};

function Card({
  title,
  subtitle,
  icon,
  backgroundColor,
  fullWidth = false,
  onPress
}) {
  return (
    <TouchableOpacity
      style={[styles.card, fullWidth && styles.fullWidthCard, { backgroundColor }]}
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

  const requestExit = () => {
    if (Platform.OS !== "android") {
      Alert.alert(t.exitTitle, t.iosExit);
      return;
    }

    Alert.alert(t.exitTitle, t.exitMessage, [
      { text: t.cancel, style: "cancel" },
      { text: t.confirmExit, style: "destructive", onPress: () => BackHandler.exitApp() }
    ]);
  };

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
          backgroundColor="#dceeff"
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
          backgroundColor="#dff5e8"
          onPress={() =>
            onNavigate("search")
          }
        />

        <BeniArchitettonici
          language={language}
          backgroundColor="#fff2c9"
        />

        <PersonaggiIllustri
          language={language}
          backgroundColor="#eee4ff"
        />

        <AvvisiComune
          language={language}
          backgroundColor="#ffe3d3"
          openWebView={openWebView}
        />

        <FarmacieServiziSanitari
          language={language}
          backgroundColor="#d9f3f3"
        />

        <Card
          title={t.report}
          subtitle={t.reportSub}
          icon="warning-outline"
          backgroundColor="#ffe1e7"
          onPress={() =>
            onNavigate("report")
          }
        />

        <Card
          title={t.history}
          subtitle={t.historySub}
          icon="time-outline"
          backgroundColor="#e5efd8"
          onPress={() =>
            onNavigate("history")
          }
        />

        <Card
          title={t.services}
          subtitle={t.servicesSub}
          icon="apps-outline"
          backgroundColor="#e4e7ff"
          onPress={() =>
            onNavigate("services")
          }
        />

        <ContattiComunali
          language={language}
          backgroundColor="#f5e8d2"
          openWebView={openWebView}
          onNavigate={onNavigate}
        />

        <Card
          title={t.territory}
          subtitle={t.territorySub}
          icon="leaf-outline"
          backgroundColor="#dceafa"
          onPress={() =>
            onNavigate("environment")
          }
        />

        <Card
          title={t.media}
          subtitle={t.mediaSub}
          icon="videocam-outline"
          backgroundColor="#f7dfef"
          onPress={() => onNavigate("media")}
        />

        <Card
          title={t.exit}
          subtitle={t.exitSub}
          icon="exit-outline"
          backgroundColor="#f6e3e3"
          fullWidth
          onPress={requestExit}
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

  fullWidthCard: {
    width: "100%",
    minHeight: 112
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
