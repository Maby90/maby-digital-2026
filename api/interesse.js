// Lista d'interesse "AI nel tuo lavoro" -> MailerLite.
// Le candidature aprono a fine agosto: fino a quel momento la landing
// raccoglie solo nome, email e professione per avvisare all'apertura.

const ML_API = 'https://connect.mailerlite.com/api/subscribers';
const GROUP_INTERESSE = '194414321190569492'; // AI nel tuo lavoro - interesse coorte 1

function isValidEmail(email) {
    return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clean(value, max) {
    return typeof value === 'string' ? value.trim().slice(0, max) : '';
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    if (req.method !== 'POST') {
        res.status(405).json({ ok: false, error: 'Method not allowed' });
        return;
    }

    const token = process.env.MAILERLITE_TOKEN;
    if (!token) {
        console.error('interesse: MAILERLITE_TOKEN mancante');
        return res.status(500).json({ ok: false, error: 'Configurazione mancante' });
    }

    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
    }
    body = body || {};

    const email = clean(body.email, 200).toLowerCase();
    const nome = clean(body.nome, 120);
    const professione = clean(body.professione, 120);
    const origine = clean(body.origine, 64) || 'landing-ai-nel-tuo-lavoro';

    if (!isValidEmail(email)) {
        return res.status(400).json({ ok: false, error: 'Controlla la mail, mi sa che c’è un refuso' });
    }
    if (!nome) {
        return res.status(400).json({ ok: false, error: 'Mi serve il tuo nome' });
    }

    try {
        const upstream = await fetch(ML_API, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                email,
                fields: {
                    name: nome,
                    professione,
                    origine_lead: origine,
                },
                groups: [GROUP_INTERESSE],
                status: 'active',
            }),
        });

        const text = await upstream.text();
        let data = null;
        try { data = JSON.parse(text); } catch { data = { raw: text }; }

        // 201 nuovo iscritto, 200 iscritto già esistente aggiornato: per chi
        // compila il form sono lo stesso risultato.
        if (upstream.status === 200 || upstream.status === 201) {
            return res.status(200).json({ ok: true });
        }

        console.error('interesse: MailerLite ha risposto', upstream.status, text.slice(0, 500));
        return res.status(502).json({ ok: false, error: 'Non sono riuscita a salvarti, riprova tra un minuto' });
    } catch (err) {
        console.error('interesse: errore di rete', err && err.message);
        return res.status(502).json({ ok: false, error: 'Non sono riuscita a salvarti, riprova tra un minuto' });
    }
}
