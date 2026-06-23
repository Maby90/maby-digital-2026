# Redesign sito maby-digital — AI-systems first + motion futuristico

Data: 2026-06-23
Repo: `~/Desktop/Personal Branding/Sito web nuovo/maby-digital`
Stack: React 19 + Vite 7 + Tailwind 3 + GSAP 3.15 + Notion API, deploy Vercel.

## Obiettivo

Rinnovare il sito personale di Maby Prochilo con due assi:

1. **Riposizionamento AI-first.** Il filo conduttore diventa: *progetto e installo sistemi AI per
   aziende — agenti, automazioni, Claude Code — con un background marketing che li rende usabili e
   orientati al risultato.* Marketing degradato a cenno, non più headline.
2. **Motion design "dal futuro".** Animazioni GSAP avanzate (scroll-driven, reveal, parallax,
   WebGL backdrop, cursore custom, intro loader) che fanno percepire il sito come prodotto premium.

Vincoli: mantenere design system (mint + Geist + dark/light), infra Notion/newsletter/SEO/Vercel,
e **la finestra simulata dell'agente** (PromptBox) — anzi potenziarla.

## Approccio

Reframe in-place (approccio A). Si riusano componenti e infra esistenti; si riscrive il copy e si
aggiunge un layer di motion + una nuova sezione Progetti. Nessun rebuild.

## Architettura motion

- **Librerie:** `gsap`, `@gsap/react` (useGSAP), `ScrollTrigger`, `SplitText` (free in GSAP 3.15).
  Registrare i plugin una volta in un modulo `src/lib/gsap.js`.
- **Accessibilità:** rispettare `prefers-reduced-motion` — un helper `motionOK()` disabilita reveal,
  parallax, WebGL e cursore custom, lasciando contenuto statico e leggibile.
- **Performance:** animare solo `transform`/`opacity`/`filter`; `will-change` mirato; ScrollTrigger
  con `once: true` dove possibile; WebGL in pausa quando fuori viewport (IntersectionObserver) e su
  mobile (fallback statico).
- **Hook condiviso:** `src/hooks/useReveal.js` — wrapper su useGSAP che applica reveal staggered
  (blur+translateY+opacity) a elementi con `data-reveal`.

## Componenti — modifiche

### Nuovi
- `src/lib/gsap.js` — registrazione plugin + `motionOK()`.
- `src/hooks/useReveal.js` — reveal scroll-driven riusabile.
- `src/components/HeroBackdrop.jsx` — canvas WebGL: mesh gradiente animato / constellation
  particellare reattiva al cursore, palette mint su near-black. Fallback statico (grid+glow) se
  reduced-motion o mobile o WebGL non disponibile.
- `src/components/CustomCursor.jsx` — dot mint che segue il puntatore, scala/avvolge gli elementi
  interattivi (`a`, `button`, `[data-cursor]`). Disattivo su touch e reduced-motion.
- `src/components/IntroLoader.jsx` — sequenza al primo load: mask-wipe + logo "m", poi reveal hero.
  Mostrato una volta per sessione (sessionStorage), saltato con reduced-motion.
- `src/components/Projects.jsx` — nuova sezione Progetti (vedi sotto).

### Modificati
- `src/App.jsx` — montare IntroLoader + CustomCursor a livello app; inserire `<Projects />` nella
  Home (dopo Protocol, prima di NewsletterPreview); aggiornare SEO title/description AI-first.
- `src/components/Navbar.jsx` — aggiungere link `Progetti` (`/#progetti`).
- `src/components/Hero.jsx` — nuovo H1 AI-first con SplitText reveal char-by-char (blur+clip+stagger);
  HeroBackdrop dietro; bottoni magnetici + sweep bordo; stats count-up on enter; sub copy AI-first
  con cenno marketing; PromptBox invariato come nodo, montato dentro.
- `src/components/PromptBox.jsx` — aggiornare `samples`/`responses` a temi AI-systems (agenti,
  automazioni, Claude Code, knowledge base) con un prompt marketing residuo; aggiungere fase
  "thinking" (shimmer) prima dello streaming. Logica streaming/cursore invariata.
- `src/components/About.jsx` — riscrivere lead: da "AI marketing consultant" a "progetto sistemi AI
  per aziende"; mantenere storia architettura→digitale ed etica; LearnCast come prova "costruisco
  prodotti"; marketing come una sfaccettatura. Stats strip → Agenti / Automazioni / Claude Code /
  Marketing. Aggiungere reveal.
- `src/components/Features.jsx` (Servizi) — riordino AI-first:
  01 Agenti AI custom · 02 Automazioni & workflow (n8n/Make) · 03 Skill & knowledge base Claude Code ·
  04 Marketing & posizionamento (il cenno). Mantenere la matrice "Stack AI 2026". Reveal staggered
  sulle card.
- `src/components/Protocol.jsx` — **sezione pinnata**: ScrollTrigger pin con step che si rivelano
  mentre si scorre e linea di progresso che si "disegna". Reframe copy: Audit → Progettazione sistema
  AI → Integrazione & handoff.
- `src/components/Philosophy.jsx` — micro-tweak copy verso "sistemi AI"; reveal del titolo SplitText.
- `src/components/Action.jsx` — micro-tweak copy (CTA verso progetti AI). Magnetic CTA. Reveal.
- `src/index.css` — utility per cursore custom (nascondere cursore di sistema quando attivo),
  classi per sweep bordo / tilt 3D / marquee, keyframe shimmer per PromptBox.

## Sezione Progetti (`#progetti`)

Card con link esterni, scroll orizzontale pinnato (sticky) su desktop, stack verticale su mobile,
tilt 3D on hover.

1. **useskill.it** — store di skill AI pronte all'uso. → https://useskill.it
2. **getbusinessbrain.it** — sistema AI ricorrente B2B (Business Brain). → https://getbusinessbrain.it
3. **LearnCast** — app iOS: articoli/PDF → podcast a due voci. → App Store.
4. **Oltre il prompt** — newsletter su AI applicata. → `/newsletter` (interno).

Ogni card: nome, una riga di descrizione, tag tecnologici, freccia "apri". `rel="noopener"` sui
link esterni.

## Copy — riposizionamento (linee guida)

- Hero H1: headline AI-systems (es. "Sistemi AI che lavorano per la tua azienda.").
- Sub: agenti + automazioni + Claude Code; una riga marketing ("con un occhio al marketing che li
  rende usabili").
- Voce: empatica e diretta, niente buzzword vuote, niente em dash, sentence case. Rispettare
  `context/voice-rules.md` del workspace contenuti.

## SEO

Aggiornare title/description Home:
- title: "Maby Prochilo · Sistemi AI per aziende — agenti, automazioni, Claude Code"
- description: AI-first con cenno marketing, target freelance/PMI/B2B Italia ed Europa.
Aggiornare `public/sitemap.xml` se serve la voce Progetti (è in-page, quindi probabilmente no).

## Fuori scope

- Nessun cambio a palette/font/tema.
- Nessun rebuild architetturale.
- Nessun cambio alle API Notion/newsletter se non il copy.
- Niente terracotta (resta brand dei caroselli, non del sito).

## Verifica

- `npm run dev` + preview: hero reveal, backdrop WebGL, cursore, intro loader, Protocol pinnato,
  Projects scroll orizzontale, PromptBox streaming.
- Console senza errori; test reduced-motion (fallback statici); mobile (no WebGL/cursore, layout ok).
- `npm run build` pulito.
