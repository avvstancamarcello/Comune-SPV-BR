export const TRANSLATIONS = {
  it: {
    languageName: "Italiano",

    homeTitle: "Servizi al cittadino",
    homeIntro:
      "Consulta i servizi comunali, il territorio e le segnalazioni geolocalizzate.",

    municipalSite: "Sito comunale",
    municipalSiteSubtitle: "Apri www.spv.br.it",

    report: "Segnala",
    reportSubtitle: "Foto, GPS e descrizione",

    history: "Storico",
    historySubtitle: "Segnalazioni salvate",

    services: "Servizi",
    servicesSubtitle: "Collegamenti comunali",

    territory: "Territorio",
    territorySubtitle: "Mappe e luoghi del Comune",

    contacts: "Contatti",

    search: "Cerca",
    searchPlaceholder:
      "Cerca servizi, luoghi e funzioni...",

    openMap: "Apri sulla mappa",
    reportHere:
      "Segnala un problema in questo luogo",

    officialSource: "Fonte istituzionale",

    officialContentNotice:
      "Il contenuto istituzionale collegato può essere disponibile soltanto in lingua italiana."
  },

  en: {
    languageName: "English",

    homeTitle: "Citizen services",
    homeIntro:
      "Access municipal services, local places and geolocated reports.",

    municipalSite: "Municipal website",
    municipalSiteSubtitle: "Open www.spv.br.it",

    report: "Report",
    reportSubtitle: "Photo, GPS and description",

    history: "History",
    historySubtitle: "Saved reports",

    services: "Services",
    servicesSubtitle: "Municipal links",

    territory: "Territory",
    territorySubtitle: "Maps and local places",

    contacts: "Contacts",

    search: "Search",
    searchPlaceholder:
      "Search services, places and functions...",

    openMap: "Open map",
    reportHere:
      "Report a problem at this location",

    officialSource: "Official source",

    officialContentNotice:
      "Linked institutional content may only be available in Italian."
  },

  de: {
    languageName: "Deutsch",

    homeTitle: "Bürgerservices",
    homeIntro:
      "Kommunale Dienste, Orte und geolokalisierte Meldungen aufrufen.",

    municipalSite: "Gemeinde-Website",
    municipalSiteSubtitle: "www.spv.br.it öffnen",

    report: "Meldung",
    reportSubtitle: "Foto, GPS und Beschreibung",

    history: "Verlauf",
    historySubtitle: "Gespeicherte Meldungen",

    services: "Dienste",
    servicesSubtitle: "Kommunale Links",

    territory: "Gebiet",
    territorySubtitle: "Karten und Orte der Gemeinde",

    contacts: "Kontakte",

    search: "Suchen",
    searchPlaceholder:
      "Dienste, Orte und Funktionen suchen...",

    openMap: "Karte öffnen",
    reportHere:
      "Problem an diesem Ort melden",

    officialSource: "Offizielle Quelle",

    officialContentNotice:
      "Verlinkte institutionelle Inhalte sind möglicherweise nur auf Italienisch verfügbar."
  }
};

export function t(language, key) {
  return (
    TRANSLATIONS[language]?.[key] ||
    TRANSLATIONS.it[key] ||
    key
  );
}
