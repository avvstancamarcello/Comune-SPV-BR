import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Linking,
  Alert
} from "react-native";

import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const HTTPS_UPGRADE_HOSTS = [
  "spv.br.it",
  "www.spv.br.it",
  "servizionline.spv.br.it",
  "sanpietrovernotico.comune-online.it",
  "halleyweb.com",
  "www.halleyweb.com"
];


const EXTERNAL_SCHEMES = [
  "mailto:",
  "tel:",
  "sms:",
  "geo:",
  "intent:"
];

function getHostname(url) {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function canUpgradeToHttps(url) {
  if (!url.startsWith("http://")) {
    return false;
  }

  const hostname = getHostname(url);

  return HTTPS_UPGRADE_HOSTS.some(
    (domain) =>
      hostname === domain ||
      hostname.endsWith(`.${domain}`)
  );
}

function upgradeToHttps(url) {
  return url.replace(/^http:\/\//i, "https://");
}

function isExternalScheme(url) {
  const lower = url.toLowerCase();

  return EXTERNAL_SCHEMES.some(
    (scheme) => lower.startsWith(scheme)
  );
}

export default function WebViewScreen({
  title,
  url,
  onClose
}) {
  const ref = useRef(null);

  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [webUrl, setWebUrl] = useState(url);

  const goBack = () => {
    if (canGoBack && ref.current) {
      ref.current.goBack();
    } else {
      onClose();
    }
  };

  const openExternal = async () => {
    try {
      const target = currentUrl || url;

      const supported =
        await Linking.canOpenURL(target);

      if (supported) {
        await Linking.openURL(target);
      } else {
        Alert.alert(
          "Collegamento",
          "Impossibile aprire questo collegamento."
        );
      }
    } catch {
      Alert.alert(
        "Errore",
        "Non è stato possibile aprire il collegamento."
      );
    }
  };

  const handleNavigationRequest = (request) => {
    const requestedUrl = request.url;

    if (!requestedUrl) {
      return false;
    }

    if (requestedUrl === "about:blank") {
      return true;
    }

    if (isExternalScheme(requestedUrl)) {
      Linking.openURL(requestedUrl).catch(() => {});
      return false;
    }

    if (canUpgradeToHttps(requestedUrl)) {
      const secureUrl =
        upgradeToHttps(requestedUrl);

      setCurrentUrl(secureUrl);
      setWebUrl(secureUrl);

      return false;
    } 

    if (requestedUrl.startsWith("http://")) {
      Alert.alert(
        "Collegamento non sicuro",
        "La pagina richiesta utilizza una connessione HTTP non cifrata.",
        [
          {
            text: "Annulla",
            style: "cancel"
          },
          {
            text: "Apri nel browser",
            onPress: () => {
              Linking.openURL(requestedUrl)
                .catch(() => {});
            }
          }
        ]
      );

      return false;
    }

    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity
          style={styles.icon}
          onPress={goBack}
        >
          <Ionicons
            name="arrow-back"
            size={23}
            color="#fff"
          />
        </TouchableOpacity>

        <Text
          style={styles.title}
          numberOfLines={1}
        >
          {title}
        </Text>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => ref.current?.reload()}
        >
          <Ionicons
            name="refresh"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={openExternal}
        >
          <Ionicons
            name="open-outline"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator
            size="large"
            color="#0f4c81"
          />
          <Text style={styles.loaderText}>
            Caricamento...
          </Text>
        </View>
      )}

      <WebView
        ref={ref}
        source={{ uri: webUrl }}
        javaScriptEnabled
        domStorageEnabled
        sharedCookiesEnabled
        thirdPartyCookiesEnabled
        setSupportMultipleWindows={false}
        allowsBackForwardNavigationGestures
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={(state) => {
          setCanGoBack(state.canGoBack);

          if (state.url) {
            setCurrentUrl(state.url);
          }
        }}
        onShouldStartLoadWithRequest={
          handleNavigationRequest
        }
        onError={({ nativeEvent }) => {
          console.warn(
            "WebView error:",
            nativeEvent
          );
        }}
        onHttpError={({ nativeEvent }) => {
          console.warn(
            "WebView HTTP error:",
            nativeEvent.statusCode,
            nativeEvent.url
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  toolbar: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f4c81"
  },

  icon: {
    padding: 10
  },

  title: {
    flex: 1,
    color: "#fff",
    fontWeight: "700"
  },

  loader: {
    position: "absolute",
    zIndex: 10,
    top: 75,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    elevation: 4
  },

  loaderText: {
    marginTop: 8,
    color: "#0f4c81"
  }
});
