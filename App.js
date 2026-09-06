import React, { useState } from "react";
import { StyleSheet } from "react-native";

import {
  SafeAreaView,
  SafeAreaProvider
} from "react-native-safe-area-context";

import { StatusBar } from "expo-status-bar";

import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import ServicesScreen from "./screens/ServicesScreen";
import ReportScreen from "./screens/ReportScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ContactsScreen from "./screens/ContactsScreen";
import WebViewScreen from "./screens/WebViewScreen";
import TerritoryScreen from "./screens/TerritoryScreen";
import EnvironmentalHeritageScreen from "./screens/EnvironmentalHeritageScreen";
import MediaGalleryScreen from "./screens/MediaGalleryScreen";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [webPage, setWebPage] = useState(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);
  const [language, setLanguage] = useState("it");

  const openWebView = (title, url) =>
    setWebPage({
      title,
      url
    });

  if (webPage) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />

          <WebViewScreen
            language={language}
            title={webPage.title}
            url={webPage.url}
            onClose={() => setWebPage(null)}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }

  let screen;

  switch (activeScreen) {
    case "services":
      screen = (
        <ServicesScreen
          language={language}
          openWebView={openWebView}
          onNavigate={setActiveScreen}
        />
      );
      break;

    case "search":
      screen = (
        <SearchScreen
          language={language}
          onLanguageChange={setLanguage}
          onNavigate={setActiveScreen}
        />
      );
      break;

    case "territory":
      screen = (
        <TerritoryScreen
          language={language}
          onNavigate={setActiveScreen}
          openWebView={openWebView}
        />
      );
      break;

    case "environment":
      screen = <EnvironmentalHeritageScreen language={language} />;
      break;

    case "media":
      screen = <MediaGalleryScreen language={language} />;
      break;

    case "report":
      screen = (
        <ReportScreen
          language={language}
          onSaved={() => {
            setHistoryRefresh((x) => x + 1);
            setActiveScreen("history");
          }}
        />
      );
      break;

    case "history":
      screen = (
        <HistoryScreen
          language={language}
          refreshKey={historyRefresh}
        />
      );
      break;

    case "contacts":
      screen = (
        <ContactsScreen
          language={language}
          openWebView={openWebView}
        />
      );
      break;

    default:
      screen = (
        <HomeScreen
          language={language}
          onNavigate={setActiveScreen}
          openWebView={openWebView}
        />
      );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        <Header
          language={language}
        />

        {screen}

        <BottomNav
          language={language}
          activeScreen={activeScreen}
          onChange={setActiveScreen}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fa"
  }
});
