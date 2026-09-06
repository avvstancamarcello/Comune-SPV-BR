import React from "react";
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const MEDIA = [
  {
    id: "modugno-racconta-spv",
    platform: "YouTube",
    icon: "logo-youtube",
    color: "#c62828",
    title: "Domenico Modugno racconta San Pietro Vernotico",
    description: "Il racconto del paese in cui Domenico Modugno visse e maturò il suo rapporto con la cultura e il dialetto salentino.",
    url: "https://www.youtube.com/watch?v=d3rPHTV7dV8"
  },
  {
    id: "attrattivita-spv",
    platform: "YouTube",
    icon: "logo-youtube",
    color: "#c62828",
    title: "Le attrattività del Comune di San Pietro Vernotico",
    description: "Un itinerario audiovisivo dedicato al territorio, alla storia e ai luoghi del paese.",
    url: "https://www.youtube.com/watch?v=b7dJlLBn1bQ"
  },
  {
    id: "albano-testimonianza",
    platform: "Facebook · Festival un sogno per volare",
    icon: "logo-facebook",
    color: "#1877f2",
    title: "La testimonianza di Al Bano",
    description: "Il saluto di Al Bano e i suoi ricordi della conoscenza con Domenico Modugno.",
    url: "https://www.facebook.com/reel/1813422023408010/"
  },
  {
    id: "lino-banfi-testimonianza",
    platform: "Facebook · Festival un sogno per volare",
    icon: "logo-facebook",
    color: "#1877f2",
    title: "La testimonianza di Lino Banfi",
    description: "Il saluto dell'attore Lino Banfi nel ricordo di Domenico Modugno e del suo legame con San Pietro Vernotico.",
    url: "https://www.facebook.com/reel/1763072174828211/"
  }
];

async function openMedia(url) {
  try {
    const supported = await Linking.canOpenURL(url);
    if (!supported) throw new Error("unsupported");
    await Linking.openURL(url);
  } catch {
    Alert.alert("Video non disponibile", "Non è stato possibile aprire il collegamento. Verifica la connessione Internet e riprova.");
  }
}

export default function MediaGalleryScreen() {
  return <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Video e testimonianze</Text>
    <Text style={styles.intro}>Scopri San Pietro Vernotico attraverso filmati, ricordi e testimonianze dedicati al paese e a Domenico Modugno.</Text>
    {MEDIA.map(item => <TouchableOpacity key={item.id} style={styles.card} onPress={() => openMedia(item.url)} accessibilityRole="link" accessibilityLabel={`${item.title}. ${item.platform}`}>
      <View style={[styles.iconBox, { backgroundColor: `${item.color}18` }]}><Ionicons name={item.icon} size={34} color={item.color} /></View>
      <View style={styles.body}><Text style={[styles.platform, { color: item.color }]}>{item.platform}</Text><Text style={styles.cardTitle}>{item.title}</Text><Text style={styles.description}>{item.description}</Text><View style={styles.action}><Text style={styles.actionText}>Guarda il video</Text><Ionicons name="open-outline" size={18} color="#0f4c81" /></View></View>
    </TouchableOpacity>)}
    <Text style={styles.note}>I contenuti sono ospitati sulle piattaforme indicate e richiedono una connessione Internet. Facebook potrebbe richiedere l'accesso al proprio account.</Text>
  </ScrollView>;
}

const styles = StyleSheet.create({
  container:{padding:16,paddingBottom:36,backgroundColor:"#f4f7fa"},title:{fontSize:27,fontWeight:"700",color:"#0f4c81"},intro:{marginTop:7,marginBottom:18,fontSize:15,lineHeight:22,color:"#4b5563"},
  card:{backgroundColor:"#fff",borderRadius:15,padding:14,marginBottom:14,flexDirection:"row",elevation:2},iconBox:{width:58,height:58,borderRadius:14,alignItems:"center",justifyContent:"center",marginRight:13},body:{flex:1},platform:{fontSize:12,fontWeight:"700",marginBottom:5},cardTitle:{fontSize:17,fontWeight:"700",lineHeight:22,color:"#1f2937"},description:{fontSize:13,lineHeight:19,color:"#5b6470",marginTop:6},action:{flexDirection:"row",alignItems:"center",marginTop:11,gap:6},actionText:{fontSize:14,fontWeight:"700",color:"#0f4c81"},note:{marginTop:4,fontSize:12,lineHeight:18,color:"#6b7280"}
});
