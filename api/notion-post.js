const { Client } = require('@notionhq/client');
const { NotionToMarkdown } = require('notion-to-md');

export default async function handler(req, res) {
    // Configura i CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { id: slug } = req.query; // 'id' in query is actually the slug now from the URL

    if (!slug) {
        return res.status(400).json({ error: 'Missing slug parameter' });
    }

    const API_KEY = process.env.NOTION_API_KEY;
    const DB_ID = process.env.NOTION_DATABASE_ID;

    if (!API_KEY || !DB_ID) {
        return res.status(500).json({ error: 'Missing Vercel Environment Variables' });
    }

    const notion = new Client({ auth: API_KEY });
    const n2m = new NotionToMarkdown({ notionClient: notion });

    try {
        // Fetch posts using native fetch to avoid SDK environment issues on Vercel Node 18
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
                }
            })
        });

        if (!fetchRes.ok) {
            const errText = await fetchRes.text();
            throw new Error(`Failed to query database: ${fetchRes.status} ${errText}`);
        }

        const data = await fetchRes.json();

        const slugify = (text) => {
            return text.toString().toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-')
                .replace(/^-+/, '')
                .replace(/-+$/, '');
        };

        let targetPageId = null;
        let title = "Senza Titolo";
        let date = "";
        let tags = [];

        for (const page of data.results) {
            let pageTitle = "Senza Titolo";
            if (page.properties.Titolo && page.properties.Titolo.title && page.properties.Titolo.title.length > 0) {
                pageTitle = page.properties.Titolo.title[0].plain_text;
            }
            if (slugify(pageTitle) === slug || page.id === slug) {
                targetPageId = page.id;
                title = pageTitle;
                date = page.created_time;
                if (page.properties['Data di creazione'] && page.properties['Data di creazione'].date) {
                    date = page.properties['Data di creazione'].date.start;
                }
                if (page.properties.Tags && page.properties.Tags.multi_select) {
                    tags = page.properties.Tags.multi_select;
                }
                break;
            }
        }

        if (!targetPageId) {
            return res.status(404).json({ error: "Article not found for this slug" });
        }

        // 2. Recupera e converte il contenuto dei blocchi in Markdown
        const mdBlocks = await n2m.pageToMarkdown(targetPageId);
        const mdString = n2m.toMarkdownString(mdBlocks);

        const content = typeof mdString === 'string' ? mdString : mdString.parent || '';

        res.status(200).json({
            id: targetPageId,
            title,
            date,
            tags,
            content,
            slug,
        });
    } catch (error) {
        console.error("Notion API Error in /api/notion-post:", error);
        res.status(500).json({ error: error.message });
    }
}
