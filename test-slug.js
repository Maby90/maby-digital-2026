const slugify = (text) => {
    return text.toString().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}
console.log(slugify("Il lavoro umano dietro i robot umanoidi"));
console.log(slugify("Cos'è l'Intelligenza Artificiale?"));
