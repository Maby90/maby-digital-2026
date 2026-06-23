import { useEffect } from 'react';

const SITE = 'https://mprochilo.it';
const DEFAULTS = {
    title: 'Maby Prochilo · Digital Strategist & AI Marketing Consultant',
    description: 'Strategie di marketing digitale e workflow AI per liberi professionisti, PMI e brand B2B. Acquisizione clienti, posizionamento e automazioni intelligenti senza buzzword.',
    image: `${SITE}/og-image.png`,
    type: 'website',
};

function setMeta(selector, attr, value) {
    if (typeof document === 'undefined') return;
    let el = document.head.querySelector(selector);
    if (!el) {
        el = document.createElement('meta');
        const [, key, val] = selector.match(/\[(.+?)="(.+?)"\]/) || [];
        if (key && val) el.setAttribute(key, val);
        document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
}

function setLink(rel, href) {
    if (typeof document === 'undefined') return;
    let el = document.head.querySelector(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
}

function injectJsonLd(id, data) {
    if (typeof document === 'undefined') return;
    let el = document.getElementById(id);
    if (!el) {
        el = document.createElement('script');
        el.type = 'application/ld+json';
        el.id = id;
        document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
}

function buildBreadcrumbs(path, title) {
    if (!path || path === '/') return null;
    const parts = path.split('/').filter(Boolean);
    const items = [{ name: 'Home', url: SITE }];
    let acc = '';
    parts.forEach((p) => {
        acc += '/' + p;
        const label = p === parts[parts.length - 1]
            ? title || p.replace(/-/g, ' ')
            : p.replace(/-/g, ' ');
        items.push({ name: label, url: `${SITE}${acc}` });
    });
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: it.name,
            item: it.url,
        })),
    };
}

export default function useSeo({ title, description, path = '/', image, type = 'website', jsonLd, robots } = {}) {
    useEffect(() => {
        const t = title || DEFAULTS.title;
        const d = description || DEFAULTS.description;
        const url = `${SITE}${path}`;
        const img = image || DEFAULTS.image;

        document.title = t;
        setMeta('meta[name="description"]', 'content', d);
        setLink('canonical', url);

        if (robots) setMeta('meta[name="robots"]', 'content', robots);
        else setMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

        // OG
        setMeta('meta[property="og:title"]', 'content', t);
        setMeta('meta[property="og:description"]', 'content', d);
        setMeta('meta[property="og:url"]', 'content', url);
        setMeta('meta[property="og:type"]', 'content', type);
        setMeta('meta[property="og:image"]', 'content', img);
        setMeta('meta[property="og:image:alt"]', 'content', t);

        // Twitter
        setMeta('meta[name="twitter:title"]', 'content', t);
        setMeta('meta[name="twitter:description"]', 'content', d);
        setMeta('meta[name="twitter:url"]', 'content', url);
        setMeta('meta[name="twitter:image"]', 'content', img);
        setMeta('meta[name="twitter:image:alt"]', 'content', t);

        if (jsonLd) injectJsonLd('route-jsonld', jsonLd);

        const breadcrumbs = buildBreadcrumbs(path, t);
        if (breadcrumbs) injectJsonLd('breadcrumbs-jsonld', breadcrumbs);

        return () => {
            ['route-jsonld', 'breadcrumbs-jsonld'].forEach((id) => {
                const el = document.getElementById(id);
                if (el) el.remove();
            });
        };
    }, [title, description, path, image, type, JSON.stringify(jsonLd || null)]);
}
