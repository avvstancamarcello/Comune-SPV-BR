import React, { useState } from "react";
import {
  Alert,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PLACES } from "../config/places";
import { EXTRA_PLACES } from "../config/placesUpgrade";
import {
  ARCHITECTURAL_HERITAGE,
  ARCHITECTURAL_SOURCE
} from "./architecturalHeritage";

const allPlaces = [...PLACES, ...EXTRA_PLACES];
const byId = id => allPlaces.find(place => place.id === id);

const PHARMACY_IDS = [
  "farmacia-cavaliere",
  "farmacia-galatola",
  "farmacia-angeli-custodi",
  "farmacia-romano"
];

const TEXT = {
  it: {
    pharmacyTitle: "Farmacie e Servizi Sanitari",
    pharmacySub: "Farmacie, telefoni e posizioni",
    buildingTitle: "Beni Architettonici ed Edifici Religiosi",
    buildingSub: "Consulta i singoli luoghi",
    back: "Indietro",
    address: "Indirizzo",
    hours: "Orari e informazioni",
    call: "Chiama",
    map: "Apri su Google Maps",
    directions: "Avvia navigazione",
    evidence: "Vedi la testimonianza fotografica",
    source: "Fonte e approfondimenti",
    official: "Apri la pagina ufficiale completa",
    checked: "Fonti consultate il",
    offline: "Collegamento non disponibile",
    offlineText: "Non è stato possibile aprire il collegamento."
  },
  en: {
    pharmacyTitle: "Pharmacies and health services",
    pharmacySub: "Pharmacies, phone numbers and locations",
    buildingTitle: "Architectural and religious buildings",
    buildingSub: "Browse individual places",
    back: "Back", address: "Address", hours: "Hours and information",
    call: "Call", map: "Open in Google Maps", directions: "Start directions", evidence: "View photographic evidence",
    source: "Source and details", official: "Open the full official page", checked: "Sources checked on",
    offline: "Link unavailable", offlineText: "The link could not be opened."
  },
  de: {
    pharmacyTitle: "Apotheken und Gesundheitsdienste",
    pharmacySub: "Apotheken, Telefonnummern und Standorte",
    buildingTitle: "Baudenkmäler und religiöse Gebäude",
    buildingSub: "Einzelne Orte anzeigen",
    back: "Zurück", address: "Adresse", hours: "Öffnungszeiten und Informationen",
    call: "Anrufen", map: "In Google Maps öffnen", directions: "Navigation starten", evidence: "Fotografischen Beleg ansehen",
    source: "Quelle und Details", official: "Vollständige offizielle Seite öffnen", checked: "Quellen geprüft am",
    offline: "Link nicht verfügbar", offlineText: "Der Link konnte nicht geöffnet werden."
  }
};

const OFFICIAL_LINKS = {
  contacts: "https://www.spv.br.it/orario-pubblico",
  notices: "https://www.spv.br.it/news"
};

function mapUrl(place, directions = false) {
  if (place.disableMap) return null;
  if (!directions && typeof place.googleMapsUrl === "string" && /^https?:\/\//i.test(place.googleMapsUrl)) return place.googleMapsUrl;
  const query = typeof place.mapQuery === "string" && place.mapQuery.trim()
    ? place.mapQuery
    : typeof place.latitude === "number" && typeof place.longitude === "number"
      ? `${place.latitude},${place.longitude}`
      : place.address;
  if (!query) return null;
  const mode = directions ? "dir/?api=1&destination=" : "search/?api=1&query=";
  return `https://www.google.com/maps/${mode}${encodeURIComponent(query)}`;
}

function HomeDirectory({ language = "it", kind, backgroundColor = "#fff" }) {
  const t = TEXT[language] || TEXT.it;
  const isPharmacy = kind === "pharmacies";
  const title = isPharmacy ? t.pharmacyTitle : t.buildingTitle;
  const subtitle = isPharmacy ? t.pharmacySub : t.buildingSub;
  const entries = isPharmacy
    ? PHARMACY_IDS.map(byId).filter(Boolean)
    : ARCHITECTURAL_HERITAGE;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const open = async url => {
    try {
      if (!url || !/^(https?:\/\/|tel:)/i.test(url)) throw new Error("invalid");
      await Linking.openURL(url);
    } catch {
      Alert.alert(t.offline, t.offlineText);
    }
  };

  const close = () => {
    if (selected) setSelected(null);
    else setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.entry, { backgroundColor }]}
        onPress={() => setVisible(true)}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        <Ionicons name={isPharmacy ? "medkit-outline" : "business-outline"} size={30} color="#0f4c81" />
        <Text style={styles.entryTitle}>{title}</Text>
        <Text style={styles.entryText}>{subtitle}</Text>
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide" onRequestClose={close}>
        <SafeAreaView style={styles.screen}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.back} onPress={close} accessibilityRole="button">
              <Ionicons name="arrow-back-outline" size={24} color="#0f4c81" />
              <Text style={styles.backText}>{t.back}</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.title}>{selected ? selected.title : title}</Text>
            {!selected && <Text style={styles.subtitle}>{subtitle}</Text>}

            {!selected && !isPharmacy && (
              <TouchableOpacity style={styles.official} onPress={() => open(ARCHITECTURAL_SOURCE)}>
                <Ionicons name="globe-outline" size={20} color="#ffffff" />
                <Text style={styles.primaryText}>{t.official}</Text>
              </TouchableOpacity>
            )}

            {!selected && entries.map(place => (
              <TouchableOpacity
                key={place.id}
                style={styles.row}
                onPress={() => setSelected(place)}
                accessibilityRole="button"
              >
                <Ionicons name={isPharmacy ? "medkit-outline" : "location-outline"} size={23} color="#0f4c81" />
                <Text style={styles.rowText}>{place.title || place.name}</Text>
                <Ionicons name="chevron-forward" size={20} color="#6b7280" />
              </TouchableOpacity>
            ))}

            {selected && (
              <View style={styles.detail}>
                {!!selected.subtitle && <Text style={styles.placeSubtitle}>{selected.subtitle}</Text>}
                {!!selected.description && <Text style={styles.description}>{selected.description}</Text>}
                {!!selected.address && <Text selectable style={styles.meta}>{t.address}: {selected.address}</Text>}
                {!!selected.hours && <><Text style={styles.label}>{t.hours}</Text><Text style={styles.description}>{selected.hours}</Text></>}
                {!!selected.phone && <TouchableOpacity style={styles.primary} onPress={() => open(`tel:${selected.phone.replace(/[^+\d]/g, "")}`)}><Ionicons name="call-outline" size={20} color="#fff" /><Text style={styles.primaryText}>{t.call}</Text></TouchableOpacity>}
                {!!mapUrl(selected) && <TouchableOpacity style={styles.primary} onPress={() => open(mapUrl(selected))}><Ionicons name="map-outline" size={20} color="#fff" /><Text style={styles.primaryText}>{t.map}</Text></TouchableOpacity>}
                {!!mapUrl(selected, true) && <TouchableOpacity style={styles.primary} onPress={() => open(mapUrl(selected, true))}><Ionicons name="navigate-outline" size={20} color="#fff" /><Text style={styles.primaryText}>{t.directions}</Text></TouchableOpacity>}
                {!!selected.evidenceUrl && <TouchableOpacity style={styles.secondary} onPress={() => open(selected.evidenceUrl)}><Ionicons name="camera-outline" size={20} color="#0f4c81" /><Text style={styles.secondaryText}>{t.evidence}</Text></TouchableOpacity>}
                {!!(selected.sourceUrl || selected.sourceOfficial) && <TouchableOpacity style={styles.secondary} onPress={() => open(selected.sourceUrl || selected.sourceOfficial)}><Ionicons name="document-text-outline" size={20} color="#0f4c81" /><Text style={styles.secondaryText}>{t.source}</Text></TouchableOpacity>}
                {!!selected.verifiedAt && <Text style={styles.verified}>{t.checked}: {selected.verifiedAt}</Text>}
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </>
  );
}

export function FarmacieServiziSanitari(props) {
  return <HomeDirectory {...props} kind="pharmacies" />;
}

export function BeniArchitettonici(props) {
  return <HomeDirectory {...props} kind="buildings" />;
}

function OfficialEntry({ language = "it", type, openWebView, onNavigate, backgroundColor = "#fff" }) {
  const labels = {
    it: {
      contacts: ["Contatti Comunali Ufficiali", "Uffici, telefoni e Polizia Municipale"],
      notices: ["Avvisi del Comune", "Ultime notizie istituzionali"]
    },
    en: {
      contacts: ["Official municipal contacts", "Offices, telephone numbers and hours"],
      notices: ["Municipal notices", "Latest official news"]
    },
    de: {
      contacts: ["Offizielle Gemeindekontakte", "Ämter, Telefonnummern und Zeiten"],
      notices: ["Mitteilungen der Gemeinde", "Aktuelle offizielle Nachrichten"]
    }
  };
  const current = labels[language] || labels.it;
  const [title, subtitle] = current[type];
  const url = OFFICIAL_LINKS[type];
  return (
    <TouchableOpacity
      style={[styles.entry, { backgroundColor }]}
      onPress={() => type === "contacts" && typeof onNavigate === "function"
        ? onNavigate("contacts")
        : typeof openWebView === "function" ? openWebView(title, url) : Linking.openURL(url)}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <Ionicons name={type === "contacts" ? "call-outline" : "newspaper-outline"} size={30} color="#0f4c81" />
      <Text style={styles.entryTitle}>{title}</Text>
      <Text style={styles.entryText}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

export function ContattiComunali(props) {
  return <OfficialEntry {...props} type="contacts" />;
}

export function AvvisiComune(props) {
  return <OfficialEntry {...props} type="notices" />;
}

const styles = StyleSheet.create({
  entry:{width:"48%",minHeight:145,backgroundColor:"#fff",borderRadius:14,padding:14,marginBottom:14,elevation:2},
  entryTitle:{marginTop:10,fontSize:16,fontWeight:"700",color:"#1f2937"},
  entryText:{marginTop:5,fontSize:12,lineHeight:17,color:"#6b7280"},
  screen:{flex:1,backgroundColor:"#f4f7fa"},
  header:{backgroundColor:"#fff",paddingHorizontal:12,paddingVertical:8,borderBottomWidth:1,borderBottomColor:"#dce4ec"},
  back:{minHeight:48,flexDirection:"row",alignItems:"center",alignSelf:"flex-start",paddingHorizontal:8},
  backText:{marginLeft:8,fontSize:16,fontWeight:"600",color:"#0f4c81"},
  content:{padding:16,paddingBottom:35,width:"100%",maxWidth:760,alignSelf:"center"},
  title:{fontSize:26,fontWeight:"700",color:"#0f4c81"},
  subtitle:{marginTop:7,marginBottom:18,color:"#4b5563",lineHeight:21},
  row:{minHeight:64,backgroundColor:"#fff",borderRadius:12,padding:14,marginBottom:10,flexDirection:"row",alignItems:"center",elevation:1},
  rowText:{flex:1,marginLeft:12,fontSize:16,fontWeight:"600",color:"#1f2937"},
  detail:{marginTop:16,backgroundColor:"#fff",borderRadius:14,padding:16},
  placeSubtitle:{color:"#0f4c81",fontWeight:"600",fontSize:16,lineHeight:23},
  description:{marginTop:10,color:"#374151",fontSize:16,lineHeight:24},
  meta:{marginTop:12,color:"#4b5563",fontSize:14,lineHeight:21},
  label:{marginTop:16,color:"#0f4c81",fontWeight:"700"},
  primary:{marginTop:12,minHeight:48,padding:12,backgroundColor:"#0f4c81",borderRadius:10,flexDirection:"row",justifyContent:"center",alignItems:"center",gap:8},
  official:{marginBottom:16,minHeight:48,padding:12,backgroundColor:"#0f4c81",borderRadius:10,flexDirection:"row",justifyContent:"center",alignItems:"center",gap:8},
  primaryText:{color:"#fff",fontWeight:"700",textAlign:"center"},
  secondary:{marginTop:12,minHeight:48,padding:12,backgroundColor:"#eaf2f8",borderRadius:10,flexDirection:"row",justifyContent:"center",alignItems:"center",gap:8},
  secondaryText:{color:"#0f4c81",fontWeight:"700",textAlign:"center"},
  verified:{marginTop:16,fontSize:12,color:"#6b7280"}
});
