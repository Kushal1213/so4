/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        night: {
          950: '#060912',
          900: '#0a0e1a',
          800: '#111827',
          700: '#1a2235',
          600: '#243049',
        },
        moon: {
          50: '#f0f4ff',
          100: '#dce4ff',
          200: '#b8c7ff',
          300: '#8ba3ff',
          400: '#5b7cfa',
          500: '#4563eb',
        },
        dream: {
          400: '#8b7cf6',
          500: '#7c6cf0',
        },
      },
      fontFamily: {
        sans: ['"Segoe UI Variable"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Segoe UI Variable Display"', '"Segoe UI Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Cascadia Code"', '"Segoe UI Mono"', 'monospace'],
      },
      boxShadow: {
        bezel: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 24px 64px rgba(0,0,0,0.35)',
        glow: '0 0 48px rgba(91,124,250,0.15)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        shimmer: 'shimmer 1.4s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
