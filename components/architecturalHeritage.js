export const ARCHITECTURAL_SOURCE = "https://www.spv.br.it/beni-architettonici";

const item = (id, title, address, description, googleMapsUrl, disableMap = false) => ({
  id,
  title,
  address,
  description,
  googleMapsUrl,
  disableMap,
  mapQuery: `${title}, ${address || "San Pietro Vernotico"}`,
  sourceUrl: ARCHITECTURAL_SOURCE,
  verifiedAt: "04/09/2026"
});

// Indice redazionale delle voci presenti nella pagina istituzionale del Comune.
export const ARCHITECTURAL_HERITAGE = [
  item("torre-baronale", "Torre Baronale", "Piazza del Popolo – via Brindisi, San Pietro Vernotico (BR)", "È la più antica testimonianza monumentale conservata nel paese. La torre, a base quadrata, presenta merlature, caditoie e ambienti distribuiti su due piani con volte a padiglione e a crociera. Le ricostruzioni storiche ne collocano l’origine tra il periodo normanno e il possesso vescovile attestato dal XIV secolo."),
  item("chiesa-san-pietro-apostolo", "Chiesa di San Pietro Apostolo", "Piazza San Pietro – via Mesagne, San Pietro Vernotico (BR)", "Documentata nel 1133, conserva tracce dell’edificio medievale inglobato nella ricostruzione seicentesca. Tele e stucchi barocchi illustrano episodi della vita di San Pietro. Alla chiesa erano legati l’oratorio dei pellegrini, la ruota degli esposti e il pozzo della tradizione dei tarantati, chiuso nel 1929."),
  item("case-a-cannizzu", "Case a cannizzu", "Via San Pietro, San Pietro Vernotico (BR)", "Testimonianze dell’architettura spontanea locale: muri di pietre naturali sigillate con argilla e imbiancate a calce, coperture sostenute da travi e formate da canne legate, terra rossa, calce e paglia.", undefined, true),
  item("piazza-del-popolo", "Piazza del Popolo", "Piazza del Popolo, San Pietro Vernotico (BR)", "Il paese si è sviluppato intorno alla piazza dopo il primo nucleo formatosi presso Piazza San Pietro. Vi si affacciano la Chiesa Madre, la Torre Baronale e l’antica casa comunale, iniziata nel 1838 e successivamente utilizzata anche per uffici sanitari."),
  item("chiesa-madre", "Chiesa Madre – Santa Maria Assunta", "Piazza del Popolo, San Pietro Vernotico (BR)", "Il nucleo originario risale ai primi decenni del XV secolo; seguirono ampliamenti nel Seicento, nell’Ottocento e il restauro del 1907. Conserva il rosone in pietra leccese, la pala in stucco dell’Assunta del 1928, opere di artisti salentini e antiche sepolture del clero sotto il presbiterio."),
  item("piazza-regina-margherita", "Piazza Regina Margherita", "Piazza Regina Margherita, San Pietro Vernotico (BR)", "Nel 1911 l’Amministrazione deliberò la costruzione del mercato coperto. Nato per la vendita periodica di generi alimentari, l’edificio è stato successivamente ristrutturato e destinato a centro commerciale e sede di uffici."),
  item("cappella-carmine", "Cappella della Madonna del Carmine", "Via Carrozzo, San Pietro Vernotico (BR)", "La presenza di una cappella dedicata alla Madonna del Carmine è documentata nel Seicento. Una visita pastorale del 1648 ne dispose la ricostruzione; nel 1762 l’edificio risultava nuovamente decoroso e a tale fase viene ricondotta la cappella attuale."),
  item("monumento-enrico-toti", "Monumento a Enrico Toti", "San Pietro Vernotico (BR)", "Inaugurato nel luglio 2008 per iniziativa dell’Associazione Nazionale Bersaglieri locale, ricorda Enrico Toti, decorato alla memoria con la Medaglia d’Oro al Valor Militare per gli eventi del 1916."),
  item("piazza-iv-novembre", "Piazza IV Novembre", "Piazza IV Novembre, San Pietro Vernotico (BR)", "Per secoli fu conosciuta come Piazza delle Erbe o Piazza Mercato, per la funzione di luogo di scambio delle merci. Assunse la denominazione attuale nel 1932."),
  item("chiesa-san-giuseppe", "Chiesa di San Giuseppe", "Via Lecce, San Pietro Vernotico (BR)", "La cappella compare nella visita pastorale del 1688 ed è attribuita alle offerte dei fedeli e all’opera di don Giovanni Pennetta. Conserva un altare dedicato alla Madonna della Fontana con una tela di Cosimo Miccoli del 1843."),
  item("banca-rurale", "Banca Rurale", "Via Stazione, San Pietro Vernotico (BR)", "Edificata alla fine degli anni Venti, è un esempio locale di architettura del periodo fascista con richiami all’arte romana tardo-imperiale. Sulla facciata si trovano due bassorilievi in pietra leccese dello scultore Antonino Lariccia.", "https://maps.app.goo.gl/bc4wU2jbfXhj1eoB6"),
  item("villa-valletta", "Villa Valletta", "Via Stazione, San Pietro Vernotico (BR)", "Costruita intorno al 1910 per il commerciante di vini Antonio Valletta, riprende lo stile moresco di una villa sul lago di Como. Il progetto viene ricondotto all’architetto Barbieri e alle maestranze coinvolte nel modello comasco.", "https://maps.app.goo.gl/6iHtvv4poxyp8LWU7"),
  item("municipio", "Municipio di San Pietro Vernotico", "Piazza Giovanni Falcone, San Pietro Vernotico (BR)", "Il palazzo, ultimato nel 1972, divenne la nuova sede comunale. Nel 1995 fu inaugurata la piazza antistante, intitolata a Giovanni Falcone."),
  item("ex-stazione-vigili", "Sede dei Vigili Urbani – ex Stazione", "San Pietro Vernotico (BR)", "L’edificio appartiene alla storia della linea ferroviaria Brindisi–Lecce, realizzata dal 1864. Dopo la trasformazione funzionale, nel 2008 l’ex stazione è diventata sede della Polizia municipale."),
  item("calvario", "Calvario", "Area del Cimitero comunale, San Pietro Vernotico (BR)", "Sul sagrato era collocata, dalla fine degli anni Quaranta, una statua del Cristo alla colonna, oggi conservata all’ingresso del cimitero. Attualmente il complesso presenta Cristo in croce con la Vergine Addolorata; l’assetto definitivo dell’area cimiteriale risale circa al 1860–1870."),
  item("cappella-sanarica", "Cappella della Madonna di Sanarica", "Via Torino, San Pietro Vernotico (BR)", "È dedicata alla Madonna delle Grazie e richiama il culto salentino legato a Sanarica. La tradizione locale ricorda l’arrivo della statua e la donazione, negli anni Quaranta, dell’area destinata alla cappella; la festa si celebra la seconda domenica di ottobre."),
  item("chiesa-sant-anna", "Chiesa di Sant’Anna", "Via Vanini, San Pietro Vernotico (BR)", "Nacque dalla donazione dell’abitazione di Maria Greco alle Suore Discepole di Gesù Eucaristico in memoria della figlia. Fu benedetta il 26 luglio 1947; nel 2008 l’altare restaurato accolse reliquie di san Filippo Smaldone."),
  item("giardini-memoria", "Giardini della Memoria", "Via Brindisi – via Sabaudia, San Pietro Vernotico (BR)", "La piazza è dedicata al caporale Beniamino Persano, insignito della Medaglia d’argento al Valor Militare. Una lapide ricorda inoltre Raffaele Perrone e Pancrazio Briganti, vittime di eventi criminosi avvenuti nel 1993 e nel 1998."),
  item("chiesa-angeli-custodi", "Chiesa dei SS. Angeli Custodi", "Via Brindisi, San Pietro Vernotico (BR)", "La parrocchia fu istituita nel 1951 e dal 1958 ha sede in via Brindisi. Costruita grazie alla donazione di Colomba Melli, fu consacrata nel 1957; l’edificio in carparo presenta una pianta a croce latina e caratteri romanico-neoclassici."),
  item("piazza-domenico-modugno", "Piazza Domenico Modugno", "Via Brindisi, San Pietro Vernotico (BR)", "La piazza, inaugurata il 2 giugno 1996, ricorda Domenico Modugno e il suo forte legame con San Pietro Vernotico, dove visse con la famiglia dal 1934 fino alla partenza per Roma nel 1949."),
  item("chiesa-sant-antonio", "Chiesa di Sant’Antonio", "Via Sant’Antonio, San Pietro Vernotico (BR)", "Inaugurata il 1° marzo 1937 dalle Suore Discepole di Gesù Eucaristico, richiama volutamente il gotico delle chiese padovane. Nel restauro del 1973 gli antichi affreschi furono sostituiti con decorazioni musive."),
  item("biblioteca-melli", "Biblioteca comunale Giuseppe Melli", "Via Sant’Antonio, San Pietro Vernotico (BR)", "Il nucleo originario deriva dalla donazione di Federico Melli e comprende circa diecimila volumi appartenuti al fratello Giuseppe. La raccolta è particolarmente ricca di filosofia, patristica, storia del Cristianesimo e discipline storico-letterarie."),
  item("grotta-lourdes", "Grotta della Madonna di Lourdes", "Via Lecce, San Pietro Vernotico (BR)", "Inaugurata l’8 dicembre 1954, fu dedicata ai benefattori Giovanni e Antonietta Sozzo."),
  item("ospedale-ninetto-melli", "Ospedale Ninetto Melli", "Via Lecce, San Pietro Vernotico (BR)", "Fu istituito per volontà testamentaria di Federico Melli e intitolato al figlio Ninetto, scomparso a diciannove anni. L’ospedale accolse il primo paziente il 29 gennaio 1960; contribuirono anche altri benefattori locali."),
  item("chiesa-san-giovanni-bosco", "Chiesa di San Giovanni Bosco", "Via Firenze, San Pietro Vernotico (BR)", "La parrocchia fu istituita il 31 gennaio 1974, inizialmente con sede provvisoria presso la chiesa di Sant’Antonio da Padova. Dal 1987 ha sede definitiva in via Firenze."),
  item("campo-di-mare", "Campo di Mare", "Campo di Mare, San Pietro Vernotico (BR)", "Località balneare dell’Adriatico, marina e frazione di San Pietro Vernotico, distante circa nove chilometri dal centro. La pagina comunale ne ricorda il paesaggio, l’accoglienza turistica e l’accesso al mare predisposto anche per persone con disabilità."),
  {
    id: "sala-regno-testimoni-geova",
    title: "Sala del Regno dei Testimoni di Geova",
    subtitle: "Luogo di culto",
    address: "San Pietro Vernotico (BR)",
    description: "Sala del Regno dei Testimoni di Geova presente nel territorio comunale.",
    latitude: 40.49394224380143,
    longitude: 18.00018739701384,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=40.49394224380143%2C18.00018739701384",
    mapQuery: "Sala del Regno dei Testimoni di Geova, San Pietro Vernotico",
    verifiedAt: "06/09/2026"
  }
];
