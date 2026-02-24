import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background text-dark px-6 py-12 md:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <Link to="/" className="inline-flex items-center gap-2 text-dark/60 hover:text-accent transition-colors font-sans text-sm mb-12">
                    <ArrowLeft size={16} />
                    Torna alla Home
                </Link>

                <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary mb-4">
                    Politica di <span className="font-drama italic font-light text-accent">Riservatezza</span>
                </h1>

                <p className="text-sm text-dark/50 mb-12">
                    ai sensi dell'art. 13 del D.lgs. n.196/2003 e del Regolamento U.E 679/2016 (GDPR)
                </p>

                <div className="prose prose-lg prose-slate max-w-none font-sans text-dark/80 leading-relaxed space-y-6">

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">Panoramica</h2>
                    <p>
                        La nostra società si impegna a proteggere e rispettare la privacy degli utenti. La presente Politica di Riservatezza illustra i vari tipi di dati personali da noi raccolti, tramite il nostro sito web www.mprochilo.it, le nostre App per vari dispositivi, le interazioni con eventuali social media e varie Live Chat e direttamente presso la nostra sede Mariarosaria Prochilo Via G. Pilati 50136 Firenze.
                    </p>
                    <p>
                        La presente Politica di Riservatezza illustra le modalità con cui gli stessi dati vengono utilizzati, i soggetti con i quali vengono condivisi e come i dati siano protetti.
                    </p>
                    <p>
                        Leggere attentamente quanto segue per comprendere la nostra visione e le nostre politiche riguardanti i dati personali degli utenti e le modalità di trattamento. Continuando a utilizzare il nostro sito web, le App e i servizi social e piattaforme di Live Chat collegate o sottoscrivendo il nostro modulo nell'apposita finestra di dialogo per ottenimento di dati o servizi, da noi offerti o resi disponibili anche presso indirizzi segnalati dagli interessati, l'utente conferma di aver letto e compreso ed accettato la presente Politica di Riservatezza nella sua interezza.
                    </p>
                    <p>
                        Rispettiamo il diritto alla riservatezza dell'utente e non chiederemo né raccoglieremo informazioni superflue o in quantità maggiori di quelle necessarie per fornire i servizi richiesti. Il nostro obiettivo complessivo è di garantire che la raccolta e l'utilizzo dei dati personali siano appropriati per la fornitura di servizi all'utente e siano conformi alle leggi sulla protezione dei dati applicabili.
                    </p>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">a) Chi siamo</h2>
                    <p>
                        Mariarosaria Prochilo Via G. Pilati 50136 Firenze – P.iva 03068590805, indicato in questa Politica di Riservatezza come "NOI" o "CI" o "NOSTRO".
                    </p>
                    <p>
                        Siamo i titolari del trattamento dei dati personali che raccogliamo dall'utente o che l'utente ci fornisce. Il nostro responsabile della protezione dei dati può essere contattato a: Mariarosaria Prochilo Via G. Pilati 50136 Firenze – P.iva 03068590805 – email: <strong>hello@mprochilo.it</strong>
                        <br />
                        ai sensi dell'art. 13 del D.Lgs. 30 giugno 2003 n.196 “Codice in materia di protezione dei dati personali” (di seguito il “Codice Privacy”) e del Regolamento 679/2016 (di seguito il “Regolamento”), Le fornisce le seguenti informazioni.
                    </p>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">b) Perché raccogliamo i dati</h2>
                    <p>I dati che ci comunica saranno utilizzati per finalità contrattuali al fine di dar seguito alla Sua Richiesta e per finalità a questa strettamente connesse, collegate, derivate e strumentali. Inoltre, se fornirà il Suo esplicito consenso, i Suoi dati saranno utilizzati per:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>personalizzare l'offerta a Lei dedicata, tenendo conto delle Sue necessità – o per una auspicata richiesta di informazioni – per cui sarà necessario trattare i Suoi dati definiti sensibili;</li>
                        <li>svolgere finalità di marketing diretto ai sensi dell'art. 23 e 130 del Codice Privacy, vale a dire per contattarLa – via telefono, posta, e-mail, sms, ecc. – per comunicazioni pubblicitarie, commerciali o informative relative a Mariarosaria Prochilo ed ai prodotti o servizi dalla stessa forniti;</li>
                    </ul>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">c) Quali dati raccogliamo dall'utente?</h2>

                    <h3 className="font-heading font-semibold text-xl text-primary mt-6 mb-2">Dati forniti dall'utente</h3>
                    <p>Quando accede o utilizza i nostri servizi ad esempio quando:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>compila un modulo</li>
                        <li>ordina direttamente un servizio/prodotto via e-mail</li>
                        <li>telefona direttamente</li>
                        <li>si iscrive a una newsletter del nostro sito</li>
                        <li>partecipa ad evento da noi promosso;</li>
                        <li>partecipa ad un evento on-line o meno da noi gestito;</li>
                        <li>ovvero completa un sondaggio, esprimendo una valutazione/opinione su di noi</li>
                    </ul>
                    <p>raccoglieremo dati personali su di Lei. I dati raccolti direttamente possono includere, a titolo esemplificativo ma non esaustivo: nome, indirizzo e-mail, telefono cellulare, preferenze/necessità, lingua, informazioni sul pagamento, informazioni logistiche e di consegna.</p>

                    <h3 className="font-heading font-semibold text-xl text-primary mt-6 mb-2">Modalità di esecuzione</h3>
                    <p>Mariarosaria Prochilo raccoglie e utilizza le informazioni che ci ha fornito quando effettua il collegamento per ottenere un servizio o prodotto; ma, a seconda della Prenotazione/richiesta di chiarimenti necessaria, potremmo anche chiederLe il Suo indirizzo di casa, codice fiscale, il nome di eventuali altre persone che condivideranno con Lei i nostri servizi, e le loro necessità o aspettative, il tempo a disposizione, i quantitativi, modalità operative necessarie, ecc.</p>
                    <p>Se vuole può mettersi in contatto con NOI, tramite altri mezzi (per esempio sui social media o comunicando tramite Live Chat, all'indirizzo email hello@mprochilo.it); in questo caso raccoglieremo informazioni anche tramite questi canali. Quando si iscrive a una newsletter, raccoglieremo i seguenti dati: nome e indirizzo e-mail. Quando partecipa a una iniziativa da noi organizzata o completa un sondaggio, raccoglieremo i dati personali registrati nei moduli on-line che Le forniamo.</p>

                    <h3 className="font-heading font-semibold text-xl text-primary mt-6 mb-2">Dati raccolti sull'utente</h3>
                    <p>Durante la visita al nostro Sito potremo utilizzare cookie e altre tecnologie per la raccolta automatica dei seguenti dati:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>dati tecnici dell'utente, incluso l'indirizzo IP, i dati di login, il tipo e la versione di browser, l'identificativo del dispositivo, la localizzazione geografica e il fuso orario, i tipi e versioni di plug-in del browser, il sistema operativo e la piattaforma, i tempi di risposta della pagina e gli errori di download;</li>
                        <li>dati sulla visita dell'utente, inclusi i siti web visitati in precedenza e successivamente al nostro sito così come i prodotti visualizzati o ricercati dall'utente;</li>
                        <li>la durata delle visite a determinate pagine, i dati di interazione con la pagina (come scrolling, click e mouse over) e i metodi utilizzati per navigare via dalla pagina.</li>
                    </ul>

                    <h3 className="font-heading font-semibold text-xl text-primary mt-6 mb-2">Quali conseguenze in caso di mancato o incompleto conferimento dei dati</h3>
                    <p>Ferma restando la Sua autonomia personale in qualità di interessato, il conferimento dei Suoi dati personali, per le finalità contrattuali indicate, è obbligatorio, poiché in difetto Mariarosaria Prochilo si troverà nella impossibilità di dare seguito alla Sua Richiesta. È facoltativo relativamente alle altre finalità (es. marketing); pertanto, nel caso di mancato conferimento non potremo inviarLe comunicazioni commerciali.</p>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">d) A chi comunichiamo i dati</h2>
                    <p>I Dati personali vengono raccolti quando si effettua un collegamento per informazioni su prodotti, servizi o eventi sia sul Sito che direttamente presso la nostra sede. I Suoi Dati personali sono destinati a Mariarosaria Prochilo e sono condivisi con terze parti solo in determinate circostanze (es. Provider di servizi, Partner commerciali, Partner pubblicitari, Terzi consentiti per legge, o tramite trasferimenti internazionali per servizi forniti).</p>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">e) Trasferimenti internazionali</h2>
                    <p>I dati personali che raccogliamo dall'utente possono essere trasferiti e conservati in una destinazione al di fuori dello Spazio Economico Europeo ("SEE") (ad esempio, negli Stati Uniti). Quando trasferiamo i dati personali al di fuori del SEE, includeremo le clausole contrattuali standard di protezione dei dati approvate dalla Commissione europea o ci assicureremo di utilizzare provider aderenti agli accordi previsti (es. Privacy Shield sostitutivi / accordi di adeguatezza).</p>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">f) Dispositivi mobili</h2>
                    <p>Potremmo offrire app gratuite o versioni del nostro sito ottimizzate per la navigazione tramite smartphone o tablet. Queste versioni mobili gestiscono i dati personali secondo le stesse modalità del sito web. Noi possiamo utilizzare una modalità di tracking cosiddetta cross-device per ottimizzare i nostri servizi e le nostre attività di marketing.</p>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">g) Social media</h2>
                    <p>Mariarosaria Prochilo utilizza i social media in vari modi (es. integrazione dei plugin di social media sul sito). Quando clicca su uno dei bottoni, alcune informazioni vengono condivise con i fornitori del servizio di social media.</p>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">h) Minori</h2>
                    <p>Deve avere almeno 18 anni per utilizzare i nostri servizi. Il nostro Sito e i servizi erogati non sono rivolti a minori e non raccogliamo consapevolmente dati personali dai minori. Se lei è un minore e venissimo a sapere di aver inavvertitamente ottenuto dati personali, provvederemo ad eliminarli. Contatti il responsabile a hello@mprochilo.it se necessario.</p>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">i) Come e per quanto tempo trattiamo i Suoi dati</h2>
                    <p>I dati saranno trattati in via informatizzata e cartacea nel rispetto della normativa vigente e comunque in modo da garantirne la sicurezza e la riservatezza. I Dati Personali saranno conservati per un periodo non superiore a quello necessario per perseguire le finalità indicate.</p>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">j) I diritti riconosciuti dal Codice Privacy e dal Regolamento</h2>
                    <p>Mediante comunicazione da inviare a hello@mprochilo.it, si potranno in ogni momento esercitare i diritti di cui all'art. 7 del Codice Privacy, e ai sensi dell'art. 13 del Regolamento Europeo n. 2016/679 sulla protezione dei dati personali, inclusi i diritti di accesso, rettifica, cancellazione, limitazione del trattamento, opposizione e portabilità dei dati.</p>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">k) Informativa sull'uso dei Cookies</h2>
                    <p>Questo sito fa uso di cookie al fine di garantire una navigazione semplice ed intuitiva. Usiamo cookie di navigazione, di funzionalità e cookie di profilazione. Sul sito web possono essere altresì utilizzati cookie di terze parti provenienti da Google, Facebook, ecc. che si attivano se l'utente clicca sulle rispettive icone o entra nei loro siti.</p>

                    <h2 className="font-heading font-semibold text-2xl text-primary mt-8 mb-4">l) Modifiche alla presente Politica di Riservatezza</h2>
                    <p>Di tanto in tanto potremo aggiornare la presente Politica di Riservatezza in risposta a mutati requisiti di legge, di vigilanza o operativi. Sarà nostra cura dare notifica all'utente di tali modifiche (nonché della data di efficacia delle stesse).</p>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
