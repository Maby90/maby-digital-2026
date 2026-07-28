import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
    Check, Circle, CalendarClock, Terminal, Sparkles, Loader2, Video, Cpu,
    Lock, ArrowRight, Copy, CheckCheck, Clock, Trophy, Zap, Flag, Rocket, ExternalLink,
    FolderOpen, BookOpen, PlayCircle, LayoutTemplate, Link2, Table, LayoutGrid, FileText,
    Search, ListChecks, TrendingUp, Command,
} from 'lucide-react';
import { useGSAP } from '@gsap/react';
import { gsap, SplitText, EASE, motionOK } from '../lib/gsap';
import useSeo from '../hooks/useSeo';

/* ------------------------------------------------------------------ *
 * Dashboard cliente "AI nel tuo lavoro" — /percorso?c=slug
 * Login a password. Legge da /api/percorso. On-brand, animata.
 * ------------------------------------------------------------------ */

const fmtData = (iso, withTime) => {
    if (!iso) return '—';
    try {
        const d = new Date(iso);
        const base = d.toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' });
        if (withTime && iso.includes('T')) return `${base}, ${d.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}`;
        return base;
    } catch { return iso; }
};

const saluto = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Buongiorno';
    if (h < 18) return 'Buon pomeriggio';
    return 'Buonasera';
};

const Percorso = () => {
    const [searchParams] = useSearchParams();
    const slug = searchParams.get('c') || '';
    useSeo({ path: '/percorso', title: 'Il tuo percorso · AI nel tuo lavoro', description: 'Area riservata del percorso.', robots: 'noindex, nofollow' });

    const [data, setData] = useState(null);
    const [state, setState] = useState('gate'); // gate | loading | ok | badpw | notfound | error
    const [pw, setPw] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // prova auto-login se la pw è in sessionStorage
    useEffect(() => {
        if (!slug) { setState('notfound'); return; }
        const saved = sessionStorage.getItem(`pw_${slug}`);
        if (saved) doFetch(saved, true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    const doFetch = async (password, silent) => {
        if (!silent) setSubmitting(true);
        try {
            const r = await fetch(`/api/percorso?slug=${encodeURIComponent(slug)}&pw=${encodeURIComponent(password)}`);
            if (r.status === 401) { setState('badpw'); sessionStorage.removeItem(`pw_${slug}`); return; }
            if (r.status === 404) { setState('notfound'); return; }
            if (!r.ok) { setState('error'); return; }
            const j = await r.json();
            sessionStorage.setItem(`pw_${slug}`, password);
            setData(j); setState('ok');
        } catch { setState('error'); }
        finally { setSubmitting(false); }
    };

    if (state === 'notfound') return <Shell><Msg title="Percorso non trovato" body="Il link non è corretto o è scaduto. Se pensi sia un errore, scrivimi a hello@mprochilo.it." /></Shell>;
    if (state === 'error') return <Shell><Msg title="Qualcosa non ha funzionato" body="Riprova tra poco, oppure scrivimi a hello@mprochilo.it." /></Shell>;

    if (state !== 'ok') {
        return (
            <Shell center>
                <LoginGate
                    pw={pw} setPw={setPw} submitting={submitting}
                    bad={state === 'badpw'}
                    onSubmit={(e) => { e.preventDefault(); if (pw.trim()) doFetch(pw.trim(), false); }}
                />
            </Shell>
        );
    }

    return <Dashboard data={data} slug={slug} />;
};

/* ---------- login ---------- */
const LoginGate = ({ pw, setPw, submitting, bad, onSubmit }) => (
    <div className="w-full max-w-sm">
        <div className="panel p-8">
            <div className="inline-flex w-12 h-12 rounded-xl bg-mint/10 border border-mint/25 items-center justify-center text-mint mb-6">
                <Lock size={22} />
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-mint mb-2">// area riservata</div>
            <h1 className="font-display font-medium text-2xl text-fg mb-2">Il tuo percorso</h1>
            <p className="text-mute text-sm leading-relaxed mb-6">Inserisci la password che ti ho dato per entrare.</p>
            <form onSubmit={onSubmit} className="space-y-3">
                <input
                    type="password" value={pw} onChange={(e) => setPw(e.target.value)}
                    placeholder="password" autoFocus autoComplete="current-password"
                    className="w-full bg-bg border border-line text-fg rounded-md px-3.5 py-3 font-sans focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint/30 transition-colors placeholder:text-dim"
                />
                {bad && <div className="text-xs text-red-400">Password errata, riprova.</div>}
                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center py-3 disabled:opacity-60">
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : <>Entra <ArrowRight size={15} /></>}
                </button>
            </form>
        </div>
        <p className="text-dim text-xs text-center mt-4 font-mono">AI nel tuo lavoro · Maby Prochilo</p>
    </div>
);

/* ---------- progress ring ---------- */
const ProgressRing = ({ pct }) => {
    const ref = useRef(null);
    const glow = useRef(null);
    const R = 64, C = 2 * Math.PI * R, S = 156, CTR = S / 2;
    useGSAP(() => {
        if (!ref.current) return;
        const o = { v: 0 };
        gsap.to(o, {
            v: pct, duration: 1.6, ease: 'power3.out', delay: 0.3,
            onUpdate: () => {
                const off = String(C - (C * o.v) / 100);
                if (ref.current) ref.current.style.strokeDashoffset = off;
                if (glow.current) glow.current.style.strokeDashoffset = off;
            },
        });
        if (glow.current && motionOK()) {
            gsap.to(glow.current, { opacity: 0.85, duration: 2, ease: 'sine.inOut', repeat: -1, yoyo: true });
        }
    }, { dependencies: [pct] });
    return (
        <div className="relative" style={{ width: S, height: S }}>
            <svg width={S} height={S} className="-rotate-90">
                <circle cx={CTR} cy={CTR} r={R} fill="none" stroke="rgb(var(--line))" strokeWidth="9" />
                <circle ref={glow} cx={CTR} cy={CTR} r={R} fill="none" stroke="rgb(var(--mint))" strokeWidth="9"
                    strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C} style={{ opacity: 0.4, filter: 'blur(8px)' }} />
                <circle ref={ref} cx={CTR} cy={CTR} r={R} fill="none" stroke="rgb(var(--mint))" strokeWidth="9"
                    strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C}
                    style={{ filter: 'drop-shadow(0 0 4px rgb(var(--mint) / 0.6))' }} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-display font-medium text-4xl text-fg tabular-nums"><CountUp to={pct} /><span className="text-mint">%</span></div>
                <div className="text-dim text-[10px] uppercase tracking-widest font-mono mt-1">completato</div>
            </div>
        </div>
    );
};

const CountUp = ({ to }) => {
    const ref = useRef(null);
    useGSAP(() => {
        if (!ref.current) return;
        const o = { v: 0 };
        gsap.to(o, { v: to, duration: 1.4, ease: 'power3.out', delay: 0.2, onUpdate: () => { if (ref.current) ref.current.textContent = Math.round(o.v); } });
    }, { dependencies: [to] });
    return <span ref={ref}>0</span>;
};

/* ---------- countdown ---------- */
const Countdown = ({ target }) => {
    const [now, setNow] = useState(() => Date.now());
    useEffect(() => { const id = setInterval(() => setNow(Date.now()), 60000); return () => clearInterval(id); }, []);
    if (!target) return <div className="text-mute text-sm">Da fissare insieme</div>;
    const diff = new Date(target).getTime() - now;
    if (diff <= 0) return <div className="text-mint text-sm font-medium">È oggi o adesso</div>;
    const g = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    return (
        <div className="flex items-end gap-3">
            <div><span className="font-display font-medium text-3xl text-fg tabular-nums">{g}</span><span className="text-mute text-sm ml-1">giorni</span></div>
            <div><span className="font-display font-medium text-3xl text-fg tabular-nums">{h}</span><span className="text-mute text-sm ml-1">ore</span></div>
        </div>
    );
};

/* ---------- dashboard ---------- */
const Dashboard = ({ data, slug }) => {
    const root = useRef(null);
    const [cmdOpen, setCmdOpen] = useState(false);
    const [toast, setToast] = useState('');
    const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 1800); };
    const call = data.call || [];
    const skill = data.skill || [];
    const materiali = data.materiali || [];
    const fatte = call.filter((c) => c.stato === 'Fatta').length;
    const totali = call.length || 6;
    const pct = Math.round((fatte / totali) * 100) || Math.round(((data.meseCorrente || 0) / 3) * 100);
    const prossima = call.find((c) => c.stato !== 'Fatta');

    // ore risparmiate totali (stima): ore/sett * settimane trascorse
    const oreSett = data.oreRisparmiate || 0;
    let settimane = (data.meseCorrente || 1) * 4;
    if (data.dataInizio) {
        const w = Math.floor((Date.now() - new Date(data.dataInizio).getTime()) / (7 * 86400000));
        if (w > 0) settimane = w;
    }
    const oreTot = Math.max(0, Math.round(oreSett * settimane));

    const skillAttive = skill.filter((s) => s.stato === 'Attiva').length;
    const achievements = [
        { icon: Rocket, t: 'Setup fatto', done: fatte >= 1 },
        { icon: Zap, t: 'Prima skill attiva', done: skillAttive >= 1 },
        { icon: Flag, t: 'A metà strada', done: pct >= 50 },
        { icon: Trophy, t: 'Percorso completato', done: pct >= 100 },
    ];

    useGSAP(() => {
        if (!motionOK()) return;
        let split;
        try { split = new SplitText('.dash-hero', { type: 'chars', charsClass: 'hero-char' }); } catch { /* noop */ }
        const tl = gsap.timeline();
        if (split) tl.from(split.chars, { autoAlpha: 0, yPercent: 120, filter: 'blur(12px)', stagger: 0.018, duration: 0.7, ease: EASE });
        tl.from('.dash-in', { autoAlpha: 0, y: 24, duration: 0.6, ease: EASE, stagger: 0.07 }, split ? '-=0.35' : 0);
        return () => { if (split) split.revert(); };
    }, { scope: root });

    return (
        <Shell slug={slug} onOpenCmd={() => setCmdOpen(true)}>
            <CommandPalette open={cmdOpen} setOpen={setCmdOpen} skill={skill} materiali={materiali} />
            <Toast msg={toast} />
            <div ref={root}>
                {/* saluto */}
                <div className="mb-8">
                    <div className="dash-in flex items-center gap-2 mb-3">
                        <span className="pill"><span className="pill-dot" /> Coorte 1.0 · {data.claudePlan ? `Claude ${data.claudePlan}` : 'attivo'}</span>
                    </div>
                    <h1 className="dash-hero font-display font-medium text-4xl md:text-6xl tracking-tightest text-fg text-balance">
                        {saluto()}, <span className="text-mint">{data.nome ? data.nome.split(' ')[0] : ''}</span>.
                    </h1>
                    {data.benvenuto && <p className="dash-in text-mute text-lg leading-relaxed max-w-2xl mt-5">{data.benvenuto}</p>}
                </div>

                <SubNav />

                {/* top grid: ring + prossima call + ore */}
                <div id="panoramica" className="grid lg:grid-cols-[auto_1fr_1fr] gap-4 mb-4 scroll-mt-20">
                    <Tilt className="dash-in">
                        <div className="panel sweep-border p-6 h-full flex items-center justify-center">
                            <ProgressRing pct={pct} />
                        </div>
                    </Tilt>
                    <Tilt className="dash-in">
                        <div className="panel sweep-border p-6 h-full flex flex-col justify-between">
                            <div>
                                <div className="font-mono text-xs uppercase tracking-widest text-dim mb-3 flex items-center gap-2"><CalendarClock size={13} className="text-mint" /> prossima call</div>
                                <Countdown target={data.prossimaCall} />
                                <div className="text-mute text-sm mt-2">{fmtData(data.prossimaCall, true)}</div>
                            </div>
                            {data.linkCall && (
                                <a href={data.linkCall} target="_blank" rel="noreferrer" className="btn-primary justify-center mt-4 text-sm py-2.5">
                                    Entra nella call <ExternalLink size={14} />
                                </a>
                            )}
                        </div>
                    </Tilt>
                    <Tilt className="dash-in">
                        <div className="panel sweep-border p-6 h-full flex flex-col justify-between border-mint/25 bg-mint/[0.04] relative overflow-hidden">
                            <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgb(var(--mint)) 0%, transparent 70%)', filter: 'blur(24px)' }} />
                            <div className="relative font-mono text-xs uppercase tracking-widest text-dim mb-3 flex items-center gap-2"><Clock size={13} className="text-mint" /> tempo che ti sei ripreso</div>
                            <div className="relative">
                                <div className="font-display font-medium text-5xl text-mint tabular-nums leading-none" style={{ textShadow: '0 0 24px rgb(var(--mint) / 0.35)' }}><CountUp to={oreTot} /> <span className="text-xl text-fg">ore</span></div>
                                <div className="text-mute text-sm mt-2">circa {Math.round(oreTot / 8)} giornate di lavoro, da quando abbiamo iniziato.</div>
                            </div>
                        </div>
                    </Tilt>
                </div>

                {/* prossimo passo */}
                {prossima && (
                    <div className="dash-in panel sweep-border p-6 mb-4 border-mint/25 bg-mint/[0.03] flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-mint/15 border border-mint/30 text-mint flex items-center justify-center shrink-0">
                            <Rocket size={20} />
                        </div>
                        <div className="min-w-0">
                            <div className="font-mono text-xs uppercase tracking-widest text-mint mb-1.5">il tuo prossimo passo</div>
                            <div className="font-display font-medium text-xl text-fg mb-1">{prossima.titolo || `Call ${prossima.numero}`}</div>
                            {prossima.tema && <p className="text-mute leading-relaxed">{prossima.tema}</p>}
                            {prossima.note && <p className="text-fg/80 text-sm leading-relaxed mt-3 bg-mint/[0.06] rounded-lg px-3 py-2.5">{prossima.note}</p>}
                        </div>
                    </div>
                )}

                {/* compiti */}
                <Compiti call={call} slug={slug} />

                {/* grafico ore risparmiate */}
                {oreSett > 0 && (
                    <div className="dash-in panel p-6 mb-4">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <TrendingUp size={16} className="text-mint" />
                                <h2 className="font-display font-medium text-lg text-fg">Il tempo che ti torna, mese per mese</h2>
                            </div>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-dim hidden sm:inline">tratteggio = stima</span>
                        </div>
                        <p className="text-mute text-sm mb-4">Ore cumulate risparmiate sul lavoro ripetitivo, da inizio percorso.</p>
                        <OreChart oreSett={oreSett} meseCorrente={data.meseCorrente} />
                    </div>
                )}

                {/* achievements */}
                <div className="dash-in grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {achievements.map(({ icon: Icon, t, done }) => (
                        <div key={t} className={`panel p-4 flex items-center gap-3 ${done ? 'border-mint/30' : 'opacity-55'}`}>
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border ${done ? 'bg-mint/15 border-mint/30 text-mint' : 'bg-bg border-line text-dim'}`}>
                                {done ? <Icon size={16} /> : <Lock size={14} />}
                            </div>
                            <div className="text-sm font-medium text-fg leading-tight">{t}</div>
                        </div>
                    ))}
                </div>

                {/* materiali */}
                <section id="materiali" className="mb-8 scroll-mt-20">
                    <SectionTitle icon={LayoutGrid} title="Materiali e risorse" count={materiali.length || undefined} />
                    {data.cartellaDrive && (
                        <a href={data.cartellaDrive} target="_blank" rel="noreferrer"
                            className="dash-in panel p-5 mb-4 flex items-center gap-4 group hover:border-mint/30 transition-colors border-mint/20 bg-mint/[0.03]">
                            <div className="w-12 h-12 rounded-xl bg-mint/15 border border-mint/30 text-mint flex items-center justify-center shrink-0">
                                <FolderOpen size={22} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-display font-medium text-lg text-fg">La tua cartella del percorso</div>
                                <div className="text-mute text-sm">Tutti i tuoi file su Drive, sempre aggiornati, in un posto solo.</div>
                            </div>
                            <span className="btn-primary text-sm py-2 px-4 shrink-0">Apri <ExternalLink size={14} /></span>
                        </a>
                    )}
                    {materiali.length ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {materiali.map((m, i) => <MatCard key={i} m={m} />)}
                        </div>
                    ) : !data.cartellaDrive ? (
                        <div className="panel p-6 text-mute text-sm">I materiali e le risorse del tuo percorso compaiono qui.</div>
                    ) : null}
                </section>

                {/* skill */}
                <section id="skill" className="mb-8 scroll-mt-20">
                    <SectionTitle icon={Terminal} title="Le tue skill" count={skill.length} />
                    {skill.length ? (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {skill.map((s, i) => <SkillCard key={i} s={s} onCopy={showToast} />)}
                        </div>
                    ) : (
                        <div className="panel p-6 text-mute text-sm">Le prime skill compaiono qui appena le costruiamo insieme.</div>
                    )}
                </section>

                {/* timeline call */}
                <section id="lecall" className="scroll-mt-20">
                    <SectionTitle icon={Video} title="Le nostre call" count={`${fatte}/${totali}`} />
                    <div className="relative pl-2">
                        {call.map((c, i) => {
                            const done = c.stato === 'Fatta';
                            const isNext = prossima && c === prossima;
                            return (
                                <div key={i} className="relative flex gap-4 pb-4 last:pb-0">
                                    {/* connettore */}
                                    {i < call.length - 1 && <span className="absolute left-[13px] top-8 bottom-0 w-px bg-line" />}
                                    <div className={`relative z-10 mt-0.5 shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${done ? 'bg-mint/15 border-mint/40 text-mint' : isNext ? 'bg-mint/10 border-mint/50 text-mint animate-pulse' : 'bg-bg border-line text-dim'}`}>
                                        {done ? <Check size={14} /> : <Circle size={11} />}
                                    </div>
                                    <div className={`flex-1 min-w-0 panel p-4 ${isNext ? 'border-mint/30' : ''}`}>
                                        <div className="flex items-center justify-between gap-3 flex-wrap">
                                            <div className="font-display font-medium text-fg">{c.titolo || `Call ${c.numero || i + 1}`}</div>
                                            <div className="flex items-center gap-2">
                                                {isNext && <span className="font-mono text-[10px] uppercase tracking-widest text-mint bg-mint/10 border border-mint/25 rounded-full px-2 py-0.5">prossima</span>}
                                                <span className="font-mono text-xs text-dim">{c.data ? fmtData(c.data) : ''}</span>
                                            </div>
                                        </div>
                                        {c.tema && <p className="text-mute text-sm leading-relaxed mt-1">{c.tema}</p>}
                                        {c.note && <p className="text-fg/80 text-sm leading-relaxed mt-2 bg-mint/[0.06] rounded-lg px-3 py-2">{c.note}</p>}
                                        {c.registrazione && (
                                            <a href={c.registrazione} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-mint text-sm mt-2 hover:underline">
                                                <Video size={13} /> Rivedi la registrazione
                                            </a>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </Shell>
    );
};

const SectionTitle = ({ icon: Icon, title, count }) => (
    <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-mint" />
        <h2 className="font-display font-medium text-xl text-fg">{title}</h2>
        {count !== undefined && <span className="text-dim text-sm">· {count}</span>}
    </div>
);

const SkillCard = ({ s, onCopy }) => {
    const [copied, setCopied] = useState(false);
    const attiva = s.stato === 'Attiva';
    const copy = () => {
        if (!s.comando) return;
        navigator.clipboard?.writeText(s.comando).then(() => {
            setCopied(true); onCopy?.('Comando copiato');
            setTimeout(() => setCopied(false), 1600);
        });
    };
    return (
        <div className="panel p-6 group hover:border-mint/30 transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
                <div className="font-display font-medium text-lg text-fg">{s.nome}</div>
                <span className={`shrink-0 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest px-2 py-1 rounded-full border ${attiva ? 'bg-mint/10 border-mint/30 text-mint' : 'bg-elev/40 border-line text-dim'}`}>
                    {attiva && <Sparkles size={10} />}{s.stato || '—'}
                </span>
            </div>
            {s.cosaFa && <p className="text-mute text-sm leading-relaxed mb-3">{s.cosaFa}</p>}
            {s.comando && (
                <button onClick={copy} className="w-full text-left font-mono text-xs text-mint/90 bg-bg border border-line rounded-md px-3 py-2 flex items-center justify-between gap-2 hover:border-mint/30 transition-colors">
                    <span className="truncate"><span className="text-dim">tu › </span>{s.comando}</span>
                    {copied ? <CheckCheck size={13} className="text-mint shrink-0" /> : <Copy size={13} className="text-dim group-hover:text-mint shrink-0" />}
                </button>
            )}
        </div>
    );
};

/* ---------- sub-nav sticky ---------- */
const NAV = [
    { id: 'panoramica', label: 'Panoramica' },
    { id: 'materiali', label: 'Materiali' },
    { id: 'skill', label: 'Le tue skill' },
    { id: 'lecall', label: 'Le call' },
];
const SubNav = () => {
    const go = (id) => (e) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' });
    };
    return (
        <nav className="sticky top-0 z-30 -mx-4 md:-mx-6 px-4 md:px-6 py-3 mb-8 bg-bg/85 backdrop-blur border-b border-line flex gap-2 overflow-x-auto">
            {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}
                    className="shrink-0 font-mono text-xs uppercase tracking-widest px-3 py-1.5 rounded-full border border-line text-mute hover:text-fg hover:border-mint/40 transition-colors">
                    {n.label}
                </a>
            ))}
        </nav>
    );
};

/* ---------- materiali ---------- */
const MAT_ICON = {
    Cartella: FolderOpen, Guida: BookOpen, 'Cheat-sheet': Table,
    Video: PlayCircle, Template: LayoutTemplate, Link: Link2,
};
const MatCard = ({ m }) => {
    const Icon = MAT_ICON[m.tipo] || FileText;
    const inner = (
        <>
            <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-mint/10 border border-mint/25 text-mint flex items-center justify-center shrink-0 group-hover:bg-mint/15 transition-colors">
                    <Icon size={22} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-dim">{m.tipo || 'File'}</span>
                    </div>
                    <div className="font-display font-medium text-lg text-fg leading-snug">{m.nome}</div>
                    {m.descrizione && <p className="text-mute text-sm leading-relaxed mt-1">{m.descrizione}</p>}
                </div>
                <ExternalLink size={16} className="text-dim group-hover:text-mint transition-colors shrink-0 mt-1" />
            </div>
        </>
    );
    return m.link
        ? <a href={m.link} target="_blank" rel="noreferrer" className="panel p-5 block group hover:border-mint/30 transition-colors">{inner}</a>
        : <div className="panel p-5 group">{inner}</div>;
};

/* ---------- grafico ore risparmiate (area, 1 serie) ---------- */
const OreChart = ({ oreSett, meseCorrente }) => {
    const [hover, setHover] = useState(null);
    const pathRef = useRef(null);
    const SETT_MESE = 4.3;
    const mesi = [1, 2, 3];
    const punti = mesi.map((m) => ({ m, ore: Math.round(oreSett * SETT_MESE * m) }));
    const maxOre = Math.max(...punti.map((p) => p.ore), 1);

    const W = 640, H = 190, L = 44, R = 14, T = 16, B = 30;
    const px = (i) => L + (i * (W - L - R)) / (mesi.length - 1);
    const py = (v) => T + (1 - v / maxOre) * (H - T - B);

    const cur = Math.min(Math.max(meseCorrente || 1, 1), mesi.length);
    const realIdx = cur - 1;

    const lineTo = (arr, from) => arr.map((p, i) => `${i === 0 ? 'M' : 'L'} ${px(i + from)} ${py(p.ore)}`).join(' ');
    const realePath = lineTo(punti.slice(0, realIdx + 1), 0);
    const projPath = lineTo(punti.slice(realIdx), realIdx);
    const areaPath = `${realePath} L ${px(realIdx)} ${py(0)} L ${px(0)} ${py(0)} Z`;

    useGSAP(() => {
        if (!pathRef.current || !motionOK()) return;
        const len = pathRef.current.getTotalLength();
        gsap.fromTo(pathRef.current, { strokeDasharray: len, strokeDashoffset: len },
            { strokeDashoffset: 0, duration: 1.6, ease: 'power3.out', delay: 0.4 });
    }, { dependencies: [oreSett, meseCorrente] });

    const onMove = (e) => {
        const svg = e.currentTarget.ownerSVGElement || e.currentTarget;
        const r = svg.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * W;
        let best = 0, bd = Infinity;
        mesi.forEach((_, i) => { const d = Math.abs(px(i) - x); if (d < bd) { bd = d; best = i; } });
        setHover(best);
    };

    return (
        <div className="relative">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[190px]" role="img"
                aria-label={`Ore risparmiate cumulate, da ${punti[0].ore} a ${punti[punti.length - 1].ore} ore in tre mesi`}>
                <defs>
                    <linearGradient id="oreFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="rgb(var(--mint))" stopOpacity="0.28" />
                        <stop offset="100%" stopColor="rgb(var(--mint))" stopOpacity="0" />
                    </linearGradient>
                </defs>
                {/* griglia recessiva */}
                {[0, 0.5, 1].map((f) => (
                    <line key={f} x1={L} x2={W - R} y1={py(maxOre * f)} y2={py(maxOre * f)} stroke="rgb(var(--line))" strokeWidth="1" />
                ))}
                {[0, 0.5, 1].map((f) => (
                    <text key={`t${f}`} x={L - 8} y={py(maxOre * f) + 4} textAnchor="end" className="fill-dim" style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace' }}>
                        {Math.round(maxOre * f)}
                    </text>
                ))}
                {/* area (solo parte reale) */}
                <path d={areaPath} fill="url(#oreFill)" />
                {/* proiezione tratteggiata */}
                <path d={projPath} fill="none" stroke="rgb(var(--mint))" strokeWidth="2" strokeOpacity="0.35" strokeDasharray="5 5" strokeLinecap="round" />
                {/* linea reale */}
                <path ref={pathRef} d={realePath} fill="none" stroke="rgb(var(--mint))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {/* marker punto corrente */}
                <circle cx={px(realIdx)} cy={py(punti[realIdx].ore)} r="5" fill="rgb(var(--bg))" stroke="rgb(var(--mint))" strokeWidth="2.5" />
                {/* crosshair hover */}
                {hover !== null && (
                    <>
                        <line x1={px(hover)} x2={px(hover)} y1={T} y2={py(0)} stroke="rgb(var(--line-strong))" strokeWidth="1" />
                        <circle cx={px(hover)} cy={py(punti[hover].ore)} r="4.5" fill="rgb(var(--mint))" stroke="rgb(var(--bg))" strokeWidth="2" />
                    </>
                )}
                {/* etichette mesi */}
                {mesi.map((m, i) => (
                    <text key={m} x={px(i)} y={H - 8} textAnchor="middle" className={i === realIdx ? 'fill-mint' : 'fill-dim'} style={{ fontSize: 10, fontFamily: 'ui-monospace, monospace' }}>
                        m{m}
                    </text>
                ))}
                <rect x={0} y={0} width={W} height={H} fill="transparent" onMouseMove={onMove} onMouseLeave={() => setHover(null)} />
            </svg>
            {hover !== null && (
                <div className="absolute top-2 right-2 panel px-3 py-2 pointer-events-none">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-dim">mese {punti[hover].m}</div>
                    <div className="font-display font-medium text-fg">{punti[hover].ore} ore {hover > realIdx && <span className="text-dim text-xs">(stima)</span>}</div>
                </div>
            )}
        </div>
    );
};

/* ---------- command palette ⌘K ---------- */
const CommandPalette = ({ open, setOpen, skill, materiali }) => {
    const [q, setQ] = useState('');
    const [sel, setSel] = useState(0);
    const items = [
        ...NAV.map((n) => ({ label: n.label, hint: 'sezione', run: () => { const el = document.getElementById(n.id); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); } })),
        ...skill.map((s) => ({ label: s.nome, hint: 'copia comando', run: () => navigator.clipboard?.writeText(s.comando || '') })),
        ...materiali.filter((m) => m.link).map((m) => ({ label: m.nome, hint: m.tipo || 'materiale', run: () => window.open(m.link, '_blank', 'noopener') })),
    ];
    const filtered = q ? items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase())) : items;

    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((v) => !v); }
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [setOpen]);

    useEffect(() => { setSel(0); }, [q, open]);
    if (!open) return null;

    const exec = (i) => { const it = filtered[i]; if (it) { it.run(); setOpen(false); setQ(''); } };
    const onKeyDown = (e) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
        if (e.key === 'ArrowUp') { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
        if (e.key === 'Enter') { e.preventDefault(); exec(sel); }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-bg/70 backdrop-blur-sm" onClick={() => setOpen(false)}>
            <div className="w-full max-w-lg panel overflow-hidden" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
                    <Search size={16} className="text-mint shrink-0" />
                    <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKeyDown}
                        placeholder="Cerca una skill, un materiale, una sezione…"
                        className="flex-1 bg-transparent text-fg placeholder:text-dim focus:outline-none text-sm" />
                    <kbd className="font-mono text-[10px] text-dim border border-line rounded px-1.5 py-0.5">esc</kbd>
                </div>
                <div className="max-h-[320px] overflow-y-auto py-2">
                    {filtered.length === 0 && <div className="px-4 py-6 text-center text-mute text-sm">Nessun risultato</div>}
                    {filtered.map((it, i) => (
                        <button key={i} onMouseEnter={() => setSel(i)} onClick={() => exec(i)}
                            className={`w-full text-left px-4 py-2.5 flex items-center justify-between gap-3 ${i === sel ? 'bg-mint/10' : ''}`}>
                            <span className="text-fg text-sm truncate">{it.label}</span>
                            <span className="font-mono text-[10px] uppercase tracking-widest text-dim shrink-0">{it.hint}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

/* ---------- checklist compiti (persistente) ---------- */
const Compiti = ({ call, slug }) => {
    const todos = call.filter((c) => c.note).map((c, i) => ({ id: `${c.numero || i}`, testo: c.note, call: c.titolo }));
    const key = `todo_${slug}`;
    const [done, setDone] = useState(() => {
        try { return JSON.parse(localStorage.getItem(key) || '{}'); } catch { return {}; }
    });
    if (!todos.length) return null;
    const toggle = (id) => {
        const next = { ...done, [id]: !done[id] };
        setDone(next);
        try { localStorage.setItem(key, JSON.stringify(next)); } catch { /* noop */ }
    };
    const fatti = todos.filter((t) => done[t.id]).length;
    return (
        <div className="dash-in panel p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <ListChecks size={16} className="text-mint" />
                    <h2 className="font-display font-medium text-lg text-fg">I tuoi compiti</h2>
                </div>
                <span className="font-mono text-xs text-dim">{fatti}/{todos.length}</span>
            </div>
            <ul className="space-y-2">
                {todos.map((t) => (
                    <li key={t.id}>
                        <button onClick={() => toggle(t.id)} className="w-full text-left flex items-start gap-3 group">
                            <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${done[t.id] ? 'bg-mint border-mint text-bg' : 'border-line group-hover:border-mint/50'}`}>
                                {done[t.id] && <Check size={13} />}
                            </span>
                            <span className={`text-sm leading-relaxed ${done[t.id] ? 'text-dim line-through' : 'text-fg/90'}`}>{t.testo}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

/* ---------- toast ---------- */
const Toast = ({ msg }) => (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${msg ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'}`}>
        <div className="panel px-4 py-2.5 flex items-center gap-2 border-mint/30">
            <CheckCheck size={15} className="text-mint" />
            <span className="text-fg text-sm">{msg || ' '}</span>
        </div>
    </div>
);

/* ---------- effetti ambientali ---------- */
const AmbientBackground = () => {
    const root = useRef(null);
    useGSAP(() => {
        if (!motionOK() || !root.current) return;
        const blobs = root.current.querySelectorAll('.aurora-blob');
        blobs.forEach((b, i) => {
            gsap.to(b, {
                x: `random(-80, 80)`, y: `random(-60, 60)`, scale: `random(0.9, 1.25)`,
                duration: 12 + i * 3, ease: 'sine.inOut', repeat: -1, yoyo: true,
            });
        });
    }, { scope: root });
    return (
        <div ref={root} aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="aurora-blob absolute -top-1/4 left-1/4 w-[46rem] h-[46rem] rounded-full opacity-[0.10]"
                style={{ background: 'radial-gradient(circle, rgb(var(--mint)) 0%, transparent 60%)', filter: 'blur(90px)' }} />
            <div className="aurora-blob absolute top-1/3 -right-1/5 w-[40rem] h-[40rem] rounded-full opacity-[0.07]"
                style={{ background: 'radial-gradient(circle, rgb(110 180 231) 0%, transparent 60%)', filter: 'blur(100px)' }} />
            <div className="aurora-blob absolute bottom-0 left-1/3 w-[38rem] h-[38rem] rounded-full opacity-[0.06]"
                style={{ background: 'radial-gradient(circle, rgb(var(--mint)) 0%, transparent 60%)', filter: 'blur(110px)' }} />
        </div>
    );
};

const CursorSpotlight = () => {
    const ref = useRef(null);
    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        let raf = 0, x = 0, y = 0;
        const move = (e) => {
            x = e.clientX; y = e.clientY;
            if (!raf) raf = requestAnimationFrame(() => {
                raf = 0;
                if (ref.current) ref.current.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgb(var(--mint) / 0.06), transparent 70%)`;
            });
        };
        window.addEventListener('pointermove', move);
        return () => { window.removeEventListener('pointermove', move); if (raf) cancelAnimationFrame(raf); };
    }, []);
    return <div ref={ref} aria-hidden className="fixed inset-0 -z-10 pointer-events-none" />;
};

/* wrapper 3D tilt (sottile, ease-out) */
const Tilt = ({ children, className = '', max = 6 }) => {
    const ref = useRef(null);
    const onMove = (e) => {
        const el = ref.current; if (!el || window.matchMedia('(pointer: coarse)').matches) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
    };
    const reset = () => { if (ref.current) ref.current.style.transform = 'perspective(900px) rotateX(0) rotateY(0)'; };
    return (
        <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className={className}
            style={{ transition: 'transform .3s cubic-bezier(0.22,1,0.36,1)', transformStyle: 'preserve-3d' }}>
            {children}
        </div>
    );
};

/* ---------- shell ---------- */
const Msg = ({ title, body }) => (
    <div className="panel p-8 max-w-md">
        <div className="font-display font-medium text-2xl text-fg mb-2">{title}</div>
        <p className="text-mute leading-relaxed">{body}</p>
    </div>
);

const Shell = ({ children, center, slug, onOpenCmd }) => (
    <div className="min-h-screen bg-bg text-fg relative">
        <AmbientBackground />
        <CursorSpotlight />
        <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[50vh] bg-radial-fade pointer-events-none" />
        <header className="relative border-b border-line">
            <div className="container-edge py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_6px_rgb(var(--mint))]" />
                    <span className="font-display font-medium text-fg">AI nel tuo lavoro</span>
                    <span className="text-dim text-sm hidden sm:inline">· area riservata</span>
                </div>
                <div className="flex items-center gap-3">
                    {onOpenCmd && (
                        <button onClick={onOpenCmd}
                            className="hidden sm:inline-flex items-center gap-2 border border-line hover:border-mint/40 rounded-md px-2.5 py-1.5 text-dim hover:text-fg transition-colors">
                            <Search size={13} />
                            <span className="font-mono text-[11px]">cerca</span>
                            <kbd className="font-mono text-[10px] border border-line rounded px-1 flex items-center gap-0.5"><Command size={9} />K</kbd>
                        </button>
                    )}
                    {slug && (
                        <button onClick={() => { sessionStorage.removeItem(`pw_${slug}`); window.location.reload(); }} className="font-mono text-xs text-dim hover:text-fg transition-colors ml-1">esci</button>
                    )}
                    <a href="mailto:hello@mprochilo.it" className="font-mono text-xs text-mute hover:text-fg transition-colors">serve aiuto?</a>
                </div>
            </div>
        </header>
        <main className={`relative container-edge py-12 md:py-16 ${center ? 'flex items-center justify-center min-h-[70vh]' : ''}`}>{children}</main>
    </div>
);

export default Percorso;
