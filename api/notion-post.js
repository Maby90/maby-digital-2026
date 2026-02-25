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

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Missing page ID parameter' });
    }

    if (!process.env.NOTION_API_KEY) {
        return res.status(500).json({ error: 'Missing Vercel Environment Variables: NOTION_API_KEY' });
    }

    const notion = new Client({ auth: process.env.NOTION_API_KEY });
    const n2m = new NotionToMarkdown({ notionClient: notion });

    try {
        // 1. Recupera i metadati della pagina Notion
        const page = await notion.pages.retrieve({ page_id: id });

        let title = "Senza Titolo";
        if (page.properties.Titolo && page.properties.Titolo.title && page.properties.Titolo.title.length > 0) {
            title = page.properties.Titolo.title[0].plain_text;
        }

        let date = page.created_time;
        if (page.properties['Data di creazione'] && page.properties['Data di creazione'].date) {
            date = page.properties['Data di creazione'].date.start;
        }

        let tags = [];
        if (page.properties.Tags && page.properties.Tags.multi_select) {
            tags = page.properties.Tags.multi_select;
        }

        // 2. Recupera e converte il contenuto dei blocchi in Markdown
        const mdBlocks = await n2m.pageToMarkdown(id);
        const mdString = n2m.toMarkdownString(mdBlocks);

        const content = typeof mdString === 'string' ? mdString : mdString.parent || '';

        res.status(200).json({
            id: page.id,
            title,
            date,
            tags,
            content,
        });
    } catch (error) {
        console.error("Notion API Error in /api/notion-post:", error);
        res.status(500).json({ error: error.message });
    }
}
