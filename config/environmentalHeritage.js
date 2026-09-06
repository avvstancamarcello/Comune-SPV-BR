export const ENVIRONMENT_SOURCE = "https://www.spv.br.it/risorse-ambientali";

export const ENVIRONMENT_SECTIONS = [
  {
    id: "siedi",
    title: "Il Canale SIEDI",
    subtitle: "Acque, paesaggio e corridoio ecologico",
    icon: "water-outline",
    image: require("../assets/beni-ambientali/canale-siedi/siedi-percorso-cartografico.webp"),
    text: "Il SIEDI è il principale canale di bonifica richiamato dalla documentazione comunale. Attraversa l'agro in direzione dell'Adriatico e, insieme al reticolo dei canali minori, convoglia verso il mare le acque interne. Sulla riva destra prosperano boschi quercini e lembi di macchia mediterranea; presso l'alveo si sviluppano ambienti umidi e vegetazione ripariale.",
    note: "La cartografia mostra il percorso in forma orientativa. Non sostituisce la cartografia tecnica ufficiale."
  },
  {
    id: "woods",
    title: "Boschi e macchia mediterranea",
    subtitle: "Tramazzone, Cantamessa, Guarini e Maime",
    icon: "leaf-outline",
    text: "Il popolamento boschivo indicato dal Comune si estende per circa 44 ettari lungo l'alveo. Lo strato arboreo comprende soprattutto leccio, con roverella, quercia di Dalechamp e quercia virgiliana; l'olmo campestre compare nelle zone più umide. Mirto, lentisco, fillirea e alaterno caratterizzano la macchia mediterranea."
  },
  {
    id: "wetlands",
    title: "Zone umide",
    subtitle: "Canneti, giaggioli d'acqua ed equiseti",
    icon: "rainy-outline",
    text: "In prossimità del canale prevalgono cannuccia di palude (Phragmites australis), giaggiolo d'acqua ed equiseti. Questi ambienti costituiscono rifugio, area di alimentazione e corridoio di spostamento per uccelli, anfibi e piccoli organismi acquatici."
  },
  {
    id: "coast",
    title: "Costa e spiaggia adiacente",
    subtitle: "Geomorfologia della piana costiera",
    icon: "sunny-outline",
    text: "Il settore costiero appartiene a una piana molto dolce, impostata su depositi marini terrazzati e sedimenti sabbiosi o limoso-argillosi. Procedendo verso il mare, il reticolo di bonifica attraversa aree agricole e depressioni costiere. L'incontro tra acque convogliate, spiaggia e moto ondoso rende la foce e il litorale sistemi dinamici, sensibili all'erosione, all'accumulo dei sedimenti e agli interventi antropici.",
    externalLinkTitle: "Campo di mare BR Spiaggia e Costa naturale",
    externalLinkUrl: "https://drive.google.com/drive/folders/1pD46Cdop8895_JTpulu0MpwY2Woa9h7v"
  },
  {
    id: "landscape-history",
    title: "Paesaggio storico",
    subtitle: "Canali, masserie e frequentazione antica",
    icon: "trail-sign-outline",
    text: "La relazione archeologica colloca il Canale Li Siedi nella rete idrografica diretta verso il litorale e documenta, nel più ampio settore Tuturano-Cerano, il rapporto tra corsi d'acqua, viabilità e insediamenti rurali. Presso Masseria Cerano sono segnalate tracce di una villa romana su un rilievo affacciato sulla depressione del SIEDI."
  }
];

export const FLORA = [
  ["Leccio", "Quercus ilex", "leccio"], ["Roverella", "Quercus pubescens", "roverella"],
  ["Quercia di Dalechamp", "Quercus dalechampii", "quercia-dalechampii"], ["Quercia virgiliana", "Quercus virgiliana", "quercia-virgiliana"],
  ["Olmo campestre", "Ulmus minor", "olmo-campestre"], ["Mirto", "Myrtus communis", "mirto"],
  ["Lentisco", "Pistacia lentiscus", "lentisco"], ["Fillirea", "Phillyrea latifolia", "fillirea"],
  ["Alaterno", "Rhamnus alaternus", "alaterno"], ["Prugnolo", "Prunus spinosa", "prugnolo"],
  ["Biancospino", "Crataegus monogyna", "biancospino"], ["Ligustro", "Ligustrum vulgare", "ligustro"],
  ["Cannuccia di palude", "Phragmites australis", "canna-palustre"], ["Giaggiolo d'acqua", "Iris pseudacorus", "giaggiolo-acqua"],
  ["Equiseto", "Equisetum arvense", "equiseto"]
];

export const FAUNA = [
  ["Poiana", "Buteo buteo", "poiana"], ["Upupa", "Upupa epops", "upupa"],
  ["Airone cenerino", "Ardea cinerea", "airone-cenerino"], ["Rana verde", "Pelophylax esculentus", "rana-verde"],
  ["Mollusco d'acqua dolce", "Lymnaea stagnalis", "mollusco-acqua-dolce"]
];

export const SPECIES_IMAGES = {
  "leccio": require("../assets/beni-ambientali/flora/leccio.webp"), "roverella": require("../assets/beni-ambientali/flora/roverella.webp"),
  "quercia-dalechampii": require("../assets/beni-ambientali/flora/quercia-dalechampii.webp"), "quercia-virgiliana": require("../assets/beni-ambientali/flora/quercia-virgiliana.webp"),
  "olmo-campestre": require("../assets/beni-ambientali/flora/olmo-campestre.webp"), "mirto": require("../assets/beni-ambientali/flora/mirto.webp"),
  "lentisco": require("../assets/beni-ambientali/flora/lentisco.webp"), "fillirea": require("../assets/beni-ambientali/flora/fillirea.webp"),
  "alaterno": require("../assets/beni-ambientali/flora/alaterno.webp"), "prugnolo": require("../assets/beni-ambientali/flora/prugnolo.webp"),
  "biancospino": require("../assets/beni-ambientali/flora/biancospino.webp"), "ligustro": require("../assets/beni-ambientali/flora/ligustro.webp"),
  "canna-palustre": require("../assets/beni-ambientali/flora/canna-palustre.webp"), "giaggiolo-acqua": require("../assets/beni-ambientali/flora/giaggiolo-acqua.webp"),
  "equiseto": require("../assets/beni-ambientali/flora/equiseto.webp"), "poiana": require("../assets/beni-ambientali/fauna/poiana.webp"),
  "upupa": require("../assets/beni-ambientali/fauna/upupa.webp"), "airone-cenerino": require("../assets/beni-ambientali/fauna/airone-cenerino.webp"),
  "rana-verde": require("../assets/beni-ambientali/fauna/rana-verde.webp"), "mollusco-acqua-dolce": require("../assets/beni-ambientali/fauna/mollusco-acqua-dolce.webp")
};
