import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Alert,
  ScrollView
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LINKS } from "../config/links";

const CONTACTS = {
  address:
    "Piazza Giovanni Falcone, 72027 San Pietro Vernotico (BR)",

  vat:
    "01213110743",

  phone:
    "0831654741",

  phoneDisplay:
    "0831.654741",

  secondPhone:
    "0831653763",

  secondPhoneDisplay:
    "0831.653763",

  pec:
    "protocollo@pec.spv.br.it"
};

async function openUrl(url) {
  try {
    const supported =
      await Linking.canOpenURL(url);

    if (!supported) {
      Alert.alert(
        "Collegamento non disponibile",
        "Il dispositivo non può aprire questo collegamento."
      );

      return;
    }

    await Linking.openURL(url);
  } catch {
    Alert.alert(
      "Errore",
      "Non è stato possibile aprire il collegamento."
    );
  }
}

function ContactRow({
  icon,
  title,
  value,
  onPress
}) {
  const content = (
    <View style={styles.row}>
      <View style={styles.iconContainer}>
        <Ionicons
          name={icon}
          size={23}
          color="#0f4c81"
        />
      </View>

      <View style={styles.rowContent}>
        <Text style={styles.rowTitle}>
          {title}
        </Text>

        <Text style={styles.rowValue}>
          {value}
        </Text>
      </View>

      {onPress && (
        <Ionicons
          name="chevron-forward"
          size={20}
          color="#8a94a3"
        />
      )}
    </View>
  );

  if (!onPress) {
    return content;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
    >
      {content}
    </TouchableOpacity>
  );
}

export default function ContactsScreen({
  openWebView
}) {
  const callMainNumber = () => {
    openUrl(
      `tel:${CONTACTS.phone}`
    );
  };

  const callSecondNumber = () => {
    openUrl(
      `tel:${CONTACTS.secondPhone}`
    );
  };

  const sendPec = () => {
    openUrl(
      `mailto:${CONTACTS.pec}`
    );
  };

  const openMap = () => {
    const query =
      encodeURIComponent(
        CONTACTS.address
      );

    openUrl(
      `https://www.google.com/maps/search/?api=1&query=${query}`
    );
  };

  const openOfficialWebsite = () => {
    openWebView(
      "Comune di San Pietro Vernotico",
      LINKS.home
    );
  };

  const openMunicipalPolice = () => {
    openUrl(LINKS.poliziaMunicipale);
  };

  return (
    <ScrollView
      contentContainerStyle={
        styles.container
      }
    >
      <Text style={styles.title}>
        Contatti
      </Text>

      <Text style={styles.intro}>
        Recapiti istituzionali del Comune di
        San Pietro Vernotico.
      </Text>

      <Text style={styles.sectionTitle}>
        Sede comunale
      </Text>

      <ContactRow
        icon="location-outline"
        title="Indirizzo"
        value={CONTACTS.address}
        onPress={openMap}
      />

      <ContactRow
        icon="business-outline"
        title="Partita IVA"
        value={CONTACTS.vat}
      />

      <Text style={styles.sectionTitle}>
        Telefoni
      </Text>

      <ContactRow
        icon="call-outline"
        title="Telefono"
        value={CONTACTS.phoneDisplay}
        onPress={callMainNumber}
      />

      <ContactRow
        icon="call-outline"
        title="Secondo recapito"
        value={
          CONTACTS.secondPhoneDisplay
        }
        onPress={callSecondNumber}
      />

      <Text style={styles.sectionTitle}>
        Posta elettronica certificata
      </Text>

      <ContactRow
        icon="mail-outline"
        title="PEC"
        value={CONTACTS.pec}
        onPress={sendPec}
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={openOfficialWebsite}
      >
        <Ionicons
          name="globe-outline"
          size={22}
          color="#fff"
        />

        <Text
          style={
            styles.primaryButtonText
          }
        >
          Apri il sito ufficiale
        </Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>
        Polizia Municipale
      </Text>

      <ContactRow
        icon="shield-outline"
        title="Comando di Polizia Municipale"
        value="Scheda informativa su PoliziaMunicipale.it"
        onPress={openMunicipalPolice}
      />

      <Text style={styles.externalNote}>
        Collegamento a una risorsa esterna aggiuntiva,
        distinta dal portale istituzionale del Comune.
      </Text>

      <Text style={styles.sourceNote}>
        Recapiti tratti dal portale
        istituzionale del Comune di
        San Pietro Vernotico.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 30,
    backgroundColor: "#f4f7fa"
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0f4c81"
  },

  intro: {
    marginTop: 7,
    marginBottom: 20,
    color: "#4b5563",
    lineHeight: 21
  },

  sectionTitle: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#374151"
  },

  row: {
    minHeight: 74,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    elevation: 1
  },

  iconContainer: {
    width: 38,
    alignItems: "center"
  },

  rowContent: {
    flex: 1,
    marginLeft: 8
  },

  rowTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b7280"
  },

  rowValue: {
    marginTop: 4,
    fontSize: 15,
    color: "#1f2937"
  },

  primaryButton: {
    minHeight: 52,
    marginTop: 20,
    borderRadius: 11,
    backgroundColor: "#0f4c81",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15
  },

  externalNote: {
    marginTop: 0,
    marginBottom: 8,
    fontSize: 12,
    lineHeight: 17,
    color: "#6b7280"
  },

  sourceNote: {
    marginTop: 18,
    fontSize: 12,
    lineHeight: 17,
    color: "#6b7280",
    textAlign: "center"
  }
});
