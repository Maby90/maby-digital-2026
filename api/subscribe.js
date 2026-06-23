// Serverside Substack subscribe proxy.
// Avoids CORS + lets us return success without using Substack global redirect.

const SUBSTACK_PUB = 'https://oltreilprompt.substack.com';

function isValidEmail(email) {
    return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
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

    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch { body = {}; }
    }
    body = body || {};
    const email = (body.email || '').trim().toLowerCase();
    const source = typeof body.source === 'string' ? body.source.slice(0, 64) : '';

    if (!isValidEmail(email)) {
        return res.status(400).json({ ok: false, error: 'Email non valida' });
    }

    const referer = req.headers && req.headers.referer ? req.headers.referer : `https://mprochilo.it/?utm_source=${encodeURIComponent(source) || 'direct'}`;

    try {
        const upstream = await fetch(`${SUBSTACK_PUB}/api/v1/free?nojs=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'User-Agent': 'mprochilo.it-subscribe-proxy/1.0',
                Referer: referer,
            },
            body: JSON.stringify({
                email,
                first_url: referer,
                first_referrer: referer,
                current_url: referer,
                current_referrer: referer,
                source,
            }),
        });

        const text = await upstream.text();
        let data = null;
        try { data = JSON.parse(text); } catch { data = { raw: text }; }

        if (!upstream.ok) {
            return res.status(502).json({ ok: false, error: 'Substack rifiuta la richiesta', upstreamStatus: upstream.status, body: data });
        }

        return res.status(200).json({ ok: true, source, email });
    } catch (err) {
        console.error('subscribe proxy error:', err);
        return res.status(500).json({ ok: false, error: 'Errore di rete' });
    }
}
