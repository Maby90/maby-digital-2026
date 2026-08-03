// Static per-route meta injection for SEO + social crawlers.
// Reads dist/index.html, generates dist/<route>/index.html with route-specific
// <title>, <meta description>, OG, Twitter, canonical. Crawlers that don't run
// JS still get correct per-page metadata.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '../dist');
const SITE = 'https://mprochilo.it';

const routes = [
    {
        path: '/',
        title: 'Maby Prochilo · Sistemi AI per aziende: agenti, automazioni, Claude Code',
        description: 'Progetto e installo sistemi AI per freelance, PMI e team B2B: agenti, automazioni e skill su Claude Code che tolgono lavoro ripetitivo. Con un occhio al marketing.',
    },
    {
        path: '/newsletter',
        title: 'Oltre il prompt · Newsletter su AI e comunicazione · Maby Prochilo',
        description: 'Comunicazione, intelligenza artificiale e le cose che succedono quando le usi insieme. Workflow reali, prompt inclusi. Skill brand voice extractor in regalo per chi si iscrive.',
    },
    {
        path: '/privacy',
        title: 'Privacy Policy · Maby Prochilo',
        description: 'Politica di Riservatezza ai sensi dell\'art. 13 D.lgs. n.196/2003 e Regolamento U.E 679/2016 (GDPR).',
    },
    {
        path: '/privacy-sfoglia',
        title: 'Privacy Policy · Sfoglia Reader',
        description: 'Informativa privacy dell\'app Sfoglia Reader: nessun dato raccolto, tutto resta sul tuo dispositivo.',
    },
    {
        path: '/grazie',
        title: 'Richiesta ricevuta · Maby Prochilo',
        description: 'Grazie per la tua richiesta. Ti rispondo entro 48 ore lavorative.',
    },
    {
        path: '/skill-carosello',
        title: 'Skill Claude per caroselli Instagram | Maby Prochilo',
        description: 'Scarica la skill che uso per generare caroselli Instagram in 30 minuti con Claude e Gemini. Senza Canva. 0 abbonamenti.',
        ogImage: '/og-skill-carosello.png',
    },
    {
        path: '/skill-lavagne',
        title: 'Skill Claude per lavagne Excalidraw | Maby Prochilo',
        description: 'Scarica la skill che uso per generare schemi e lavagne Excalidraw con Claude: flussi, timeline, confronti, mappe. Gratis, senza abbonamenti.',
    },
    {
        path: '/agente-fascicolo',
        title: 'Agente fascicolo cliente, gratis | Maby Prochilo',
        description: 'Scarica l\'agente Claude che prende il materiale sparso di un cliente e ti restituisce lo stato: cosa è deciso, cosa è aperto, cosa scade, di chi è la prossima mossa.',
    },
    {
        path: '/workflow-call',
        title: 'Workflow: da una call ai 4 contenuti | Maby Prochilo',
        description: 'Da una call di 30 minuti a 4 contenuti diversi (post LinkedIn, newsletter, reel, carosello). Workflow + 4 prompt Claude. Iscriviti per scaricare il PDF.',
        robots: 'noindex, follow',
    },
    {
        path: '/ai-nel-tuo-lavoro',
        title: 'AI nel tuo lavoro · Affiancamento 1:1 · Maby Prochilo',
        description: 'Tre mesi uno a uno per mettere l\'AI dentro il tuo lavoro con Claude Code. Lascia all\'AI il lavoro ripetitivo, concentrati su quello che conta. Coorte 1.0, tre posti, si entra per candidatura.',
    },
    {
        path: '/percorso',
        title: 'Il tuo percorso · AI nel tuo lavoro',
        description: 'Area riservata del percorso AI nel tuo lavoro.',
        robots: 'noindex, nofollow',
    },
];

const OG_IMAGE = `${SITE}/og-image.png`;

function patchHtml(html, route) {
    const url = `${SITE}${route.path}`;
    const img = route.ogImage ? `${SITE}${route.ogImage}` : OG_IMAGE;
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return html
        // <title>
        .replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(route.title)}</title>`)
        // description
        .replace(/<meta name="description"[\s\S]*?\/>/i,
            `<meta name="description" content="${esc(route.description)}" />`)
        // canonical
        .replace(/<link rel="canonical"[^>]*\/>/i,
            `<link rel="canonical" href="${url}" />`)
        // og:title, og:description, og:url, og:image
        .replace(/<meta property="og:title"[\s\S]*?\/>/i,
            `<meta property="og:title" content="${esc(route.title)}" />`)
        .replace(/<meta property="og:description"[\s\S]*?\/>/i,
            `<meta property="og:description" content="${esc(route.description)}" />`)
        .replace(/<meta property="og:url"[\s\S]*?\/>/i,
            `<meta property="og:url" content="${url}" />`)
        .replace(/<meta property="og:image" content="[^"]*"\s*\/>/i,
            `<meta property="og:image" content="${img}" />`)
        // twitter
        .replace(/<meta name="twitter:title"[\s\S]*?\/>/i,
            `<meta name="twitter:title" content="${esc(route.title)}" />`)
        .replace(/<meta name="twitter:description"[\s\S]*?\/>/i,
            `<meta name="twitter:description" content="${esc(route.description)}" />`)
        .replace(/<meta name="twitter:url"[\s\S]*?\/>/i,
            `<meta name="twitter:url" content="${url}" />`)
        .replace(/<meta name="twitter:image"[\s\S]*?\/>/i,
            `<meta name="twitter:image" content="${img}" />`)
        // robots (allow per-route override; default index)
        .replace(/<meta name="robots"[\s\S]*?\/>/i,
            `<meta name="robots" content="${esc(route.robots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')}" />`);
}

async function run() {
    const baseHtml = await readFile(resolve(distDir, 'index.html'), 'utf-8');
    let count = 0;

    for (const route of routes) {
        const patched = patchHtml(baseHtml, route);
        if (route.path === '/') {
            await writeFile(resolve(distDir, 'index.html'), patched, 'utf-8');
        } else {
            const folder = resolve(distDir, route.path.replace(/^\//, ''));
            await mkdir(folder, { recursive: true });
            await writeFile(resolve(folder, 'index.html'), patched, 'utf-8');
        }
        count += 1;
    }

    console.log(`✓ Prerendered ${count} routes with per-page SEO meta`);
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
