# Comune SPV App V3.1

Prototipo leggero Expo/React Native per Ubuntu 22.04.

## Funzioni

- accesso al portale `https://www.spv.br.it/`
- WebView interna
- segnalazioni locali
- categoria e descrizione
- fotografia o immagine dalla galleria
- geolocalizzazione GPS
- identificativo locale `SPV-AAAAMMGG-HHMMSS`
- storico persistente su dispositivo
- eliminazione singola o totale delle segnalazioni
- nessun backend e nessuna trasmissione di dati

## Metodo consigliato di installazione

Per il test con Expo Go, crea prima un progetto SDK 54:

```bash
cd ~
npx create-expo-app@latest comune-spv-app-v3-1 --template blank@sdk-54
cd comune-spv-app-v3-1
```

Copia nella cartella i file di questo pacchetto e poi installa le dipendenze tramite Expo:

```bash
npx expo install react-native-webview
npx expo install expo-location
npx expo install expo-image-picker
npx expo install @react-native-async-storage/async-storage
```

Verifica:

```bash
npx expo-doctor
```

Avvia:

```bash
npx expo start
```

Se il telefono non raggiunge il server Metro:

```bash
npx expo start --tunnel
```

## Node.js

Se la versione di Node installata su Ubuntu 22.04 è vecchia, usa NVM e una versione LTS recente.

Esempio:

```bash
node -v
npm -v
```

## Test consigliato

1. Apri `Segnala`.
2. Seleziona una categoria.
3. Inserisci la descrizione.
4. Scatta o scegli una foto.
5. Acquisisci la posizione GPS.
6. Premi `Salva segnalazione locale`.
7. Apri `Storico`.
8. Verifica ID, categoria, foto, coordinate e data/ora.
9. Chiudi e riapri l'app: lo storico deve restare disponibile.

## Evoluzione futura

La struttura del record locale è già adatta a una futura API REST:

```json
{
  "id": "SPV-20260830-145012",
  "category": "Illuminazione",
  "description": "Lampione spento",
  "photo": "file:///...",
  "location": {
    "latitude": 40.48,
    "longitude": 18.05,
    "accuracy": 8
  },
  "status": "Bozza locale",
  "createdAt": "2026-08-30T12:50:12.000Z"
}
```

In una fase successiva il campo `id` locale potrà essere affiancato da un protocollo/server ID e da un'identità CIE/SPID gestita dal sistema istituzionale.
