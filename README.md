# 🎸 Harmonic Fretboard — PWA

Tastiera interattiva per l'analisi armonica. Funziona offline su Android, iOS e desktop come app installata.

---

## 📁 Struttura file

```
fretboard-pwa/
├── index.html          ← App principale
├── manifest.json       ← Config PWA
├── sw.js               ← Service Worker (offline)
├── songs/│   
│   └── <track_name>.json
└── README.md
```

---

## 🚀 Come usarla

> ⚠️ Per installare come PWA serve HTTPS (o localhost).
> Consultare alla pagina: https://pcaravello.github.io/improvfretboard/
> La prima apertura richiede internet — dopo funziona completamente offline.

---


Apri nel browser del PC: `https://pcaravello.github.io/improvfretboard/`



## 📱 Installazione come app

### Android (Chrome)
1. Apri l'URL HTTPS nel browser
2. Aspetta il banner in basso → tocca **INSTALLA**
3. Oppure: menu ⋮ → **Aggiungi a schermata Home**

### iOS (Safari)
1. Apri l'URL HTTPS in **Safari** (non Chrome!)
2. Tocca **⎙ Condividi** (il quadrato con la freccia)
3. Scorri → **Aggiungi a schermata Home**
4. Conferma → l'app appare nella home

### Desktop (Chrome/Edge)
1. Apri l'URL
2. Clicca l'icona 🖥 nella barra dell'indirizzo → **Installa**
3. Oppure: menu ⋮ → **Installa Harmonic Fretboard**

---

## 🎵 Aggiungere nuovi brani

1. Crea un file `.json` seguendo lo schema `harmonic-analysis/1.0`
2. Caricalo nell'app tramite il pulsante **+ JSON** nell'interfaccia
3. Oppure aggiungilo alla cartella `songs/` e aggiorna il `PRECACHE` in `sw.js`

---

## 🔧 Offline — come funziona

Il **Service Worker** (`sw.js`) scarica e mette in cache tutto alla prima visita:
- L'HTML dell'app
- Le librerie React (da CDN)
- I file JSON dei brani

Dopo la prima visita con internet, tutto funziona **senza connessione**.

Per aggiornare la cache dopo modifiche: cambia il numero in `const CACHE = 'fretboard-v1'` → `'fretboard-v2'`

---

## 📐 Schema JSON

Consulta `harmonic-analysis-schema.md` per creare analisi di nuovi brani.

Campi principali:
- `song` — metadati (titolo, artista, accordatura, tempo, colore)
- `analysis` — analisi tonale (tonica, modo, accordo alieno, complessità)
- `sections` — sezioni del brano con progressione accordi
- `chords` — analisi di ogni accordo (grado, origine modale, voicing, tetrade)
- `modes` — scale/modi per l'improvvisazione con colori e suggerimenti
- `arpeggios` — arpeggi tetradici per ogni accordo
- `improv` — guida all'improvvisazione per sezione

---

* Analisi e codice generato con IA, claude Sonnet 4.6 *
