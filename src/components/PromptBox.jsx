import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Sparkles, Loader2 } from 'lucide-react';

const samples = [
    'Costruiscimi un agente che gestisce le email di lavoro',
    'Automatizza il flusso di contenuti della mia azienda',
    'Voglio una knowledge base AI sui processi interni',
    'Come uso Claude Code per togliere lavoro ripetitivo?',
];

const responses = {
    'Costruiscimi un agente che gestisce le email di lavoro': [
        '> Disegno un agente email su misura:',
        '',
        '1. Triage · legge, classifica e prioritizza la inbox',
        '2. Bozze · risponde con la tua voce, tu approvi',
        '3. Estrazione · task e date finiscono in Notion/Calendar',
        '4. Escalation · ti passa solo ciò che richiede una persona',
        '',
        '→ Resta umano dove conta. Sparisce dove è solo routine.',
    ],
    'Automatizza il flusso di contenuti della mia azienda': [
        '> Pipeline contenuti proposta:',
        '',
        '[1] Idea capture · Notion → webhook',
        '[2] Drafting · skill Claude addestrata sulla voce del brand',
        '[3] Review · passaggio umano + checklist QA',
        '[4] Distribution · API newsletter + cross-post social',
        '',
        '→ Da 4 ore a 45 minuti per uscita. Controllo editoriale al 100%.',
    ],
    'Voglio una knowledge base AI sui processi interni': [
        '> Il cervello AI dell\'azienda (tipo getbusinessbrain.it):',
        '',
        '· Documenti, processi e clienti indicizzati',
        '· Un assistente che risponde citando le fonti interne',
        '· Onboarding più rapido per chi entra nel team',
        '· Aggiornamento continuo, niente wiki morta',
        '',
        '→ La conoscenza smette di vivere solo nelle teste delle persone.',
    ],
    'Come uso Claude Code per togliere lavoro ripetitivo?': [
        '> Principio: automatizzo i task, non le decisioni.',
        '',
        '→ Skill riutilizzabili per i lavori ricorrenti',
        '→ Agenti multi-step per ricerca, scrittura, classificazione',
        '→ Tu resti il punto di controllo e di qualità',
        '',
        'Risultato: meno ore sul macchinoso, più tempo sul valore.',
    ],
};

const PromptBox = () => {
    const [value, setValue] = useState('');
    const [streaming, setStreaming] = useState(false);
    const [thinking, setThinking] = useState(false);
    const [output, setOutput] = useState([]);
    const [phIndex, setPhIndex] = useState(0);
    const taRef = useRef(null);
    const outputRef = useRef(null);

    // Rotating placeholder
    useEffect(() => {
        if (value || streaming) return;
        const t = setInterval(() => setPhIndex(i => (i + 1) % samples.length), 3500);
        return () => clearInterval(t);
    }, [value, streaming]);

    const run = (prompt) => {
        const q = prompt.trim();
        if (!q || streaming || thinking) return;
        setValue(q);
        setThinking(true);
        setOutput([]);

        const lines = responses[q] || [
            `> Ricevuto: "${q}"`,
            '',
            'Questa è una demo del mio approccio AI-first.',
            'Per una risposta vera, scrivimi e parliamone:',
            '→ hello@mprochilo.it',
        ];

        let lineIdx = 0;
        let charIdx = 0;
        const startStream = () => {
            setThinking(false);
            setStreaming(true);
            setTimeout(tick, 120);
        };
        const tick = () => {
            if (lineIdx >= lines.length) {
                setStreaming(false);
                return;
            }
            const cur = lines[lineIdx];
            if (charIdx <= cur.length) {
                setOutput(prev => {
                    const next = [...prev];
                    next[lineIdx] = cur.substring(0, charIdx);
                    return next;
                });
                charIdx += 2;
                setTimeout(tick, 12);
            } else {
                lineIdx += 1;
                charIdx = 0;
                setTimeout(tick, 60);
            }
        };
        setTimeout(startStream, 750);
    };

    useEffect(() => {
        if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }, [output]);

    const onKey = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            run(value);
        }
    };

    return (
        <div className="panel overflow-hidden shadow-[0_0_60px_-15px_rgb(var(--mint)/0.25)]">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-line bg-elev/40">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-mute">
                    <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_6px_rgb(var(--mint))]" />
                    maby.assistant · v2026.4
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-mute/40" />
                    <span className="w-2 h-2 rounded-full bg-mute/40" />
                    <span className="w-2 h-2 rounded-full bg-mute/40" />
                </div>
            </div>

            {/* Output / canvas */}
            {(output.length > 0 || streaming || thinking) && (
                <div ref={outputRef} className="px-4 py-4 max-h-72 overflow-y-auto font-mono text-[13px] leading-relaxed text-fg/90 border-b border-line bg-bg/40">
                    {thinking && (
                        <div className="flex items-center gap-2 text-mute">
                            <span className="relative inline-block h-3 w-28 overflow-hidden rounded bg-elev">
                                <span className="absolute inset-0 animate-shimmer bg-[linear-gradient(90deg,transparent,rgb(var(--mint)/0.45),transparent)] bg-[length:200%_100%]" />
                            </span>
                            <span className="text-[11px]">ragiono…</span>
                        </div>
                    )}
                    {output.map((line, i) => (
                        <div key={i} className={line.startsWith('>') ? 'text-mint' : line.startsWith('→') ? 'text-mint/80' : 'text-fg/85'}>
                            {line || ' '}
                        </div>
                    ))}
                    {streaming && <span className="inline-block w-2 h-4 bg-mint ml-0 align-middle animate-cursor" />}
                </div>
            )}

            {/* Input */}
            <div className="flex items-end gap-2 p-3">
                <div className="flex-1">
                    <textarea
                        ref={taRef}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        onKeyDown={onKey}
                        rows={1}
                        placeholder={samples[phIndex]}
                        className="w-full resize-none bg-transparent outline-none text-fg placeholder:text-dim text-base md:text-lg leading-relaxed py-2 px-1"
                    />
                </div>
                <button
                    onClick={() => run(value)}
                    disabled={!value.trim() || streaming || thinking}
                    className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-md bg-mint text-bg hover:bg-mint/90 disabled:opacity-40 disabled:bg-elev disabled:text-mute transition-colors"
                    aria-label="Invia"
                >
                    {(streaming || thinking) ? <Loader2 size={16} className="animate-spin" /> : <ArrowUp size={16} />}
                </button>
            </div>

            {/* Suggestion chips */}
            <div className="px-3 pb-3 flex flex-wrap gap-2">
                {samples.map(s => (
                    <button
                        key={s}
                        onClick={() => run(s)}
                        disabled={streaming || thinking}
                        className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-full border border-line bg-surface/40 hover:bg-elev hover:border-line2 text-mute hover:text-fg transition-colors disabled:opacity-50"
                    >
                        <Sparkles size={11} className="text-mint" />
                        {s}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default PromptBox;
