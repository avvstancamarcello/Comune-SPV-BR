import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Linking } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

export default function WebViewScreen({ title, url, onClose }) {
  const ref = useRef(null);
  const [loading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.icon} onPress={() => canGoBack ? ref.current?.goBack() : onClose()}>
          <Ionicons name="arrow-back" size={23} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
        <TouchableOpacity style={styles.icon} onPress={() => ref.current?.reload()}>
          <Ionicons name="refresh" size={22} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={() => Linking.openURL(url)}>
          <Ionicons name="open-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0f4c81" />
          <Text style={{ marginTop: 8 }}>Caricamento...</Text>
        </View>
      )}

      <WebView
        ref={ref}
        source={{ uri: url }}
        javaScriptEnabled
        domStorageEnabled
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={(s) => setCanGoBack(s.canGoBack)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  toolbar: { minHeight: 56, flexDirection: "row", alignItems: "center", backgroundColor: "#0f4c81" },
  icon: { padding: 10 },
  title: { flex: 1, color: "#fff", fontWeight: "700" },
  loader: {
    position: "absolute",
    zIndex: 10,
    top: 75,
    alignSelf: "center",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    elevation: 4
  }
});
