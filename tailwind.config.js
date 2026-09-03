/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        onyx: {
          900: 'var(--bg-onyx)',
          800: 'var(--bg-charcoal)',
          700: 'var(--bg-elevated)',
        },
        gold: {
          DEFAULT: 'var(--accent-gold)',
          bright: 'var(--accent-gold-bright)',
          dark: 'var(--accent-gold-dark)',
          subtle: 'var(--border-gold-subtle)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          gold: 'var(--border-gold-subtle)',
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: '#6B7280',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.15)',
        'gold-glow-lg': '0 0 50px rgba(212, 175, 55, 0.25)',
        'dark-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
