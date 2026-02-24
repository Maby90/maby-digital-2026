/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F2F0E9", // Cream
        primary: "#2E4036", // Moss
        accent: "#CC5833", // Clay
        dark: "#1A1A1A", // Charcoal
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
        drama: ['"Cormorant Garamond"', 'serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem',
      },
      keyframes: {
        shuffler: {
          '0%': { transform: 'translateY(100%) scale(0.9)', opacity: 0 },
          '10%, 90%': { transform: 'translateY(0) scale(1)', opacity: 1 },
          '100%': { transform: 'translateY(-100%) scale(0.9)', opacity: 0 },
        },
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        blink: {
          '50%': { borderColor: 'transparent' }
        }
      },
      animation: {
        'shuffler': 'shuffler 4s cubic-bezier(0.34, 1.56, 0.64, 1) infinite',
        'typewriter': 'typewriter 4s steps(40, end), blink .75s step-end infinite'
      }
    },
  },
  plugins: [],
}
