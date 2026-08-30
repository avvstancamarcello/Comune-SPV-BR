import React, { useCallback, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "SPV_REPORTS_V31";

export default function HistoryScreen({ refreshKey }) {
  const [reports, setReports] = useState([]);

  const loadReports = useCallback(async () => {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      setReports(raw ? JSON.parse(raw) : []);
    } catch {
      setReports([]);
    }
  }, []);

  React.useEffect(() => {
    loadReports();
  }, [loadReports, refreshKey]);

  const removeOne = (id) => {
    Alert.alert("Elimina segnalazione", "Vuoi eliminare questa segnalazione locale?", [
      { text: "Annulla", style: "cancel" },
      {
        text: "Elimina",
        style: "destructive",
        onPress: async () => {
          const next = reports.filter(r => r.id !== id);
          setReports(next);
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        }
      }
    ]);
  };

  const clearAll = () => {
    if (!reports.length) return;
    Alert.alert("Cancella storico", "Vuoi cancellare tutte le segnalazioni locali?", [
      { text: "Annulla", style: "cancel" },
      {
        text: "Cancella",
        style: "destructive",
        onPress: async () => {
          await AsyncStorage.removeItem(STORAGE_KEY);
          setReports([]);
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>Storico locale</Text>
          <Text style={styles.subtitle}>{reports.length} segnalazioni salvate</Text>
        </View>
        <TouchableOpacity onPress={loadReports} style={styles.iconButton}>
          <Ionicons name="refresh" size={21} color="#0f4c81" />
        </TouchableOpacity>
        <TouchableOpacity onPress={clearAll} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={21} color="#b91c1c" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {!reports.length && (
          <View style={styles.empty}>
            <Ionicons name="file-tray-outline" size={42} color="#9ca3af" />
            <Text style={styles.emptyText}>Nessuna segnalazione salvata.</Text>
          </View>
        )}

        {reports.map((r) => (
          <View key={r.id} style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.id}>{r.id}</Text>
              <TouchableOpacity onPress={() => removeOne(r.id)}>
                <Ionicons name="trash-outline" size={19} color="#b91c1c" />
              </TouchableOpacity>
            </View>
            <Text style={styles.category}>{r.category}</Text>
            <Text style={styles.description}>{r.description}</Text>
            {r.photo && <Image source={{ uri: r.photo }} style={styles.thumb} />}
            {r.location && (
              <Text style={styles.meta}>
                GPS: {r.location.latitude.toFixed(5)}, {r.location.longitude.toFixed(5)}
              </Text>
            )}
            <Text style={styles.meta}>Stato: {r.status}</Text>
            <Text style={styles.meta}>{new Date(r.createdAt).toLocaleString()}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f7fa" },
  headingRow: { flexDirection: "row", alignItems: "center", padding: 16, paddingBottom: 8 },
  title: { fontSize: 25, fontWeight: "700", color: "#0f4c81" },
  subtitle: { marginTop: 3, color: "#6b7280" },
  iconButton: { padding: 8 },
  list: { paddingHorizontal: 16, paddingBottom: 30 },
  empty: { alignItems: "center", paddingTop: 70 },
  emptyText: { marginTop: 10, color: "#6b7280" },
  card: { backgroundColor: "#fff", borderRadius: 12, padding: 14, marginBottom: 12, elevation: 1 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  id: { fontSize: 12, fontWeight: "700", color: "#0f4c81" },
  category: { marginTop: 8, fontWeight: "700", fontSize: 16, color: "#1f2937" },
  description: { marginTop: 5, color: "#374151", lineHeight: 20 },
  thumb: { width: "100%", height: 140, borderRadius: 9, marginTop: 10 },
  meta: { marginTop: 6, color: "#6b7280", fontSize: 11 }
});
