import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ className = '' }) {
    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') return 'dark';
        return document.documentElement.classList.contains('light') ? 'light' : 'dark';
    });

    useEffect(() => {
        const html = document.documentElement;
        html.classList.remove('dark', 'light');
        html.classList.add(theme);
        try { localStorage.setItem('theme', theme); } catch (_) {}
    }, [theme]);

    return (
        <button
            type="button"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}
            className={`inline-flex items-center justify-center w-9 h-9 rounded-md border border-line bg-surface/40 hover:bg-elev text-fg transition-colors ${className}`}
        >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
    );
}
