import React, { useState } from "react";
import { Alert, Image, Linking, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { ENVIRONMENT_SECTIONS, ENVIRONMENT_SOURCE, FAUNA, FLORA, SPECIES_IMAGES } from "../config/environmentalHeritage";
import IMAGE_CREDITS from "../assets/beni-ambientali/image-credits.json";

function SpeciesGrid({ title, items }) {
  return <View style={styles.group}><Text style={styles.groupTitle}>{title}</Text><View style={styles.grid}>{items.map(([name, scientific, id]) => <View key={id} style={styles.species}><Image source={SPECIES_IMAGES[id]} style={styles.photo} accessibilityLabel={`Fotografia: ${name}`} /><View style={styles.speciesBody}><Text style={styles.speciesName}>{name}</Text><Text style={styles.scientific}>{scientific}</Text></View></View>)}</View></View>;
}

export default function EnvironmentalHeritageScreen() {
  const [selected, setSelected] = useState(null);
  const [creditsVisible, setCreditsVisible] = useState(false);
  const openExternal = async url => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Collegamento non disponibile", "Non è stato possibile aprire la raccolta fotografica.");
    }
  };
  return <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Beni ambientali</Text>
    <Text style={styles.intro}>Conosci il Canale SIEDI, i boschi, le zone umide, la costa e le specie che caratterizzano il paesaggio di San Pietro Vernotico.</Text>
    {ENVIRONMENT_SECTIONS.map(item => <TouchableOpacity key={item.id} style={styles.row} onPress={() => setSelected(item)} accessibilityRole="button"><Ionicons name={item.icon} size={27} color="#176b51" /><View style={styles.rowBody}><Text style={styles.rowTitle}>{item.title}</Text><Text style={styles.rowText}>{item.subtitle}</Text></View><Ionicons name="chevron-forward" size={20} color="#557067" /></TouchableOpacity>)}
    <SpeciesGrid title="Flora" items={FLORA} />
    <SpeciesGrid title="Fauna" items={FAUNA} />
    <TouchableOpacity style={styles.source} onPress={() => Linking.openURL(ENVIRONMENT_SOURCE)}><Ionicons name="globe-outline" size={20} color="#fff" /><Text style={styles.sourceText}>Fonte: Risorse ambientali del Comune</Text></TouchableOpacity>
    <TouchableOpacity style={styles.creditsButton} onPress={() => setCreditsVisible(true)}><Ionicons name="images-outline" size={20} color="#176b51" /><Text style={styles.creditsButtonText}>Autori e licenze delle fotografie</Text></TouchableOpacity>
    <Modal visible={!!selected} animationType="slide" onRequestClose={() => setSelected(null)}><SafeAreaView style={styles.modal}><View style={styles.modalHeader}><TouchableOpacity style={styles.back} onPress={() => setSelected(null)}><Ionicons name="arrow-back" size={24} color="#176b51" /><Text style={styles.backText}>Beni ambientali</Text></TouchableOpacity></View><ScrollView contentContainerStyle={styles.detail}>{selected?.image && <Image source={selected.image} style={styles.hero} resizeMode="cover" />}<Text style={styles.detailTitle}>{selected?.title}</Text><Text style={styles.detailText}>{selected?.text}</Text>{selected?.externalLinkUrl && <TouchableOpacity style={styles.externalLink} onPress={() => openExternal(selected.externalLinkUrl)} accessibilityRole="link"><Ionicons name="images-outline" size={21} color="#fff" /><Text style={styles.externalLinkText}>{selected.externalLinkTitle}</Text><Ionicons name="open-outline" size={19} color="#fff" /></TouchableOpacity>}{selected?.note && <Text style={styles.note}>{selected.note}</Text>}</ScrollView></SafeAreaView></Modal>
    <Modal visible={creditsVisible} animationType="slide" onRequestClose={() => setCreditsVisible(false)}><SafeAreaView style={styles.modal}><View style={styles.modalHeader}><TouchableOpacity style={styles.back} onPress={() => setCreditsVisible(false)}><Ionicons name="arrow-back" size={24} color="#176b51" /><Text style={styles.backText}>Crediti fotografici</Text></TouchableOpacity></View><ScrollView contentContainerStyle={styles.detail}><Text style={styles.detailTitle}>Autori e licenze</Text><Text style={styles.intro}>Fotografie naturalistiche provenienti da Wikimedia Commons.</Text>{IMAGE_CREDITS.map(item => <TouchableOpacity key={item.id} style={styles.creditRow} onPress={() => Linking.openURL(item.sourceUrl)}><Text style={styles.creditName}>{item.scientificName}</Text><Text style={styles.creditText}>{item.author || "Autore indicato nella pagina sorgente"}</Text><Text style={styles.creditText}>{item.license}</Text><Text style={styles.creditLink}>Apri la pagina originale</Text></TouchableOpacity>)}</ScrollView></SafeAreaView></Modal>
  </ScrollView>;
}

const styles = StyleSheet.create({
  container:{padding:16,paddingBottom:36,backgroundColor:"#f3f8f5"}, title:{fontSize:27,fontWeight:"700",color:"#176b51"}, intro:{marginTop:7,marginBottom:18,color:"#40554d",fontSize:15,lineHeight:22},
  row:{minHeight:78,backgroundColor:"#e2f2e9",borderRadius:14,padding:14,marginBottom:11,flexDirection:"row",alignItems:"center",elevation:1}, rowBody:{flex:1,marginLeft:12},rowTitle:{fontSize:16,fontWeight:"700",color:"#20352e"},rowText:{marginTop:4,fontSize:13,color:"#557067"},
  group:{marginTop:22},groupTitle:{fontSize:23,fontWeight:"700",color:"#176b51",marginBottom:12},grid:{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between"},species:{width:"48%",backgroundColor:"#fff",borderRadius:14,overflow:"hidden",marginBottom:14,elevation:2},photo:{width:"100%",height:120,backgroundColor:"#d8e6dd"},speciesBody:{padding:11,minHeight:72},speciesName:{fontSize:15,fontWeight:"700",color:"#20352e"},scientific:{marginTop:4,fontSize:12,fontStyle:"italic",color:"#557067"},
  source:{marginTop:12,minHeight:50,backgroundColor:"#176b51",borderRadius:11,padding:13,flexDirection:"row",alignItems:"center",justifyContent:"center",gap:8},sourceText:{color:"#fff",fontWeight:"700"},creditsButton:{marginTop:12,minHeight:50,borderRadius:11,padding:13,backgroundColor:"#e2f2e9",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:8},creditsButtonText:{color:"#176b51",fontWeight:"700"},creditRow:{backgroundColor:"#fff",borderRadius:12,padding:14,marginBottom:11},creditName:{fontSize:16,fontStyle:"italic",fontWeight:"700",color:"#20352e"},creditText:{fontSize:13,color:"#557067",marginTop:4},creditLink:{fontSize:13,color:"#176b51",fontWeight:"700",marginTop:8},
  modal:{flex:1,backgroundColor:"#f3f8f5"},modalHeader:{backgroundColor:"#fff",borderBottomWidth:1,borderBottomColor:"#d6e2db"},back:{minHeight:54,paddingHorizontal:16,flexDirection:"row",alignItems:"center"},backText:{marginLeft:9,color:"#176b51",fontSize:16,fontWeight:"700"},detail:{padding:16,paddingBottom:40},hero:{width:"100%",height:230,borderRadius:16,backgroundColor:"#d8e6dd"},detailTitle:{marginTop:18,fontSize:27,fontWeight:"700",color:"#176b51"},detailText:{marginTop:13,fontSize:17,lineHeight:27,color:"#283b34"},externalLink:{marginTop:20,minHeight:54,padding:13,borderRadius:11,backgroundColor:"#176b51",flexDirection:"row",alignItems:"center",justifyContent:"center",gap:8},externalLinkText:{flex:1,color:"#fff",fontSize:15,fontWeight:"700",textAlign:"center"},note:{marginTop:18,padding:14,borderRadius:10,backgroundColor:"#fff3cd",fontSize:14,lineHeight:21,color:"#594b1f"}
});
