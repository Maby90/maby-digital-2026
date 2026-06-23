/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme tokens use CSS vars driven by .dark / .light class
        bg:      'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        elev:    'rgb(var(--elev) / <alpha-value>)',
        line:    'rgb(var(--line) / <alpha-value>)',
        line2:   'rgb(var(--line-strong) / <alpha-value>)',
        fg:      'rgb(var(--fg) / <alpha-value>)',
        mute:    'rgb(var(--mute) / <alpha-value>)',
        dim:     'rgb(var(--dim) / <alpha-value>)',
        mint:    'rgb(var(--mint) / <alpha-value>)',
        // Legacy aliases (graceful fallback for any unmigrated class)
        background: 'rgb(var(--bg) / <alpha-value>)',
        primary:    'rgb(var(--mint) / <alpha-value>)',
        accent:     'rgb(var(--mint) / <alpha-value>)',
        dark:       'rgb(var(--fg) / <alpha-value>)',
        paper:      'rgb(var(--bg) / <alpha-value>)',
        ink:        'rgb(var(--fg) / <alpha-value>)',
        fog:        'rgb(var(--surface) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        nano: '-0.02em',
      },
      maxWidth: { '8xl': '88rem', prose: '68ch' },
      backgroundImage: {
        'grid-line': "linear-gradient(to right, rgb(var(--line)) 1px, transparent 1px), linear-gradient(to bottom, rgb(var(--line)) 1px, transparent 1px)",
        'radial-fade': "radial-gradient(60% 50% at 50% 0%, rgb(var(--mint) / 0.15), transparent 70%)",
        'mint-glow':   "radial-gradient(40% 30% at 50% 100%, rgb(var(--mint) / 0.20), transparent 70%)",
      },
      keyframes: {
        cursor: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0 } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        scan: { '0%': { transform: 'translateY(-100%)' }, '100%': { transform: 'translateY(100%)' } },
      },
      animation: {
        cursor: 'cursor 1s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        scan: 'scan 4s linear infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
