

// ── Pitch helpers ─────────────────────────────────────────────────────────
const OPEN_PC = [4, 9, 2, 7, 11, 4]; // low-E → high-e
const STR_LBL = ["E", "A", "D", "G", "B", "e"];
const NOTE_NM = ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"];
const DEG_MAP = {0:"R",1:"♭2",2:"2",3:"♭3",4:"3",5:"4",6:"♭5",7:"5",8:"♭6",9:"6",10:"♭7",11:"7"};
const pc = (s, f) => (OPEN_PC[s] + f) % 12;

// ── SVG layout constants ──────────────────────────────────────────────────
const FW=50, SH=44, NUT_X=56, NUT_W=8, BX=NUT_X+NUT_W, OPEN_X=NUT_X-24;
const PT=44, PB=28, PR=22;
const SVG_W = BX + 12*FW + PR;
const SVG_H = PT + 5*SH + PB;
const nX = f => f===0 ? OPEN_X : BX + (f-0.5)*FW;
const sY = s => PT + (5-s)*SH;

// ── Embedded default songs ────────────────────────────────────────────────
const DEFAULT_SONGS = {
  bhs: {
    schema:"harmonic-analysis/1.0",
    song:{ title:"Black Hole Sun", artist:"Soundgarden", album:"Superunknown", year:1994,
           tuning:"Standard (EADGBe)", capo:0, timeSignature:"4/4", tempo:"~60 BPM", accentColor:"#38bdf8" },
    analysis:{ tonicNote:"G", tonicPC:7, primaryMode:"G Dorico / Aeoliano con mixture massiccio",
      complexity:5, alienChord:"Db (bV)",
      alienReason:"Quinta abbassata di G — presente nel modo Frigio. Crea disorientamento psichedelico, suona letteralmente da un altro pianeta rispetto alla tonica.",
      technique:"Modal interchange massiccio da modi paralleli",
      bassMotion:"Cromatismo discendente nel verse: G→F#→F→E→Eb→Db",
      summary:"Capolavoro di armonia modale rock: pur senza un V7→I, il centro tonale su G è chiarissimo. Cornell costruisce tensione con la distanza cromatica degli accordi prestati — soprattutto il Db, quinta abbassata di G." },
    sections:[
      { id:"verse", label:"Verse", chords:["G","Bb","F","C","Csharpdim","Eb","Db","F2"], note:"Discesa cromatica del basso per sei semitoni: G→F#→F→E→Eb→Db" },
      { id:"chorus", label:"Chorus", chords:["Eb","Bb","F","C"], note:"Risoluzione relativa — tutti accordi del campo aeoliano" }
    ],
    chords:[
      { id:"G", symbol:"G", degree:"I", modalOrigin:"G Ionio", function:"Tonica", tetrad:"Gmaj7", tensions:["add9"], tetradFull:"Gmaj9", voicing:"320002", rootPC:7, isAlien:false, note:"" },
      { id:"Bb", symbol:"Bb", degree:"bIII", modalOrigin:"G Aeoliano/Frigio", function:"Interscambio modale", tetrad:"Bbmaj7", tensions:["add9","#11"], tetradFull:"Bbmaj7#11", voicing:"x13231", rootPC:10, isAlien:true, note:"Prima mossa sorprendente — bIII da G Aeoliano" },
      { id:"F", symbol:"F", degree:"bVII", modalOrigin:"G Misolidio/Aeoliano", function:"Interscambio modale", tetrad:"Fmaj7", tensions:["add9"], tetradFull:"Fmaj9", voicing:"103213", rootPC:5, isAlien:true, note:"bVII — tipico del rock modale anglosassone" },
      { id:"C", symbol:"C", degree:"IV", modalOrigin:"G Ionio (naturale)", function:"Sottodominante", tetrad:"Cmaj7", tensions:["add9"], tetradFull:"Cmaj9", voicing:"x32030", rootPC:0, isAlien:false, note:"L'unico accordo naturale in G maggiore" },
      { id:"Csharpdim", symbol:"C#dim", degree:"#IVdim", modalOrigin:"Cromatico/passante", function:"Accordo di passaggio C→Eb", tetrad:"C#dim7", tensions:[], tetradFull:"C#dim7", voicing:"x4545x", rootPC:1, isAlien:true, note:"Voice leading basso: C→C#→Eb per semitoni" },
      { id:"Eb", symbol:"Eb", degree:"bVI", modalOrigin:"G Aeoliano", function:"Interscambio modale", tetrad:"Ebmaj7", tensions:["add9","#11"], tetradFull:"Ebmaj7#11", voicing:"x68788", rootPC:3, isAlien:true, note:"bVI — colore scuro e malinconico" },
      { id:"Db", symbol:"Db", degree:"bV", modalOrigin:"G Frigio/cromatico", function:"Accordo alieno — massima tensione", tetrad:"Dbmaj7", tensions:["add9"], tetradFull:"Dbmaj9", voicing:"x43221", rootPC:1, isAlien:true, note:"LA mossa più audace: quinta abbassata, assente nel rock normale." },
      { id:"F2", symbol:"F", degree:"bVII", modalOrigin:"G Misolidio/Aeoliano", function:"Risoluzione verso tonica", tetrad:"Fmaj7", tensions:["add9"], tetradFull:"Fmaj9", voicing:"103213", rootPC:5, isAlien:true, note:"Porta alla risoluzione su G" }
    ],
    modes:[
      { id:"dorian", label:"G Dorico", sub:"Verse & Chorus — primaria", rootPC:7, intervals:[0,2,3,5,7,9,10], color:"#38bdf8", sections:["verse","chorus"], tip:"Copre G, Bb, F, C contemporaneamente — la scala più utile sul brano intero" },
      { id:"pentatonic", label:"G min. Pentat.", sub:"Verse — safe & rock", rootPC:7, intervals:[0,3,5,7,10], color:"#fb923c", sections:["verse","chorus"], tip:"Approccio rock classico — funziona sempre, meno colorato ma sicuro" },
      { id:"lydian_eb", label:"Eb Lidio", sub:"Sul bVI (Eb)", rootPC:3, intervals:[0,2,4,6,7,9,11], color:"#c084fc", sections:["verse"], tip:"Il #4 (La nat.) suona sospeso e alieno sul Ebmaj7#11" },
      { id:"lydian_db", label:"Db Lidio", sub:"Sul bV (Db) — massima tensione", rootPC:1, intervals:[0,2,4,6,7,9,11], color:"#f87171", sections:["verse"], tip:"La scala più aliena rispetto a G — poi risolvi cromaticamente verso G" },
      { id:"diminished", label:"C# dim (½-T)", sub:"Sul C#dim — passante", rootPC:1, intervals:[0,1,3,4,6,7,9,10], color:"#34d399", sections:["verse"], tip:"Scala dim semitono-tono — note cromatiche di passaggio" }
    ],
    arpeggios:[
      { id:"gmaj9", label:"Gmaj9", sub:"I · verse/chorus", rootPC:7, intervals:[0,4,7,11,2], color:"#38bdf8", chordRef:"G", tip:"Parti da G (6ª tasto 3) — la nona La è la tensione caratteristica" },
      { id:"bbmaj7", label:"Bbmaj7", sub:"bIII · verse", rootPC:10, intervals:[0,4,7,11], color:"#fb923c", chordRef:"Bb", tip:"Shape Fmaj7 al II tasto — settima La come tensione" },
      { id:"fmaj7", label:"Fmaj7", sub:"bVII · verse/chorus", rootPC:5, intervals:[0,4,7,11], color:"#fcd34d", chordRef:"F", tip:"Settima Mi = tonica G — ottimo voice leading" },
      { id:"cmaj9", label:"Cmaj9", sub:"IV · verse/chorus", rootPC:0, intervals:[0,4,7,11,2], color:"#6ee7b7", chordRef:"C", tip:"Momento di respiro — usa la nona Re per legame melodico" },
      { id:"csharpdim7", label:"C#dim7", sub:"#IVdim · passante", rootPC:1, intervals:[0,3,6,9], color:"#a78bfa", chordRef:"Csharpdim", tip:"Arpeggio simmetrico — usalo come passaggio tra C e Eb" },
      { id:"ebmaj7", label:"Ebmaj7#11", sub:"bVI · verse", rootPC:3, intervals:[0,4,7,11,6], color:"#c084fc", chordRef:"Eb", tip:"Il #11 La nat. è la nota aliena — enfatizzala per il colore psichedelico" },
      { id:"dbmaj7", label:"Dbmaj7", sub:"bV · verse — alieno", rootPC:1, intervals:[0,4,7,11], color:"#f87171", chordRef:"Db", tip:"La settima Do crea tensione massima vs G — risolvi scendendo cromaticamente" }
    ],
    improv:{
      verse:{ primary:"G Dorico", secondary:"G minore pentatonica", tip:"G Dorico copre G, Bb, F, C contemporaneamente. Su C#dim usa l'arpeggio dim7. Su Eb e Db: scala Lidia per accordo." },
      chorus:{ primary:"G Dorico / G Aeoliano", secondary:"Arpeggi tetradici Eb→Bb→F→C", tip:"Il chorus è il momento più stabile — ottimo per melodie lunghe in G Aeoliano" }
    }
  },
  fobd: {
    schema:"harmonic-analysis/1.0",
    song:{ title:"Fell on Black Days", artist:"Soundgarden", album:"Superunknown", year:1994,
           tuning:"Open C (CGCGCE)", capo:0, timeSignature:"6/4", tempo:"~72 BPM", accentColor:"#a78bfa" },
    analysis:{ tonicNote:"E", tonicPC:4, primaryMode:"E Aeoliano con modal mixture — iv minore nel bridge",
      complexity:4, alienChord:"Dm (iv)",
      alienReason:"Sottodominante minore al posto della maggiore (A=IV). La stessa mossa di Schubert e Chopin per iniettare dolore improvviso — Cornell la porta nel grunge.",
      technique:"Voice leading cromatico nel basso del bridge: E→F#→G con moto contrario nelle voci interne del Dm",
      bassMotion:"Bridge: basso sale cromaticamente E→F#→G, poi Dm crea moto contrario interno (Re→Do)",
      summary:"Dipinto monocromatico con una pennellata di rosso: tutto si muove nell'Aeoliano tranne il Dm nel bridge, che arriva come un colpo allo stomaco. Il 6/4 amplifica il peso emotivo — ogni accordo respira due tempi in più." },
    sections:[
      { id:"verse", label:"Verse (6/4)", chords:["E","Bm","C","Bm2","A"], note:"Ostinato ipnotico in 6/4 — i tempi 5 e 6 lasciano risuonare il Cmaj7" },
      { id:"chorus", label:"Chorus", chords:["E2","Bm3","C2","D"], note:"Stesso materiale del verse compresso — D (bVII) aggiunge tensione" },
      { id:"bridge", label:"Bridge — Cuore armonico", chords:["E3","DoverFsharp","G","Dm"], note:"Basso sale E→F#→G poi caduta su Dm — voice leading cromatico" }
    ],
    chords:[
      { id:"E", symbol:"E", degree:"I", modalOrigin:"E Aeoliano/misto", function:"Tonica — ambigua maj/min", tetrad:"Esus4/Eadd9", tensions:["sus4","add9"], tetradFull:"Eadd9", voicing:"022102", rootPC:4, isAlien:false, note:"La sus4 evita di dichiarare maggiore o minore — ambiguità voluta" },
      { id:"E2", symbol:"E", degree:"I", modalOrigin:"E Aeoliano", function:"Tonica", tetrad:"Eadd9", tensions:["add9"], tetradFull:"Eadd9", voicing:"022102", rootPC:4, isAlien:false, note:"Chorus" },
      { id:"E3", symbol:"E", degree:"I", modalOrigin:"E Aeoliano", function:"Tonica — inizio basso cromatico", tetrad:"Eadd9", tensions:["add9"], tetradFull:"Eadd9", voicing:"022102", rootPC:4, isAlien:false, note:"Bridge — il basso inizia la salita E→F#→G" },
      { id:"Bm", symbol:"Bm", degree:"Vm", modalOrigin:"E Aeoliano", function:"v minore — evita la dominante classica", tetrad:"Bm7", tensions:["add11"], tetradFull:"Bm11", voicing:"x24232", rootPC:11, isAlien:false, note:"v minore invece di V7 — rifiuto della cadenza funzionale classica" },
      { id:"Bm2", symbol:"Bm", degree:"Vm", modalOrigin:"E Aeoliano", function:"v minore — ritorno", tetrad:"Bm7", tensions:["add11"], tetradFull:"Bm11", voicing:"x24232", rootPC:11, isAlien:false, note:"Seconda occorrenza nel verse" },
      { id:"Bm3", symbol:"Bm", degree:"Vm", modalOrigin:"E Aeoliano", function:"v minore", tetrad:"Bm7", tensions:["add11"], tetradFull:"Bm11", voicing:"x24232", rootPC:11, isAlien:false, note:"Chorus" },
      { id:"C", symbol:"C", degree:"bVI", modalOrigin:"E Aeoliano", function:"Interscambio modale — colore freddo", tetrad:"Cmaj7", tensions:["add9"], tetradFull:"Cmaj9", voicing:"x32000", rootPC:0, isAlien:true, note:"Già scritto come Cmaj7 nell'originale — Mi in cima = tonica E" },
      { id:"C2", symbol:"C", degree:"bVI", modalOrigin:"E Aeoliano", function:"Interscambio modale", tetrad:"Cmaj7", tensions:["add9"], tetradFull:"Cmaj9", voicing:"x32000", rootPC:0, isAlien:true, note:"Chorus" },
      { id:"A", symbol:"A", degree:"IV", modalOrigin:"E Dorico/Ionio", function:"Sottodominante — respiro naturale", tetrad:"Asus2", tensions:["add9"], tetradFull:"Asus2", voicing:"x02200", rootPC:9, isAlien:false, note:"La IV — dopo bVI e Vm suona come casa" },
      { id:"D", symbol:"D", degree:"bVII", modalOrigin:"E Misolidio/Aeoliano", function:"Interscambio modale — tensione chorus", tetrad:"Dsus2", tensions:["add9"], tetradFull:"Dsus2", voicing:"xx0232", rootPC:2, isAlien:true, note:"bVII dal Misolidio — prepara il ritorno alla tonica" },
      { id:"DoverFsharp", symbol:"D/F#", degree:"bVII/3°", modalOrigin:"E Aeoliano — basso crom.", function:"Basso cromatico — secondo passo E→F#", tetrad:"Dmaj7/F#", tensions:[], tetradFull:"Dmaj7/F#", voicing:"200232", rootPC:2, isAlien:true, note:"F# nel basso = cuore del voice leading del bridge" },
      { id:"G", symbol:"G", degree:"bIII", modalOrigin:"E Aeoliano/Frigio", function:"Interscambio modale — apice basso cromatico", tetrad:"Gmaj7", tensions:["add9"], tetradFull:"Gmaj9", voicing:"320002", rootPC:7, isAlien:true, note:"Terzo passo E→F#→G. Prepara la caduta sul Dm" },
      { id:"Dm", symbol:"Dm", degree:"iv", modalOrigin:"E Aeoliano→Frigio", function:"Sottodominante MINORE — dolore improvviso ⚡", tetrad:"Dm7", tensions:[], tetradFull:"Dm7", voicing:"xx0231", rootPC:2, isAlien:true, note:"LA mossa più sofisticata. iv minore invece di IV maggiore. Moto contrario: basso saliva verso G, le voci interne Re→Do scendono." }
    ],
    modes:[
      { id:"aeolian", label:"E Aeoliano", sub:"Verse, Chorus, Bridge — primaria", rootPC:4, intervals:[0,2,3,5,7,8,10], color:"#a78bfa", sections:["verse","chorus","bridge"], tip:"Copre E, Bm, C, A, D — scala principale per tutto il brano" },
      { id:"dorian", label:"E Dorico", sub:"Verse / Pre-chorus", rootPC:4, intervals:[0,2,3,5,7,9,10], color:"#38bdf8", sections:["verse"], tip:"Aggiunge il #6 (Do#) — più luminoso dell'Aeoliano, copre bene A (IV)" },
      { id:"phrygian", label:"E Frigio", sub:"Bridge — sul Dm", rootPC:4, intervals:[0,1,3,5,7,8,10], color:"#f87171", sections:["bridge"], tip:"Do nat. copre G e Dm. Fa copre Dm. Sib crea tensione extra su E — approccio avanzato" },
      { id:"pentatonic", label:"E min. Pentat.", sub:"Tutto il brano — safe", rootPC:4, intervals:[0,3,5,7,10], color:"#fb923c", sections:["verse","chorus","bridge"], tip:"Funziona su tutto. Aggiungi Bb come blue note per tensione extra" }
    ],
    arpeggios:[
      { id:"eadd9", label:"Eadd9", sub:"I · verse/chorus/bridge", rootPC:4, intervals:[0,4,7,2], color:"#a78bfa", chordRef:"E", tip:"Open string risonante. La nona Fa# è il suono sospeso caratteristico del brano" },
      { id:"bm7", label:"Bm7", sub:"Vm · verse", rootPC:11, intervals:[0,3,7,10], color:"#818cf8", chordRef:"Bm", tip:"La settima La = nota comune con A (IV) — voice leading diretto" },
      { id:"cmaj9", label:"Cmaj9", sub:"bVI · verse/chorus", rootPC:0, intervals:[0,4,7,11,2], color:"#6ee7b7", chordRef:"C", tip:"Mi (3° di C) è la tonica E — nota comune con I. La nona Re prepara Bm" },
      { id:"asus2", label:"Asus2", sub:"IV · verse", rootPC:9, intervals:[0,2,7], color:"#fcd34d", chordRef:"A", tip:"Open e luminoso — la quinta E è la tonica: continuità garantita" },
      { id:"dmaj7_f", label:"Dmaj7/F#", sub:"bVII/3° · bridge", rootPC:2, intervals:[0,4,7,11], color:"#fb923c", chordRef:"DoverFsharp", tip:"Suona con F# nel basso — è il passo cromatico verso G" },
      { id:"gmaj7", label:"Gmaj7", sub:"bIII · bridge", rootPC:7, intervals:[0,4,7,11], color:"#34d399", chordRef:"G", tip:"Apice del bridge — la settima F# è la nota più acuta. Prepara il Dm" },
      { id:"dm7", label:"Dm7", sub:"iv · bridge ⚡", rootPC:2, intervals:[0,3,7,10], color:"#f87171", chordRef:"Dm", tip:"D–F–A–C. Il Do nat. è la nota del dolore — moto contrario rispetto alla salita del basso" }
    ],
    improv:{
      verse:{ primary:"E Aeoliano", secondary:"E minore pentatonica", tip:"Evidenzia Do nat. su Cmaj7 — è la bVI che dà il colore malinconico. Il 6/4 ti dà spazio per note lunghe." },
      chorus:{ primary:"E Aeoliano", secondary:"Su D (bVII): vira verso D Misolidio", tip:"Su D enfatizza Do nat. (settima) come nota di colore" },
      bridge:{ primary:"E Aeoliano su E/D/F#/G — arpeggio Dm7 su Dm", secondary:"E Frigio sull'intero bridge (avanzato)", tip:"Segui il basso cromatico E→F#→G. Sul Dm7 usa D–F–A–C enfatizzando il Do — è la nota del dolore." }
    }
  }
};

// ── Stars component ───────────────────────────────────────────────────────
const Stars = ({ n, color }) => (
  <span>
    {Array.from({length:5},(_,i) => (
      <span key={i} style={{color: i<n ? color : '#1a2a3a', fontSize:12}}>★</span>
    ))}
  </span>
);

// ── Voicing diagram ───────────────────────────────────────────────────────
const VoicingDot = ({ voicing, color }) => {
  if (!voicing) return null;
  const frets = voicing.split("").map(c => c==='x'?-1:parseInt(c));
  const played = frets.filter(f=>f>0);
  if (!played.length) return null;
  const minF = Math.min(...played), maxF = Math.max(...played);
  const span = Math.max(maxF - minF + 1, 4);
  const cellW = 13, cellH = 13;
  const w = 6*cellW + 10, h = span*cellH + 18;
  return (
    <svg width={w} height={h} style={{display:'block', margin:'0 auto'}}>
      {/* nut / fret ref */}
      {minF <= 1 && <rect x={8} y={12} width={6*cellW} height={2} fill="#c8a434" rx={1}/>}
      {/* fret lines */}
      {Array.from({length:span+1},(_,row)=>(
        <line key={row} x1={8} y1={14+row*cellH} x2={8+6*cellW} y2={14+row*cellH}
          stroke="#1e3040" strokeWidth={1}/>
      ))}
      {/* string lines */}
      {frets.map((_,s)=>(
        <line key={s} x1={8+s*cellW+cellW/2} y1={14} x2={8+s*cellW+cellW/2} y2={14+span*cellH}
          stroke="#2a4050" strokeWidth={[2.2,1.8,1.5,1.2,1,0.7][s]}/>
      ))}
      {/* dots */}
      {frets.map((f,s)=>{
        if(f<0) return <text key={s} x={8+s*cellW+cellW/2} y={10} textAnchor="middle" fontSize={8} fill="#f87171">×</text>;
        if(f===0) return <circle key={s} cx={8+s*cellW+cellW/2} cy={10} r={3} fill="none" stroke={color} strokeWidth={1}/>;
        const row = f - minF;
        return <circle key={s} cx={8+s*cellW+cellW/2} cy={14+row*cellH+cellH/2} r={4.5} fill={color}/>;
      })}
      {/* fret number */}
      {minF > 1 && <text x={2} y={14+cellH/2+4} fontSize={7} fill="#3a5060">{minF}</text>}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════
function App() {
  const [data,      setData]      = useState(DEFAULT_SONGS.bhs);
  const [mainTab,   setMainTab]   = useState("fretboard");   // fretboard | chords | analysis
  const [scaleTab,  setScaleTab]  = useState("modes");       // modes | arps
  const [selId,     setSelId]     = useState("dorian");
  const [boxStart,  setBoxStart]  = useState(0);
  const [showDeg,   setShowDeg]   = useState(false);
  const [jsonError, setJsonError] = useState(null);
  const fileRef = useRef();

  const ac = data.song.accentColor;

  // load JSON file
  const handleFile = e => {
    const file = e.target.files[0];
    if (!file) return;
    const r = new FileReader();
    r.onload = ev => {
      try {
        const parsed = JSON.parse(ev.target.result);
        if (!parsed.schema?.startsWith("harmonic-analysis")) throw new Error("Schema non riconosciuto");
        setData(parsed);
        setMainTab("fretboard");
        setScaleTab("modes");
        setSelId(parsed.modes[0]?.id ?? "");
        setBoxStart(0);
        setJsonError(null);
      } catch(err) {
        setJsonError("JSON non valido: " + err.message);
      }
    };
    r.readAsText(file);
    e.target.value = "";
  };

  // fretboard logic
  const items = scaleTab === "modes" ? data.modes : data.arpeggios;
  const cur   = useMemo(() => items.find(x=>x.id===selId) ?? items[0], [items, selId]);

  const pcs   = useMemo(() => new Set(cur?.intervals.map(i=>(cur.rootPC+i)%12) ?? []), [cur]);
  const pcDeg = useMemo(() => {
    const m={};
    cur?.intervals.forEach(i=>{ m[(cur.rootPC+i)%12]=i; });
    return m;
  }, [cur]);

  const boxEnd = boxStart + 4;
  const inBox  = f => f >= boxStart && f <= boxEnd;

  const rootFrets = s => Array.from({length:13},(_,f)=>f).filter(f=>cur && pc(s,f)===cur.rootPC);
  const r6 = useMemo(()=>rootFrets(0), [cur]);
  const r5 = useMemo(()=>rootFrets(1).filter(f=>f>0), [cur]);

  const jumpTo = strIdx => {
    const roots = strIdx===0 ? r6 : r5;
    const best  = roots.find(f => f <= 9);
    if (best !== undefined) setBoxStart(Math.max(0, best - 2));
  };

  const noteLabel = p => showDeg ? (DEG_MAP[pcDeg[p]] ?? '') : NOTE_NM[p];

  const boxX1 = boxStart===0 ? OPEN_X-10 : BX + (boxStart-1)*FW;
  const boxX2 = BX + boxEnd*FW;

  const btn = (active, color, extra={}) => ({
    background: active ? `${color}15` : "transparent",
    border: `1px solid ${active ? color : "#162030"}`,
    color:  active ? color : "#2a4058",
    borderRadius: 3, cursor:"pointer", fontFamily:"inherit",
    ...extra
  });

  // ── Render helpers ──────────────────────────────────────────────────────
  const SectionChordsRow = ({ section }) => (
    <div style={{marginBottom:16}}>
      <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:6}}>
        <div style={{fontSize:9, letterSpacing:3, textTransform:"uppercase", color: ac}}>{section.label}</div>
        {section.note && <div style={{fontSize:8, color:"#1e3040", fontStyle:"italic"}}>{section.note}</div>}
      </div>
      <div style={{display:"flex", flexWrap:"wrap", gap:4}}>
        {section.chords.map((cid,i) => {
          const ch = data.chords.find(c=>c.id===cid);
          if (!ch) return null;
          return (
            <div key={i} style={{
              padding:"6px 10px", borderRadius:3, minWidth:52, textAlign:"center",
              background: ch.isAlien ? `${ac}18` : "#080e14",
              border: `1px solid ${ch.isAlien ? ac : "#0e1e28"}`,
            }}>
              <div style={{fontSize:14, fontWeight:700, color: ch.isAlien ? ac : "#c0d0e0"}}>{ch.symbol}</div>
              <div style={{fontSize:8, color:"#2a4058", marginTop:2}}>{ch.degree}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // ── Main render ─────────────────────────────────────────────────────────
  return (
    <div style={{
      background:"#040810", minHeight:"100vh", padding:"16px 10px 36px",
      fontFamily:"'Courier New', Courier, monospace", color:"#b8cede",
    }}>

      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start",
                   flexWrap:"wrap", gap:8, marginBottom:16, maxWidth:860, margin:"0 auto 16px"}}>
        {/* Left: song selector */}
        <div style={{display:"flex", gap:6, flexWrap:"wrap"}}>
          {Object.entries(DEFAULT_SONGS).map(([key,s])=>{
            const active = data.song.title === s.song.title;
            return (
              <button key={key}
                onClick={()=>{ setData(s); setScaleTab("modes"); setSelId(s.modes[0]?.id??""); setBoxStart(0); setJsonError(null); }}
                style={{...btn(active, s.song.accentColor), padding:"5px 12px", fontSize:9, letterSpacing:1}}>
                {s.song.title}
              </button>
            );
          })}
          <button onClick={()=>fileRef.current.click()}
            style={{...btn(false,"#4a6a7a"), padding:"5px 12px", fontSize:9, letterSpacing:1}}>
            + JSON
          </button>
          <input ref={fileRef} type="file" accept=".json" style={{display:"none"}} onChange={handleFile}/>
        </div>
        {/* Right: complexity */}
        <div style={{display:"flex", alignItems:"center", gap:6}}>
          <span style={{fontSize:8, color:"#1e3040", letterSpacing:2}}>COMPLESSITÀ</span>
          <Stars n={data.analysis.complexity} color={ac}/>
        </div>
      </div>

      {/* ── SONG HEADER ─────────────────────────────────────────────────── */}
      <div style={{textAlign:"center", marginBottom:18, maxWidth:860, margin:"0 auto 18px"}}>
        {jsonError && (
          <div style={{color:"#f87171", fontSize:10, marginBottom:8, padding:"6px 12px",
                       border:"1px solid #f87171", borderRadius:3, display:"inline-block"}}>{jsonError}</div>
        )}
        <div style={{fontSize:9, letterSpacing:5, color:"#1e3040", textTransform:"uppercase", marginBottom:4}}>
          {data.song.artist} · {data.song.album} · {data.song.year}
        </div>
        <div style={{fontSize:26, fontWeight:700, color:"#ddeeff", letterSpacing:2, marginBottom:4}}>
          {data.song.title}
        </div>
        <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap", gap:12, fontSize:8, color:"#2a4058", letterSpacing:2}}>
          <span>🎸 {data.song.tuning}</span>
          <span>♩ {data.song.timeSignature}</span>
          <span>⏱ {data.song.tempo}</span>
          {data.song.capo > 0 && <span>CAPO {data.song.capo}</span>}
        </div>
        {/* Tonal summary pill */}
        <div style={{display:"flex", justifyContent:"center", flexWrap:"wrap", gap:8, marginTop:10}}>
          <span style={{fontSize:9, padding:"3px 12px", borderRadius:2, letterSpacing:1,
            border:`1px solid ${ac}`, color:ac, background:`${ac}10`}}>
            {data.analysis.tonicNote} · {data.analysis.primaryMode}
          </span>
          <span style={{fontSize:9, padding:"3px 12px", borderRadius:2, letterSpacing:1,
            border:"1px solid #f87171", color:"#f87171", background:"#f8717110"}}>
            ⚡ {data.analysis.alienChord}
          </span>
        </div>
      </div>

      {/* ── MAIN TABS ───────────────────────────────────────────────────── */}
      <div style={{display:"flex", justifyContent:"center", gap:6, marginBottom:18}}>
        {[["fretboard","TASTIERA"],["chords","ACCORDI"],["analysis","ANALISI"]].map(([t,l])=>(
          <button key={t} onClick={()=>setMainTab(t)}
            style={{...btn(mainTab===t, ac), padding:"7px 18px", fontSize:10, letterSpacing:2}}>
            {l}
          </button>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          TAB: TASTIERA
      ════════════════════════════════════════════════════════════════════ */}
      {mainTab === "fretboard" && cur && (
        <div style={{maxWidth:860, margin:"0 auto"}}>

          {/* Scale/Arp tab */}
          <div style={{display:"flex", justifyContent:"center", gap:6, marginBottom:12}}>
            {[["modes","SCALE / MODI"],["arps","ARPEGGI"]].map(([t,l])=>(
              <button key={t}
                onClick={()=>{ setScaleTab(t); setSelId((t==="modes"?data.modes:data.arpeggios)[0]?.id??""); setBoxStart(0); }}
                style={{...btn(scaleTab===t, ac), padding:"5px 16px", fontSize:9, letterSpacing:2}}>
                {l}
              </button>
            ))}
          </div>

          {/* Item pills */}
          <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", gap:5, marginBottom:14}}>
            {items.map(it=>(
              <button key={it.id} onClick={()=>{ setSelId(it.id); setBoxStart(0); }}
                style={{...btn(selId===it.id, it.color), padding:"6px 12px", minWidth:80,
                        display:"flex", flexDirection:"column", alignItems:"center", gap:1}}>
                <span style={{fontWeight:700, fontSize:11}}>{it.label}</span>
                <span style={{fontSize:8, opacity:.7}}>{it.sub}</span>
              </button>
            ))}
          </div>

          {/* Tip banner */}
          {cur.tip && (
            <div style={{maxWidth:580, margin:"0 auto 12px", padding:"8px 14px", borderRadius:3,
              border:`1px solid ${cur.color}30`, background:`${cur.color}08`,
              fontSize:9, color:"#4a7a90", textAlign:"center", letterSpacing:.5, lineHeight:1.6}}>
              💡 {cur.tip}
            </div>
          )}

          {/* Fretboard SVG */}
          <div style={{overflowX:"auto", marginBottom:8}}>
            <svg width={SVG_W} height={SVG_H} style={{display:"block", margin:"0 auto"}}>
              {/* Fret numbers */}
              {Array.from({length:13},(_,f)=>(
                <text key={f} x={nX(f)} y={PT-20} textAnchor="middle"
                  fontSize={9} fill={inBox(f)?"#8aaabf":"#1e3040"} fontFamily="inherit">{f}</text>
              ))}
              {/* Neck */}
              <rect x={BX} y={PT-SH*.45} width={12*FW} height={5*SH+SH*.9} fill="#080e14" rx={3}/>
              {/* Box highlight */}
              <rect x={boxX1} y={PT-SH*.45} width={boxX2-boxX1} height={5*SH+SH*.9}
                fill={cur.color} opacity={.07} rx={5}
                stroke={cur.color} strokeWidth={1.5} strokeOpacity={.3}/>
              {/* Frets */}
              {Array.from({length:12},(_,i)=>{
                const f=i+1, hi=f>boxStart&&f<=boxEnd;
                return <line key={f} x1={BX+f*FW} y1={PT-SH*.4} x2={BX+f*FW} y2={PT+5*SH-SH*.2}
                  stroke={hi?"#4a6a7a":"#111e2a"} strokeWidth={hi?1.5:1}/>;
              })}
              {/* Nut */}
              <rect x={NUT_X} y={PT-SH*.45} width={NUT_W} height={5*SH+SH*.9} fill="#c8a434" rx={2}/>
              {/* Position markers */}
              {[3,5,7,9].map(f=>(
                <circle key={f} cx={BX+(f-.5)*FW} cy={PT+5*SH+12} r={4} fill="#131f2a"/>
              ))}
              <circle cx={BX+11.5*FW} cy={PT+5*SH+6} r={4} fill="#131f2a"/>
              <circle cx={BX+11.5*FW} cy={PT+5*SH+20} r={4} fill="#131f2a"/>
              {/* Strings */}
              {[0,1,2,3,4,5].map(s=>(
                <line key={s} x1={OPEN_X-14} y1={sY(s)} x2={SVG_W-PR/2} y2={sY(s)}
                  stroke="#5a7a90" strokeWidth={[2.5,2.1,1.7,1.3,1.0,.75][s]} opacity={.6}/>
              ))}
              {/* String labels */}
              {STR_LBL.map((nm,s)=>(
                <text key={s} x={OPEN_X-20} y={sY(s)+4}
                  textAnchor="middle" fontSize={10} fill="#2a4058" fontFamily="inherit">{nm}</text>
              ))}
              {/* Note dots */}
              {Array.from({length:13},(_,f)=>
                [0,1,2,3,4,5].map(s=>{
                  const p=pc(s,f);
                  if(!pcs.has(p)) return null;
                  const isRoot=p===cur.rootPC, inside=inBox(f);
                  const x=nX(f), y=sY(s), r=inside?15:6.5;
                  return (
                    <g key={`${s}-${f}`} opacity={inside?1:.18}>
                      <circle cx={x} cy={y} r={r}
                        fill={isRoot?cur.color:inside?`${cur.color}22`:"none"}
                        stroke={cur.color} strokeWidth={isRoot?2.5:1.5}/>
                      {inside&&(
                        <text x={x} y={y+4} textAnchor="middle"
                          fontSize={9} fontWeight="bold" fontFamily="inherit"
                          fill={isRoot?"#020912":cur.color}>
                          {noteLabel(p)}
                        </text>
                      )}
                    </g>
                  );
                })
              )}
              {/* Root labels on string */}
              {r6.filter(f=>inBox(f)).map(f=>(
                <text key={`r6-${f}`} x={nX(f)} y={sY(0)+27}
                  textAnchor="middle" fontSize={7} fill={cur.color} opacity={.7}>6ª</text>
              ))}
              {r5.filter(f=>inBox(f)).map(f=>(
                <text key={`r5-${f}`} x={nX(f)} y={sY(1)+27}
                  textAnchor="middle" fontSize={7} fill={cur.color} opacity={.7}>5ª</text>
              ))}
            </svg>
          </div>

          {/* Box nav */}
          <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:10}}>
            <button disabled={boxStart===0} onClick={()=>setBoxStart(s=>Math.max(0,s-1))}
              style={{...btn(false,"#4a6a7a"), padding:"5px 14px", fontSize:14, opacity:boxStart===0?.25:1}}>◀</button>
            <span style={{fontSize:11, color:"#3a5468", minWidth:100, textAlign:"center", letterSpacing:2}}>
              TASTO {boxStart} – {boxEnd}
            </span>
            <button disabled={boxStart>=8} onClick={()=>setBoxStart(s=>Math.min(8,s+1))}
              style={{...btn(false,"#4a6a7a"), padding:"5px 14px", fontSize:14, opacity:boxStart>=8?.25:1}}>▶</button>
          </div>

          {/* Jump to root */}
          <div style={{display:"flex", justifyContent:"center", gap:8, flexWrap:"wrap", marginBottom:10}}>
            {[{idx:0,label:"ROOT · 6ª",frets:r6},{idx:1,label:"ROOT · 5ª",frets:r5}].map(({idx,label,frets})=>(
              <button key={idx} onClick={()=>jumpTo(idx)}
                style={{...btn(false, cur.color), padding:"5px 12px", fontSize:9, letterSpacing:.5}}>
                ↓ {label} &nbsp;<span style={{opacity:.5}}>[{frets.join(", ")}]</span>
              </button>
            ))}
          </div>

          {/* Root in box badges */}
          <div style={{display:"flex", justifyContent:"center", gap:6, flexWrap:"wrap", marginBottom:14, minHeight:20}}>
            {r6.filter(f=>inBox(f)).map(f=>(
              <span key={f} style={{fontSize:9, padding:"3px 9px", borderRadius:2, letterSpacing:1,
                border:`1px solid ${cur.color}`, color:cur.color, background:`${cur.color}10`}}>
                ROOT · 6ª · tasto {f}</span>
            ))}
            {r5.filter(f=>inBox(f)).map(f=>(
              <span key={f} style={{fontSize:9, padding:"3px 9px", borderRadius:2, letterSpacing:1,
                border:`1px solid ${cur.color}`, color:cur.color, background:`${cur.color}10`}}>
                ROOT · 5ª · tasto {f}</span>
            ))}
          </div>

          {/* Degree toggle */}
          <div style={{display:"flex", justifyContent:"center", marginBottom:18}}>
            <button onClick={()=>setShowDeg(d=>!d)}
              style={{...btn(showDeg, ac), padding:"5px 16px", fontSize:9, letterSpacing:1}}>
              {showDeg ? "♩ MOSTRA NOTE" : "① MOSTRA GRADI"}
            </button>
          </div>

          {/* Formula */}
          <div style={{maxWidth:580, margin:"0 auto"}}>
            <div style={{fontSize:9, color:"#1e3040", textAlign:"center", letterSpacing:4,
              textTransform:"uppercase", marginBottom:10}}>formula · {cur.label}</div>
            <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center", gap:5}}>
              {cur.intervals.map((iv,i)=>{
                const p=(cur.rootPC+iv)%12, isR=iv===0;
                return (
                  <div key={i} style={{
                    display:"flex", flexDirection:"column", alignItems:"center", gap:2,
                    padding:"8px 11px", borderRadius:4, minWidth:46,
                    background: isR?`${cur.color}18`:"#070e18",
                    border:`1px solid ${isR?cur.color:"#0e1e2a"}`
                  }}>
                    <span style={{fontSize:8, color:"#2a4058"}}>{DEG_MAP[iv]??`+${iv}`}</span>
                    <span style={{fontSize:15, fontWeight:700, color:isR?cur.color:"#c0d0e0"}}>{NOTE_NM[p]}</span>
                    <span style={{fontSize:7, color:"#1a2e3a"}}>+{iv}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: ACCORDI
      ════════════════════════════════════════════════════════════════════ */}
      {mainTab === "chords" && (
        <div style={{maxWidth:860, margin:"0 auto"}}>
          {/* Sections overview */}
          <div style={{marginBottom:24}}>
            {data.sections.map(sec => <SectionChordsRow key={sec.id} section={sec}/>)}
          </div>

          <div style={{fontSize:9, letterSpacing:4, color:"#1e3040", textTransform:"uppercase",
            marginBottom:14, textAlign:"center"}}>analisi accordo per accordo</div>

          {/* Chord cards — unique chords only */}
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10}}>
            {data.chords
              .filter((c,i,arr)=>arr.findIndex(x=>x.rootPC===c.rootPC&&x.symbol===c.symbol)===i)
              .map(ch=>(
              <div key={ch.id} style={{
                padding:"14px 14px 12px", borderRadius:4,
                background: ch.isAlien ? `${ac}0c` : "#070e18",
                border:`1px solid ${ch.isAlien ? ac : "#0e1e28"}`,
              }}>
                <div style={{display:"flex", alignItems:"baseline", justifyContent:"space-between", marginBottom:8}}>
                  <span style={{fontSize:22, fontWeight:700, color: ch.isAlien ? ac : "#ddeeff"}}>{ch.symbol}</span>
                  <span style={{fontSize:11, color: ch.isAlien ? ac : "#2a4058", fontWeight:700}}>{ch.degree}</span>
                </div>
                <div style={{fontSize:8, color:"#3a6070", marginBottom:2, letterSpacing:.5}}>{ch.modalOrigin}</div>
                <div style={{fontSize:9, color:"#8aacb8", marginBottom:8, lineHeight:1.4}}>{ch.function}</div>
                <div style={{display:"flex", gap:6, alignItems:"center", marginBottom:8}}>
                  <span style={{fontSize:13, fontWeight:700, color: ch.isAlien ? ac : "#9abac8"}}>{ch.tetradFull}</span>
                  <div style={{display:"flex", gap:3}}>
                    {ch.tensions.map(t=>(
                      <span key={t} style={{fontSize:7, padding:"1px 5px", borderRadius:2,
                        border:`1px solid #1e3040`, color:"#3a5468"}}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{marginBottom:8}}>
                  <VoicingDot voicing={ch.voicing} color={ch.isAlien ? ac : "#4a6a7a"}/>
                  <div style={{textAlign:"center", fontSize:8, color:"#1e3040", marginTop:4, letterSpacing:1}}>
                    {ch.voicing}
                  </div>
                </div>
                {ch.note && (
                  <div style={{fontSize:8, color:"#2a4a5a", borderTop:"1px solid #0e1e28",
                    paddingTop:6, lineHeight:1.5, fontStyle:"italic"}}>{ch.note}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          TAB: ANALISI
      ════════════════════════════════════════════════════════════════════ */}
      {mainTab === "analysis" && (
        <div style={{maxWidth:700, margin:"0 auto"}}>

          {/* Summary */}
          <div style={{padding:"16px 20px", borderRadius:4, marginBottom:20,
            border:`1px solid ${ac}30`, background:`${ac}08`,
            fontSize:11, color:"#8aacb8", lineHeight:1.7}}>
            {data.analysis.summary}
          </div>

          {/* Key facts grid */}
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20}}>
            {[
              ["Centro tonale", `${data.analysis.tonicNote}`, false],
              ["Modo principale", data.analysis.primaryMode, false],
              ["Tecnica", data.analysis.technique, false],
              ["Movimento basso", data.analysis.bassMotion, false],
            ].map(([k,v,alien])=>(
              <div key={k} style={{padding:"12px 14px", borderRadius:3,
                background:"#070e18", border:"1px solid #0e1e28"}}>
                <div style={{fontSize:8, color:"#1e3040", letterSpacing:2, textTransform:"uppercase", marginBottom:4}}>{k}</div>
                <div style={{fontSize:10, color: alien ? "#f87171" : "#9abac8", lineHeight:1.5}}>{v}</div>
              </div>
            ))}
          </div>

          {/* Alien chord spotlight */}
          <div style={{padding:"14px 18px", borderRadius:4, marginBottom:20,
            border:"1px solid #f87171", background:"#f8717108"}}>
            <div style={{fontSize:8, color:"#f87171", letterSpacing:3, textTransform:"uppercase", marginBottom:6}}>
              ⚡ accordo alieno — {data.analysis.alienChord}
            </div>
            <div style={{fontSize:10, color:"#c08080", lineHeight:1.6}}>{data.analysis.alienReason}</div>
          </div>

          {/* Improv guide */}
          <div style={{fontSize:9, letterSpacing:4, color:"#1e3040", textTransform:"uppercase",
            marginBottom:12, textAlign:"center"}}>guida all'improvvisazione</div>
          <div style={{display:"flex", flexDirection:"column", gap:8, marginBottom:24}}>
            {Object.entries(data.improv).map(([secId, info])=>{
              const sec = data.sections.find(s=>s.id===secId);
              return (
                <div key={secId} style={{padding:"12px 14px", borderRadius:3,
                  background:"#060d16", border:`1px solid #0e1e28`}}>
                  <div style={{display:"flex", gap:12, flexWrap:"wrap", marginBottom:6}}>
                    <span style={{fontSize:9, color: ac, fontWeight:700, letterSpacing:1}}>
                      {sec?.label ?? secId.toUpperCase()}
                    </span>
                    <span style={{fontSize:9, color:"#4a7a90"}}>▸ {info.primary}</span>
                    {info.secondary && (
                      <span style={{fontSize:8, color:"#2a5060", fontStyle:"italic"}}>alt: {info.secondary}</span>
                    )}
                  </div>
                  <div style={{fontSize:9, color:"#3a6070", lineHeight:1.5}}>{info.tip}</div>
                </div>
              );
            })}
          </div>

          {/* Complexity breakdown */}
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:8, letterSpacing:3, color:"#1e3040", textTransform:"uppercase", marginBottom:8}}>
              complessità armonica
            </div>
            <Stars n={data.analysis.complexity} color={ac}/>
            <div style={{fontSize:9, color:"#2a4050", marginTop:6}}>{data.analysis.complexity}/5</div>
          </div>
        </div>
      )}

      <div style={{textAlign:"center", fontSize:7, color:"#0e1e28", letterSpacing:2, marginTop:28}}>
        HARMONIC ANALYSIS TOOL · schema {data.schema}
      </div>
    </div>
  );
}
