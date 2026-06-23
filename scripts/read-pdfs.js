const fs = require('fs');
const pdf = require('pdf-parse');

async function readPdfs() {
    const dir = '/Users/mabyprochilo/Desktop/Newsletter';
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.pdf'));
    let combinedText = '';
    
    // Leggi i primi 3 PDF per non sovraccaricare
    for (let i = 0; i < Math.min(3, files.length); i++) {
        const filePath = `${dir}/${files[i]}`;
        const dataBuffer = fs.readFileSync(filePath);
        try {
            const data = await pdf(dataBuffer);
            combinedText += `\n--- NEWSLETTER ${i+1} ---\n` + data.text + `\n-----------------------\n`;
        } catch(e) {
            console.error('Error reading', files[i]);
        }
    }
    fs.writeFileSync('scripts/extracted_newsletters.txt', combinedText);
    console.log('Done extracting text. Saved to scripts/extracted_newsletters.txt');
}
readPdfs();
