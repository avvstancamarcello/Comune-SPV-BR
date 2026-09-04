// Schede aggiuntive. I luoghi già presenti in places.js sono conservati.
const comune = 'https://www.spv.br.it/beni-architettonici';
const ordine = 'https://ordinefarmacistibrindisi.it/files/pdf/farmacie_che_erogano_il_servizio_di_somministrazione_vaccino_campagna_2024_.pdf';
const farmacia = (id, title, address, phone, sourceUrl) => ({
  id, title, address: `${address}, San Pietro Vernotico (BR)`, phone,
  category: 'Farmacia', description: 'Contatta la farmacia per informazioni e disponibilità.',
  hours: 'Orari e turni da verificare direttamente con la farmacia.',
  mapQuery: `${title}, ${address}, San Pietro Vernotico`,
  sourceUrl, verifiedAt: '03/09/2026'
});

export const EXTRA_PLACES = [
  {
    id: 'chiesa-san-pietro-apostolo', title: 'Chiesa di San Pietro Apostolo',
    category: 'Luogo di culto / chiesa', address: 'Piazza San Pietro – via Mesagne, San Pietro Vernotico (BR)',
    subtitle: 'Origini medievali; ricostruzione seicentesca',
    description: 'Documentata nel 1133, fu riedificata nel Seicento inglobando la chiesa medievale, di cui rimangono tracce nella sagrestia. La navata conserva tele e stucchi barocchi sulla vita di San Pietro. Un pozzo, chiuso nel 1929, era legato alla tradizione popolare dei tarantati.',
    sourceUrl: comune, verifiedAt: '03/09/2026'
  },
  {
    id: 'chiesa-madre-santa-maria-assunta', title: 'Chiesa Madre – Santa Maria Assunta',
    category: 'Luogo di culto / chiesa', address: 'Piazza del Popolo, San Pietro Vernotico (BR)',
    subtitle: 'Chiesa Matrice Maria SS. Assunta in Cielo',
    description: 'Il nucleo originario risale ai primi decenni del XV secolo. Ampliata nel Seicento e nell’Ottocento, fu restaurata nel 1907. Conserva il rosone in pietra leccese, la pala in stucco dell’Assunta del 1928 e un patrimonio di statue e dipinti. Sotto il presbiterio si trovano antiche sepolture del clero.',
    sourceUrl: comune, verifiedAt: '03/09/2026'
  },
  farmacia('farmacia-cavaliere', 'Farmacia Cavaliere', 'Largo Osanna, 1', '+390831671257', ordine),
  farmacia('farmacia-galatola', 'Farmacia Galatola', 'Via Brindisi, 120', '+390831671345', 'https://www.facebook.com/p/Farmacia-Galatola-dssa-Filomena-61582553814029/'),
  farmacia('farmacia-angeli-custodi', 'Farmacia Angeli Custodi', 'Via Brindisi, 250', '+390831655806', ordine),
  farmacia('farmacia-romano', 'Farmacia Romano', 'Piazza San Pietro, 91', '+390831671242', ordine),
  {
    id: 'cimitero-comunale', title: 'Cimitero Comunale', category: 'Servizi cimiteriali',
    description: 'Informazioni per la visita ai defunti e contatti del Comune per i servizi cimiteriali.',
    hours: 'Chiusura ordinaria: martedì, secondo l’avviso comunale del 5 agosto 2026. Fasce orarie di visita estive e invernali da confermare. Consultare gli avvisi per eventuali variazioni.',
    phone: '+390831654741', phoneLabel: 'Centralino comunale',
    contactNote: 'Settore comprendente i servizi cimiteriali: interni 221, 224, 228, 252, 220. Attendere la voce registrata prima di digitare l’interno.',
    email: 'protocollo@pec.spv.br.it',
    sourceUrl: 'https://www.spv.br.it/news/variazione-orari-del-cimitero-comunale-per-il-periodo-di-ferragosto-2026',
    contactsUrl: 'https://www.spv.br.it/orario-pubblico',
    newsUrl: 'https://www.spv.br.it/news', verifiedAt: '03/09/2026'
  }
  ,
  {
    id: 'sala-regno-testimoni-geova',
    title: 'Sala del Regno dei Testimoni di Geova di San Pietro Vernotico',
    subtitle: 'Luogo di culto',
    category: 'Luogo di culto / Sala del Regno',
    address: 'San Pietro Vernotico (BR)',
    latitude: 40.49394224380143,
    longitude: 18.00018739701384,
    description: 'Sala del Regno dei Testimoni di Geova presente nel territorio comunale.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sala%20del%20Regno%20dei%20Testimoni%20di%20Geova%20di%20San%20Pietro%20Vernotico',
    googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!4v1788550565129!6m8!1m7!1sRmPrj13Xm-sTx65l9db13A!2m2!1d40.49394224380143!2d18.00018739701384!3f2.984280491264144!4f4.08470496010105!5f0.7820865974627469',
    verifiedAt: '04/09/2026'
  }
];
