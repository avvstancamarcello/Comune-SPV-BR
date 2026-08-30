import React, { useState } from "react";
import {
  ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet,
  Image, Alert, ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "SPV_REPORTS_V31";

const CATEGORIES = [
  "Strade",
  "Illuminazione",
  "Rifiuti",
  "Verde pubblico",
  "Segnaletica",
  "Barriere architettoniche",
  "Edifici pubblici",
  "Altro"
];

function makeId() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const sec = String(d.getSeconds()).padStart(2, "0");
  return `SPV-${y}${m}${day}-${h}${min}${sec}`;
}

export default function ReportScreen({ onSaved }) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [findingLocation, setFindingLocation] = useState(false);
  const [saving, setSaving] = useState(false);

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Fotocamera", "Autorizza l'accesso alla fotocamera.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.7
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const choosePhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7
    });
    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const getLocation = async () => {
    try {
      setFindingLocation(true);
      const p = await Location.requestForegroundPermissionsAsync();
      if (p.status !== "granted") {
        Alert.alert("Posizione", "Autorizzazione alla posizione non concessa.");
        return;
      }
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High
      });
      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy
      });
    } catch {
      Alert.alert("Posizione", "Impossibile acquisire la posizione.");
    } finally {
      setFindingLocation(false);
    }
  };

  const saveReport = async () => {
    if (!category) {
      Alert.alert("Categoria", "Seleziona una categoria.");
      return;
    }
    if (description.trim().length < 5) {
      Alert.alert("Descrizione", "Inserisci una descrizione di almeno 5 caratteri.");
      return;
    }

    try {
      setSaving(true);
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      const reports = raw ? JSON.parse(raw) : [];

      const report = {
        id: makeId(),
        category,
        description: description.trim(),
        photo,
        location,
        status: "Bozza locale",
        createdAt: new Date().toISOString()
      };

      reports.unshift(report);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(reports));

      setCategory("");
      setDescription("");
      setPhoto(null);
      setLocation(null);

      Alert.alert(
        "Segnalazione salvata",
        `ID: ${report.id}\n\nLa segnalazione è stata memorizzata localmente sul dispositivo.`,
        [{ text: "Apri storico", onPress: () => onSaved?.() }, { text: "OK" }]
      );
    } catch {
      Alert.alert("Errore", "Non è stato possibile salvare la segnalazione.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Segnala un problema</Text>
      <Text style={styles.intro}>
        Crea una segnalazione di test con categoria, descrizione, fotografia e posizione GPS.
      </Text>

      <Text style={styles.section}>1. Categoria</Text>
      <View style={styles.categories}>
        {CATEGORIES.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.chip, category === item && styles.chipActive]}
            onPress={() => setCategory(item)}
          >
            <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.section}>2. Descrizione</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Descrivi il problema..."
        multiline
        maxLength={1000}
        style={styles.input}
      />
      <Text style={styles.counter}>{description.length}/1000</Text>

      <Text style={styles.section}>3. Fotografia</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.primaryHalf} onPress={takePhoto}>
          <Ionicons name="camera-outline" size={21} color="#fff" />
          <Text style={styles.primaryText}>Scatta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryHalf} onPress={choosePhoto}>
          <Ionicons name="images-outline" size={21} color="#0f4c81" />
          <Text style={styles.secondaryText}>Galleria</Text>
        </TouchableOpacity>
      </View>

      {photo && (
        <View style={{ marginTop: 12 }}>
          <Image source={{ uri: photo }} style={styles.photo} />
          <TouchableOpacity style={styles.remove} onPress={() => setPhoto(null)}>
            <Ionicons name="trash-outline" size={19} color="#b91c1c" />
            <Text style={styles.removeText}>Rimuovi foto</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.section}>4. Posizione GPS</Text>
      <TouchableOpacity style={styles.fullButton} onPress={getLocation}>
        {findingLocation ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="location-outline" size={21} color="#fff" />
            <Text style={styles.primaryText}>Rileva posizione</Text>
          </>
        )}
      </TouchableOpacity>

      {location && (
        <View style={styles.locationBox}>
          <Text style={styles.locationTitle}>Posizione acquisita</Text>
          <Text>Lat: {location.latitude.toFixed(6)}</Text>
          <Text>Lon: {location.longitude.toFixed(6)}</Text>
          {location.accuracy != null && <Text>Precisione: circa {Math.round(location.accuracy)} m</Text>}
        </View>
      )}

      <TouchableOpacity style={styles.saveButton} onPress={saveReport} disabled={saving}>
        {saving ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <Ionicons name="save-outline" size={22} color="#fff" />
            <Text style={styles.saveText}>Salva segnalazione locale</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, paddingBottom: 40, backgroundColor: "#f4f7fa" },
  title: { fontSize: 25, fontWeight: "700", color: "#0f4c81" },
  intro: { marginTop: 6, marginBottom: 12, color: "#4b5563", lineHeight: 20 },
  section: { marginTop: 18, marginBottom: 9, fontWeight: "700", color: "#1f2937" },
  categories: { flexDirection: "row", flexWrap: "wrap" },
  chip: {
    paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20,
    backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccd6df",
    marginRight: 8, marginBottom: 8
  },
  chipActive: { backgroundColor: "#0f4c81", borderColor: "#0f4c81" },
  chipText: { color: "#374151", fontSize: 13 },
  chipTextActive: { color: "#fff", fontWeight: "700" },
  input: {
    minHeight: 125, backgroundColor: "#fff", borderWidth: 1,
    borderColor: "#ccd6df", borderRadius: 12, padding: 13,
    textAlignVertical: "top", fontSize: 15
  },
  counter: { textAlign: "right", color: "#6b7280", fontSize: 11, marginTop: 4 },
  row: { flexDirection: "row", gap: 10 },
  primaryHalf: {
    flex: 1, minHeight: 48, borderRadius: 10, backgroundColor: "#0f4c81",
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7
  },
  secondaryHalf: {
    flex: 1, minHeight: 48, borderRadius: 10, backgroundColor: "#fff",
    borderWidth: 1, borderColor: "#0f4c81",
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7
  },
  primaryText: { color: "#fff", fontWeight: "700" },
  secondaryText: { color: "#0f4c81", fontWeight: "700" },
  photo: { width: "100%", height: 220, borderRadius: 12 },
  remove: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginTop: 7 },
  removeText: { marginLeft: 5, color: "#b91c1c" },
  fullButton: {
    minHeight: 50, borderRadius: 10, backgroundColor: "#0f4c81",
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7
  },
  locationBox: { marginTop: 10, backgroundColor: "#fff", padding: 12, borderRadius: 10 },
  locationTitle: { color: "#166534", fontWeight: "700", marginBottom: 4 },
  saveButton: {
    marginTop: 24, minHeight: 54, borderRadius: 12, backgroundColor: "#14733c",
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8
  },
  saveText: { color: "#fff", fontWeight: "700", fontSize: 15 }
});
