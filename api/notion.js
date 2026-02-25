import { Client } from '@notionhq/client';

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

    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const databaseId = process.env.NOTION_DATABASE_ID;

    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
        return res.status(500).json({ error: 'Missing Vercel Environment Variables: NOTION_API_KEY or NOTION_DATABASE_ID' });
    }

    try {
        const response = await notion.databases.query({
            database_id: databaseId,
            filter: {
                property: 'Stato',
                select: {
                    equals: 'Pubblicato'
                }
            },
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'descending'
                }
            ]
        });

        const posts = response.results.map(page => {
            // Estrai il titolo
            let title = "Senza Titolo";
            if (page.properties.Titolo && page.properties.Titolo.title && page.properties.Titolo.title.length > 0) {
                title = page.properties.Titolo.title[0].plain_text;
            }

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

            // Estrai la descrizione se esiste un campo text, per ora omesso/null
            let description = "";

            return {
                id: page.id,
                title,
                date,
                tags,
                slug: page.id,
            };
        });

        res.status(200).json(posts);
    } catch (error) {
        console.error("Notion API Error in /api/notion:", error);
        res.status(500).json({ error: error.message });
    }
}
