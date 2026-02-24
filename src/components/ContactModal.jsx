import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Loader2 } from 'lucide-react';

const ContactModal = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        nome: '',
        settore: '',
        target: '',
        canali: '',
        budget: '',
        riassunto: '',
        email: '',
        telefono: '',
        privacy: false
    });

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            document.body.style.overflow = 'hidden';
        };
        window.addEventListener('open-contact', handleOpen);
        return () => {
            window.removeEventListener('open-contact', handleOpen);
            document.body.style.overflow = 'auto'; // cleanup just in case
        };
    }, []);

    const close = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.privacy) return;

        setIsSubmitting(true);

        try {
            // Using FormSubmit.co for free form to email without backend.
            // First time it receives an email, it will ask the owner to verify it.
            const response = await fetch("https://formsubmit.co/ajax/hello@mprochilo.it", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Nuova Richiesta da ${formData.nome}`,
                    "Nome": formData.nome,
                    "Email": formData.email,
                    "Telefono": formData.telefono,
                    "Settore": formData.settore,
                    "Target": formData.target,
                    "Canali": formData.canali,
                    "Budget": formData.budget,
                    "Riassunto Richiesta": formData.riassunto
                })
            });

            if (response.ok) {
                // Success
                close();
                navigate('/grazie');

                // Track lead event if meta pixel is available
                if (window.fbq) {
                    window.fbq('track', 'Lead', { content_category: formData.budget });
                }
            } else {
                alert("Si è verificato un errore durante l'invio. Per favore riprova o contattami direttamente a hello@mprochilo.it");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            alert("Si è verificato un errore di rete. Per favore riprova.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    const InputClass = "w-full bg-background border border-dark/20 text-dark rounded-xl px-4 py-3 font-sans focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all";
    const LabelClass = "block text-sm font-semibold mb-2 font-sans";

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-dark/60 backdrop-blur-md overflow-y-auto">
            <div
                className="relative bg-background w-full max-w-3xl rounded-[2rem] shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={close}
                    className="absolute top-6 right-6 p-2 rounded-full bg-dark/5 hover:bg-dark/10 transition-colors z-10"
                >
                    <X size={24} className="text-dark" />
                </button>

                <div className="p-8 md:p-12 max-h-[90vh] overflow-y-auto">
                    <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary mb-4">
                        Proponi un <span className="font-drama italic font-light text-accent">progetto</span>
                    </h2>

                    <p className="font-sans text-dark/70 leading-relaxed mb-8 text-sm md:text-base border-l-2 border-accent pl-4 py-1">
                        Compilare questo questionario è il primo passo per capire se c'è un allineamento strategico tra le nostre visioni. Non c'è alcun impegno, ma mi aiuterà a valutare come posso supportarti al meglio e se siamo il match giusto per un successo reciproco.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className={LabelClass}>Nome e Cognome *</label>
                                <input required type="text" name="nome" value={formData.nome} onChange={handleChange} className={InputClass} placeholder="Mario Rossi" />
                            </div>
                            <div>
                                <label className={LabelClass}>Email *</label>
                                <input required type="email" name="email" value={formData.email} onChange={handleChange} className={InputClass} placeholder="mario@email.it" />
                            </div>
                            <div>
                                <label className={LabelClass}>Telefono *</label>
                                <input required type="tel" name="telefono" value={formData.telefono} onChange={handleChange} className={InputClass} placeholder="+39 333..." />
                            </div>
                            <div>
                                <label className={LabelClass}>Settore di appartenenza *</label>
                                <input required type="text" name="settore" value={formData.settore} onChange={handleChange} className={InputClass} placeholder="Es. Tech, Real Estate, Servizi..." />
                            </div>
                            <div className="md:col-span-2">
                                <label className={LabelClass}>Target di riferimento *</label>
                                <input required type="text" name="target" value={formData.target} onChange={handleChange} className={InputClass} placeholder="B2B, B2C, specificare nicchia" />
                            </div>
                        </div>

                        <div>
                            <label className={LabelClass}>Canali attualmente utilizzati (inserisci link) *</label>
                            <textarea required rows="2" name="canali" value={formData.canali} onChange={handleChange} className={InputClass} placeholder="Instagram, LinkedIn, Sito Web..." />
                        </div>

                        <div>
                            <label className={LabelClass}>Range di budget mensile per attività e collaborazione *</label>
                            <select required name="budget" value={formData.budget} onChange={handleChange} className={InputClass}>
                                <option value="" disabled>Seleziona un'opzione</option>
                                <option value="800€ - 1.000€">800€ - 1.000€</option>
                                <option value="1.000€ - 2.000€">1.000€ - 2.000€</option>
                                <option value="2.000€ - 3.000€">2.000€ - 3.000€</option>
                                <option value="3.000€+">3.000€+</option>
                            </select>
                        </div>

                        <div>
                            <label className={LabelClass}>Riassunto richiesta *</label>
                            <textarea required rows="4" name="riassunto" value={formData.riassunto} onChange={handleChange} className={InputClass} placeholder="Quali sono i tuoi obiettivi e le tue sfide attuali?" />
                        </div>

                        <div className="flex items-start gap-3 mt-2">
                            <input required type="checkbox" id="privacy" name="privacy" checked={formData.privacy} onChange={handleChange} className="mt-1 w-4 h-4 accent-accent cursor-pointer" />
                            <label htmlFor="privacy" className="text-xs text-dark/70 leading-tight">
                                Ho letto e accetto i termini indicati nella Privacy Policy per il trattamento dei dati ai fini del contatto.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full mt-4 bg-accent text-background py-4 rounded-xl font-sans text-lg font-bold hover:bg-opacity-90 transition-colors btn-magnetic disabled:opacity-50 disabled:pointer-events-none group flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin relative z-10" size={24} />
                            ) : (
                                <span className="relative z-10 transition-colors duration-300">Invia Proposta</span>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactModal;
