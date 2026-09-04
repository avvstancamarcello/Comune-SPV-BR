import PersonaggiIllustri from "../components/PersonaggiIllustri";
import React from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Linking, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PLACES } from '../config/places';
import { EXTRA_PLACES } from '../config/placesUpgrade';

const TRANSLATIONS = {
  it: {title:'Territorio', subtitle:'Scopri luoghi e punti di interesse del Comune e di Campo di Mare.', category:'Categoria', status:'Stato', address:'Indirizzo', maps:'Apri mappa', searchMap:'Cerca sulla mappa', hours:'Orari e visite', call:'Chiama', source:'Consulta la fonte', contacts:'Contatti comunali', news:'Avvisi del Comune', people:'Personaggi illustri', checked:'Fonti consultate il', error:'Collegamento non disponibile', errorText:'Impossibile aprire il collegamento. Riprova più tardi.', italian:'Le descrizioni delle schede sono in italiano.'},
  en: {title:'Territory', subtitle:'Discover places and points of interest in the municipality and Campo di Mare.', category:'Category', status:'Status', address:'Address', maps:'Open map', searchMap:'Search on map', hours:'Opening hours and visits', call:'Call', source:'View source', contacts:'Municipal contacts', news:'Municipal notices', people:'Notable people', checked:'Sources checked on', error:'Link unavailable', errorText:'Unable to open the link. Please try again later.', italian:'Place descriptions are in Italian.'},
  de: {title:'Gemeindegebiet', subtitle:'Entdecken Sie Orte und Sehenswürdigkeiten der Gemeinde und von Campo di Mare.', category:'Kategorie', status:'Status', address:'Adresse', maps:'Karte öffnen', searchMap:'Auf der Karte suchen', hours:'Öffnungszeiten und Besuche', call:'Anrufen', source:'Quelle ansehen', contacts:'Gemeindekontakte', news:'Mitteilungen der Gemeinde', people:'Bekannte Persönlichkeiten', checked:'Quellen geprüft am', error:'Link nicht verfügbar', errorText:'Der Link konnte nicht geöffnet werden. Bitte später erneut versuchen.', italian:'Die Ortsbeschreibungen sind auf Italienisch.'}
};

// Keep every original place; add only IDs not already in the original data.
const existingIds = new Set(PLACES.map(place => place.id));
const places = [...PLACES, ...EXTRA_PLACES.filter(place => !existingIds.has(place.id))];

function mapTarget(place) {
  if (typeof place.googleMapsUrl === 'string' && /^https?:\/\//i.test(place.googleMapsUrl)) return {url:place.googleMapsUrl, search:false};
  if (typeof place.latitude === 'number' && typeof place.longitude === 'number' && Number.isFinite(place.latitude) && Number.isFinite(place.longitude) && Math.abs(place.latitude) <= 90 && Math.abs(place.longitude) <= 180) {
    return {url:`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`, search:false};
  }
  if (typeof place.mapQuery === 'string' && place.mapQuery.trim()) return {url:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`, search:true};
  return null;
}

export default function TerritoryScreen({ language = 'it', openWebView }) {
  const t = TRANSLATIONS[language] || TRANSLATIONS.it;
  const openLink = async (url, title, internal = false) => {
    try {
      if (typeof url !== 'string' || !/^(https?:\/\/|tel:)/i.test(url)) throw new Error('Invalid link');
      // PDF documents are opened externally: Android WebView does not render them natively.
      if (internal && typeof openWebView === 'function' && !/\.pdf(?:[?#]|$)/i.test(url)) {
        openWebView(title, url);
      } else {
        await Linking.openURL(url);
      }
    } catch {
      Alert.alert(t.error, t.errorText);
    }
  };
  const button = (label, icon, action, secondary = false) => (
    <TouchableOpacity accessibilityRole="button" accessibilityLabel={label} style={[styles.button, secondary && styles.secondary]} onPress={action}>
      <Ionicons name={icon} size={20} color={secondary ? '#0f4c81' : '#ffffff'} />
      <Text style={[styles.buttonText, secondary && styles.secondaryText]}>{label}</Text>
    </TouchableOpacity>
  );
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t.title}</Text>
      <Text style={styles.subtitle}>{t.subtitle}</Text>
      <View style={styles.culture}>
        <PersonaggiIllustri language={language} fullWidth />
      </View>
      {language !== 'it' && <Text style={styles.subtitle}>{t.italian}</Text>}
      {places.map(place => {
        const map = mapTarget(place);
        const source = place.sourceUrl || place.sourceOfficial;
        return (
          <View key={place.id} style={styles.card}>
            <Text style={styles.placeTitle}>{place.title || place.name}</Text>
            {!!place.subtitle && <Text style={styles.placeSubtitle}>{place.subtitle}</Text>}
            {!!place.description && <Text style={styles.description}>{place.description}</Text>}
            {!!place.category && <Text style={styles.meta}>{t.category}: {place.category}</Text>}
            {!!place.status && <Text style={styles.meta}>{t.status}: {place.status}</Text>}
            {!!place.address && <Text selectable style={styles.meta}>{t.address}: {place.address}</Text>}
            {!!place.hours && <View style={styles.hours}><Text style={styles.placeSubtitle}>{t.hours}</Text><Text style={styles.description}>{place.hours}</Text></View>}
            {!!place.phone && <Text selectable style={styles.meta}>{place.phoneLabel ? `${place.phoneLabel}: ` : ''}{place.phone}</Text>}
            {!!place.contactNote && <Text style={styles.meta}>{place.contactNote}</Text>}
            {!!place.email && <Text selectable style={styles.meta}>PEC: {place.email}</Text>}
            {!!place.verifiedAt && <Text style={styles.meta}>{t.checked}: {place.verifiedAt}</Text>}
            {!!place.phone && button(`${t.call}${place.phoneLabel ? ` — ${place.phoneLabel}` : ''}`, 'call-outline', () => openLink(`tel:${place.phone.replace(/[^+\d]/g, '')}`, t.call))}
            {!!map && button(map.search ? t.searchMap : t.maps, 'map-outline', () => openLink(map.url, t.maps))}
            {!!source && button(t.source, 'document-text-outline', () => openLink(source, t.source, true), true)}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{padding:16,paddingBottom:35,backgroundColor:'#f4f7fa'},
  title:{fontSize:26,fontWeight:'700',color:'#0f4c81'},
  subtitle:{marginTop:6,marginBottom:18,color:'#4b5563',lineHeight:20},
  culture:{marginBottom:18},
  card:{backgroundColor:'#ffffff',padding:16,borderRadius:13,marginBottom:14,elevation:2},
  placeTitle:{fontSize:18,fontWeight:'700',color:'#1f2937'},
  placeSubtitle:{marginTop:4,color:'#0f4c81',fontWeight:'600'},
  description:{marginTop:10,color:'#374151',lineHeight:20},
  meta:{marginTop:7,fontSize:13,color:'#4b5563',lineHeight:19},
  hours:{marginTop:12,padding:12,backgroundColor:'#f0f5fa',borderRadius:8},
  button:{marginTop:12,minHeight:48,padding:12,backgroundColor:'#0f4c81',borderRadius:10,flexDirection:'row',justifyContent:'center',alignItems:'center',gap:7},
  buttonText:{color:'#ffffff',fontWeight:'700',flexShrink:1,textAlign:'center'},
  secondary:{backgroundColor:'#eaf2f8'},
  secondaryText:{color:'#0f4c81'}
});
