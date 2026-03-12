# 🎸 Harmonic Fretboard — PWA

Tastiera interattiva per l'analisi armonica. Funziona offline su Android, iOS e desktop come app installata.

---

## 📁 Struttura file

```
fretboard-pwa/
├── index.html          ← App principale
├── manifest.json       ← Config PWA
├── sw.js               ← Service Worker (offline)
├── songs/
│   ├── black_hole_sun.json
│   ├── fell_on_black_days.json
│   └── axis_bold_as_love.json
└── README.md
```

---

## 🚀 Come usarla

> ⚠️ Per installare come PWA serve HTTPS (o localhost).  
> La prima apertura richiede internet — dopo funziona completamente offline.

---

### Opzione 1 — GitHub Pages (RACCOMANDATO — gratuito, HTTPS automatico)

1. Vai su [github.com](https://github.com) → crea account gratuito
2. Crea un nuovo repository pubblico (es. `fretboard`)
3. Carica tutti i file (trascina nella pagina del repo)
4. Vai in **Settings → Pages → Source: main branch → Save**
5. Dopo 1-2 minuti l'app sarà su `https://tuonome.github.io/fretboard/`
6. Apri quell'URL dal telefono → installa come app

---

### Opzione 2 — Server locale (PC → telefono sulla stessa rete WiFi)

**Requisiti:** Python 3 (preinstallato su Mac/Linux, scaricabile su Windows)

```bash
# Entra nella cartella
cd fretboard-pwa

# Avvia server
python3 -m http.server 8080

# Oppure su Windows:
python -m http.server 8080
```

Poi apri nel browser del PC: `http://localhost:8080`

Per accedere dal telefono sulla stessa rete WiFi:
1. Trova l'IP del tuo PC (es. `192.168.1.5`)
2. Apri nel browser del telefono: `http://192.168.1.5:8080`

> ⚠️ Su localhost funziona su Chrome Android.  
> Su iOS Safari richiede HTTPS → usa Opzione 1 o 3.

---

### Opzione 3 — Tunnel HTTPS locale con ngrok (iOS + Android)

```bash
# Installa ngrok (gratis): https://ngrok.com
# Avvia il server locale (come sopra), poi in un altro terminale:
ngrok http 8080

# Ngrok ti darà un URL tipo: https://abc123.ngrok.io
# Apri quell'URL dal telefono
```

---

### Opzione 4 — Netlify Drop (drag & drop, HTTPS immediato)

1. Vai su [netlify.com/drop](https://app.netlify.com/drop)
2. Trascina l'intera cartella `fretboard-pwa/`
3. Netlify pubblica immediatamente con URL HTTPS
4. Nessun account necessario per il primo deploy

---

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

*Brani inclusi: Black Hole Sun (Soundgarden) · Fell on Black Days (Soundgarden) · Axis: Bold as Love (Jimi Hendrix)*
