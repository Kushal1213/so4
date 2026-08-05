/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        night: {
          950: '#0b0d12',
          900: '#11141c',
          800: '#181c27',
          700: '#222836',
          600: '#2e3648',
        },
        // Single accent — desaturated seafoam (sat < 80%)
        moon: {
          50: '#eef6f2',
          100: '#d5e8df',
          200: '#a8cfbc',
          300: '#7a9e8f',
          400: '#5f8678',
          500: '#4a6b60',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Syne', 'Outfit', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        bezel: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 48px rgba(8,12,18,0.45)',
        soft: '0 12px 40px rgba(8,12,18,0.35)',
      },
      maxWidth: {
        shell: '1400px',
      },
      zIndex: {
        skip: '100',
        nav: '40',
        overlay: '50',
        modal: '60',
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
