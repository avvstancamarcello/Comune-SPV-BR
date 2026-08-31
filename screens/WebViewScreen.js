import React, {
  useRef,
  useState,
  useEffect
} from "react";

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

import { LINKS } from "../config/links";

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

const LOAD_TIMEOUT = 20000;

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

function getHttpErrorMessage(statusCode) {
  if (statusCode === 404) {
    return {
      title: "Pagina non disponibile",
      message:
        "La pagina richiesta non è stata trovata. Il collegamento potrebbe essere stato modificato dal servizio esterno."
    };
  }

  if (statusCode === 403) {
    return {
      title: "Accesso non disponibile",
      message:
        "Il servizio ha rifiutato l'accesso alla pagina richiesta. Potrebbe essere necessario utilizzare il browser esterno o un sistema di autenticazione."
    };
  }

  if (statusCode >= 500) {
    return {
      title: "Servizio temporaneamente non disponibile",
      message:
        "Il server del servizio richiesto non è momentaneamente disponibile. Puoi riprovare oppure consultare il portale istituzionale del Comune."
    };
  }

  return {
    title: "Pagina non disponibile",
    message:
      "Il servizio richiesto non ha risposto correttamente."
  };
}

export default function WebViewScreen({
  title,
  url,
  onClose
}) {
  const ref = useRef(null);
  const timeoutRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  const [currentUrl, setCurrentUrl] =
    useState(url);

  const [webUrl, setWebUrl] =
    useState(url);

  const [webViewKey, setWebViewKey] =
    useState(0);

  const [pageError, setPageError] =
    useState(null);

  const clearLoadTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const startLoadTimeout = () => {
    clearLoadTimeout();

    timeoutRef.current = setTimeout(() => {
      setLoading(false);

      setPageError({
        title: "Servizio non raggiungibile",
        message:
          "Il servizio sta impiegando troppo tempo a rispondere. Può trattarsi di una temporanea indisponibilità della pagina o del server esterno.",
        url: currentUrl || webUrl
      });
    }, LOAD_TIMEOUT);
  };

  useEffect(() => {
    return () => {
      clearLoadTimeout();
    };
  }, []);

  const goBack = () => {
    if (pageError) {
      setPageError(null);
      onClose();
      return;
    }

    if (canGoBack && ref.current) {
      ref.current.goBack();
    } else {
      onClose();
    }
  };

  const openExternalUrl = async (
    target = currentUrl || webUrl || url
  ) => {
    try {
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

  const retryPage = () => {
    clearLoadTimeout();

    setPageError(null);
    setLoading(true);

    setWebViewKey(
      (value) => value + 1
    );
  };

  const openComuneHome = () => {
    clearLoadTimeout();

    setPageError(null);
    setLoading(true);
    setCanGoBack(false);

    setCurrentUrl(LINKS.home);
    setWebUrl(LINKS.home);

    setWebViewKey(
      (value) => value + 1
    );
  };

  const handleNavigationRequest = (
    request
  ) => {
    const requestedUrl = request.url;

    if (!requestedUrl) {
      return false;
    }

    if (requestedUrl === "about:blank") {
      return true;
    }

    if (isExternalScheme(requestedUrl)) {
      Linking.openURL(requestedUrl)
        .catch(() => {});

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
      setLoading(false);

      setPageError({
        title: "Collegamento non sicuro",
        message:
          "La pagina richiesta utilizza una connessione HTTP non cifrata. Per ragioni di sicurezza non viene caricata direttamente nell'App.",
        url: requestedUrl
      });

      return false;
    }

    return true;
  };

  const handleWebViewError = ({
    nativeEvent
  }) => {
    clearLoadTimeout();

    if (
      nativeEvent?.isTopFrame === false
    ) {
      return;
    }

    console.warn(
      "WebView error:",
      nativeEvent
    );

    setLoading(false);

    setPageError({
      title: "Servizio non raggiungibile",
      message:
        "La pagina richiesta non è momentaneamente raggiungibile. Puoi riprovare, aprirla nel browser oppure consultare il portale istituzionale del Comune.",
      url:
        nativeEvent?.url ||
        currentUrl ||
        webUrl
    });
  };

  const handleHttpError = ({
    nativeEvent
  }) => {
    if (
      nativeEvent?.isTopFrame === false
    ) {
      return;
    }

    const statusCode =
      nativeEvent?.statusCode;

    /*
     * Intercettiamo 403, 404 e gli errori
     * server 5xx.
     */
    if (
      statusCode !== 403 &&
      statusCode !== 404 &&
      !(statusCode >= 500)
    ) {
      return;
    }

    clearLoadTimeout();

    const info =
      getHttpErrorMessage(statusCode);

    console.warn(
      "WebView HTTP error:",
      statusCode,
      nativeEvent?.url
    );

    setLoading(false);

    setPageError({
      ...info,
      url:
        nativeEvent?.url ||
        currentUrl ||
        webUrl,
      statusCode
    });
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

        {!pageError && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() =>
              ref.current?.reload()
            }
          >
            <Ionicons
              name="refresh"
              size={22}
              color="#fff"
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.icon}
          onPress={() =>
            openExternalUrl()
          }
        >
          <Ionicons
            name="open-outline"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      {pageError ? (
        <View style={styles.errorContainer}>
          <View style={styles.errorIcon}>
            <Ionicons
              name="cloud-offline-outline"
              size={52}
              color="#0f4c81"
            />
          </View>

          <Text style={styles.errorTitle}>
            {pageError.title}
          </Text>

          <Text style={styles.errorMessage}>
            {pageError.message}
          </Text>

          {pageError.statusCode && (
            <Text style={styles.errorCode}>
              Codice HTTP:{" "}
              {pageError.statusCode}
            </Text>
          )}

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={retryPage}
          >
            <Ionicons
              name="refresh-outline"
              size={21}
              color="#fff"
            />

            <Text
              style={styles.primaryButtonText}
            >
              Riprova
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() =>
              openExternalUrl(
                pageError.url
              )
            }
          >
            <Ionicons
              name="open-outline"
              size={21}
              color="#0f4c81"
            />

            <Text
              style={styles.secondaryButtonText}
            >
              Apri nel browser
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={openComuneHome}
          >
            <Ionicons
              name="home-outline"
              size={21}
              color="#0f4c81"
            />

            <Text
              style={styles.secondaryButtonText}
            >
              Portale del Comune
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator
                size="large"
                color="#0f4c81"
              />

              <Text
                style={styles.loaderText}
              >
                Caricamento...
              </Text>
            </View>
          )}

          <WebView
            key={webViewKey}
            ref={ref}
            source={{ uri: webUrl }}
            javaScriptEnabled
            domStorageEnabled
            sharedCookiesEnabled
            thirdPartyCookiesEnabled
            setSupportMultipleWindows={false}
            allowsBackForwardNavigationGestures

            onLoadStart={() => {
              setLoading(true);
              setPageError(null);
              startLoadTimeout();
            }}

            onLoadEnd={() => {
              clearLoadTimeout();
              setLoading(false);
            }}

            onNavigationStateChange={(
              state
            ) => {
              setCanGoBack(
                state.canGoBack
              );

              if (state.url) {
                setCurrentUrl(
                  state.url
                );
              }
            }}

            onShouldStartLoadWithRequest={
              handleNavigationRequest
            }

            onError={
              handleWebViewError
            }

            onHttpError={
              handleHttpError
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fa"
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
  },

  errorContainer: {
    flex: 1,
    paddingHorizontal: 26,
    justifyContent: "center",
    alignItems: "center"
  },

  errorIcon: {
    marginBottom: 16
  },

  errorTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
    textAlign: "center"
  },

  errorMessage: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 15,
    lineHeight: 22,
    color: "#4b5563",
    textAlign: "center"
  },

  errorCode: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 12,
    color: "#6b7280"
  },

  primaryButton: {
    width: "100%",
    minHeight: 50,
    marginTop: 18,
    borderRadius: 11,
    backgroundColor: "#0f4c81",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700"
  },

  secondaryButton: {
    width: "100%",
    minHeight: 50,
    marginTop: 10,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#0f4c81",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#fff"
  },

  secondaryButtonText: {
    color: "#0f4c81",
    fontWeight: "700"
  }
});
