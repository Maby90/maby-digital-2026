function toSentenceCase(str) {
    if (!str) return '';
    const match = str.match(/[a-zA-ZÀ-ÖØ-öø-ÿ]/);
    if (!match) return str.toLowerCase();
    const index = match.index;
    return str.substring(0, index) + 
           str.charAt(index).toUpperCase() + 
           str.substring(index + 1).toLowerCase();
}

const processMarkdownHeaders = (content) => {
    if (!content) return '';
    return content.replace(/^(#{1,6}\s+)([^\n]+)/gm, (match, hashes, text) => {
        return hashes + toSentenceCase(text);
    });
};

console.log(processMarkdownHeaders("## **il MIO titolo**\nTesto normale\n### ALTrO TiTOlo"));
