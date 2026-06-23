import React from 'react';
import { Sparkles, Zap, Bot, Target } from 'lucide-react';

const services = [
    {
        n: '01',
        Icon: Bot,
        t: 'Agenti AI su misura',
        d: 'Agenti che fanno un lavoro vero: leggono, classificano, scrivono, rispondono. Tu approvi, loro eseguono.',
        meta: ['Custom agents', 'Tool + memoria', 'Human in the loop'],
    },
    {
        n: '02',
        Icon: Zap,
        t: 'Automazioni e workflow',
        d: 'I processi ripetitivi diventano pipeline che girano da sole. Trigger, API, AI, output, senza supervisione costante.',
        meta: ['n8n / Make', 'Integrazioni API', 'Pipeline event-driven'],
    },
    {
        n: '03',
        Icon: Sparkles,
        t: 'Skill e knowledge base Claude Code',
        d: 'Istruzioni riutilizzabili e un cervello AI sui tuoi documenti, usabili anche da chi non scrive codice.',
        meta: ['Claude skills', 'Knowledge base', 'Onboarding rapido'],
    },
    {
        n: '04',
        Icon: Target,
        t: 'Marketing e posizionamento',
        d: 'Il contesto che rende usabili i sistemi: voce, contenuti e funnel così l\'AI serve davvero a vendere.',
        meta: ['Brand voice', 'Content engine', 'Funnel B2B'],
    },
];

const Features = () => {
    return (
        <section id="servizi" className="relative bg-bg py-24 md:py-32 border-t border-line">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint/30 to-transparent" />
            <div className="container-edge">
                <div className="flex items-center gap-3 mb-10" data-reveal>
                    <span className="eyebrow">// 02 · Servizi</span>
                    <span className="h-px flex-1 bg-line" />
                    <span className="font-mono text-[11px] text-dim">04 aree operative</span>
                </div>

                <h2 className="font-display font-medium text-3xl md:text-5xl lg:text-6xl text-fg leading-[1.05] tracking-tightest mb-16 max-w-3xl text-balance" data-reveal>
                    Sistemi AI, <span className="text-mint">non slide.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-reveal-group>
                    {services.map(({ n, Icon, t, d, meta }) => (
                        <article
                            key={n}
                            data-reveal-item
                            data-cursor
                            className="panel p-6 md:p-8 hover:border-mint/40 hover:bg-elev transition-all duration-300 group relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mint/0 to-transparent group-hover:via-mint/60 transition-colors duration-300" />

                            <div className="flex items-start justify-between mb-6">
                                <div className="w-10 h-10 rounded-md bg-mint/10 border border-mint/20 flex items-center justify-center text-mint">
                                    <Icon size={18} />
                                </div>
                                <span className="font-mono text-[11px] text-dim">SVC.{n}</span>
                            </div>

                            <h3 className="font-display font-medium text-xl md:text-2xl text-fg leading-tight mb-3 tracking-tight">
                                {t}
                            </h3>
                            <p className="text-mute leading-relaxed text-sm md:text-base mb-6">
                                {d}
                            </p>

                            <div className="flex flex-wrap gap-2 pt-4 border-t border-line">
                                {meta.map(m => (
                                    <span key={m} className="font-mono text-[10px] uppercase tracking-widest text-mute px-2 py-1 rounded border border-line bg-surface/40">
                                        {m}
                                    </span>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>

                {/* Comparative stack table · GEO/AI search visibility */}
                <div className="mt-16 panel overflow-hidden">
                    <div className="px-5 py-3 border-b border-line bg-elev/40 flex items-center justify-between">
                        <div className="font-mono text-[11px] uppercase tracking-widest text-mute">Stack AI 2026 · quando uso cosa</div>
                        <span className="font-mono text-[10px] text-dim">cmp.matrix</span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="text-left text-mute font-mono text-[11px] uppercase tracking-widest">
                                    <th className="px-5 py-3 border-b border-line">Tool</th>
                                    <th className="px-5 py-3 border-b border-line">Quando uso</th>
                                    <th className="px-5 py-3 border-b border-line">Costo tipico</th>
                                    <th className="px-5 py-3 border-b border-line">Setup</th>
                                </tr>
                            </thead>
                            <tbody className="text-fg/90">
                                <tr className="border-b border-line">
                                    <td className="px-5 py-4 font-medium"><span className="text-mint">Skill Claude</span></td>
                                    <td className="px-5 py-4 text-mute">Sistema istruzioni + knowledge base per un task ricorrente, usabile da team non tecnici</td>
                                    <td className="px-5 py-4 font-mono text-mute">€20/mese</td>
                                    <td className="px-5 py-4 text-mute">~30 min</td>
                                </tr>
                                <tr className="border-b border-line">
                                    <td className="px-5 py-4 font-medium"><span className="text-mint">Custom Agents</span></td>
                                    <td className="px-5 py-4 text-mute">Task multi-step con tool e memoria: ricerca, scrittura, classificazione</td>
                                    <td className="px-5 py-4 font-mono text-mute">€50–200/mese</td>
                                    <td className="px-5 py-4 text-mute">2–8 ore</td>
                                </tr>
                                <tr className="border-b border-line">
                                    <td className="px-5 py-4 font-medium"><span className="text-mint">n8n / Make</span></td>
                                    <td className="px-5 py-4 text-mute">Pipeline event-driven: trigger → API → AI → output</td>
                                    <td className="px-5 py-4 font-mono text-mute">€0–30/mese</td>
                                    <td className="px-5 py-4 text-mute">1–4 ore</td>
                                </tr>
                                <tr>
                                    <td className="px-5 py-4 font-medium"><span className="text-mint">Stack misto</span></td>
                                    <td className="px-5 py-4 text-mute">Quasi sempre, i 3 sopra messi insieme. È il setup che porto ai clienti.</td>
                                    <td className="px-5 py-4 font-mono text-mute">~€100/mese</td>
                                    <td className="px-5 py-4 text-mute">Iterativo</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
