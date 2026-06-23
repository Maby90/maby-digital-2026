import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Loader2, ArrowUpRight } from 'lucide-react';

const ContactModal = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        nome: '', settore: '', target: '', canali: '', budget: '',
        riassunto: '', email: '', telefono: '', privacy: false,
    });

    useEffect(() => {
        const handleOpen = () => { setIsOpen(true); document.body.style.overflow = 'hidden'; };
        window.addEventListener('open-contact', handleOpen);
        return () => { window.removeEventListener('open-contact', handleOpen); document.body.style.overflow = 'auto'; };
    }, []);

    const close = () => { setIsOpen(false); document.body.style.overflow = 'auto'; };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.privacy) return;
        setIsSubmitting(true);
        try {
            const response = await fetch("https://formsubmit.co/ajax/hello@mprochilo.it", {
                method: "POST",
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    _subject: `Nuova Richiesta da ${formData.nome}`,
                    Nome: formData.nome, Email: formData.email, Telefono: formData.telefono,
                    Settore: formData.settore, Target: formData.target, Canali: formData.canali,
                    Budget: formData.budget, "Riassunto Richiesta": formData.riassunto,
                }),
            });
            if (response.ok) {
                close();
                navigate('/grazie');
                if (window.fbq) window.fbq('track', 'Lead', { content_category: formData.budget });
            } else {
                alert("Errore durante l'invio. Scrivi a hello@mprochilo.it");
            }
        } catch (err) {
            console.error(err);
            alert("Errore di rete. Riprova.");
        } finally { setIsSubmitting(false); }
    };

    if (!isOpen) return null;

    const inputClass = "w-full bg-bg border border-line text-fg rounded-md px-3.5 py-2.5 font-sans focus:outline-none focus:border-mint focus:ring-1 focus:ring-mint/30 transition-colors placeholder:text-dim";
    const labelClass = "block text-xs font-mono uppercase tracking-widest mb-2 text-mute";

    return (
        <div className="fixed inset-0 z-[100] flex items-stretch md:items-center justify-center p-0 md:p-6 bg-bg/80 backdrop-blur-sm overflow-y-auto" onClick={close}>
            <div
                className="relative bg-surface w-full md:max-w-3xl max-h-screen md:max-h-[92vh] overflow-y-auto md:my-auto md:rounded-xl border border-line"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header bar */}
                <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3 border-b border-line bg-elev/80 backdrop-blur">
                    <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-mute">
                        <span className="w-2 h-2 rounded-full bg-mint shadow-[0_0_6px_rgb(var(--mint))]" />
                        new_project.brief
                    </div>
                    <button onClick={close} className="p-1.5 rounded-md text-mute hover:text-fg hover:bg-bg/60 transition-colors" aria-label="Chiudi">
                        <X size={18} />
                    </button>
                </div>

                <div className="p-6 md:p-10">
                    <h2 className="font-display font-medium text-3xl md:text-4xl text-fg mb-3 tracking-tight">
                        Proponi un <span className="text-mint">progetto</span>
                    </h2>

                    <p className="text-mute leading-relaxed mb-8 text-sm md:text-base max-w-prose">
                        Compilare questo questionario è il primo passo per capire se c'è un allineamento strategico tra le nostre visioni. Non c'è alcun impegno, ma mi aiuterà a valutare come posso supportarti al meglio e se siamo il match giusto per un successo reciproco.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                                <label className={labelClass}>Nome e Cognome *</label>
                                <input required type="text" name="nome" value={formData.nome} onChange={handleChange} className={inputClass} placeholder="Mario Rossi" />
                            </div>
                            <div>
                                <label className={labelClass}>Email *</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} placeholder="mario@email.it" />
                            </div>
                            <div>
                                <label className={labelClass}>Telefono *</label>
                                <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className={inputClass} placeholder="+39 333…" />
                            </div>
                            <div>
                                <label className={labelClass}>Settore *</label>
                                <input required type="text" name="settore" value={formData.settore} onChange={handleChange} className={inputClass} placeholder="Tech, Real Estate, Servizi…" />
                            </div>
                            <div className="md:col-span-2">
                                <label className={labelClass}>Target di riferimento *</label>
                                <input required type="text" name="target" value={formData.target} onChange={handleChange} className={inputClass} placeholder="B2B / B2C · specificare nicchia" />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>Canali attualmente utilizzati (link) *</label>
                            <textarea required rows="2" name="canali" value={formData.canali} onChange={handleChange} className={inputClass} placeholder="Instagram, LinkedIn, Sito Web…" />
                        </div>

                        <div>
                            <label className={labelClass}>Range di budget mensile *</label>
                            <select required name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
                                <option value="" disabled>Seleziona un range</option>
                                <option value="800€ - 1.000€">800€ – 1.000€</option>
                                <option value="1.000€ - 2.000€">1.000€ – 2.000€</option>
                                <option value="2.000€ - 3.000€">2.000€ – 3.000€</option>
                                <option value="3.000€+">3.000€+</option>
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>Riassunto richiesta *</label>
                            <textarea required rows="4" name="riassunto" value={formData.riassunto} onChange={handleChange} className={inputClass} placeholder="Quali sono i tuoi obiettivi e le tue sfide attuali?" />
                        </div>

                        <div className="flex items-start gap-3 mt-1">
                            <input required type="checkbox" id="privacy" name="privacy" checked={formData.privacy} onChange={handleChange} className="mt-1 w-4 h-4 accent-mint cursor-pointer" />
                            <label htmlFor="privacy" className="text-xs text-mute leading-tight">
                                Ho letto e accetto i termini indicati nella Privacy Policy per il trattamento dei dati ai fini del contatto.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-primary mt-3 w-full justify-center md:justify-between text-base py-4 disabled:opacity-50"
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    <span>Invia la proposta</span>
                                    <ArrowUpRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
