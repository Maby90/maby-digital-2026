import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useSeo from '../hooks/useSeo';

const PrivacySfoglia = () => {
    useSeo({
        path: '/privacy-sfoglia',
        title: 'Privacy Policy · Sfoglia Reader',
        description: 'Informativa privacy dell\'app Sfoglia Reader: nessun dato raccolto, tutto resta sul dispositivo.',
    });

    return (
        <div className="min-h-screen bg-bg text-fg px-6 py-24 md:py-32 md:px-10 lg:px-16">
            <div className="max-w-3xl mx-auto">
                <Link to="/" className="inline-flex items-center gap-2 text-mute hover:text-mint transition-colors text-sm mb-12 link-underline">
                    <ArrowLeft size={16} />
                    Torna alla Home
                </Link>

                <p className="eyebrow mb-6">App iOS</p>
                <h1 className="font-display font-light text-4xl md:text-6xl text-fg mb-4 tracking-tightest leading-tight">
                    Privacy di <span className="italic">Sfoglia Reader</span>
                </h1>

                <p className="text-sm text-dim mb-12">
                    Ultimo aggiornamento: 22 luglio 2026
                </p>

                <div className="prose prose-lg prose-invert max-w-none font-sans text-mute leading-relaxed space-y-6">

                    <h2 className="font-display font-medium text-2xl md:text-3xl text-fg mt-8 mb-4">In breve</h2>
                    <p>
                        Sfoglia Reader <strong className="text-fg">non raccoglie alcun dato personale</strong>. L'app funziona
                        interamente sul tuo dispositivo: non richiede registrazione, non ha un account, non si collega
                        ad alcun server e non contiene strumenti di analisi, pubblicità o tracciamento.
                    </p>

                    <h2 className="font-display font-medium text-2xl md:text-3xl text-fg mt-8 mb-4">Dati trattati</h2>
                    <p>
                        I libri in formato EPUB che importi, la tua posizione di lettura, le impostazioni tipografiche e
                        le collezioni che crei restano <strong className="text-fg">esclusivamente nella memoria del tuo
                        iPhone</strong>, all'interno dell'area riservata all'app. Non vengono trasmessi a noi né a terze parti.
                    </p>
                    <p>
                        Questi dati possono essere inclusi nel backup del dispositivo (iCloud o computer) se hai attivato
                        i backup di Apple: in quel caso sono soggetti alla privacy policy di Apple, non alla nostra, e
                        noi non vi abbiamo comunque accesso.
                    </p>

                    <h2 className="font-display font-medium text-2xl md:text-3xl text-fg mt-8 mb-4">Assenza di terze parti</h2>
                    <p>
                        L'app non integra SDK di terze parti, reti pubblicitarie, strumenti di analisi del comportamento
                        o servizi di crash reporting. Nessuna informazione lascia il dispositivo.
                    </p>

                    <h2 className="font-display font-medium text-2xl md:text-3xl text-fg mt-8 mb-4">Permessi richiesti</h2>
                    <p>
                        Sfoglia Reader chiede l'accesso ai file solo nel momento in cui sei tu a scegliere un EPUB da
                        importare, e limitatamente a quel file. Non accede a rubrica, posizione, fotocamera, microfono,
                        foto o altri dati del dispositivo.
                    </p>

                    <h2 className="font-display font-medium text-2xl md:text-3xl text-fg mt-8 mb-4">Minori</h2>
                    <p>
                        L'app è classificata 4+ e non raccoglie dati da alcun utente, minori inclusi.
                    </p>

                    <h2 className="font-display font-medium text-2xl md:text-3xl text-fg mt-8 mb-4">Cancellazione dei dati</h2>
                    <p>
                        Puoi eliminare un singolo libro dalla libreria dell'app in qualsiasi momento. Disinstallando
                        l'app rimuovi definitivamente tutti i libri e i progressi di lettura dal dispositivo.
                    </p>

                    <h2 className="font-display font-medium text-2xl md:text-3xl text-fg mt-8 mb-4">Modifiche</h2>
                    <p>
                        Eventuali aggiornamenti a questa informativa saranno pubblicati su questa pagina, con la data di
                        revisione aggiornata in testa.
                    </p>

                    <h2 className="font-display font-medium text-2xl md:text-3xl text-fg mt-8 mb-4">Contatti</h2>
                    <p>
                        Titolare del trattamento: Mariarosaria Prochilo — Via G. Pilati, 50136 Firenze (Italia).<br />
                        Per qualsiasi domanda su questa informativa:{' '}
                        <a href="mailto:mprochilo90@gmail.com" className="text-mint link-underline">mprochilo90@gmail.com</a>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default PrivacySfoglia;
