export default async function handler(req, res) {
    // Configura i CORS per permettere al frontend di chiamare l'API anche se separato
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const API_KEY = process.env.NOTION_API_KEY;
    const DB_ID = process.env.NOTION_DATABASE_ID;

    if (!API_KEY || !DB_ID) {
        return res.status(500).json({ error: 'Missing Vercel Environment Variables: NOTION_API_KEY or NOTION_DATABASE_ID' });
    }

    try {
        const fetchRes = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                filter: {
                    property: 'Stato',
                    status: {
                        equals: 'Pubblicato'
                    }
                },
                sorts: [
                    {
                        timestamp: 'created_time',
                        direction: 'descending'
                    }
                ]
            })
        });

        if (!fetchRes.ok) {
            const errBody = await fetchRes.text();
            throw new Error(`Notion API error: ${fetchRes.status} ${errBody}`);
        }

        const data = await fetchRes.json();

        const posts = data.results.map(page => {
            // Estrai il titolo
            let title = "Senza Titolo";
            if (page.properties.Titolo && page.properties.Titolo.title && page.properties.Titolo.title.length > 0) {
                title = page.properties.Titolo.title[0].plain_text;
            }

            const slugify = (text) => {
                return text.toString().toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '');
            };
            const generatedSlug = slugify(title);

            // Estrai i tags
            let tags = [];
            if (page.properties.Tags && page.properties.Tags.multi_select) {
                tags = page.properties.Tags.multi_select;
            }

            // Estrai la data
            let date = page.created_time;
            if (page.properties['Data di creazione'] && page.properties['Data di creazione'].date) {
                date = page.properties['Data di creazione'].date.start;
            }

            return {
                id: page.id,
                title,
                date,
                tags,
                slug: generatedSlug || page.id,
            };
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Notion API Error in /api/notion:", error);
        res.status(500).json({ error: error.message });
    }
}
