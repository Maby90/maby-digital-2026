// Vercel serverless: fetch RSS from oltreilprompt.substack.com, parse, return JSON.
// Edge-cached for 1h; SWR keeps stale cached up to 24h while revalidating in bg.

const FEED_URL = 'https://oltreilprompt.substack.com/feed';

function unwrapCdata(s = '') {
    return s.replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '');
}

function decodeEntities(s = '') {
    return s
        .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
        .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&laquo;/g, '«')
        .replace(/&raquo;/g, '»')
        .replace(/&hellip;/g, '…')
        .replace(/&mdash;/g, '—')
        .replace(/&ndash;/g, '–')
        .replace(/&rsquo;/g, '’')
        .replace(/&lsquo;/g, '‘')
        .replace(/&rdquo;/g, '”')
        .replace(/&ldquo;/g, '“');
}

function stripHtml(html = '') {
    return decodeEntities(
        html
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<[^>]+>/g, '')
    )
        .replace(/\s+/g, ' ')
        .trim();
}

function pickTag(block, tag) {
    const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i');
    const m = block.match(re);
    return m ? unwrapCdata(m[1]).trim() : '';
}

function pickEnclosureUrl(block) {
    const m = block.match(/<enclosure[^>]*url="([^"]+)"/i);
    return m ? m[1] : '';
}

function parseFeed(xml) {
    const itemBlocks = xml.match(/<item[\s\S]*?<\/item>/g) || [];
    return itemBlocks.map((block) => {
        const title = stripHtml(pickTag(block, 'title'));
        const link = pickTag(block, 'link');
        const pubDate = pickTag(block, 'pubDate');
        const guid = pickTag(block, 'guid');
        const descRaw = pickTag(block, 'description');
        const description = stripHtml(descRaw).slice(0, 240);
        const image = pickEnclosureUrl(block) ||
            (descRaw.match(/<img[^>]*src="([^"]+)"/i) || [])[1] || '';
        return {
            id: guid || link,
            title,
            link,
            date: pubDate ? new Date(pubDate).toISOString() : null,
            description,
            image,
        };
    });
}

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const upstream = await fetch(FEED_URL, {
            headers: { 'User-Agent': 'mprochilo.it/1.0 (+https://mprochilo.it)' },
        });

        if (!upstream.ok) {
            return res.status(502).json({ error: `Substack feed responded ${upstream.status}` });
        }

        const xml = await upstream.text();
        const items = parseFeed(xml);
        const channelTitle = stripHtml(pickTag(xml, 'title'));
        const channelDescription = stripHtml(pickTag(xml, 'description'));

        // Cache: fresh 1h, serve stale up to 24h while revalidating
        res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
        res.status(200).json({
            channel: { title: channelTitle, description: channelDescription, link: 'https://oltreilprompt.substack.com/' },
            items,
        });
    } catch (err) {
        console.error('newsletter feed error:', err);
        res.status(500).json({ error: 'Failed to fetch newsletter feed' });
    }
}
