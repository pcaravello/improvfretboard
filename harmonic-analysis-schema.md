# Harmonic Analysis JSON Schema — v1.0

Formato standardizzato per l'analisi armonica di un brano rock/pop.
Compatibile con il componente `fretboard-v2.jsx`.

---

## Root object

```json
{
  "schema":    "harmonic-analysis/1.0",
  "song":      { ... },
  "analysis":  { ... },
  "sections":  [ ... ],
  "chords":    [ ... ],
  "modes":     [ ... ],
  "arpeggios": [ ... ],
  "improv":    { ... }
}
```

---

## `song` — Metadati del brano

```json
{
  "title":         "Black Hole Sun",
  "artist":        "Soundgarden",
  "album":         "Superunknown",
  "year":          1994,
  "tuning":        "Standard (EADGBe)",
  "capo":          0,
  "timeSignature": "4/4",
  "tempo":         "~60 BPM",
  "accentColor":   "#38bdf8"
}
```

| Campo          | Tipo     | Note                              |
|----------------|----------|-----------------------------------|
| `title`        | string   | Titolo del brano                  |
| `artist`       | string   | Artista / band                    |
| `album`        | string   | Album di appartenenza             |
| `year`         | number   | Anno di pubblicazione             |
| `tuning`       | string   | Accordatura chitarra              |
| `capo`         | number   | Posizione capo (0 = nessuno)      |
| `timeSignature`| string   | Es. "4/4", "6/4", "7/4"          |
| `tempo`        | string   | BPM (stringa libera)              |
| `accentColor`  | string   | Colore hex per l'UI del brano     |

---

## `analysis` — Analisi tonale globale

```json
{
  "tonicNote":    "G",
  "tonicPC":      7,
  "primaryMode":  "G Dorico / Aeoliano con mixture",
  "complexity":   5,
  "alienChord":   "Db (bV)",
  "alienReason":  "Quinta abbassata, presente nel modo Frigio...",
  "technique":    "Modal interchange massiccio da modi paralleli",
  "bassMotion":   "Cromatismo discendente nel verse",
  "summary":      "Capolavoro di armonia modale rock..."
}
```

| Campo          | Tipo     | Note                                        |
|----------------|----------|---------------------------------------------|
| `tonicNote`    | string   | Nome della nota tonica (es. "G", "E")       |
| `tonicPC`      | number   | Pitch class 0–11 (C=0 … B=11)              |
| `primaryMode`  | string   | Descrizione del modo principale             |
| `complexity`   | number   | Stelle da 1 a 5                             |
| `alienChord`   | string   | L'accordo più insolito del brano            |
| `alienReason`  | string   | Spiegazione musicologica                    |
| `technique`    | string   | Tecnica armonica principale                 |
| `bassMotion`   | string   | Descrizione del movimento del basso         |
| `summary`      | string   | Paragrafo riassuntivo                       |

---

## `sections` — Sezioni del brano

Array di sezioni con la progressione accordale.

```json
[
  {
    "id":     "verse",
    "label":  "Verse",
    "chords": ["G", "Bb", "F", "C", "Csharpdim", "Eb", "Db", "F"],
    "note":   "Progressione cromatica discendente nel basso"
  },
  {
    "id":     "chorus",
    "label":  "Chorus",
    "chords": ["Eb", "Bb", "F", "C"],
    "note":   "Risoluzione relativa"
  }
]
```

| Campo    | Tipo     | Note                                   |
|----------|----------|----------------------------------------|
| `id`     | string   | Identificatore univoco                 |
| `label`  | string   | Nome visualizzato                      |
| `chords` | string[] | Lista di chord ID (corrispondono a `chords[].id`) |
| `note`   | string?  | Nota descrittiva opzionale             |

---

## `chords` — Analisi di ogni accordo

```json
[
  {
    "id":          "G",
    "symbol":      "G",
    "degree":      "I",
    "modalOrigin": "G Ionio (maggiore)",
    "function":    "Tonica",
    "tetrad":      "Gmaj7",
    "tensions":    ["add9"],
    "tetradFull":  "Gmaj9",
    "voicing":     "320002",
    "rootPC":      7,
    "isAlien":     false,
    "note":        ""
  },
  {
    "id":          "Db",
    "symbol":      "Db",
    "degree":      "bV",
    "modalOrigin": "G Frigio / cromatico",
    "function":    "Accordo alieno — disorientamento psichedelico",
    "tetrad":      "Dbmaj7",
    "tensions":    ["add9"],
    "tetradFull":  "Dbmaj9",
    "voicing":     "x43221",
    "rootPC":      1,
    "isAlien":     true,
    "note":        "Quinta abbassata di G — la mossa più audace del brano"
  }
]
```

| Campo         | Tipo     | Note                                         |
|---------------|----------|----------------------------------------------|
| `id`          | string   | Chiave unica (usata in `sections.chords`)     |
| `symbol`      | string   | Simbolo visualizzato (es. "C#dim")            |
| `degree`      | string   | Grado romano (es. "I", "bVI", "#IVdim")       |
| `modalOrigin` | string   | Modo di provenienza                           |
| `function`    | string   | Funzione armonica                             |
| `tetrad`      | string   | Tetrade base (es. "Gmaj7", "Dm7")             |
| `tensions`    | string[] | Tensioni aggiungibili                         |
| `tetradFull`  | string   | Accordo completo con tensioni                 |
| `voicing`     | string   | Voicing in tablatura (x=muto, 0=open)         |
| `rootPC`      | number   | Pitch class della fondamentale (0–11)         |
| `isAlien`     | boolean  | True = accordo di interscambio/alieno         |
| `note`        | string?  | Nota descrittiva opzionale                    |

---

## `modes` — Scale/Modi per l'improvvisazione

```json
[
  {
    "id":       "dorian",
    "label":    "G Dorico",
    "sub":      "Verse & Chorus",
    "rootPC":   7,
    "intervals": [0, 2, 3, 5, 7, 9, 10],
    "color":    "#38bdf8",
    "sections": ["verse", "chorus"],
    "tip":      "Copre G, Bb, F, C contemporaneamente — scala raccomandata"
  }
]
```

| Campo       | Tipo     | Note                                         |
|-------------|----------|----------------------------------------------|
| `id`        | string   | Identificatore univoco                        |
| `label`     | string   | Nome della scala/modo                         |
| `sub`       | string   | Sottotitolo / sezione consigliata             |
| `rootPC`    | number   | Pitch class della radice (0–11)               |
| `intervals` | number[] | Intervalli in semitoni dalla radice           |
| `color`     | string   | Colore hex per la visualizzazione             |
| `sections`  | string[] | ID delle sezioni in cui si usa               |
| `tip`       | string   | Consiglio per l'improvvisatore                |

---

## `arpeggios` — Arpeggi tetradici

```json
[
  {
    "id":        "gmaj7",
    "label":     "Gmaj7",
    "sub":       "I · verse",
    "rootPC":    7,
    "intervals": [0, 4, 7, 11],
    "color":     "#38bdf8",
    "chordRef":  "G",
    "tip":       "Note comuni con E come quinta — voice leading liscissimo"
  }
]
```

| Campo      | Tipo     | Note                                     |
|------------|----------|------------------------------------------|
| `id`       | string   | Identificatore univoco                    |
| `label`    | string   | Simbolo dell'accordo                      |
| `sub`      | string   | Grado + sezione                           |
| `rootPC`   | number   | Pitch class della radice (0–11)           |
| `intervals`| number[] | Intervalli (di solito 4 note = tetrade)   |
| `color`    | string   | Colore hex                                |
| `chordRef` | string   | ID corrispondente in `chords`             |
| `tip`      | string   | Consiglio per l'uso                       |

---

## `improv` — Guide all'improvvisazione per sezione

```json
{
  "verse": {
    "primary":   "G Dorico",
    "secondary": "G minore pentatonica",
    "tip":       "Copre G, Bb, F, C contemporaneamente"
  },
  "bridge": {
    "primary":   "E Frigio",
    "secondary": "Arpeggi tetradici per accordo",
    "tip":       "Su Db: massima tensione rispetto a G"
  }
}
```

Oggetto con chiavi = section ID, valore = oggetto con:

| Campo       | Tipo   | Note                          |
|-------------|--------|-------------------------------|
| `primary`   | string | Scala/modo principale         |
| `secondary` | string | Alternativa / approccio safe  |
| `tip`       | string | Nota per l'improvvisatore     |

---

## Pitch Class Reference

| PC | 0  | 1   | 2  | 3   | 4  | 5  | 6   | 7  | 8   | 9  | 10 | 11 |
|----|----|----|----|----|----|----|----|----|----|----|----|----|
| 🎵 | C  | C# | D  | Eb | E  | F  | F# | G  | Ab | A  | Bb | B  |
