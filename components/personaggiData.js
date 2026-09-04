// Sintesi redazionali in italiano. Le fonti sono associate alle singole sezioni.
export const MUNICIPAL_URL = 'https://www.spv.br.it/personaggi-illustri';
const source = (label, url) => ({label, url});
const municipal = source('Comune — elenco dei personaggi', MUNICIPAL_URL);
const section = (title, text, sources) => ({title, text, sources});
const brief = (id, name, role, dates, text) => ({
  id, name, role, dates, preliminary: true,
  sections: [section('Notizie disponibili', text, [municipal])],
  note: 'Profilo preliminare: le fonti consultate non consentono ancora una biografia estesa né un elenco attendibile di opere. Questo non implica che non ne esistano.'
});
export const PEOPLE = [
  { id:'giuseppe-melli', name:'Giuseppe Melli', useExistingTranslation:true },
  {
    id:'walter-cariddi', name:'Walter Cariddi', role:'Filosofo e studioso del pensiero politico', dates:'1930–2002',
    sections:[
      section('Biografia', 'Originario di San Pietro Vernotico, affiancò agli studi filosofici il giornalismo e l’impegno pubblico. Il Comune ne ricorda anche l’attività di scrittore.', [municipal]),
      section('Attività nel territorio', 'Nel 1963 assunse la presidenza del consiglio di amministrazione dell’Azienda agraria Ninetto Melli. La scheda archivistica SIUSA gli attribuisce iniziative per ampliare e attrezzare le strutture ospedaliere e per riordinare locali e patrimonio librario della Biblioteca Giuseppe Melli.', [source('Ministero della Cultura — SIUSA', 'https://siusa-archivi.cultura.gov.it/cgi-bin/siusa/pagina.pl?Chiave=24005&TipoPag=prodente')]),
      section('Opere', 'Il pensiero politico e pedagogico di Vincenzo Cuoco, Lecce, Milella, 1981. Il volume è citato nella bibliografia dello studio di Massimo Viglione pubblicato nella rivista RiMe del CNR.', [source('CNR — RiMe, studio e bibliografia', 'https://rime.cnr.it/index.php/rime/article/download/93/163')])
    ]
  },
  {
    id:'ruggero-de-simone', name:'Ruggero De Simone', role:'Ufficiale, medaglia d’oro al valor militare', dates:'1896–1917',
    sections:[
      section('Biografia e attività', 'Nato a San Pietro Vernotico, fu tenente di fanteria nei reparti d’assalto durante la Prima guerra mondiale. La motivazione dell’onorificenza ricorda la difesa di una posizione alla Forcella Monte Piana, il 22–23 ottobre 1917: continuò a guidare i suoi uomini nonostante ripetute ferite e cadde in combattimento.', [source('Presidenza della Repubblica — onorificenza', 'https://www.quirinale.it/onorificenze/insigniti/12547')]),
      section('Riconoscimento', 'La medaglia d’oro al valor militare gli fu conferita alla memoria il 2 giugno 1921. Il documento del Quirinale permette di leggere la motivazione completa e di collocare la sua vicenda nel contesto della Grande Guerra.', [source('Quirinale — scheda ufficiale', 'https://www.quirinale.it/onorificenze/insigniti/12547')])
    ]
  },
  {
    id:'cataldo-fiore', name:'Cataldo Fiore', role:'Commerciante e benefattore', dates:'1857–1921',
    sections:[
      section('Biografia', 'La scheda SIUSA identifica Cataldo Fiore come un commerciante nato a Foggia nel 1857, vissuto per diversi anni a Corato. Il suo legame con San Pietro Vernotico è rappresentato dal lascito destinato alla creazione di un orfanotrofio femminile.', [source('Ministero della Cultura — Orfanotrofio Cataldo Fiore', 'https://siusa-archivi.cultura.gov.it/cgi-bin/siusa/pagina.pl?Chiave=12678&TipoPag=prodente')]),
      section('Lascito e documentazione', 'L’istituto nacque dalla sua volontà testamentaria. Il relativo archivio conserva documenti del periodo 1921–1980, raccolti in 23 buste; trasferito nel 1994 al palazzo municipale, fu riordinato nel 2003–2004. Queste carte documentano la storia concreta dell’opera assistenziale.', [source('SIUSA — archivio dell’orfanotrofio', 'https://siusa-archivi.cultura.gov.it/cgi-bin/siusa/pagina.pl?Chiave=195118&TipoPag=comparc')])
    ]
  },
  {
    id:'sandro-greco', name:'Sandro Greco', role:'Artista e sperimentatore dei linguaggi visivi', dates:'1928–2024',
    sections:[
      section('Biografia e ricerca', 'Nato a San Pietro Vernotico, si laureò in farmacia e insegnò chimica. Espose nel paese nel 1953. Alla pittura affiancò una ricerca concettuale attenta al paesaggio e alla tutela dell’ambiente, sviluppata anche nel rapporto con Corrado Lorenzo.', [source('Spazio Aperto Salento — ricordo del 30 luglio 2024', 'https://www.spazioapertosalento.it/news/in-ricordo-di-sandro-greco/')]),
      section('Opere e collezioni', 'Tra i lavori della prima esposizione sono ricordati Minatore, Ulivi e Santa Cesarea. Il sito dedicato all’artista segnala opere presso l’Università del Salento e il Museo provinciale Sigismondo Castromediano di Lecce.', [source('Spazio Aperto Salento — percorso artistico', 'https://www.spazioapertosalento.it/news/in-ricordo-di-sandro-greco/'), source('Sito dell’artista — mostre e documentazione', 'https://sandrogreco.wixsite.com/sandrogreco/mostre-e-docum--sandro-greco')])
    ]
  },
  {
    id:'fernando-lomascolo', name:'Fernando Lomascolo', role:'Pittore, incisore e insegnante', dates:'Nato nel 1927; scomparsa documentata entro il 2020',
    sections:[
      section('Biografia e attività', 'Operò a San Pietro Vernotico, dove ebbe il proprio studio. Affiancò l’insegnamento alla sperimentazione artistica, con particolare attenzione alla grafica e alla litografia. Nel ricordo pubblicato nel dicembre 2020, Raffaele Polo descrive il suo lavoro al torchio e la cura delle composizioni.', [source('LecceCronaca — ricordo di Raffaele Polo', 'https://www.leccecronaca.it/index.php/2020/12/10/artisti-salentini-fernando-lomascolo/')]),
      section('Opere e memoria', 'Polo analizza una litografia che raffigura un portiere proteso verso il pallone, inserita in un paesaggio salentino; la fonte non ne fornisce il titolo. Nel novembre 2025 gli è stata dedicata a San Pietro Vernotico la mostra Fernando Lomascolo: un uomo, un artista, curata da Massimo Marangio, con iniziative dedicate anche alla sua eredità educativa.', [source('LecceCronaca — descrizione dell’opera', 'https://www.leccecronaca.it/index.php/2020/12/10/artisti-salentini-fernando-lomascolo/'), source('Brundisium — programma della retrospettiva', 'https://www.brundisium.net/index.php/a-san-pietro-vernotico-un-omaggio-allartista-fernando-lomascolo-un-uomo-un-artista/')])
    ], note:'La data esatta della morte resta da verificare. Non viene ripresa l’indicazione «vivente» dell’elenco comunale.'
  },
  brief('lorenzo-manca','Lorenzo Manca','Medico e benefattore','1912–1980','Il Comune lo ricorda per l’attività medica e la beneficenza.'),
  {
    id:'cesare-augusto-marangio', name:'Cesare Augusto Marangio', role:'Docente e autore di storia locale', dates:'Nato nel 1938',
    sections:[
      section('Biografia', 'Il Comune lo presenta come docente di materie letterarie nato a San Pietro Vernotico. La sua produzione comprende ricerche sulla storia contemporanea e sulla memoria sociale del territorio.', [municipal, source('Scheda bibliografica — Unilibro', 'https://www.unilibro.it/libro/marangio-cesare-a-/la-rivolta-agraria-del-1957/9788889333143')]),
      section('Opere', 'La rivolta agraria del 1957, Tipografia Minigraf, 2009, ISBN 9788889333143. Il titolo documenta il suo interesse per le lotte agrarie del secondo dopoguerra. La scheda editoriale consente di identificare il volume; non sostituisce la lettura del testo.', [source('Unilibro — titolo, autore, editore e anno', 'https://www.unilibro.it/libro/marangio-cesare-a-/la-rivolta-agraria-del-1957/9788889333143')])
    ]
  },
  {
    id:'massimo-marangio', name:'Massimo Marangio', role:'Pittore e curatore', dates:'Nato nel 1961',
    sections:[
      section('Biografia e ricerca', 'Artista originario di San Pietro Vernotico, sviluppa una pittura legata alla memoria personale. Il reportage sul suo atelier racconta una ricerca in cui gli oggetti familiari e i ricordi d’infanzia diventano soggetti pittorici.', [source('Corriere Salentino — visita all’atelier, 2023', 'https://www.corrieresalentino.it/2023/02/latelier-dellartista-sampietrano-massimo-marangio-una-immersione-nellarte/'), source('Il Pensiero Mediterraneo — profilo', 'https://www.ilpensieromediterraneo.it/massimo-marangio-pittore/')]),
      section('Opere e attività', 'Nei dipinti descritti nel reportage ricorrono un telo bianco, la motocicletta rossa del padre, una credenza e un trenino costruito nell’infanzia. Nel 2025 ha curato la retrospettiva locale dedicata a Fernando Lomascolo. I soggetti qui descritti non sono presentati come titoli ufficiali delle opere.', [source('Corriere Salentino — soggetti e memoria', 'https://www.corrieresalentino.it/2023/02/latelier-dellartista-sampietrano-massimo-marangio-una-immersione-nellarte/'), source('Brundisium — curatela della mostra Lomascolo', 'https://www.brundisium.net/index.php/a-san-pietro-vernotico-un-omaggio-allartista-fernando-lomascolo-un-uomo-un-artista/')])
    ]
  },
  {
    id:'giuseppe-marzano', name:'Giuseppe Marzano', role:'Pittore, scultore e docente', dates:'9 gennaio 1936 – 23 ottobre 2024',
    sections:[
      section('Biografia', 'Nato a San Pietro Vernotico, svolse attività di pittore e scultore e insegnò nel Liceo Artistico di Brindisi. La sua scomparsa è documentata dalla stampa locale il 23 ottobre 2024.', [source('Agenda Brindisi — profilo e commemorazione', 'https://www.agendabrindisi.it/brindisi-la-scomparsa-del-professor-giuseppe-marzano-stimato-artista/')]),
      section('Opere', 'Tra le realizzazioni pubbliche figura la statua bronzea di San Lorenzo, collocata a Brindisi accanto alla chiesa di Santa Maria degli Angeli. La fonte permette di attribuire l’opera all’artista sampietrano, distinguendolo dagli omonimi.', [source('Senza Colonne — la statua di San Lorenzo', 'https://www.senzacolonnenews.it/cronaca/item/scomparso-marzano-artista-poliedrico-sua-la-statua-di-san-lorenzo.html')])
    ]
  },
  {
    id:'federico-melli', name:'Federico Melli', role:'Benefattore della comunità', dates:'Morto il 2 ottobre 1940',
    sections:[
      section('Biografia e lascito', 'Fratello del filosofo Giuseppe Melli, con testamento del 2 dicembre 1939 nominò il Comune erede dei propri beni, vincolandolo all’istituzione di un ospedale dedicato al figlio Ninetto, morto a diciannove anni.', [source('ASPI, Università Milano-Bicocca — storia del fondo Melli', 'https://www.aspi.unimib.it/it/data/occorrenze/44-il-fondo-giuseppe-melli')]),
      section('Eredità culturale', 'Al lascito si accompagnò la donazione della biblioteca del fratello Giuseppe, con l’impegno di custodirne libri e scritti. Il Comune accettò l’eredità nel gennaio 1941. La sua iniziativa lega così assistenza sanitaria e conservazione della memoria intellettuale del paese.', [source('ASPI — donazione e biblioteca', 'https://www.aspi.unimib.it/it/data/occorrenze/44-il-fondo-giuseppe-melli')])
    ]
  },
  {
    id:'domenico-modugno', name:'Domenico Modugno', role:'Cantautore e attore', dates:'1928–1994',
    sections:[
      section('Biografia e legame con il paese', 'Nato a Polignano a Mare, si trasferì con la famiglia a San Pietro Vernotico nel 1932. Qui maturò la sua formazione musicale e il rapporto con il dialetto salentino. A Roma studiò al Centro sperimentale di cinematografia, diplomandosi nel 1952, e intrecciò recitazione, radio e canzone.', [source('Treccani — Dizionario Biografico degli Italiani', 'https://www.treccani.it/enciclopedia/domenico-modugno_(Dizionario-Biografico)/')]),
      section('Opere e contributo artistico', 'Nel blu dipinto di blu, scritta con Franco Migliacci, vinse Sanremo nel 1958. Tra le canzoni si ricordano anche Vecchio frack (1955) e Meraviglioso (1968), quest’ultima frutto della collaborazione con Riccardo Pazzaglia. La trasmissione Amuri amuri (1953) univa racconto e musica; nel 1973 recitò nell’Opera da tre soldi di Brecht diretta da Giorgio Strehler. Queste esperienze mostrano la continuità fra autore, interprete e attore.', [source('Treccani — carriera e opere', 'https://www.treccani.it/enciclopedia/domenico-modugno_(Dizionario-Biografico)/')])
    ]
  },
  brief('gioacchino-pennetta','Gioacchino Pennetta','Teologo e oratore','Morto nel 1821','È ricordato dal Comune per la teologia e l’oratoria.'),
  brief('mario-pennetta','Mario Pennetta','Medico','1872–1933','Il Comune ne segnala l’attività medica.'),
  brief('pietro-pennetta','Pietro Pennetta','Avvocato e patriota','1800–1857, secondo il Comune','L’elenco comunale associa la professione forense all’impegno patriottico.'),
  brief('vincenzo-pennetta','Vincenzo Pennetta','Patriota','1800–1857, secondo il Comune','Il Comune lo annovera fra i patrioti del paese.'),
  brief('giuseppe-petraroli','Giuseppe Petraroli','Dirigente medico','1950–2002','Il Comune indica un incarico dirigenziale presso la ASL BR1.'),
  brief('pier-giovanni-rizzo','Pier Giovanni Rizzo','Ricordato per una laurea ad honorem in Lettere','Morto nel 1917','La fonte comunale menziona una laurea ad honorem in Lettere, senza precisarne ateneo e circostanze.'),
  brief('pasquale-tardio','Pasquale Tardio','Sacerdote e studioso','Morto nel 1816','Il Comune lo ricorda per gli interessi scientifici e letterari.'),
  brief('vincenzo-tardio','Vincenzo Tardio','Sacerdote e studioso di lingue','1762–1844','La scheda comunale ne segnala la conoscenza delle lingue antiche e moderne.'),
  {
    id:'nicola-valzani', name:'Nicola Valzani', role:'Sacerdote e patriota risorgimentale', dates:'1806–1872',
    sections:[
      section('Biografia e attività', 'Sacerdote sampietrano di orientamento mazziniano, partecipò ai moti del 1848 a Lecce e in altri centri salentini. Portalecce ne ricorda l’incarcerazione a Nisida come conseguenza dell’impegno risorgimentale.', [source('Portalecce — memoria di Nicola Valzani', 'https://www.portalecce.it/index.php/comunita-diocesi-di-lecce/san-pietro-vernotico-diocesi-di-lecce/6430-dieci-anni-senza-don-pietro-cocciolo-uomo-di-dio-al-servizio-dell-uomo-e-della-comunita')]),
      section('Memoria nel territorio', 'L’intitolazione dell’istituto tecnico locale fu promossa da don Pietro Cocciolo per far conoscere la figura del patriota. La sua presenza nella memoria scolastica del paese collega la storia del Risorgimento alla formazione delle generazioni successive.', [source('Portalecce — intitolazione dell’istituto', 'https://www.portalecce.it/index.php/comunita-diocesi-di-lecce/san-pietro-vernotico-diocesi-di-lecce/6430-dieci-anni-senza-don-pietro-cocciolo-uomo-di-dio-al-servizio-dell-uomo-e-della-comunita')])
    ]
  }
];
