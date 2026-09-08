import React from "react";
import { View, Text, StyleSheet, Linking, SafeAreaView } from "react-native";

export default function DisclaimerBanner() {
  const openIOLink = () => {
    Linking.openURL("https://io.italia.it");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.banner}>
        <Text style={styles.text}>
          App non ufficiale, per servizi ufficiali usa{" "}
          <Text 
            style={styles.link} 
            onPress={openIOLink}
          >
            APP IO
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#FFF3CD",
  },
  banner: {
    backgroundColor: "#FFF3CD",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#FFE69C"
  },
  text: {
    fontSize: 14,
    color: "#856404",
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 20
  },
  link: {
    fontWeight: "700",
    textDecorationLine: "underline",
    color: "#0056b3"
  }
});
