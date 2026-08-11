import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger, motionOK } from '../lib/gsap';
import './DemoProfessionisti.css';

/* ------------------------------------------------------------------ *
 * Demo animate per la landing "AI nel tuo lavoro".
 * Porting in React delle scene costruite per la presentazione IAAC,
 * riscritte sul lavoro di un professionista italiano.
 *
 *   OndaMail    · la posta che da caos diventa ordine (canvas, scrub)
 *   TriageMail  · una mattina di mail che si smista e si abbozza da sola
 *   SchedaUnica · due fonti disordinate che diventano una scheda sola
 *   MicroDemos  · quattro motorini: contenuti, follow-up, report, riuso
 * ------------------------------------------------------------------ */

const DPR = () => Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2);
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* i colori del brand vivono in CSS custom properties (--mint è diverso
   fra tema chiaro e scuro): il canvas se li rilegge a runtime */
const cssRGB = (name, fallback) => {
    if (typeof window === 'undefined') return fallback;
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v ? v.split(/\s+/).join(',') : fallback;
};

/* ================================================================== *
 * 1 · L'ONDA — trecento messaggi che si mettono in fila
 * ================================================================== */

export const OndaMail = () => {
    const wrap = useRef(null);
    const canvas = useRef(null);
    const numRef = useRef(null);
    const tagRef = useRef(null);

    useEffect(() => {
        const cv = canvas.current;
        if (!cv) return;

        if (!motionOK()) {
            if (numRef.current) numRef.current.textContent = '180';
            if (tagRef.current) tagRef.current.style.opacity = 1;
            return;
        }

        const ctx = cv.getContext('2d');
        const MW = 13, MH = 9.5;
        let W = 0, H = 0, parts = [], P = 0, raf = 0;
        const mint = cssRGB('--mint', '110,231,183');
        const mute = cssRGB('--mute', '139,139,146');
        const bg = cssRGB('--bg', '10,10,11');

        const layout = () => {
            const dpr = DPR();
            W = cv.clientWidth; H = cv.clientHeight;
            cv.width = W * dpr; cv.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            const mobile = W < 820;
            const gx0 = mobile ? W * 0.08 : W * 0.5;
            const gx1 = W * 0.94;
            const gy0 = mobile ? H * 0.56 : H * 0.2;
            const gy1 = H * 0.86;
            const n = 300;
            const cols = Math.max(8, Math.floor((gx1 - gx0) / (MW + 8)));
            const rows = Math.ceil(n / cols);
            parts = Array.from({ length: n }, (_, i) => {
                const c = i % cols, r = Math.floor(i / cols);
                return {
                    ph1: Math.random() * 6.28, ph2: Math.random() * 6.28,
                    sp1: 0.3 + Math.random() * 0.5, sp2: 0.2 + Math.random() * 0.4,
                    cx: Math.random() * W, cy: Math.random() * H,
                    ax: 40 + Math.random() * 120, ay: 30 + Math.random() * 90,
                    gx: gx0 + c * ((gx1 - gx0) / cols), gy: gy0 + r * ((gy1 - gy0) / rows),
                    delay: Math.random(),
                    kind: (i % 43 === 0) ? 'rossa' : (i % 9 === 0 ? 'grigia' : 'mint'),
                    rot: (Math.random() - 0.5) * 0.9,
                };
            });
        };

        const busta = (x, y, s, col, al, rot) => {
            ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
            ctx.globalAlpha = al; ctx.fillStyle = col;
            ctx.fillRect(-MW / 2 * s, -MH / 2 * s, MW * s, MH * s);
            ctx.globalAlpha = al * 0.9; ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(-MW / 2 * s, -MH / 2 * s); ctx.lineTo(0, 0); ctx.lineTo(MW / 2 * s, -MH / 2 * s);
            ctx.strokeStyle = `rgba(${bg},0.85)`; ctx.stroke();
            ctx.restore();
        };

        const lerp = (a, b, t) => a + (b - a) * t;
        const easeIO = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

        layout();
        window.addEventListener('resize', layout);

        const t0 = performance.now();
        const tick = (now) => {
            const t = (now - t0) / 1000;
            ctx.clearRect(0, 0, W, H);
            if (P > 0.82 && parts.length) {
                const g0 = parts[0], g1 = parts[parts.length - 1];
                const gcx = (g0.gx + g1.gx) / 2, gcy = (g0.gy + g1.gy) / 2;
                const rad = Math.max(g1.gx - g0.gx, g1.gy - g0.gy) * 0.75;
                const gl = ctx.createRadialGradient(gcx, gcy, 0, gcx, gcy, rad);
                const pulse = 0.05 + Math.sin(t * 1.6) * 0.018;
                gl.addColorStop(0, `rgba(${mint},${((P - 0.82) / 0.18) * pulse})`);
                gl.addColorStop(1, `rgba(${mint},0)`);
                ctx.fillStyle = gl; ctx.fillRect(0, 0, W, H);
            }
            for (const p of parts) {
                const wx = p.cx + Math.sin(t * p.sp1 + p.ph1) * p.ax + Math.cos(t * 0.17 + p.ph2) * 24;
                const wy = p.cy + Math.cos(t * p.sp2 + p.ph2) * p.ay + Math.sin(t * 0.13 + p.ph1) * 18;
                const w0 = 0.4 + p.delay * 0.28;
                const s = easeIO(Math.max(0, Math.min(1, (P - w0) / 0.22)));
                const x = lerp(wx, p.gx, s), y = lerp(wy, p.gy, s);
                const rot = lerp(p.rot + Math.sin(t + p.ph1) * 0.25, 0, s);
                let col, al;
                if (s < 0.55) { col = `rgb(${mute})`; al = 0.42 + s * 0.3; }
                else if (p.kind === 'rossa') { col = '#F87171'; al = 0.95; }
                else if (p.kind === 'grigia') { col = `rgb(${mute})`; al = 0.7; }
                else { col = `rgb(${mint})`; al = 0.55 + s * 0.4; }
                busta(x, y, lerp(1, 0.92, s), col, al, rot);
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        // trecento buste che disegnano fuori schermo sono lavoro sprecato
        const io = new IntersectionObserver(([e]) => {
            if (e.isIntersecting && !raf) raf = requestAnimationFrame(tick);
            if (!e.isIntersecting && raf) { cancelAnimationFrame(raf); raf = 0; }
        }, { rootMargin: '200px' });
        io.observe(wrap.current);

        const st = ScrollTrigger.create({
            trigger: wrap.current, start: 'top top', end: '+=1800',
            pin: true, scrub: 0.4, anticipatePin: 1,
            onUpdate: (self) => {
                P = self.progress;
                if (numRef.current) numRef.current.textContent = Math.round(Math.min(1, P * 2.4) * 180);
                if (tagRef.current) tagRef.current.style.opacity = P > 0.8 ? 1 : 0;
            },
        });

        return () => {
            io.disconnect();
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', layout);
            st.kill();
        };
    }, []);

    return (
        <section className="border-b border-line">
            <div ref={wrap} className="relative h-screen min-h-[560px] overflow-hidden">
                <canvas ref={canvas} className="absolute inset-0 w-full h-full" />
                <div className="relative h-full container-edge flex items-center">
                    <div className="max-w-md">
                        <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// dove finisce la giornata</div>
                        <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight leading-tight mb-7">
                            Ogni mese la stessa onda, e la prendi tutta tu.
                        </h2>
                        <div className="flex items-baseline gap-3 mb-5">
                            <span ref={numRef} className="font-display font-medium text-5xl md:text-6xl text-mint tabular-nums leading-none">0</span>
                            <span className="text-mute text-sm leading-snug max-w-[16rem]">
                                fra mail, messaggi e richieste che chiedono quasi sempre le stesse cinque cose
                            </span>
                        </div>
                        <p className="text-mute leading-relaxed">
                            Disponibilità, preventivi, appuntamenti da spostare, documenti mancanti, a che punto siamo. Risposte una per una, a mano, mentre il lavoro per cui ti pagano aspetta il suo turno.
                        </p>
                        <div
                            ref={tagRef}
                            style={{ opacity: 0, transition: 'opacity .6s' }}
                            className="mt-7 inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/10 px-4 py-2 font-mono text-xs uppercase tracking-widest text-mint"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-mint" /> smistate, bozze pronte
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ================================================================== *
 * 2 · IL TRIAGE — la casella che si smaltisce quasi da sola
 * ================================================================== */

const MAIL = [
    {
        from: 'giulia.ferrari@', subj: 'Hai disponibilità a settembre?', cat: 'disponibilità',
        draft: 'Ciao Giulia, a settembre ho ancora due spazi liberi, martedì e giovedì mattina. Ti lascio il link all’agenda: scegli l’orario che preferisci e la conferma ti arriva subito.',
    },
    {
        from: 'studio.marini@', subj: 'Preventivo per il progetto', cat: 'preventivo',
        draft: 'Buongiorno, in allegato il preventivo con le tre voci di cui abbiamo parlato e i tempi di consegna. Resta valido trenta giorni: se qualcosa non torna lo rivediamo insieme.',
    },
    {
        from: 'a.bruni@', subj: 'Posso spostare giovedì?', cat: 'agenda',
        draft: 'Ciao Andrea, nessun problema. Ho libero venerdì alle 11 oppure lunedì alle 15: dimmi quale ti va meglio e sposto io l’appuntamento.',
    },
    {
        from: 'chiara.longo@', subj: 'I documenti che mi avevi chiesto', cat: 'documenti',
        draft: 'Ciao Chiara, ricevuti, grazie. Manca solo la visura: appena arriva procedo e ti aggiorno entro la settimana.',
    },
    {
        from: 'marco.dp@', subj: 'A che punto siamo?', cat: 'stato lavori',
        draft: 'Ciao Marco, la parte di analisi è chiusa e questa settimana lavoro alla bozza. Ti mando tutto entro venerdì, così il weekend te lo guardi con calma.',
    },
    {
        from: 'info@bertolini.it', subj: 'Come funziona la prima consulenza', cat: 'nuovo contatto',
        draft: 'Buongiorno, la prima consulenza dura un’ora e serve a capire la situazione e cosa conviene fare. Le lascio il link per prenotarla e il modulo da compilare prima.',
    },
    {
        from: 'l.esposito@', subj: 'Fattura di luglio', cat: 'amministrazione',
        draft: 'Ciao Luca, la fattura di luglio è stata emessa ieri e la trovi in allegato. Se ti serve in un formato diverso dimmelo e te la rimando.',
    },
    {
        from: 'valentina.r@', subj: 'Mi consigli un collega a Milano?', cat: 'rimando',
        draft: 'Ciao Valentina, per quella parte ti conviene una persona sul posto. Ti giro due nomi di cui mi fido, poi decidi tu con chi parlare.',
    },
    {
        from: 'p.gallo@', subj: 'Serve ancora la mia firma?', cat: 'pratica',
        draft: 'Ciao Paolo, sì, manca la firma sull’ultimo modulo. Te lo rimando adesso: firmalo e rimandamelo, al resto penso io.',
    },
    {
        from: 'lettore newsletter', subj: 'Ho letto il numero, come iniziamo?', cat: 'nuovo contatto',
        draft: 'Ciao, grazie di avermi scritto. Il modo più semplice è una call di quindici minuti per capire se posso esserti utile davvero: ti lascio il link all’agenda.',
    },
    {
        from: 'g.ferrero@', subj: 'Sconto se pago tutto subito', cat: 'tocca a te',
        reason: 'Chiede uno sconto sul saldo. I soldi e le eccezioni le decidi tu, non un’automazione.',
    },
    {
        from: 'sara.venturi@', subj: 'Vorrei interrompere il percorso', cat: 'tocca a te',
        reason: 'Un cliente che vuole fermarsi. Va letta con calma e risposta a mano, con le tue parole.',
    },
];

export const TriageMail = () => {
    const root = useRef(null);
    const listRef = useRef(null);
    const coreRef = useRef(null);
    const inboxCount = useRef(null);
    const draftCount = useRef(null);
    const humanCount = useRef(null);
    const draftTo = useRef(null);
    const draftBadge = useRef(null);
    const draftBody = useRef(null);
    const token = useRef(0);
    const alive = useRef(true);

    const build = () => {
        const list = listRef.current;
        if (!list) return;
        list.innerHTML = '';
        MAIL.forEach((m, i) => {
            const d = document.createElement('div');
            d.className = 'demo-mail' + (m.cat === 'tocca a te' ? ' is-human' : '');
            d.dataset.i = i;
            d.innerHTML = `<div class="dm-from">${m.from}</div><div class="dm-subj">${m.subj}</div><span class="dm-chip">${m.cat}</span>`;
            list.appendChild(d);
        });
    };

    const typewrite = async (text, my) => {
        const body = draftBody.current;
        if (!body) return;
        body.innerHTML = '';
        const span = document.createElement('span');
        const cur = document.createElement('span');
        cur.className = 'dm-cursor';
        body.append(span, cur);
        const fast = !motionOK();
        const step = fast ? text.length : 3;
        for (let i = 0; i <= text.length; i += step) {
            if (my !== token.current || !alive.current) return;
            span.textContent = text.slice(0, i);
            await wait(12);
        }
        span.textContent = text;
        if (my === token.current) cur.remove();
    };

    const run = async () => {
        const my = ++token.current;
        build();
        const fast = !motionOK();
        let drafts = 0, humans = 0;
        if (draftCount.current) draftCount.current.textContent = '0';
        if (humanCount.current) humanCount.current.textContent = '0';
        if (inboxCount.current) inboxCount.current.textContent = '0';
        if (draftTo.current) draftTo.current.textContent = 'anteprima della bozza';
        if (draftBadge.current) { draftBadge.current.className = 'dm-badge'; draftBadge.current.textContent = ''; }
        if (draftBody.current) draftBody.current.innerHTML = '<span class="dm-muted">Sto leggendo la posta in arrivo…</span>';

        for (let i = 0; i < MAIL.length; i++) {
            if (my !== token.current || !alive.current) return;
            const m = MAIL[i];
            const el = listRef.current?.querySelector(`[data-i="${i}"]`);
            if (!el) return;
            gsap.to(el, { opacity: 1, x: 0, duration: 0.28, ease: 'power2.out' });
            if (inboxCount.current) inboxCount.current.textContent = String(i + 1);
            el.classList.add('is-active');
            coreRef.current?.classList.add('is-spinning');
            await wait(fast ? 0 : 230);
            if (my !== token.current || !alive.current) return;
            gsap.to(el.querySelector('.dm-chip'), { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' });

            if (m.cat === 'tocca a te') {
                humans++;
                if (humanCount.current) humanCount.current.textContent = String(humans);
                if (draftBadge.current) { draftBadge.current.className = 'dm-badge is-human'; draftBadge.current.textContent = 'TENUTA PER TE'; }
                if (draftTo.current) draftTo.current.textContent = m.from;
                if (draftBody.current) {
                    draftBody.current.innerHTML = `<strong class="dm-hold">Fermata qui.</strong>\n\n${m.reason}\n\nNessuna bozza scritta per questa.`;
                    gsap.fromTo(draftBody.current, { opacity: 0.3 }, { opacity: 1, duration: 0.3 });
                }
            } else {
                drafts++;
                if (draftCount.current) draftCount.current.textContent = String(drafts);
                if (draftBadge.current) { draftBadge.current.className = 'dm-badge is-ok'; draftBadge.current.textContent = 'BOZZA PRONTA'; }
                if (draftTo.current) draftTo.current.textContent = 'a: ' + m.from;
                await typewrite(m.draft, my);
            }
            coreRef.current?.classList.remove('is-spinning');
            el.classList.remove('is-active');
            el.classList.add('is-done');
            await wait(fast ? 0 : 180);
        }
        if (my === token.current && motionOK()) {
            gsap.fromTo('.dm-ctr', { scale: 1 }, { scale: 1.05, yoyo: true, repeat: 1, duration: 0.25, stagger: 0.1 });
        }
    };

    useGSAP(() => {
        build();
        const st = ScrollTrigger.create({ trigger: root.current, start: 'top 65%', once: true, onEnter: run });
        return () => st.kill();
    }, { scope: root });

    // il doppio mount di StrictMode non deve lasciare la demo spenta
    useEffect(() => {
        alive.current = true;
        return () => { alive.current = false; token.current++; };
    }, []);

    return (
        <section ref={root} className="py-20 md:py-28 border-b border-line">
            <div className="container-edge">
                <div className="reveal mb-10 max-w-3xl">
                    <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// una mattina di posta</div>
                    <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight leading-tight mb-6">
                        La casella si svuota quasi da sola.
                    </h2>
                    <p className="text-mute text-lg leading-relaxed">
                        Dodici richieste vere entrano in casella. Vengono smistate, per ognuna nasce una bozza già scritta con le tue parole, e le due che toccano soldi o promesse si fermano e restano a te.{' '}
                        <button onClick={run} className="dm-replay">▶ rivedi</button>
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-4">
                    {/* casella */}
                    <div className="lg:col-span-4 panel overflow-hidden">
                        <div className="px-4 py-2.5 border-b border-line bg-elev/40 flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                            <span className="w-2.5 h-2.5 rounded-full bg-mint/70" />
                            <span className="ml-2 font-mono text-[11px] uppercase tracking-widest text-dim">posta in arrivo</span>
                            <span ref={inboxCount} className="ml-auto font-mono text-[11px] text-mint tabular-nums">0</span>
                        </div>
                        <div ref={listRef} className="dm-list p-3 space-y-2" />
                    </div>

                    {/* motore */}
                    <div className="lg:col-span-3 panel p-6 flex flex-col items-center justify-center gap-7">
                        <div ref={coreRef} className="dm-core">
                            <span className="dm-ring" />
                            <span className="dm-core-label">Claude Code<br /><span>smistamento</span></span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 w-full">
                            <div className="dm-ctr rounded-lg bg-bg border border-line p-4 text-center">
                                <span ref={draftCount} className="font-display font-medium text-3xl text-mint tabular-nums">0</span>
                                <div className="text-mute text-xs mt-1 leading-snug">bozze pronte</div>
                            </div>
                            <div className="dm-ctr rounded-lg bg-bg border border-line p-4 text-center">
                                <span ref={humanCount} className="font-display font-medium text-3xl text-red-300 tabular-nums">0</span>
                                <div className="text-mute text-xs mt-1 leading-snug">tenute per te</div>
                            </div>
                        </div>
                    </div>

                    {/* bozza */}
                    <div className="lg:col-span-5 panel overflow-hidden flex flex-col">
                        <div className="px-4 py-2.5 border-b border-line bg-elev/40 flex items-center justify-between gap-3">
                            <span ref={draftTo} className="font-mono text-[11px] text-mute truncate">anteprima della bozza</span>
                            <span ref={draftBadge} className="dm-badge" />
                        </div>
                        <div ref={draftBody} className="dm-body p-5 md:p-6 text-mute leading-relaxed flex-1">
                            <span className="dm-muted">Qui compare la risposta man mano che ogni messaggio viene letto.</span>
                        </div>
                    </div>
                </div>

                <p className="reveal text-mute leading-relaxed mt-6 max-w-3xl">
                    Niente parte da solo verso l’esterno: le bozze restano lì e le mandi tu. Quello che sparisce è il lavoro di riscrivere per la ventesima volta la stessa risposta.
                </p>
            </div>
        </section>
    );
};

/* ================================================================== *
 * 3 · LA SCHEDA UNICA — due fonti disordinate, un registro solo
 * ================================================================== */

const RIGHE_A = [
    { n: 'M. Bianchi · consulenza', k: 'a' },
    { n: 'Studio Marini · progetto', k: 'a', dup: true },
    { n: 'L. Ferrero · pratica', k: 'a' },
    { n: 'C. Longo · rinnovo', k: 'a' },
];
const RIGHE_B = [
    { n: 'Studio Marini · progetto', k: 'b', dup: true },
    { n: 'P. Gallo · preventivo', k: 'b' },
    { n: 'A. Bruni · consulenza', k: 'b' },
    { n: 'V. Rizzo · primo contatto', k: 'b' },
];

export const SchedaUnica = () => {
    const root = useRef(null);
    const aRef = useRef(null);
    const bRef = useRef(null);
    const outRef = useRef(null);
    const footRef = useRef(null);
    const token = useRef(0);
    const alive = useRef(true);

    const rowHTML = (r) => `<span class="sr-dot sr-${r.k}"></span><span class="sr-name">${r.n}</span><span class="sr-tag">unita</span>`;

    const build = () => {
        [aRef, bRef, outRef].forEach((ref) => { if (ref.current) ref.current.innerHTML = ''; });
        const fill = (ref, rows) => rows.forEach((r) => {
            const d = document.createElement('div');
            d.className = 'sr-row';
            d.innerHTML = rowHTML(r);
            ref.current?.appendChild(d);
        });
        fill(aRef, RIGHE_A);
        fill(bRef, RIGHE_B);
        if (footRef.current) footRef.current.textContent = '';
    };

    const flyRow = async (fromEl, r, isDup, my) => {
        const fast = !motionOK();
        const fr = fromEl.getBoundingClientRect();
        const fly = document.createElement('div');
        fly.className = 'sr-row sr-fly';
        fly.innerHTML = rowHTML(r);
        fly.style.left = fr.left + 'px';
        fly.style.top = fr.top + 'px';
        fly.style.width = fr.width + 'px';
        document.body.appendChild(fly);
        fromEl.style.opacity = 0.25;

        let target = isDup ? outRef.current?.querySelector('[data-dup]') : null;
        if (!target) {
            target = document.createElement('div');
            target.className = 'sr-row';
            target.innerHTML = rowHTML(r);
            target.style.opacity = 0;
            if (isDup) target.dataset.dup = '1';
            outRef.current?.appendChild(target);
        }
        const tr = target.getBoundingClientRect();
        await new Promise((res) => gsap.to(fly, {
            x: tr.left - fr.left, y: tr.top - fr.top, width: tr.width,
            duration: fast ? 0 : 0.55, ease: 'power3.inOut', onComplete: res,
        }));
        fly.remove();
        if (my !== token.current || !alive.current) return;
        target.style.opacity = 1;
        target.classList.add('is-landed');
        if (isDup && target.dataset.hit) {
            target.classList.add('is-dup');
            target.querySelector('.sr-tag')?.classList.add('is-on');
        }
        if (isDup) target.dataset.hit = '1';
    };

    const run = async () => {
        const my = ++token.current;
        const fast = !motionOK();
        build();
        await wait(fast ? 0 : 300);
        const seqA = [...(aRef.current?.children || [])];
        const seqB = [...(bRef.current?.children || [])];
        const seq = [];
        for (let i = 0; i < Math.max(seqA.length, seqB.length); i++) {
            if (seqA[i]) seq.push([seqA[i], RIGHE_A[i]]);
            if (seqB[i]) seq.push([seqB[i], RIGHE_B[i]]);
        }
        for (const [el, r] of seq) {
            if (my !== token.current || !alive.current) return;
            await flyRow(el, r, !!r.dup, my);
            await wait(fast ? 0 : 120);
        }
        if (my !== token.current || !alive.current) return;
        const testo = '7 clienti, 1 doppione unito · 4 pratiche aperte · 2 preventivi in attesa · niente riscritto a mano';
        if (fast) { if (footRef.current) footRef.current.textContent = testo; return; }
        for (let i = 0; i <= testo.length; i += 2) {
            if (my !== token.current || !alive.current) return;
            if (footRef.current) footRef.current.textContent = testo.slice(0, i);
            await wait(14);
        }
        if (footRef.current) footRef.current.textContent = testo;
    };

    useGSAP(() => {
        build();
        const st = ScrollTrigger.create({ trigger: root.current, start: 'top 65%', once: true, onEnter: run });
        return () => st.kill();
    }, { scope: root });

    // il doppio mount di StrictMode non deve lasciare la demo spenta
    useEffect(() => {
        alive.current = true;
        return () => { alive.current = false; token.current++; };
    }, []);

    return (
        <section ref={root} className="py-20 md:py-28 border-b border-line">
            <div className="container-edge">
                <div className="reveal mb-10 max-w-3xl">
                    <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// una scheda sola per cliente</div>
                    <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight leading-tight mb-6">
                        Il foglio, la casella e la testa: tutto in un registro solo.
                    </h2>
                    <p className="text-mute text-lg leading-relaxed">
                        Un pezzo di storia sta nel file Excel, un pezzo nelle mail, un pezzo te lo ricordi e basta. Il sistema li mette insieme, riconosce quando è la stessa persona e tiene una scheda sola, aggiornata.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                    <div className="panel p-5">
                        <div className="font-mono text-[11px] uppercase tracking-widest text-dim mb-4">il tuo foglio Excel</div>
                        <div ref={aRef} className="space-y-2" />
                    </div>
                    <div className="panel p-5">
                        <div className="font-mono text-[11px] uppercase tracking-widest text-dim mb-4">la casella di posta</div>
                        <div ref={bRef} className="space-y-2" />
                    </div>
                    <div className="panel p-5 border-mint/30 bg-mint/[0.04] flex flex-col">
                        <div className="font-mono text-[11px] uppercase tracking-widest text-mint mb-4">
                            una scheda per cliente
                        </div>
                        <div ref={outRef} className="space-y-2" />
                        <div ref={footRef} className="font-mono text-[11px] text-mute leading-relaxed mt-4 min-h-[2.5rem]" />
                        <button onClick={run} className="dm-replay self-start mt-auto">▶ rivedi</button>
                    </div>
                </div>

                <p className="reveal text-mute leading-relaxed mt-6 max-w-3xl">
                    Prima della call apri una pagina sola e sai già chi è, cosa aspetta e cosa gli hai promesso l’ultima volta. Senza cercare in tre posti mentre il telefono squilla.
                </p>
            </div>
        </section>
    );
};

/* ================================================================== *
 * 4 · QUATTRO MOTORINI — contenuti, follow-up, report, riuso
 * ================================================================== */

const BRIEF = 'Nuovo servizio: consulenze brevi da 30 minuti, si parte a ottobre';

const Fabbrica = () => {
    const root = useRef(null);
    const briefRef = useRef(null);

    useGSAP(() => {
        const chips = root.current.querySelectorAll('.mk-chip');
        const bars = root.current.querySelectorAll('.mk-chip i');
        let tl;
        const play = () => {
            tl?.kill();
            if (briefRef.current) briefRef.current.textContent = '';
            gsap.set(chips, { opacity: 0, y: 10 });
            gsap.set(bars, { scaleX: 0 });
            tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2 });
            tl.to({ p: 0 }, {
                p: 1, duration: motionOK() ? 1.4 : 0, ease: 'none',
                onUpdate() {
                    if (briefRef.current) briefRef.current.textContent = BRIEF.slice(0, Math.round(this.targets()[0].p * BRIEF.length));
                },
            });
            tl.to(chips, { opacity: 1, y: 0, duration: 0.45, stagger: 0.18, ease: 'back.out(1.6)' }, '+=0.2');
            tl.to(bars, { scaleX: 1, duration: 0.5, stagger: 0.07, ease: 'power2.out' }, '<+0.15');
            tl.to({}, { duration: 0.1 });
        };
        const st = ScrollTrigger.create({
            trigger: root.current, start: 'top 85%',
            onEnter: play, onEnterBack: play,
            onLeave: () => tl?.pause(), onLeaveBack: () => tl?.pause(),
        });
        return () => { tl?.kill(); st.kill(); };
    }, { scope: root });

    return (
        <div ref={root} className="mk-viz">
            <div className="mk-brief">
                <span className="mk-brief-label">brief</span>
                <span ref={briefRef} className="mk-brief-text" />
                <span className="mk-caret" />
            </div>
            <div className="mk-outs">
                {[['Post', 2], ['Newsletter', 2], ['Mail ai clienti', 3]].map(([k, n]) => (
                    <div key={k} className="mk-chip">
                        <span>{k}</span>
                        {Array.from({ length: n }, (_, i) => <i key={i} />)}
                    </div>
                ))}
            </div>
        </div>
    );
};

const FollowUp = () => {
    const root = useRef(null);
    const NOMI = ['G.F.', 'S.M.', 'A.B.', 'C.L.', 'M.D.', 'P.G.', 'V.R.', 'L.E.'];
    const FERMI = [1, 4, 6];

    useGSAP(() => {
        const prs = [...root.current.querySelectorAll('.mk-pr')];
        let tl;
        const play = () => {
            tl?.kill();
            prs.forEach((p) => {
                p.classList.remove('is-cold', 'is-warm');
                gsap.set(p.querySelector('.mk-ntag'), { opacity: 0, y: 6, scale: 0.8 });
            });
            tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4 });
            FERMI.forEach((i, k) => tl.call(() => prs[i].classList.add('is-cold'), null, 0.5 + k * 0.35));
            FERMI.forEach((i, k) => {
                const t = 2.2 + k * 0.55;
                tl.call(() => { prs[i].classList.remove('is-cold'); prs[i].classList.add('is-warm'); }, null, t);
                tl.to(prs[i].querySelector('.mk-ntag'), { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(2)' }, t);
            });
            tl.to({}, { duration: 1.4 });
        };
        const st = ScrollTrigger.create({
            trigger: root.current, start: 'top 85%',
            onEnter: play, onEnterBack: play,
            onLeave: () => tl?.pause(), onLeaveBack: () => tl?.pause(),
        });
        return () => { tl?.kill(); st.kill(); };
    }, { scope: root });

    return (
        <div ref={root} className="mk-viz">
            <div className="mk-prospects">
                {NOMI.map((n) => (
                    <div key={n} className="mk-pr">
                        <span className="mk-ntag">bozza pronta</span>
                        <div className="mk-face">{n}</div>
                        <div className="mk-pname">cliente</div>
                    </div>
                ))}
            </div>
            <div className="mk-caption">
                <span className="mk-cold">fermo da tre settimane</span>
                <span className="mk-arrow">→</span>
                <span className="mk-warm">risentito</span>
            </div>
        </div>
    );
};

const ReportLunedi = () => {
    const root = useRef(null);
    const DATI = [['Passaparola', 64], ['Sito', 44], ['Instagram', 82], ['Newsletter', 32], ['LinkedIn', 56]];
    const VALORI = [12, 8, 17, 5, 9];

    useGSAP(() => {
        const bars = [...root.current.querySelectorAll('.mk-bar')];
        const steps = [...root.current.querySelectorAll('.mk-step')];
        const stamp = root.current.querySelector('.mk-stamp');
        let tl;
        const play = () => {
            tl?.kill();
            gsap.set(root.current.querySelectorAll('.mk-fill'), { scaleY: 0 });
            gsap.set(root.current.querySelectorAll('.mk-val'), { opacity: 0 });
            gsap.set(stamp, { opacity: 0, scale: 1.3, rotate: -6 });
            steps.forEach((s) => s.classList.remove('is-on'));
            tl = gsap.timeline({ repeat: -1, repeatDelay: 2.6 });
            tl.to(root.current.querySelectorAll('.mk-fill'), { scaleY: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, 0.2);
            bars.forEach((b, i) => {
                const obj = { v: 0 };
                tl.to(obj, {
                    v: VALORI[i], duration: 0.8, ease: 'power2.out',
                    onStart: () => gsap.set(b.querySelector('.mk-val'), { opacity: 1 }),
                    onUpdate: () => { b.querySelector('.mk-val').textContent = Math.round(obj.v); },
                }, 0.3 + i * 0.1);
            });
            steps.forEach((s, i) => tl.call(() => s.classList.add('is-on'), null, 1.4 + i * 0.3));
            tl.to(stamp, { opacity: 1, scale: 1, rotate: -3, duration: 0.3, ease: 'power4.in' }, 2.5);
            tl.to({}, { duration: 1 });
        };
        const st = ScrollTrigger.create({
            trigger: root.current, start: 'top 85%',
            onEnter: play, onEnterBack: play,
            onLeave: () => tl?.pause(), onLeaveBack: () => tl?.pause(),
        });
        return () => { tl?.kill(); st.kill(); };
    }, { scope: root });

    return (
        <div ref={root} className="mk-viz mk-report">
            <div className="mk-bars">
                {DATI.map(([lab, h]) => (
                    <div key={lab} className="mk-bar">
                        <span className="mk-val">0</span>
                        <div className="mk-fill" style={{ height: h + 'px' }} />
                        <span className="mk-blab">{lab}</span>
                    </div>
                ))}
            </div>
            <div className="mk-funnel">
                <span className="mk-step">contatti</span>
                <span className="mk-step">preventivi</span>
                <span className="mk-step is-mint">clienti</span>
            </div>
            <div className="mk-stamp">ogni lunedì 09:00</div>
        </div>
    );
};

const UnaCall = () => {
    const root = useRef(null);
    const svgRef = useRef(null);

    useGSAP(() => {
        const svg = svgRef.current;
        const NS = 'http://www.w3.org/2000/svg';
        const CX = 160, CY = 75;
        const FOGLIE = [
            ['post', 40, 22], ['storia', 110, 12], ['reel', 210, 12], ['LinkedIn', 280, 22],
            ['newsletter', 30, 118], ['articolo', 105, 136], ['mail', 215, 136], ['appunti', 285, 118],
        ];
        svg.innerHTML = '';
        const rami = [], foglie = [];
        FOGLIE.forEach(([lab, x, y]) => {
            const p = document.createElementNS(NS, 'path');
            const mx = (CX + x) / 2, my = (CY + y) / 2 + (y > CY ? 14 : -14);
            p.setAttribute('d', `M ${CX} ${CY} Q ${mx} ${my} ${x} ${y}`);
            p.setAttribute('class', 'mk-branch');
            svg.appendChild(p); rami.push(p);
            const g = document.createElementNS(NS, 'g');
            const r = document.createElementNS(NS, 'rect');
            const w = lab.length * 4.8 + 14;
            r.setAttribute('x', x - w / 2); r.setAttribute('y', y - 8);
            r.setAttribute('width', w); r.setAttribute('height', 16);
            r.setAttribute('rx', 5); r.setAttribute('class', 'mk-leaf');
            const t = document.createElementNS(NS, 'text');
            t.setAttribute('x', x); t.setAttribute('y', y + 2.5);
            t.setAttribute('text-anchor', 'middle'); t.setAttribute('class', 'mk-leaf-label');
            t.textContent = lab;
            g.append(r, t); svg.appendChild(g); foglie.push(g);
        });
        const cg = document.createElementNS(NS, 'g');
        const cr = document.createElementNS(NS, 'rect');
        cr.setAttribute('x', CX - 36); cr.setAttribute('y', CY - 11);
        cr.setAttribute('width', 72); cr.setAttribute('height', 22);
        cr.setAttribute('rx', 6); cr.setAttribute('class', 'mk-center');
        const ct = document.createElementNS(NS, 'text');
        ct.setAttribute('x', CX); ct.setAttribute('y', CY + 3);
        ct.setAttribute('text-anchor', 'middle'); ct.setAttribute('class', 'mk-center-label');
        ct.textContent = '1 call';
        cg.append(cr, ct); svg.appendChild(cg);

        rami.forEach((b) => {
            const L = b.getTotalLength();
            b.style.strokeDasharray = L;
            b.style.strokeDashoffset = L;
        });

        let tl;
        const play = () => {
            tl?.kill();
            gsap.set(foglie, { opacity: 0, scale: 0.6, transformOrigin: 'center' });
            rami.forEach((b) => { b.style.strokeDashoffset = b.getTotalLength(); });
            gsap.set(cg, { opacity: 0, scale: 0.6, transformOrigin: 'center' });
            tl = gsap.timeline({ repeat: -1, repeatDelay: 2.4 });
            tl.to(cg, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' });
            rami.forEach((b, i) => {
                tl.to(b, { strokeDashoffset: 0, duration: 0.5, ease: 'power2.out' }, 0.35 + i * 0.09);
                tl.to(foglie[i], { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, 0.7 + i * 0.09);
            });
            tl.to({}, { duration: 1.6 });
        };
        const st = ScrollTrigger.create({
            trigger: root.current, start: 'top 85%',
            onEnter: play, onEnterBack: play,
            onLeave: () => tl?.pause(), onLeaveBack: () => tl?.pause(),
        });
        return () => { tl?.kill(); st.kill(); };
    }, { scope: root });

    return (
        <div ref={root} className="mk-viz">
            <svg ref={svgRef} viewBox="0 0 320 150" preserveAspectRatio="xMidYMid meet" className="w-full" />
        </div>
    );
};

const MOTORI = [
    {
        n: '01', t: 'Da una riga di brief, i contenuti del mese',
        d: 'Scrivi una riga su quello che stai lanciando. Escono il post, il numero della newsletter e la mail ai clienti, con la tua voce dentro, pronti da rileggere.',
        viz: Fabbrica,
    },
    {
        n: '02', t: 'I clienti fermi che stai per perdere',
        d: 'Chi non risponde da settimane, chi aspetta un preventivo, chi ha chiuso e andrebbe risentito: la mail è già scritta, tu leggi e mandi.',
        viz: FollowUp,
    },
    {
        n: '03', t: 'Il report del lunedì si scrive da solo',
        d: 'Da dove arrivano i contatti, quanti diventano preventivi, quanti diventano clienti. Pronto ogni lunedì, senza aprire un foglio.',
        viz: ReportLunedi,
    },
    {
        n: '04', t: 'Una call diventa otto contenuti',
        d: 'Una consulenza, un intervento, una lezione. Diventano i pezzi già tagliati per i tuoi canali, che programmi in un pomeriggio.',
        viz: UnaCall,
    },
];

export const MicroDemos = () => (
    <section className="py-20 md:py-28 border-b border-line">
        <div className="container-edge">
            <div className="reveal mb-12 max-w-3xl">
                <div className="font-mono text-xs uppercase tracking-widest text-mint mb-5">// quattro motorini</div>
                <h2 className="font-display font-medium text-3xl md:text-5xl tracking-tight leading-tight mb-6">
                    Quattro pezzi piccoli, ognuno fa bene un lavoro noioso.
                </h2>
                <p className="text-mute text-lg leading-relaxed">
                    Non sono quattro app da comprare: sono quattro cose che il tuo sistema fa, e che nel percorso costruiamo su come lavori tu. Queste qui sotto girano davvero, sono la versione in miniatura di quello che monteremo insieme.
                </p>
            </div>

            <div className="stagger-group grid md:grid-cols-2 gap-4">
                {MOTORI.map(({ n, t, d, viz: Viz }) => (
                    <div key={n} className="panel p-6 md:p-7">
                        <div className="flex items-start gap-4 mb-3">
                            <span className="font-mono text-xs text-mint mt-1">{n}</span>
                            <h3 className="font-display font-medium text-xl text-fg leading-snug">{t}</h3>
                        </div>
                        <p className="text-mute leading-relaxed mb-5">{d}</p>
                        <Viz />
                    </div>
                ))}
            </div>

            <p className="reveal text-dim text-sm mt-8 text-center">
                Quali di questi valgono la pena per il tuo mestiere lo decidiamo insieme, guardando la tua settimana vera.
            </p>
        </div>
    </section>
);
