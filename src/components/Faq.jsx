import React, { useEffect, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const items = [
    {
        q: 'Cos\'è una consulenza AI marketing?',
        a: 'È un percorso strategico che integra modelli e workflow AI dentro i processi di marketing reali: acquisizione clienti, scrittura, ricerca, automazione. Non vendo l\'AI come fine, la uso dove fa risparmiare tempo o moltiplicare output mantenendo la voce umana.',
    },
    {
        q: 'Per chi è la consulenza? Aziende grandi, PMI, freelance?',
        a: 'Lavoro principalmente con liberi professionisti, PMI italiane e brand B2B. La cosa che conta non è la dimensione ma avere un\'identità da consolidare e processi misurabili da automatizzare.',
    },
    {
        q: 'Differenza fra skill Claude, custom agents e automazioni n8n?',
        a: 'Una skill Claude è un sistema di istruzioni + knowledge base specifico per un task ricorrente, utile e veloce da configurare. Un custom agent ha tool, memoria e azioni: può eseguire task multi-step e prendere decisioni. n8n / Make / Zapier sono automazioni event-driven, ottime per pipeline ripetitive. Lo stack giusto spesso le combina tutte e tre.',
    },
    {
        q: 'Quanto costa una consulenza AI marketing?',
        a: 'Dipende dal perimetro. Brief progetto + audit parte da 800-1.000€/mese. Retainer continuativi 1.000-3.000€/mese in base a profondità e velocità. I budget stimati sono nel modulo "Proponi un progetto".',
    },
    {
        q: 'Si possono delegare i contenuti all\'AI senza perdere autenticità?',
        a: 'Sì, se lavori sulla voce e non sulla quantità. L\'AI scala la ricerca, l\'estrazione, la composizione: la voce umana resta in input (training) e in revisione finale. Il problema dei contenuti AI generici è la pigrizia umana, non il modello.',
    },
    {
        q: 'Operi solo a Firenze o anche da remoto?',
        a: 'Sono basata a Firenze ma lavoro al 100% in remoto con clienti in tutta Italia ed Europa. Le call settimanali via Meet/Zoom, gli asset condivisi su Notion.',
    },
];

const Faq = () => {
    const [open, setOpen] = useState(0);

    useEffect(() => {
        const data = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': 'https://mprochilo.it/#faq',
            mainEntity: items.map((it) => ({
                '@type': 'Question',
                name: it.q,
                acceptedAnswer: { '@type': 'Answer', text: it.a },
            })),
        };
        let el = document.getElementById('faq-jsonld');
        if (!el) {
            el = document.createElement('script');
            el.type = 'application/ld+json';
            el.id = 'faq-jsonld';
            document.head.appendChild(el);
        }
        el.textContent = JSON.stringify(data);
        return () => { try { el.remove(); } catch (_) {} };
    }, []);

    return (
        <section id="faq" className="bg-bg py-24 md:py-32 border-t border-line">
            <div className="container-edge">
                <div className="grid lg:grid-cols-12 gap-10 mb-12">
                    <div className="lg:col-span-4">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="eyebrow">// 06 · FAQ</span>
                        </div>
                        <h2 className="font-display font-medium text-3xl md:text-5xl text-fg leading-[1.05] tracking-tightest">
                            Domande <span className="text-mint">frequenti.</span>
                        </h2>
                        <p className="mt-6 text-mute text-base leading-relaxed max-w-sm">
                            Quello che mi chiedono prima di iniziare. Risposte brevi, niente fuffa.
                        </p>
                    </div>

                    <div className="lg:col-span-8">
                        <ul className="border-t border-line">
                            {items.map((it, i) => {
                                const isOpen = open === i;
                                return (
                                    <li key={i} className="border-b border-line">
                                        <button
                                            onClick={() => setOpen(isOpen ? -1 : i)}
                                            className="w-full flex items-start justify-between gap-4 py-5 md:py-6 text-left group"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="font-display text-lg md:text-xl text-fg group-hover:text-mint transition-colors leading-snug">
                                                {it.q}
                                            </span>
                                            <span className="shrink-0 mt-1 inline-flex w-7 h-7 rounded-md border border-line items-center justify-center text-mute group-hover:text-mint group-hover:border-mint/40 transition-colors">
                                                {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                                            </span>
                                        </button>
                                        {isOpen && (
                                            <div className="pb-6 text-mute leading-relaxed max-w-2xl">
                                                {it.a}
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Faq;
