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
import ServicesScreen from "./screens/ServicesScreen";
import ReportScreen from "./screens/ReportScreen";
import HistoryScreen from "./screens/HistoryScreen";
import ContactsScreen from "./screens/ContactsScreen";
import WebViewScreen from "./screens/WebViewScreen";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("home");
  const [webPage, setWebPage] = useState(null);
  const [historyRefresh, setHistoryRefresh] = useState(0);

  const openWebView = (title, url) =>
    setWebPage({ title, url });

  if (webPage) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />

          <WebViewScreen
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
          openWebView={openWebView}
        />
      );
      break;

    case "report":
      screen = (
        <ReportScreen
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
          refreshKey={historyRefresh}
        />
      );
      break;

    case "contacts":
      screen = (
        <ContactsScreen
          openWebView={openWebView}
        />
      );
      break;

    default:
      screen = (
        <HomeScreen
          onNavigate={setActiveScreen}
          openWebView={openWebView}
        />
      );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        <Header />

        {screen}

        <BottomNav
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
