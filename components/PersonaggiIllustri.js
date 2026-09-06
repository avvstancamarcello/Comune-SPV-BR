import React, { useRef, useState } from 'react';
import { Alert, Linking, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { TRANSLATIONS } from './personaggiTranslations';
import { PEOPLE, MUNICIPAL_URL } from './personaggiData';

const h = React.createElement;
const UI = {
  it: { search:'Cerca nome, attività o opera', list:'Torna all’elenco', works:'Biografie, attività e opere', municipal:'Elenco sul sito del Comune', preliminary:'Profilo preliminare', biography:'Profilo biografico', none:'Nessun personaggio trovato.', offline:'Le schede sono disponibili senza connessione; le fonti richiedono Internet.', italian:'', reviewed:'Ricerca aggiornata al 3 settembre 2026', intro:'Scopri le persone che hanno contribuito alla storia e alla cultura del paese. I profili preliminari riportano solo le notizie finora documentate.', source:'Fonti e approfondimenti' },
  en: { search:'Search names, activities or works', list:'Back to the list', works:'Biographies, activities and works', municipal:'List on the municipal website', preliminary:'Preliminary profile', biography:'Biographical profile', none:'No matching people found.', offline:'Profiles are available offline; source links require Internet access.', italian:'This profile is currently available in Italian. Giuseppe Melli’s biography is also available in English and German.', reviewed:'Research updated on 3 September 2026', intro:'Explore people connected with the town’s history and culture. Preliminary profiles contain only the information documented so far.', source:'Sources and further reading' },
  de: { search:'Namen, Tätigkeiten oder Werke suchen', list:'Zurück zur Liste', works:'Biografien, Tätigkeiten und Werke', municipal:'Liste auf der Gemeindewebsite', preliminary:'Vorläufiges Profil', biography:'Biografisches Profil', none:'Keine passenden Personen gefunden.', offline:'Die Profile sind offline verfügbar; Quellenlinks benötigen Internet.', italian:'Dieses Profil ist derzeit auf Italienisch verfügbar. Die Biografie von Giuseppe Melli ist auch auf Englisch und Deutsch verfügbar.', reviewed:'Recherche aktualisiert am 3. September 2026', intro:'Entdecken Sie Persönlichkeiten aus der Geschichte und Kultur des Ortes. Vorläufige Profile enthalten nur die bisher belegten Angaben.', source:'Quellen und weitere Informationen' }
};

const normalized = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export default function PersonaggiIllustri({ language = 'it', fullWidth = false, backgroundColor = '#ffffff' }) {
  const lang = UI[language] ? language : 'it';
  const t = TRANSLATIONS[lang] || TRANSLATIONS.it;
  const u = UI[lang];
  const [visible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');
  const [openingUrl, setOpeningUrl] = useState(null);
  const openingRef = useRef(false);

  const profiles = PEOPLE.map(person => person.useExistingTranslation ? {
    ...person, role:t.role, dates:t.dates, place:t.place,
    sections:[{title:'', paragraphs:t.paragraphs, sources:[{
      label:t.read, url:'https://www.aspi.unimib.it/it/data/entita/181-giuseppe-melli',
      accessibilityLabel:t.sourceLabel, hint:t.sourceHint
    }]}], sourceText:t.source, note:t.note
  } : person);
  const selected = profiles.find(person => person.id === selectedId);
  const filtered = profiles.filter(person => normalized([person.name, person.role, ...(person.sections || []).map(s => [s.text, ...(s.paragraphs || [])].join(' '))].join(' ')).includes(normalized(query.trim())));

  const close = () => { setVisible(false); setSelectedId(null); setQuery(''); };
  const back = () => selectedId ? setSelectedId(null) : close();
  async function openSource(url) {
    if (openingRef.current) return;
    openingRef.current = true;
    setOpeningUrl(url);
    try {
      if (!/^https:\/\//i.test(url)) throw new Error('Unsupported URL');
      await Linking.openURL(url);
    } catch {
      Alert.alert(t.errorTitle, t.error);
    } finally {
      openingRef.current = false;
      setOpeningUrl(null);
    }
  }

  const sourceButton = (source, key) => h(TouchableOpacity, {
    key, style:[styles.sourceButton, openingUrl && styles.disabled],
    onPress:() => openSource(source.url), disabled:!!openingUrl,
    accessibilityRole:'link', accessibilityLabel:source.accessibilityLabel || source.label,
    accessibilityHint:source.hint || t.sourceHint,
    accessibilityState:{disabled:!!openingUrl, busy:openingUrl === source.url}
  }, h(Text, {style:styles.sourceButtonText}, openingUrl === source.url ? t.opening : source.label),
  h(Ionicons, {name:'open-outline', size:20, color:'#ffffff'}));

  const profileContent = selected ? h(View, {style:styles.biography},
    h(Text, {style:styles.name, accessibilityRole:'header'}, selected.name),
    h(Text, {style:styles.role}, selected.role),
    h(Text, {style:[styles.badge, selected.preliminary && styles.preliminary]}, selected.preliminary ? u.preliminary : u.biography),
    h(Text, {style:styles.dates}, selected.dates),
    selected.place ? h(Text, {style:styles.place}, selected.place) : null,
    !selected.useExistingTranslation && lang !== 'it' ? h(Text, {style:styles.note}, u.italian) : null,
    ...(selected.sections || []).map((section, index) => h(View, {key:index},
      section.title ? h(Text, {style:styles.sectionTitle, accessibilityRole:'header'}, section.title) : null,
      ...(section.paragraphs || [section.text]).filter(Boolean).map((p,i) => h(Text, {key:i, style:styles.paragraph, selectable:true}, p)),
      selected.sourceText ? h(Text, {style:styles.source}, selected.sourceText) : null,
      ...(section.sources || []).map((source, i) => sourceButton(source, `${index}-${i}`))
    )),
    selected.note ? h(Text, {style:styles.note}, selected.note) : null,
    !selected.useExistingTranslation ? h(Text, {style:styles.note}, u.offline) : null
  ) : null;

  return h(React.Fragment, null,
    h(TouchableOpacity, {
      style:[styles.entry, {backgroundColor}, fullWidth && styles.fullWidth], onPress:() => setVisible(true),
      accessibilityRole:'button', accessibilityLabel:`${t.title} — San Pietro Vernotico`, accessibilityHint:t.hint
    }, h(Ionicons, {name:'library-outline', size:30, color:'#0f4c81'}),
    h(Text, {style:styles.entryTitle}, t.title), h(Text, {style:styles.entryText}, t.subtitle)),
    h(Modal, {visible, animationType:'slide', presentationStyle:'fullScreen', onRequestClose:back},
      h(SafeAreaProvider, null, h(SafeAreaView, {style:styles.screen},
        h(View, {style:styles.header}, h(TouchableOpacity, {
          style:styles.back, onPress:back, accessibilityRole:'button', accessibilityLabel:selected ? u.list : t.backLabel
        }, h(Ionicons, {name:'arrow-back-outline', size:24, color:'#0f4c81'}),
        h(Text, {style:styles.backText}, selected ? u.list : t.back))),
        h(ScrollView, {key:selectedId || 'list', contentContainerStyle:styles.content, keyboardShouldPersistTaps:'handled'},
          h(Text, {style:styles.title, accessibilityRole:'header'}, t.title),
          h(Text, {style:styles.subtitle}, selected ? t.subtitle : u.works),
          selected ? profileContent : h(View, null,
            h(Text, {style:styles.note}, u.intro),
            h(TextInput, {style:styles.search, value:query, onChangeText:setQuery, placeholder:u.search,
              placeholderTextColor:'#64748b', accessibilityLabel:u.search, autoCorrect:false, returnKeyType:'search'}),
            ...filtered.map(person => h(TouchableOpacity, {
              key:person.id, style:styles.personRow, onPress:() => setSelectedId(person.id),
              accessibilityRole:'button', accessibilityLabel:`${person.name}. ${person.preliminary ? u.preliminary : u.biography}`
            }, h(View, {style:{flex:1}}, h(Text, {style:styles.personName}, person.name),
              h(Text, {style:styles.place}, person.role),
              person.preliminary ? h(Text, {style:styles.preliminaryLabel}, u.preliminary) : null),
            h(Ionicons, {name:'chevron-forward', size:22, color:'#0f4c81'}))),
            filtered.length === 0 ? h(Text, {style:styles.note}, u.none) : null,
            sourceButton({label:u.municipal,url:MUNICIPAL_URL},'municipal'),
            h(Text, {style:styles.note}, u.offline)
          ),
          h(Text, {style:styles.note}, u.reviewed)
        )
      ))
    )
  );
}

const styles = StyleSheet.create({
  entry:{width:'48%',minHeight:145,backgroundColor:'#ffffff',borderRadius:14,padding:14,marginBottom:14,elevation:2},
  fullWidth:{width:'100%',minHeight:110},
  entryTitle:{marginTop:10,fontSize:16,fontWeight:'700',color:'#1f2937'},
  entryText:{marginTop:5,fontSize:14,lineHeight:20,color:'#4b5563'},
  screen:{flex:1,backgroundColor:'#f4f7fa'},
  header:{backgroundColor:'#ffffff',paddingHorizontal:12,paddingVertical:8,borderBottomWidth:1,borderBottomColor:'#dce4ec'},
  back:{minHeight:48,flexDirection:'row',alignItems:'center',alignSelf:'flex-start',paddingHorizontal:8},
  backText:{fontSize:16,fontWeight:'600',color:'#0f4c81',marginLeft:8,flexShrink:1},
  content:{padding:16,paddingBottom:32,width:'100%',maxWidth:760,alignSelf:'center'},
  title:{fontSize:28,fontWeight:'700',color:'#0f4c81'},
  subtitle:{marginTop:8,marginBottom:20,fontSize:16,lineHeight:24,color:'#4b5563'},
  biography:{backgroundColor:'#ffffff',borderRadius:16,padding:20},
  name:{fontSize:26,fontWeight:'700',color:'#17354f'},
  role:{fontSize:17,lineHeight:25,color:'#0f4c81',marginTop:6},
  dates:{fontSize:16,lineHeight:24,color:'#374151',marginTop:16},
  place:{fontSize:14,lineHeight:21,color:'#4b5563',marginTop:4},
  paragraph:{fontSize:17,lineHeight:27,color:'#1f2937',marginTop:18},
  sectionTitle:{fontSize:20,fontWeight:'700',color:'#17354f',marginTop:24},
  source:{fontSize:14,lineHeight:22,color:'#4b5563',marginTop:24},
  sourceButton:{marginTop:16,backgroundColor:'#0f4c81',borderRadius:10,minHeight:50,padding:14,flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  sourceButtonText:{fontSize:16,fontWeight:'600',color:'#ffffff',flex:1,marginRight:10},
  disabled:{opacity:0.65},
  note:{fontSize:14,lineHeight:21,color:'#4b5563',marginTop:12},
  search:{marginTop:18,marginBottom:18,borderWidth:1,borderColor:'#94a3b8',borderRadius:10,minHeight:50,paddingHorizontal:12,paddingVertical:10,fontSize:16,color:'#1f2937',backgroundColor:'#fff'},
  personRow:{backgroundColor:'#fff',borderRadius:12,padding:16,marginBottom:12,minHeight:84,flexDirection:'row',alignItems:'center',gap:8},
  personName:{fontSize:18,fontWeight:'700',color:'#17354f'},
  badge:{marginTop:12,alignSelf:'flex-start',fontSize:13,color:'#0f4c81',backgroundColor:'#eaf2f8',padding:6,borderRadius:6},
  preliminary:{color:'#744210',backgroundColor:'#fff3d6'},
  preliminaryLabel:{marginTop:5,fontSize:13,color:'#744210'}
});
