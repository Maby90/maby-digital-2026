export default function handler(req, res) {
    res.status(200).json({
        hasKey: !!process.env.NOTION_API_KEY,
        keyLength: process.env.NOTION_API_KEY?.length || 0,
        hasDb: !!process.env.NOTION_DATABASE_ID,
        dbLength: process.env.NOTION_DATABASE_ID?.length || 0
    });
}
