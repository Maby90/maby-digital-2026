import React, { useRef, useState, useEffect } from 'react';
import {
    Check, ArrowUpRight, ArrowRight, ArrowLeft, Loader2, AlertCircle,
    Wrench, Repeat, ShieldCheck, Sparkles, FileText, Terminal, Plug,
    LifeBuoy, Video, Boxes, Award, BookOpen, Users, CalendarClock, Cpu, Headset,
    Radar, PenTool, Globe, Search, Send, Clock,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, SplitText, EASE, motionOK } from '../lib/gsap';
import Navbar from './Navbar';
import Footer from './Footer';
import useSeo from '../hooks/useSeo';

/* ------------------------------------------------------------------ *
 * "AI nel tuo lavoro" — landing affiancamento 1:1 (3 mesi, 3 posti)
 * Dark / mint / Geist. Simulatore ore animato + professioni rotanti.
 * ------------------------------------------------------------------ */

const PROFESSIONI = [
    'avvocato', 'nutrizionista', 'architetto', 'content creator',
    'commercialista', 'consulente', 'psicologo', 'copywriter',
    'fotografo', 'formatore',
];

const SETT_LAVORATIVE = 46; // settimane lavorate/anno
const ORE_GIORNO = 8;

/* esempi mostrati nel terminale animato (comando naturale → risultato) */
const SKILL_EXAMPLES = [
    { cmd: 'Controlla i miei competitor e mandami un report ogni lunedì', out: 'Report settimanale attivo · prossimo invio lunedì 9:00' },
    { cmd: 'Prepara i follow-up per i clienti fermi da una settimana', out: '12 email pronte, personalizzate, da rileggere' },
    { cmd: 'Trasforma la call di oggi in un post, una newsletter e un reel', out: '3 bozze pronte nella tua cartella' },
    { cmd: 'Crea la landing del nuovo servizio, con i miei colori', out: 'Sito online · anteprima pronta da rivedere' },
    { cmd: 'Ordina e riassumi i documenti nuovi del cliente', out: '8 documenti in una scheda sola, punti chiave in evidenza' },
    { cmd: 'Ogni mattina preparami la giornata: mail, agenda, priorità', out: 'Routine attiva · il riepilogo ti aspetta alle 8:00' },
];

const CATEGORIE = [
    { icon: PenTool, t: 'Contenuti pronti', d: 'Post, caroselli, newsletter e reel dalle tue idee o da una call.' },
    { icon: Send, t: 'Follow-up clienti', d: 'Le email giuste alle persone giuste, senza rimandarle per giorni.' },
    { icon: Radar, t: 'Monitoraggio competitor', d: 'Cosa fanno gli altri, riassunto e recapitato quando decidi tu.' },
    { icon: Users, t: 'Gestione clienti', d: 'Schede, storici e promemoria sempre in ordine, senza cercarli.' },
    { icon: Clock, t: 'Routine e task automatici', d: 'Le cose ricorrenti che partono da sole, nel giorno e all’ora che decidi tu.' },
    { icon: Globe, t: 'Siti e landing', d: 'Pagine on-brand costruite in un pomeriggio, non in due settimane.' },
    { icon: FileText, t: 'Preventivi e documenti', d: 'Bozze ricorrenti compilate al posto tuo, pronte da controllare.' },
    { icon: Search, t: 'Ricerca e sintesi', d: 'Documenti, bandi e materiali lunghi ridotti a quello che ti serve.' },
];

/* cose che partono da sole, senza che tu le chieda (task pianificati) */
const AUTOMATISMI = [
    {
        quando: 'ogni mattina · 7:30',
        t: 'La giornata già preparata',
        d: 'Le mail che meritano una risposta oggi, gli appuntamenti, le due o tre cose che contano davvero. Quando apri il computer è già lì.',
    },
    {
        quando: 'ogni lunedì · 9:00',
        t: 'Cosa hanno fatto gli altri',
        d: 'Siti, social e newsletter dei tuoi concorrenti, guardati e riassunti. Tu leggi mezza pagina invece di perderci un’ora.',
    },
    {
        quando: 'ogni martedì · 18:00',
        t: 'I follow-up che rimandi',
        d: 'Chi non ti risponde da una settimana, chi aspetta un preventivo, chi ha chiuso e va risentito. Le mail sono già scritte: tu leggi e mandi.',
    },
    {
        quando: 'ogni venerdì · 17:00',
        t: 'I contenuti della settimana dopo',
        d: 'Dalle tue idee, dalle call, da quello che hai scritto: bozze pronte da sistemare. Il foglio bianco del lunedì non esiste più.',
    },
    {
        quando: 'il primo del mese',
        t: 'Le scadenze e i conti',
        d: 'Cosa va fatturato, cosa scade, cosa si rinnova. Un promemoria solo, con dentro le cose giuste.',
    },
    {
        quando: 'quando arriva una richiesta',
        t: 'La risposta già impostata',
        d: 'Un nuovo contatto ti scrive: trovi la bozza di risposta pronta e la scheda del cliente già compilata. A te resta decidere.',
    },
];

/* cose che prima non erano sul tavolo (capacità nuova, non velocità) */
const NUOVE_COSE = [
    {
        icon: Globe,
        t: 'La pagina del servizio nuovo',
        d: 'Finora voleva dire un preventivo, due settimane di attesa e il servizio fermo nel cassetto. Adesso la metti online in un pomeriggio e la cambi quando ti pare.',
    },
    {
        icon: Boxes,
        t: 'Un’area riservata ai tuoi clienti',
        d: 'Materiali, avanzamento e documenti in un posto solo, con il tuo nome sopra. Il tipo di cosa per cui finora bisognava chiamare qualcuno.',
    },
    {
        icon: Search,
        t: 'Duecento documenti letti sul serio',
        d: 'Bandi, contratti, verbali, risposte di un questionario. Materiale che a mano non avresti mai aperto tutto, e che diventa una scheda con dentro solo quello che ti serve.',
    },
    {
        icon: PenTool,
        t: 'Il canale che rimandi da due anni',
        d: 'La newsletter, i contenuti, il podcast. Restavano fuori per mancanza di tempo, e il tempo si libera quando la prima stesura non la scrivi più tu.',
    },
];

const scrollToForm = () => {
    const el = document.getElementById('candidati');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

/* ---- contenuti statici ------------------------------------------- */

const FASI = [
    {
        icon: Wrench,
        tag: 'Ottobre',
        title: 'Si costruisce',
        body: 'Call ravvicinate, quasi settimanali. Installiamo tutto, colleghiamo i tuoi strumenti, montiamo le prime automazioni sui processi che ti mangiano più tempo. La parte tecnica la faccio io, a schermo condiviso, spiegandoti cosa sto facendo e perché.',
    },
    {
        icon: Repeat,
        tag: 'Novembre – dicembre',
        title: 'Si consolida',
        body: 'Call più diradate e più strategiche. Tu lavori sul reale, incontri i casi veri, io aggiusto il sistema sul tuo mondo che cambia. A metà percorso ci fermiamo e ripianifichiamo su quello che serve davvero.',
    },
    {
        icon: ShieldCheck,
        tag: 'Da gennaio',
        title: 'Vai avanti da solo',
        body: 'L’AI è dentro il tuo modo di lavorare, e il sistema regge senza di me. Quando qualcosa si rompe, sai sistemarlo con le tue mani.',
    },
];

const PERCORSO = [
    { icon: Users, t: 'Tre mesi uno a uno', d: 'Io e te, mai in gruppo. Tre mesi in cui non ti mollo finché l’AI non è dentro il tuo lavoro davvero.' },
    { icon: CalendarClock, t: 'Sei call 1:1', d: 'A schermo condiviso: costruisco io, tu vedi nascere il tuo sistema pezzo per pezzo e impari a usarlo. Ravvicinate all’inizio per costruire, poi strategiche per consolidare.' },
    { icon: Cpu, t: 'Il tuo sistema su Claude Code', d: 'Skill e automazioni costruite sul tuo mestiere (contenuti, follow-up, monitoraggio, routine, siti), con i tuoi strumenti collegati: Notion, Drive, posta, calendario, immagini.' },
    { icon: Headset, t: 'Supporto email e Telegram', d: 'Ti blocchi tra una call e l’altra? Mi scrivi su email o Telegram e ti sblocco in giornata, senza aspettare la volta dopo.' },
];

const MATERIALI = [
    { icon: Boxes, t: 'Il tuo Notion OS', d: 'Il sistema documentato che cresce durante il percorso e resta tuo: la roadmap, ogni automazione, il log delle call. Il tuo manuale, cucito su di te.' },
    { icon: Terminal, t: 'Libreria comandi', d: 'I comandi pronti per il tuo mestiere, testati insieme nelle call. Copi, incolli, funziona.' },
    { icon: BookOpen, t: 'Guida a Claude Code', d: 'Il manuale d’ingresso per partire, scritto per chi non è tecnico.' },
    { icon: Plug, t: 'Cheat-sheet MCP', d: 'Quale strumento collegare per cosa: Notion, Drive, posta, calendario, immagini. Con il setup passo passo.' },
    { icon: LifeBuoy, t: '“Quando si rompe”', d: 'Le dieci cose che si inceppano più spesso, e come rimetterle a posto da solo.' },
    { icon: Video, t: 'Registrazioni delle call', d: 'Ogni call registrata e ordinata per argomento. Riguardi quando vuoi, niente appunti.' },
    { icon: FileText, t: 'Accesso alle skill useskill.it', d: 'Le skill già pronte utili al tuo lavoro, incluse nel percorso.' },
    { icon: Award, t: 'Attestato di completamento', d: 'A fine percorso, da mettere dove vuoi.' },
];

const FAQ = [
    ['“Non sono tecnico, ce la farò?”', 'Il percorso è pensato apposta per chi non scrive codice. Parli all’AI nella lingua del tuo lavoro, e io ti guido passo passo. Se sai usare Notion o la posta, hai già tutto quello che serve per partire.'],
    ['“Tre mesi bastano?”', 'Bastano se sono pieni. Il primo mese costruiamo, i due dopo li passi a usare il sistema sul lavoro vero mentre io lo aggiusto su quello che incontri. Serve quel tempo lì perché un modo nuovo di lavorare smetta di essere uno sforzo e diventi la tua normalità. Quello che non basta è guardare un corso e riprovarci da solo.'],
    ['“E se una cosa parte da sola e sbaglia?”', 'Quello che esce verso l’esterno, come le mail ai clienti, si ferma un passo prima: trovi la bozza pronta e decidi tu se mandarla. Gira da solo quello che raccoglie, riassume e prepara. Se qualcosa si inceppa te ne accorgi subito, perché il risultato non arriva, e nel percorso impari a rimetterlo in piedi da solo.'],
    ['“Perché non mi basta un corso da 200 euro?”', 'I corsi te li sei già guardati, e infatti sei ancora qui a fare tutto a mano. La teoria uguale per tutti la trovi ovunque. Qui costruiamo il sistema sul tuo lavoro, e resto finché non gira davvero.'],
    ['“E se poi non lo uso?”', 'È la ragione per cui il percorso non finisce alla consegna e c’è la revisione di metà. Il mio lavoro è che tu le automazioni le usi, non che io te le consegni. Se qualcosa non entra nel tuo lavoro reale, lo cambiamo finché non entra.'],
    ['“Perché solo tre posti?”', 'Oltre i tre non riesco più a cucire il percorso addosso a ognuno, e diventerebbe un corso mascherato. Preferisco seguire bene poche persone.'],
];

/* ---- parola rotante (professioni) -------------------------------- */

const RotatingWord = () => {
    const ref = useRef(null);
    const [i, setI] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setI((v) => (v + 1) % PROFESSIONI.length), 2200);
        return () => clearInterval(id);
    }, []);

    useGSAP(() => {
        if (!motionOK() || !ref.current) return;
        gsap.fromTo(ref.current,
            { yPercent: 60, autoAlpha: 0, filter: 'blur(6px)' },
            { yPercent: 0, autoAlpha: 1, filter: 'blur(0px)', duration: 0.5, ease: EASE });
    }, { dependencies: [i] });

    return (
        <span className="relative inline-block overflow-hidden align-bottom" style={{ minWidth: '11ch' }}>
            <span ref={ref} className="text-mint whitespace-nowrap">{PROFESSIONI[i]}</span>
        </span>
    );
};

/* ---- simulatore ore recuperate ----------------------------------- */

const AnimatedNumber = ({ value, className }) => {
    const ref = useRef(null);
    const prev = useRef(0);
    useGSAP(() => {
        if (!ref.current) return;
        const obj = { v: prev.current };
        gsap.to(obj, {
            v: value, duration: 0.7, ease: 'power2.out',
            onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(obj.v); },
        });
        prev.current = value;
    }, { dependencies: [value] });
    return <span ref={ref} className={className}>{value}</span>;
};

const TimeSimulator = () => {
    const [ore, setOre] = useState(8);
    const oreAnno = ore * SETT_LAVORATIVE;
    const giorni = Math.round(oreAnno / ORE_GIORNO);
    const settimane = (giorni / 5).toFixed(1);

    return (
        <div className="panel p-7 md:p-9">
            <div className="font-mono text-xs uppercase tracking-widest text-mint mb-6 flex items-center gap-2">
                <Sparkles size={13} /> simulatore
            </div>
            <label className="block text-fg text-lg md:text-xl font-display font-medium mb-6">
                Quante ore a settimana perdi in lavoro ripetitivo?
            </label>

            <div className="flex items-center gap-4 mb-2">
                <input
                    type="range" min="1" max="20" value={ore}
                    onChange={(e) => setOre(Number(e.target.value))}
                    className="w-full accent-mint cursor-pointer"
                    aria-label="Ore perse a settimana"
                />
                <div className="font-display font-medium text-3xl text-mint w-16 text-right tabular-nums">
                    {ore}
                </div>
            </div>
            <div className="flex justify-between font-mono text-[10px] text-dim mb-8">
                <span>1 ora</span><span>20 ore</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-lg bg-bg border border-line p-4">
                    <AnimatedNumber value={oreAnno} className="font-display font-medium text-2xl md:text-3xl text-fg tabular-nums" />
                    <div className="text-mute text-xs mt-1">ore all’anno</div>
                </div>
                <div className="rounded-lg bg-bg border border-line p-4">
                    <AnimatedNumber value={giorni} className="font-display font-medium text-2xl md:text-3xl text-fg tabular-nums" />
                    <div className="text-mute text-xs mt-1">giorni di lavoro</div>
                </div>
                <div className="rounded-lg bg-mint/10 border border-mint/25 p-4">
                    <span className="font-display font-medium text-2xl md:text-3xl text-mint tabular-nums">{settimane}</span>
                    <div className="text-mute text-xs mt-1">settimane piene</div>
                </div>
            </div>

            <p className="text-mute text-sm leading-relaxed mt-6">
                Ecco quanto tempo torna a te ogni anno, quando il ripetitivo lo fa l’AI. Tempo per il lavoro che conta. O per staccare.
            </p>
            <button onClick={scrollToForm} className="btn-primary w-full justify-center mt-5">
                Riprenditi quel tempo <ArrowRight size={16} />
            </button>
        </div>
    );
};

/* ---- terminale animato: cosa puoi costruire ---------------------- */

const SkillTerminal = () => {
    const [idx, setIdx] = useState(0);
    const [typed, setTyped] = useState('');
    const [phase, setPhase] = useState('typing'); // typing | output | hold

    useEffect(() => {
        const ex = SKILL_EXAMPLES[idx];
        let t;
        if (phase === 'typing') {
            if (typed.length < ex.cmd.length) {
                t = setTimeout(() => setTyped(ex.cmd.slice(0, typed.length + 1)), 28);
            } else {
                t = setTimeout(() => setPhase('output'), 400);
            }
        } else if (phase === 'output') {
            t = setTimeout(() => setPhase('hold'), 2200);
        } else {
            t = setTimeout(() => {
                setTyped(''); setPhase('typing');
                setIdx((i) => (i + 1) % SKILL_EXAMPLES.length);
            }, 300);
        }
        return () => clearTimeout(t);
    }, [typed, phase, idx]);

    return (
        <div className="panel overflow-hidden font-mono text-sm">
            <div className="px-4 py-2.5 border-b border-line bg-elev/40 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-mint/70" />
                <span className="ml-2 text-[11px] uppercase tracking-widest text-dim">il-tuo-sistema</span>
            </div>
            <div className="p-5 md:p-6 min-h-[132px]">
                <div className="flex gap-2 text-fg">
                    <span className="text-mint shrink-0">tu ›</span>
                    <span>
                        {typed}
                        {phase === 'typing' && <span className="inline-block w-2 h-4 -mb-0.5 bg-mint animate-pulse ml-0.5" />}
                    </span>
                </div>
                {phase !== 'typing' && (
                    <div className="flex gap-2 mt-4 text-mute">
                        <span className="text-dim shrink-0">✓</span>
                        <span className="text-mint/90">{SKILL_EXAMPLES[idx].out}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

/* ================================================================== */

const AiNelTuoLavoro = () => {
    useSeo({
        path: '/ai-nel-tuo-lavoro',
        title: 'AI nel tuo lavoro · Affiancamento 1:1 · Maby Prochilo',
        description: 'Tre mesi uno a uno per mettere l’AI dentro il tuo lavoro su Claude Code. Lascia all’AI il lavoro ripetitivo, concentrati su quello che conta. Tre posti, si entra per candidatura.',
        image: 'https://mprochilo.it/og-image.png',
        robots: 'index, follow',
    });

    const root = useRef(null);

    useGSAP(() => {
        if (!motionOK()) return;
        const split = new SplitText('.antl-title', { type: 'chars, words', charsClass: 'hero-char' });
        const tl = gsap.timeline({ delay: 0.1 });
        tl.from('.antl-pill', { autoAlpha: 0, y: 12, duration: 0.5, ease: EASE })
            .from('.antl-kicker', { autoAlpha: 0, y: 10, duration: 0.4, ease: EASE }, '-=0.2')
            .from(split.chars, { autoAlpha: 0, yPercent: 100, filter: 'blur(10px)', stagger: 0.014, duration: 0.8, ease: EASE }, '-=0.1')
            .from('.antl-sub', { autoAlpha: 0, y: 14, duration: 0.6, ease: EASE }, '-=0.4')
            .from('.antl-cta', { autoAlpha: 0, y: 12, duration: 0.5, ease: EASE }, '-=0.35')
            .from('.antl-sim', { autoAlpha: 0, y: 30, scale: 0.98, duration: 0.8, ease: EASE }, '-=0.3');

        gsap.utils.toArray('.reveal').forEach((el) => {
            gsap.from(el, {
                autoAlpha: 0, y: 26, duration: 0.7, ease: EASE,
                scrollTrigger: { trigger: el, start: 'top 86%' },
            });
        });

        // stagger sui gruppi (materiali, fasi, faq)
        gsap.utils.toArray('.stagger-group').forEach((grp) => {
            gsap.from(grp.children, {
                autoAlpha: 0, y: 22, duration: 0.6, ease: EASE, stagger: 0.08,
                scrollTrigger: { trigger: grp, start: 'top 82%' },
            });
        });

        return () => split.revert();
    }, { scope: root });

    return (
        <div ref={root} className="min-h-screen flex flex-col bg-bg text-fg">
            <Navbar />

            {/* ---------- HERO ---------- */}
            <section className="relative overflow-hidden pt-28 md:pt-36 pb-20 border-b border-line">
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="absolute inset-x-0 top-0 h-[90vh] bg-radial-fade" />
                <div className="relative container-edge w-full">
                    <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                        <div className="lg:col-span-7">
                            <span className="antl-pill pill mb-7 inline-flex">
                                <span className="pill-dot" />
                                Coorte 1.0 · affiancamento 1:1 · da ottobre
                            </span>
                            <div className="antl-kicker font-mono text-sm md:text-base text-mute mb-4">
                                Per chi fa il/la <RotatingWord />
                            </div>
                            <h1 className="antl-title font-display font-medium text-4xl sm:text-5xl md:text-6xl lg:text-[64px] leading-[1.02] tracking-tightest text-balance">
                                Lascia all’AI il lavoro ripetitivo,<br className="hidden md:block" />
                                <span className="text-mint"> concentrati su quello che conta.</span>
                            </h1>
                            <p className="antl-sub mt-8 text-mute text-lg md:text-xl leading-relaxed max-w-2xl">
                                In tre mesi l’AI entra nel tuo lavoro di ogni giorno. La costruiamo insieme, con Claude Code e gli strumenti giusti per il tuo mestiere: un sistema su misura, che diventa tuo. Un percorso uno a uno, tre persone selezionate a coorte. Si parte a ottobre e si chiude a dicembre: il 2027 lo cominci con il sistema già rodato.
                            </p>
                            <p className="antl-sub mt-4 text-fg/80 text-base leading-relaxed max-w-2xl">
                                Questa è la <span className="text-mint">prima coorte in assoluto</span>: tre posti, al prezzo di lancio di <span className="text-fg font-medium">€3.900</span>, oppure tre rate da €1.400. Si entra per candidatura, e le candidature aprono a fine agosto: quando i tre posti sono presi chiudo. Quando riaprirò per la seconda, sinceramente, non lo so ancora.
                            </p>
                            <div className="antl-cta mt-10 flex flex-wrap items-center gap-3">
                                <button onClick={scrollToForm} className="btn-primary">
                                    <span>Avvisami quando apro</span>
                                    <ArrowRight size={16} />
                                </button>
                                <span className="text-dim text-sm font-mono">
                                    Candidature da fine agosto. Ti scrivo io.
                                </span>
                            </div>
                        </div>
                        <div className="antl-sim lg:col-span-5">
                            <TimeSimulator />
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- PROBLEMA ---------- */}
            <section className="py-20 md:py-28 border-b border-line">
                <div className="container-edge max-w-5xl">
                    <div className="reveal">
                        <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// il problema</div>
                        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight leading-tight mb-10 max-w-3xl">
                            Sei bravo in quello che fai. Il problema è un altro.
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-14 gap-y-6 text-mute text-lg leading-relaxed">
                            <div className="space-y-5">
                                <p>
                                    Apri il portatile la mattina con l’idea di fare la cosa importante, e alle sei di sera scopri che l’importante non l’hai toccato. Se n’è andato tutto in mezzo: gli appuntamenti da fissare e spostare, i follow-up ai clienti che rimandi da giorni, i contenuti da pubblicare che restano nella testa, il preventivo da mettere insieme, il documento da riassumere, la stessa procedura di sempre rifatta a mano.
                                </p>
                                <p className="text-fg">
                                    Certe cose le eviti perché ti annoiano. Altre, come scrivere i contenuti o stare dietro ai follow-up, le eviti perché ti sembrano una montagna. In tutti e due i casi restano lì, e intanto il lavoro per cui i clienti ti pagano aspetta.
                                </p>
                            </div>
                            <div className="space-y-5">
                                <p>
                                    Lo sai che l’AI potrebbe togliertele di dosso. Ci hai provato: hai aperto ChatGPT, hai fatto due domande, hai ricevuto una risposta generica, e sei tornato a fare tutto a mano pensando che forse non era ancora il momento.
                                </p>
                                <p className="text-fg">
                                    Il momento però non arriva da solo, e i prompt fortunati non bastano. L’AI inizia a valere qualcosa quando entra nel tuo lavoro vero, sui tuoi processi, con i tuoi strumenti. Quel pezzo lì si costruisce, non si guarda in un video.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- COSA FACCIAMO DAVVERO ---------- */}
            <section className="py-20 md:py-28 border-b border-line">
                <div className="container-edge max-w-5xl">
                    <div className="reveal">
                        <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// cosa facciamo insieme</div>
                        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight leading-tight mb-10 max-w-3xl">
                            In tre mesi costruiamo il tuo sistema di lavoro con l’AI, su Claude Code.
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-14 gap-y-6 text-mute text-lg leading-relaxed">
                            <div className="space-y-5">
                                <p>
                                    Impari a parlarci nella lingua del tuo mestiere. Colleghiamo i tuoi strumenti in un posto solo: i documenti su Notion o Drive, la posta, il calendario, la generazione delle immagini. Basta saltare tra dieci app diverse.
                                </p>
                                <p>
                                    Poi costruiamo le automazioni sulle cose che ti pesano di più: i contenuti da pubblicare, i follow-up ai clienti, gli appuntamenti da gestire, i preventivi e i documenti ricorrenti. Le cose precise che rifai ogni settimana, quelle che oggi rimandi.
                                </p>
                            </div>
                            <div className="space-y-5">
                                <p className="text-fg">
                                    La parte che pesa davvero arriva dopo: farti cambiare come lavori, e tenerti sul nuovo binario abbastanza a lungo da non voler più tornare indietro. Costruire un’automazione è questione di ore. Farla diventare la tua normalità è questione di mesi.
                                </p>
                                <p>
                                    Ecco perché tre mesi pieni, e perché uno a uno.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- COSA PUOI COSTRUIRE ---------- */}
            <section className="py-20 md:py-28 border-b border-line">
                <div className="container-edge">
                    <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-14">
                        <div className="reveal lg:col-span-6">
                            <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// cosa puoi costruire</div>
                            <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight leading-tight mb-6">
                                Gli scrivi in italiano. Lui lo fa.
                            </h2>
                            <p className="text-mute text-lg leading-relaxed">
                                Niente codice, niente comandi da imparare a memoria. Chiedi una cosa nella tua lingua e il tuo sistema la esegue. Questi sono esempi veri, costruiti sul lavoro di chi lo usa già.
                            </p>
                        </div>
                        <div className="reveal lg:col-span-6">
                            <SkillTerminal />
                        </div>
                    </div>
                    <div className="stagger-group grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {CATEGORIE.map(({ icon: Icon, t, d }) => (
                            <div key={t} className="panel p-6">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-mint/10 border border-mint/25 text-mint mb-4">
                                    <Icon size={18} />
                                </div>
                                <div className="font-display font-medium text-lg text-fg mb-2">{t}</div>
                                <p className="text-mute text-sm leading-relaxed">{d}</p>
                            </div>
                        ))}
                    </div>
                    <p className="reveal text-dim text-sm mt-8 text-center">
                        E tutto quello che serve al tuo mestiere: il sistema si costruisce sul tuo lavoro, non su un modello standard.
                    </p>
                </div>
            </section>

            {/* ---------- COSE CHE PARTONO DA SOLE ---------- */}
            <section className="py-20 md:py-28 border-b border-line">
                <div className="container-edge">
                    <div className="reveal mb-12 max-w-3xl">
                        <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// quello che parte da solo</div>
                        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight leading-tight mb-6">
                            E poi c’è la parte che non devi nemmeno chiedere.
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-14 gap-y-5 text-mute text-lg leading-relaxed">
                            <p>
                                Finché sei tu ad aprire l’AI e a chiederle le cose, il lavoro resta tuo: ti devi ricordare, ti devi sedere, devi spiegare. Cambia poco.
                            </p>
                            <p className="text-fg">
                                Il salto vero arriva quando certe cose partono da sole, nel giorno e all’ora che decidi tu, e ti trovi il risultato già fatto. Si chiamano task pianificati, e sono la parte del percorso che le persone rimpiangono di non aver montato prima.
                            </p>
                        </div>
                    </div>

                    <div className="stagger-group space-y-3">
                        {AUTOMATISMI.map(({ quando, t, d }) => (
                            <div key={t} className="panel p-6 md:p-7 grid md:grid-cols-12 gap-3 md:gap-6 items-baseline">
                                <div className="md:col-span-3 font-mono text-xs uppercase tracking-widest text-mint">
                                    {quando}
                                </div>
                                <div className="md:col-span-4 font-display font-medium text-xl text-fg">
                                    {t}
                                </div>
                                <p className="md:col-span-5 text-mute leading-relaxed">
                                    {d}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="reveal mt-4 panel p-6 md:p-7 flex items-start gap-3 border-mint/25 bg-mint/[0.03]">
                        <Clock size={18} className="text-mint mt-0.5 shrink-0" />
                        <p className="text-mute leading-relaxed">
                            <span className="text-fg">Questi sono esempi, non un menù da scegliere.</span> Nel percorso guardiamo la tua settimana vera e mettiamo in automatico le cose che rifai sempre uguali, con i tuoi orari. Il punto non è avere l’AI che ti risponde: è smettere di ricordarti di chiederglielo.
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------- COSE CHE PRIMA NON POTEVI FARE ---------- */}
            <section className="py-20 md:py-28 border-b border-line">
                <div className="container-edge">
                    <div className="reveal mb-12 max-w-3xl">
                        <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// la parte che non ti aspetti</div>
                        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight leading-tight mb-6">
                            Poi consegni una cosa che prima avresti lasciato perdere.
                        </h2>
                        <div className="grid md:grid-cols-2 gap-x-14 gap-y-5 text-mute text-lg leading-relaxed">
                            <p>
                                Le ore che tornano sono la prima metà del percorso. La seconda arriva verso il secondo mese, quando ti accorgi che certe cose sono diventate alla tua portata. Cose che finora scartavi prima ancora di valutarle, perché volevano un preventivo, un fornitore e tre settimane.
                            </p>
                            <p className="text-fg">
                                Un cliente ti chiede un extra e stavolta glielo dai. Un’idea ferma da un anno la provi il sabato mattina. Il tuo lavoro smette di essere lo stesso lavoro fatto più in fretta, e comincia ad allargarsi.
                            </p>
                        </div>
                    </div>

                    <div className="stagger-group grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {NUOVE_COSE.map(({ icon: Icon, t, d }) => (
                            <div key={t} className="panel p-6">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-mint/10 border border-mint/25 text-mint mb-4">
                                    <Icon size={18} />
                                </div>
                                <div className="font-display font-medium text-lg text-fg mb-2">{t}</div>
                                <p className="text-mute text-sm leading-relaxed">{d}</p>
                            </div>
                        ))}
                    </div>

                    <div className="reveal mt-4 panel p-6 md:p-7 flex items-start gap-3 border-mint/25 bg-mint/[0.03]">
                        <Sparkles size={18} className="text-mint mt-0.5 shrink-0" />
                        <p className="text-mute leading-relaxed">
                            <span className="text-fg">Nel mio caso questa è stata la parte più grossa.</span> I siti che prima commissionavo, l’app che mi sono costruita da sola, il lavoro sui contenuti che gira mentre dormo. Nessuna di queste è la stessa cosa di prima fatta più in fretta: sono cose che senza l’AI non avrei proprio fatto. Quali saranno le tue dipende dal tuo mestiere, e le scopriamo strada facendo.
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------- COME SARAI (oggi/dopo) ---------- */}
            <section className="py-20 md:py-24 border-b border-line">
                <div className="container-edge">
                    <div className="reveal font-mono text-xs uppercase tracking-widest text-mint mb-8">// come cambia la tua settimana</div>
                    <div className="stagger-group grid md:grid-cols-2 gap-4">
                        <div className="panel p-8">
                            <div className="font-mono text-xs uppercase tracking-widest text-dim mb-4">adesso</div>
                            <p className="text-mute text-lg leading-relaxed">
                                Apri l’AI ogni tanto, fai una domanda, ottieni una risposta media, torni a fare a mano. Il ripetitivo resta lì e ogni settimana ti mangia le stesse ore.
                            </p>
                        </div>
                        <div className="panel p-8 border-mint/30 shadow-[0_0_50px_-20px_rgb(var(--mint)/0.4)]">
                            <div className="font-mono text-xs uppercase tracking-widest text-mint mb-4 flex items-center gap-2">
                                <Sparkles size={13} /> dopo tre mesi
                            </div>
                            <p className="text-fg/90 text-lg leading-relaxed">
                                Apri il tuo sistema, scrivi in una riga quello che ti serve, e la parte ripetitiva è già fatta. I contenuti, i follow-up, i riassunti, la preparazione delle call, i primi draft delle mail partono da soli. Tu rifinisci, e il tempo torna al lavoro che conta. Ogni tanto ti ritrovi anche a dire di sì a cose che un anno fa avresti rimandato.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ---------- COME FUNZIONA (fasi) ---------- */}
            <section className="py-20 md:py-28 border-b border-line">
                <div className="container-edge">
                    <div className="reveal mb-12 max-w-2xl">
                        <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// come funziona</div>
                        <h2 className="font-display font-medium text-3xl md:text-4xl tracking-tight leading-tight">
                            Tre mesi. Sei call 1:1. Supporto su email e Telegram tra una call e l’altra.
                        </h2>
                    </div>
                    <div className="stagger-group grid md:grid-cols-3 gap-4">
                        {FASI.map(({ icon: Icon, tag, title, body }) => (
                            <div key={title} className="panel p-7">
                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-mint/10 border border-mint/25 text-mint mb-5">
                                    <Icon size={20} />
                                </div>
                                <div className="font-mono text-xs uppercase tracking-widest text-dim mb-2">{tag}</div>
                                <div className="font-display font-medium text-xl text-fg mb-3">{title}</div>
                                <p className="text-mute leading-relaxed">{body}</p>
                            </div>
                        ))}
                    </div>

                    <div className="reveal mt-4 panel p-7 md:p-8 border-mint/30 bg-mint/[0.04]">
                        <div className="font-mono text-xs uppercase tracking-widest text-mint mb-4">ottobre, novembre, dicembre</div>
                        <p className="text-fg/90 text-lg leading-relaxed max-w-4xl">
                            Il percorso finisce con l’anno, e non è un caso. A gennaio la maggior parte delle persone riapre la casella mail e si ripromette che quest’anno l’AI la impara. Tu invece ci lavori dentro da tre mesi: il sistema gira, si è già rotto qualche volta e sai rimetterlo in piedi, e le cose che partono da sole partono da sole anche mentre sei in ferie. Tutto il 2027 lo fai con quel vantaggio, e con tre mesi di rodaggio che gli altri devono ancora cominciare.
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------- COSA COMPRENDE ---------- */}
            <section className="py-20 md:py-28 border-b border-line">
                <div className="container-edge">
                    <div className="reveal mb-12 max-w-3xl">
                        <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// cosa comprende il percorso</div>
                        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight leading-tight mb-5">
                            Cosa c’è dentro il percorso.
                        </h2>
                        <p className="text-mute text-lg leading-relaxed">
                            Non stai comprando un corso o un pacchetto di dispense. Stai comprando tre mesi di lavoro fianco a fianco, il tuo sistema costruito su misura, e tutto quello che resta tuo alla fine.
                        </p>
                    </div>

                    {/* il cuore: l'affiancamento */}
                    <div className="reveal font-mono text-xs uppercase tracking-widest text-dim mb-4">il percorso</div>
                    <div className="stagger-group grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
                        {PERCORSO.map(({ icon: Icon, t, d }) => (
                            <div key={t} className="panel p-6 border-mint/25 bg-mint/[0.03]">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-mint/15 border border-mint/30 text-mint mb-4">
                                    <Icon size={18} />
                                </div>
                                <div className="font-display font-medium text-lg text-fg mb-2">{t}</div>
                                <p className="text-mute text-sm leading-relaxed">{d}</p>
                            </div>
                        ))}
                    </div>

                    {/* e resta tuo: i materiali */}
                    <div className="reveal font-mono text-xs uppercase tracking-widest text-dim mb-4">e resta tutto tuo, per sempre</div>
                    <div className="stagger-group grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {MATERIALI.map(({ icon: Icon, t, d }) => (
                            <div key={t} className="panel p-6">
                                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-mint/10 border border-mint/25 text-mint mb-4">
                                    <Icon size={18} />
                                </div>
                                <div className="font-display font-medium text-lg text-fg mb-2">{t}</div>
                                <p className="text-mute text-sm leading-relaxed">{d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- PER CHI È ---------- */}
            <section className="py-20 md:py-24 border-b border-line">
                <div className="container-edge">
                    <div className="stagger-group grid md:grid-cols-2 gap-4">
                        <div className="panel p-8">
                            <div className="font-mono text-xs uppercase tracking-widest text-mint mb-4">è per te se</div>
                            <p className="text-fg/90 text-lg leading-relaxed">
                                Vivi della tua competenza e lavori soprattutto a testa e a documenti: avvocato, nutrizionista, architetto, content creator, commercialista, consulente, psicologo, formatore. Sei bravo in quello che fai, ma passi troppo tempo su cose ripetitive che ti rubano la giornata. E vuoi imparare a usare l’AI sul serio, dentro il tuo lavoro.
                            </p>
                        </div>
                        <div className="panel p-8">
                            <div className="font-mono text-xs uppercase tracking-widest text-dim mb-4">lascia perdere se</div>
                            <p className="text-mute text-lg leading-relaxed">
                                Cerchi la scorciatoia facile, il “diventa ricco con l’AI”, oppure vuoi un sistema da mettere in un cassetto e non toccare più. Il sistema lo costruisco io, ma poi tocca a te usarlo ogni giorno: se non hai voglia di cambiare il tuo modo di lavorare, ci perderemmo il tempo entrambi.
                            </p>
                        </div>
                    </div>
                    <div className="reveal mt-4 panel p-5 flex items-start gap-3 border-mint/20">
                        <ShieldCheck size={18} className="text-mint mt-0.5 shrink-0" />
                        <p className="text-mute text-sm leading-relaxed">
                            <span className="text-fg">L’unico strumento che ti serve avere è un abbonamento a Claude (Pro o Max).</span> Lo attiviamo insieme all’inizio, con calma.
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------- PREZZO E ACCESSO ---------- */}
            <section className="py-20 md:py-28 border-b border-line">
                <div className="container-edge">
                    <div className="reveal mb-12 max-w-3xl">
                        <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// il prezzo e come si entra</div>
                        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight leading-tight mb-5">
                            Quanto costa, e perché non basta pagare.
                        </h2>
                        <p className="text-mute text-lg leading-relaxed">
                            Niente carrello, niente bottone “acquista”. Qui non si compra un posto: si manda una candidatura, la leggo io, e i tre posti li assegno a mano.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-4">
                        {/* prezzo */}
                        <div className="reveal lg:col-span-2 panel p-8 border-mint/30 bg-mint/[0.04] flex flex-col">
                            <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">prezzo di lancio · prima coorte</div>
                            <div className="font-display font-medium text-5xl md:text-6xl text-fg leading-none tracking-tightest">€3.900</div>
                            <div className="text-mute mt-3 leading-relaxed">
                                in un’unica soluzione, oppure <span className="text-fg font-medium">tre rate da €1.400</span>, una al mese.
                            </div>
                            <div className="h-px bg-line my-7" />
                            <p className="text-mute leading-relaxed">
                                Dentro c’è tutto: i tre mesi uno a uno, le sei call, il tuo sistema costruito su Claude Code, il supporto su email e Telegram tra una call e l’altra, e i materiali che restano tuoi per sempre.
                            </p>
                            <p className="text-dim text-sm leading-relaxed mt-4">
                                Fuori c’è solo l’abbonamento a Claude (Pro o Max), che intesti tu e resta tuo anche dopo.
                            </p>
                        </div>

                        {/* come si entra */}
                        <div className="lg:col-span-3 stagger-group space-y-4">
                            <div className="panel p-7 flex items-start gap-5">
                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-mint/10 border border-mint/25 text-mint shrink-0">
                                    <FileText size={20} />
                                </div>
                                <div>
                                    <div className="font-display font-medium text-xl text-fg mb-2">1. Da fine agosto, mandi la candidatura</div>
                                    <p className="text-mute leading-relaxed">
                                        Qualche domanda sul tuo lavoro e su cosa ti pesa, cinque minuti. Le leggo tutte io, una per una, e ti rispondo in ogni caso. Fino all’apertura puoi lasciarmi nome e mail qui sotto e ti avviso io.
                                    </p>
                                </div>
                            </div>
                            <div className="panel p-7 flex items-start gap-5">
                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-mint/10 border border-mint/25 text-mint shrink-0">
                                    <Users size={20} />
                                </div>
                                <div>
                                    <div className="font-display font-medium text-xl text-fg mb-2">2. Scelgo io, e guardo due cose</div>
                                    <p className="text-mute leading-relaxed">
                                        L’ordine di arrivo, perché mi sembra il modo più onesto. E se con il tuo lavoro posso aiutarti davvero: se penso di no, te lo dico e non ti faccio spendere dei soldi. Preferisco dire tre volte di no che seguire male una persona.
                                    </p>
                                </div>
                            </div>
                            <div className="panel p-7 flex items-start gap-5">
                                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-mint/10 border border-mint/25 text-mint shrink-0">
                                    <CalendarClock size={20} />
                                </div>
                                <div>
                                    <div className="font-display font-medium text-xl text-fg mb-2">3. Ci sentiamo quindici minuti</div>
                                    <p className="text-mute leading-relaxed">
                                        Una chiacchierata senza impegno, per capire se ha senso per entrambi. Se ce l’ha, si parte a ottobre.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="reveal mt-4 panel p-6 flex items-start gap-3 border-mint/25 bg-mint/[0.03]">
                        <Sparkles size={18} className="text-mint mt-0.5 shrink-0" />
                        <p className="text-mute leading-relaxed">
                            <span className="text-fg">È la prima coorte in assoluto, e il prezzo è quello di lancio.</span> Tre posti, poi chiudo le candidature. Quando aprirò la seconda, e a che prezzo, non l’ho ancora deciso: dipende da come va questa e da quanto tempo mi lascia. Non è una scadenza inventata per farti correre, è che oltre le tre persone non riesco a seguire nessuno come si deve.
                        </p>
                    </div>
                </div>
            </section>

            {/* ---------- FAQ ---------- */}
            <section className="py-20 md:py-24 border-b border-line">
                <div className="container-edge max-w-3xl">
                    <div className="reveal font-mono text-xs uppercase tracking-widest text-mint mb-8">// le domande che ti stai facendo</div>
                    <div className="stagger-group space-y-3">
                        {FAQ.map(([q, a]) => (
                            <div key={q} className="panel p-6">
                                <div className="font-display font-medium text-lg text-fg mb-2">{q}</div>
                                <p className="text-mute leading-relaxed">{a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ---------- FORM CANDIDATURA ---------- */}
            <section id="candidati" className="py-20 md:py-28">
                <div className="container-edge max-w-2xl">
                    <div className="reveal text-center mb-8">
                        <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// candidature da fine agosto</div>
                        <h2 className="font-display font-medium text-3xl md:text-4xl tracking-tight leading-tight mb-4">
                            Ti avviso io quando apro.
                        </h2>
                        <p className="text-mute text-lg leading-relaxed max-w-xl mx-auto">
                            Le candidature aprono a fine agosto: da lì leggo tutto, faccio le call di conoscenza e assegno i tre posti. Se vuoi esserci, lasciami nome e mail adesso: quando apro te lo scrivo io, prima che agli altri, così non devi ricordarti di tornare a controllare.
                        </p>
                    </div>
                    <div className="reveal max-w-xl mx-auto mb-8 rounded-lg bg-mint/[0.06] border border-mint/25 p-4 flex items-start gap-3">
                        <CalendarClock size={18} className="text-mint mt-0.5 shrink-0" />
                        <p className="text-mute text-sm leading-relaxed">
                            I posti sono <span className="text-fg">tre</span>, ed è la prima coorte in assoluto. Quando si chiudono, chiudo: non ho ancora deciso quando aprirò la seconda, né a che prezzo. Se è il tuo momento, questo è quello buono.
                        </p>
                    </div>
                    <InterestForm />
                </div>
            </section>

            <Footer />
        </div>
    );
};

/* ================================================================== *
 * FORM candidatura multi-step
 * ================================================================== */

const inputClass = "w-full bg-bg border border-line text-fg rounded-md px-3.5 py-2.5 font-sans focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint/30 transition-colors placeholder:text-dim";
const labelClass = "block text-xs font-mono uppercase tracking-widest mb-2 text-mute";

const BUDGET_OK = ['Sì, è un investimento che posso sostenere', 'Ci devo pensare, ma rientra nelle mie possibilità'];

const INITIAL = {
    nome: '', email: '', telefono: '', lavoro: '', profilo: '',
    anni: '', team: '',
    ripetitivo: '', oreperse: '', giaprovato: '',
    usoai: '', comfort: '', abbonamento: '',
    perchesora: '', cosacambierebbe: '', freno: '', tempo: '',
    budget: '', quando: '', altro: '',
};

const STEPS = [
    { tag: 'chi sei', required: ['nome', 'email', 'telefono', 'lavoro', 'anni', 'team'] },
    { tag: 'il tuo problema', required: ['ripetitivo', 'oreperse'] },
    { tag: 'tu e l’AI', required: ['usoai', 'comfort', 'abbonamento'] },
    { tag: 'la tua motivazione', required: ['perchesora', 'cosacambierebbe', 'tempo'] },
    { tag: 'investimento', required: ['budget', 'quando'] },
];

const Field = ({ label, children }) => (
    <div><label className={labelClass}>{label}</label>{children}</div>
);

/* ------------------------------------------------------------------ *
 * Lista d'interesse (fase pre-apertura).
 * Le candidature aprono a fine agosto: fino ad allora la pagina raccoglie
 * solo nome, mail e professione. Poi si torna a <ApplicationForm />.
 * ------------------------------------------------------------------ */

const InterestForm = () => {
    const [data, setData] = useState({ nome: '', email: '', professione: '' });
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState('');

    const set = (name) => (e) => setData((p) => ({ ...p, [name]: e.target.value }));
    const valid = data.nome.trim() !== '' && data.email.trim() !== '';

    const submit = async (e) => {
        e.preventDefault();
        if (!valid || status === 'loading') return;
        setStatus('loading');
        setErrorMsg('');
        try {
            const r = await fetch('/api/interesse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, origine: 'landing-ai-nel-tuo-lavoro' }),
            });
            const out = await r.json().catch(() => ({}));
            if (r.ok && out.ok) {
                setStatus('success');
                if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
                    window.fbq('track', 'Lead');
                }
            } else {
                setStatus('error');
                setErrorMsg(out.error || 'Non sono riuscita a salvarti, riprova tra un minuto');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Connessione ballerina, riprova tra un minuto');
        }
    };

    if (status === 'success') {
        return (
            <div className="panel p-8 text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-mint/15 border border-mint/30 text-mint mx-auto mb-5">
                    <Check size={22} />
                </div>
                <h3 className="font-display font-medium text-2xl text-fg mb-3">Ci sei, {data.nome.split(' ')[0]}.</h3>
                <p className="text-mute leading-relaxed max-w-md mx-auto">
                    Quando apro le candidature, a fine agosto, te lo scrivo io e lo sai prima degli altri. Nel frattempo non ti mando niente di inutile: hai la mia parola.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={submit} className="panel p-7 md:p-8 space-y-5">
            <Field label="Come ti chiami *">
                <input required className={inputClass} value={data.nome} onChange={set('nome')} placeholder="Nome e cognome" autoComplete="name" />
            </Field>
            <Field label="La tua mail *">
                <input required type="email" className={inputClass} value={data.email} onChange={set('email')} placeholder="dove ti scrivo quando apro" autoComplete="email" />
            </Field>
            <Field label="Che lavoro fai">
                <input className={inputClass} value={data.professione} onChange={set('professione')} placeholder="Avvocata, consulente, architetto…" />
            </Field>

            {status === 'error' && (
                <div className="flex items-start gap-2 text-sm text-red-300">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                </div>
            )}

            <button type="submit" disabled={!valid || status === 'loading'} className="btn-primary w-full justify-center disabled:opacity-40 disabled:cursor-not-allowed">
                {status === 'loading' ? <><Loader2 size={16} className="animate-spin" /> <span>Un secondo…</span></> : <><span>Avvisami quando apro</span> <ArrowRight size={16} /></>}
            </button>
            <p className="text-dim text-xs leading-relaxed text-center">
                Non è una candidatura e non ti impegna a niente. Serve solo perché a fine agosto ti scriva io, invece di sperare che ti ricordi di tornare.
            </p>
        </form>
    );
};

const ApplicationForm = () => {
    const [step, setStep] = useState(0);
    const [data, setData] = useState(INITIAL);
    const [status, setStatus] = useState('idle'); // idle | loading | success | lowbudget | error
    const [errorMsg, setErrorMsg] = useState('');

    const set = (name) => (e) => setData((p) => ({ ...p, [name]: e.target.value }));
    const stepValid = () => STEPS[step].required.every((k) => String(data[k]).trim() !== '');

    const next = () => {
        if (!stepValid()) { setErrorMsg('Compila i campi obbligatori per continuare.'); return; }
        setErrorMsg(''); setStep((s) => Math.min(s + 1, STEPS.length - 1));
    };
    const back = () => { setErrorMsg(''); setStep((s) => Math.max(s - 1, 0)); };

    const submit = async (e) => {
        e.preventDefault();
        if (!stepValid()) { setErrorMsg('Compila i campi obbligatori.'); return; }
        setStatus('loading'); setErrorMsg('');
        try {
            const res = await fetch('https://formsubmit.co/ajax/hello@mprochilo.it', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({
                    _subject: `Candidatura "AI nel tuo lavoro" — ${data.nome}`,
                    Nome: data.nome, Email: data.email, Telefono: data.telefono,
                    Lavoro: data.lavoro, Profilo: data.profilo, Anni: data.anni, Team: data.team,
                    'Cosa ripetitiva': data.ripetitivo, 'Ore perse': data.oreperse, 'Già provato': data.giaprovato,
                    'Uso AI': data.usoai, 'Comfort digitale': data.comfort, 'Abbonamento Claude': data.abbonamento,
                    'Perché adesso': data.perchesora, 'Cosa cambierebbe': data.cosacambierebbe,
                    Freno: data.freno, 'Tempo disponibile': data.tempo,
                    Budget: data.budget, Quando: data.quando, Altro: data.altro,
                }),
            });
            if (!res.ok) throw new Error('Invio fallito');
            if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
                try { window.fbq('track', 'Lead', { content_name: 'ai-nel-tuo-lavoro', content_category: data.budget }); } catch (_) {}
            }
            setStatus(BUDGET_OK.includes(data.budget) ? 'success' : 'lowbudget');
        } catch (err) {
            console.error(err);
            setStatus('error'); setErrorMsg('Errore nell’invio. Riprova o scrivi a hello@mprochilo.it');
        }
    };

    if (status === 'success') {
        return (
            <div className="panel p-8 text-center">
                <div className="inline-flex w-12 h-12 rounded-full bg-mint/15 border border-mint/30 items-center justify-center text-mint mb-5 relative">
                    <span className="absolute inset-0 rounded-full bg-mint/20 animate-ping" />
                    <Check size={22} className="relative z-10" />
                </div>
                <h3 className="font-display font-medium text-2xl text-fg mb-3">Candidatura ricevuta.</h3>
                <p className="text-mute leading-relaxed max-w-md mx-auto">
                    Ho ricevuto tutto e la leggo con attenzione. Se c’è margine ti scrivo io, all’indirizzo che mi hai lasciato, per fissare la call di 15 minuti. I posti sono tre: prenditi il tuo tempo di risposta, ma non troppo.
                </p>
            </div>
        );
    }
    if (status === 'lowbudget') {
        return (
            <div className="panel p-8 text-center">
                <div className="font-mono text-sm text-mint mb-4">$ candidatura --ricevuta</div>
                <h3 className="font-display font-medium text-2xl text-fg mb-3">Grazie, ho letto tutto.</h3>
                <p className="text-mute leading-relaxed max-w-md mx-auto mb-6">
                    Voglio essere onesta: il percorso costa €3.900, o tre rate da €1.400, e ha senso solo se in questo momento è un investimento sostenibile per te. Se ora non lo è, ti lascio due strade più leggere per iniziare comunque a lavorare con l’AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a href="/newsletter" className="btn-ghost justify-center">Oltre il prompt <ArrowUpRight size={15} /></a>
                    <a href="https://useskill.it" target="_blank" rel="noreferrer" className="btn-ghost justify-center">useskill.it <ArrowUpRight size={15} /></a>
                </div>
            </div>
        );
    }

    const pct = Math.round(((step + 1) / STEPS.length) * 100);

    return (
        <div className="panel overflow-hidden">
            <div className="px-5 py-3 border-b border-line bg-elev/40 flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-mute">
                    <span className="w-2 h-2 rounded-full bg-mint/70" />
                    {STEPS[step].tag}
                </div>
                <span className="font-mono text-[10px] text-dim">step {step + 1}/{STEPS.length}</span>
            </div>
            <div className="h-1 bg-bg">
                <div className="h-full bg-mint transition-all duration-300" style={{ width: `${pct}%` }} />
            </div>

            <form onSubmit={submit} className="p-6 md:p-7 flex flex-col gap-5">
                {step === 0 && (
                    <>
                        <div className="grid sm:grid-cols-2 gap-5">
                            <Field label="Nome e cognome *"><input required className={inputClass} value={data.nome} onChange={set('nome')} placeholder="Mario Rossi" /></Field>
                            <Field label="Email *"><input required type="email" className={inputClass} value={data.email} onChange={set('email')} placeholder="mario@email.it" /></Field>
                            <Field label="Telefono *"><input required type="tel" className={inputClass} value={data.telefono} onChange={set('telefono')} placeholder="+39 333…" /></Field>
                            <Field label="Che lavoro fai *"><input required className={inputClass} value={data.lavoro} onChange={set('lavoro')} placeholder="Avvocato, nutrizionista, architetto…" /></Field>
                        </div>
                        <Field label="Sito, LinkedIn o profilo"><input className={inputClass} value={data.profilo} onChange={set('profilo')} placeholder="Dove posso vederti (facoltativo)" /></Field>
                        <div className="grid sm:grid-cols-2 gap-5">
                            <Field label="Da quanti anni *">
                                <select required className={inputClass} value={data.anni} onChange={set('anni')}>
                                    <option value="" disabled>Seleziona</option>
                                    <option>Meno di 2</option><option>2 – 5</option><option>5 – 10</option><option>Oltre 10</option>
                                </select>
                            </Field>
                            <Field label="Lavori… *">
                                <select required className={inputClass} value={data.team} onChange={set('team')}>
                                    <option value="" disabled>Seleziona</option>
                                    <option>Da solo</option><option>Con collaboratori</option><option>Studio / azienda</option>
                                </select>
                            </Field>
                        </div>
                    </>
                )}

                {step === 1 && (
                    <>
                        <Field label="La cosa ripetitiva che ti mangia più tempo *">
                            <textarea required rows="3" className={inputClass} value={data.ripetitivo} onChange={set('ripetitivo')} placeholder="Cosa rifai ogni settimana e vorresti togliere di mezzo?" />
                        </Field>
                        <Field label="Ore a settimana perse in lavoro che non richiede te *">
                            <select required className={inputClass} value={data.oreperse} onChange={set('oreperse')}>
                                <option value="" disabled>Seleziona</option>
                                <option>Meno di 3</option><option>3 – 6</option><option>6 – 10</option><option>Più di 10</option>
                            </select>
                        </Field>
                        <Field label="Cosa hai già provato per risolverlo">
                            <textarea rows="3" className={inputClass} value={data.giaprovato} onChange={set('giaprovato')} placeholder="Tool, corsi, tentativi… cosa non ha funzionato (facoltativo)" />
                        </Field>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Field label="Usi già Claude o altra AI nel lavoro? *">
                            <select required className={inputClass} value={data.usoai} onChange={set('usoai')}>
                                <option value="" disabled>Seleziona</option>
                                <option>Mai</option><option>Ogni tanto, a mano, senza metodo</option><option>Spesso, ma senza un sistema</option>
                            </select>
                        </Field>
                        <Field label="Quanto sei a tuo agio con gli strumenti digitali? (1 = per niente, 5 = moltissimo) *">
                            <select required className={inputClass} value={data.comfort} onChange={set('comfort')}>
                                <option value="" disabled>Seleziona</option>
                                <option>1</option><option>2</option><option>3</option><option>4</option><option>5</option>
                            </select>
                        </Field>
                        <Field label="Hai un abbonamento a Claude Pro o Max? *">
                            <select required className={inputClass} value={data.abbonamento} onChange={set('abbonamento')}>
                                <option value="" disabled>Seleziona</option>
                                <option>Sì</option><option>No</option><option>Non so cosa sia</option>
                            </select>
                        </Field>
                    </>
                )}

                {step === 3 && (
                    <>
                        <Field label="Perché proprio adesso? *">
                            <textarea required rows="3" className={inputClass} value={data.perchesora} onChange={set('perchesora')} placeholder="Cosa è cambiato, cosa ti spinge a farlo ora" />
                        </Field>
                        <Field label="Se tra tre mesi funzionasse davvero, cosa cambierebbe? *">
                            <textarea required rows="3" className={inputClass} value={data.cosacambierebbe} onChange={set('cosacambierebbe')} placeholder="Nel tuo lavoro o nella tua vita" />
                        </Field>
                        <Field label="Cosa ti ha frenato finora">
                            <textarea rows="2" className={inputClass} value={data.freno} onChange={set('freno')} placeholder="Facoltativo" />
                        </Field>
                        <Field label="Quanto tempo a settimana puoi dedicare, tra call e pratica? *">
                            <select required className={inputClass} value={data.tempo} onChange={set('tempo')}>
                                <option value="" disabled>Seleziona</option>
                                <option>Meno di 2 ore</option><option>2 – 4 ore</option><option>Più di 4 ore</option>
                            </select>
                        </Field>
                    </>
                )}

                {step === 4 && (
                    <>
                        <div className="rounded-lg bg-elev/40 border border-line p-4 text-sm leading-relaxed text-mute">
                            Il percorso completo è un investimento di <span className="text-fg font-medium">€3.900</span>, in un’unica soluzione oppure in <span className="text-fg font-medium">tre rate da €1.400</span>, una al mese. Dentro c’è tutto: i tre mesi uno a uno, le sei call, il tuo sistema su Claude Code, il supporto su email e Telegram e i materiali che restano tuoi.
                        </div>
                        <div className="rounded-lg bg-mint/[0.06] border border-mint/25 p-4 text-sm leading-relaxed text-mute">
                            Prima di rispondere, fai un conto diverso: un altro anno intero a rifare a mano le stesse cose. Quelle ore, moltiplicate per quanto vale il tuo tempo, le stai già pagando adesso. E le paghi ogni anno. <span className="text-fg">Questo è l’unico costo che, invece, torna indietro.</span>
                        </div>
                        <Field label="Come ti poni rispetto a questo investimento? *">
                            <select required className={inputClass} value={data.budget} onChange={set('budget')}>
                                <option value="" disabled>Seleziona</option>
                                <option>Sì, è un investimento che posso sostenere</option>
                                <option>Ci devo pensare, ma rientra nelle mie possibilità</option>
                                <option>Al momento è oltre il mio budget</option>
                            </select>
                        </Field>
                        <Field label="Da quando potresti iniziare? *">
                            <select required className={inputClass} value={data.quando} onChange={set('quando')}>
                                <option value="" disabled>Seleziona</option>
                                <option>Subito</option><option>Entro ottobre</option><option>Entro fine anno</option><option>Più avanti</option>
                            </select>
                        </Field>
                        <Field label="C’è altro che vuoi che sappia prima di sentirci?">
                            <textarea rows="3" className={inputClass} value={data.altro} onChange={set('altro')} placeholder="Facoltativo" />
                        </Field>
                    </>
                )}

                {errorMsg && (
                    <div className="flex items-start gap-2 text-xs text-red-400">
                        <AlertCircle size={14} className="mt-0.5 shrink-0" /><span>{errorMsg}</span>
                    </div>
                )}

                <div className="flex items-center justify-between gap-3 pt-2">
                    {step > 0 ? (
                        <button type="button" onClick={back} className="btn-ghost">
                            <ArrowLeft size={15} /> Indietro
                        </button>
                    ) : <span />}
                    {step < STEPS.length - 1 ? (
                        <button type="button" onClick={next} className="btn-primary">
                            Avanti <ArrowRight size={15} />
                        </button>
                    ) : (
                        <button type="submit" disabled={status === 'loading'} className="btn-primary disabled:opacity-60">
                            {status === 'loading'
                                ? <><Loader2 size={16} className="animate-spin" /> Invio…</>
                                : <>Invia candidatura <ArrowUpRight size={15} /></>}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default AiNelTuoLavoro;
