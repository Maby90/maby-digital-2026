// Dashboard percorso "AI nel tuo lavoro" — legge da Notion i dati di un cliente.
// Auth: lo slug segreto nell'URL. Nessun login.
// DB IDs (non segreti). L'unico segreto è NOTION_API_KEY (integration del sito),
// che deve avere accesso ai 3 database (vedi setup).

const PERCORSI_DB = '89b314fa6c9d4ceb967bfeaf9f335b5b';
const CALL_DB = '0a7a52588b564ac7953f6527fbf94026';
const SKILL_DB = '10cde39591784492820251aa65793e5f';
const MATERIALI_DB = 'c1edd8b12109412a8ee2c48b680d74af';

const NOTION_VERSION = '2022-06-28';

// ---- helper estrazione property ----
const txt = (p) => {
    if (!p) return '';
    const arr = p.rich_text || p.title;
    if (Array.isArray(arr)) return arr.map((t) => t.plain_text).join('');
    return '';
};
const sel = (p) => (p && p.select ? p.select.name : '');
const num = (p) => (p && typeof p.number === 'number' ? p.number : null);
const dt = (p) => (p && p.date ? p.date.start : null);
const url = (p) => (p && p.url ? p.url : '');

async function queryDB(dbId, apiKey, body) {
    const r = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Notion-Version': NOTION_VERSION,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body || {}),
    });
    if (!r.ok) {
        const t = await r.text();
        throw new Error(`Notion ${r.status}: ${t}`);
    }
    return r.json();
}

// ---- dati demo (sempre disponibili, non toccano Notion) ----
const DEMO_PW = 'leone2026';
const DEMO = {
    nome: 'Mario Rossi',
    stato: 'Attivo',
    meseCorrente: 2,
    prossimaCall: '2026-10-13T09:00:00+02:00',
    linkCall: 'https://meet.google.com/demo-abc-xyz',
    oreRisparmiate: 6,
    claudePlan: 'Max',
    dataInizio: '2026-10-06',
    dataFine: '2027-01-06',
    cartellaDrive: 'https://drive.google.com/drive/folders/demo-mario',
    benvenuto: 'Ciao Mario, benvenuto nel tuo percorso. Qui trovi tutto quello che costruiamo insieme. Ci vediamo alla prossima call.',
    materiali: [
        { nome: 'Cartella del percorso', tipo: 'Cartella', link: 'https://drive.google.com/drive/folders/demo-mario', descrizione: 'Tutti i tuoi file, sempre aggiornati, in un posto solo.' },
        { nome: 'Guida a Claude Code', tipo: 'Guida', link: 'https://drive.google.com/file/d/demo-guida', descrizione: 'Il manuale d’ingresso per partire, scritto per chi non è tecnico.' },
        { nome: 'Cheat-sheet MCP', tipo: 'Cheat-sheet', link: 'https://drive.google.com/file/d/demo-mcp', descrizione: 'Quale strumento collegare per cosa: Notion, Drive, posta, calendario, immagini.' },
        { nome: 'Registrazione Call 1', tipo: 'Video', link: 'https://drive.google.com/file/d/demo-rec1', descrizione: 'La nostra prima call, da rivedere quando vuoi.' },
        { nome: 'Template skill di partenza', tipo: 'Template', link: 'https://drive.google.com/file/d/demo-tpl', descrizione: 'Gli scheletri di skill da adattare al tuo lavoro.' },
    ],
    call: [
        { numero: 1, titolo: 'Call 1 — Diagnosi + setup', tema: 'Claude Code installato, Notion collegato, primo comando che funziona', stato: 'Fatta', data: '2026-10-06', registrazione: '', note: 'Compito: prova a chiedere il riepilogo di un documento.' },
        { numero: 2, titolo: 'Call 2 — Parlare all’AI sul tuo lavoro', tema: 'Prima skill grezza sul tuo processo più ripetitivo', stato: 'Da fare', data: '2026-10-13', registrazione: '', note: '' },
        { numero: 3, titolo: 'Call 3 — Collego la tua conoscenza', tema: 'I tuoi documenti leggibili dall’AI', stato: 'Da fare', data: '', registrazione: '', note: '' },
    ],
    skill: [
        { nome: 'Riassunto documenti cliente', cosaFa: 'Prende i documenti nuovi di un cliente e ne fa una scheda coi punti chiave', comando: 'riassumi i documenti nuovi di [cliente]', stato: 'Attiva' },
        { nome: 'Report competitor settimanale', cosaFa: 'Controlla i competitor e manda un report ogni lunedì', comando: 'controlla i competitor e mandami il report', stato: 'In costruzione' },
    ],
};

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    if (req.method === 'OPTIONS') return res.status(200).end();

    const slug = (req.query.slug || '').trim();
    const pw = (req.query.pw || '').trim();
    if (!slug) return res.status(400).json({ error: 'Slug mancante' });

    // demo: sempre disponibile (password: leone2026)
    if (slug === 'demo' || slug === 'demo-a1b2c3') {
        if (pw !== DEMO_PW) return res.status(401).json({ error: 'Password errata' });
        return res.status(200).json(DEMO);
    }

    const apiKey = process.env.NOTION_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'NOTION_API_KEY mancante' });

    try {
        // 1) trova il cliente per slug
        const pRes = await queryDB(PERCORSI_DB, apiKey, {
            filter: { property: 'Slug', rich_text: { equals: slug } },
            page_size: 1,
        });
        if (!pRes.results.length) return res.status(404).json({ error: 'Percorso non trovato' });

        const page = pRes.results[0];
        const pr = page.properties;
        const clienteId = page.id;

        // verifica password (se impostata sul cliente)
        const clientePw = txt(pr['Password']);
        if (clientePw && pw !== clientePw) {
            return res.status(401).json({ error: 'Password errata' });
        }

        // 2) call del cliente
        const cRes = await queryDB(CALL_DB, apiKey, {
            filter: { property: 'Cliente', relation: { contains: clienteId } },
            sorts: [{ property: 'Numero', direction: 'ascending' }],
        });
        const call = cRes.results.map((c) => ({
            numero: num(c.properties['Numero']),
            titolo: txt(c.properties['Titolo']),
            tema: txt(c.properties['Tema']),
            stato: sel(c.properties['Stato']),
            data: dt(c.properties['Data']),
            registrazione: url(c.properties['Registrazione']),
            note: txt(c.properties['Note']),
        }));

        // 3) skill del cliente
        const sRes = await queryDB(SKILL_DB, apiKey, {
            filter: { property: 'Cliente', relation: { contains: clienteId } },
        });
        const skill = sRes.results.map((s) => ({
            nome: txt(s.properties['Nome']),
            cosaFa: txt(s.properties['Cosa fa']),
            comando: txt(s.properties['Comando']),
            stato: sel(s.properties['Stato']),
        }));

        // 4) materiali del cliente
        const mRes = await queryDB(MATERIALI_DB, apiKey, {
            filter: { property: 'Cliente', relation: { contains: clienteId } },
            sorts: [{ property: 'Ordine', direction: 'ascending' }],
        });
        const materiali = mRes.results.map((m) => ({
            nome: txt(m.properties['Nome']),
            tipo: sel(m.properties['Tipo']),
            link: url(m.properties['Link']),
            descrizione: txt(m.properties['Descrizione']),
        }));

        return res.status(200).json({
            nome: txt(pr['Nome']),
            stato: sel(pr['Stato']),
            meseCorrente: num(pr['Mese corrente']),
            prossimaCall: dt(pr['Prossima call']),
            linkCall: url(pr['Link prossima call']),
            oreRisparmiate: num(pr['Ore risparmiate a settimana']),
            claudePlan: sel(pr['Claude plan']),
            dataInizio: dt(pr['Data inizio']),
            dataFine: dt(pr['Data fine']),
            cartellaDrive: url(pr['Cartella Drive']),
            benvenuto: txt(pr['Benvenuto']),
            call,
            skill,
            materiali,
        });
    } catch (e) {
        console.error('percorso api error:', e);
        return res.status(500).json({ error: e.message });
    }
}
