/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earthy: {
          espresso: '#30231F',
          espressoDark: '#221815',
          espressoSoft: '#56443E',
          terracotta: '#C87552',
          terracottaDark: '#B05E3D',
          champagne: '#F4EBDD',
          champagneSoft: '#F9F5EE',
          taupe: '#B69B7D',
          taupeDeep: '#8E7356',
          white: '#FFFFFF',
        },
        aura: {
          50: '#F9F5EE',
          100: '#F4EBDD',
          200: '#E5D8C5',
          300: '#D4BEA3',
          400: '#B69B7D',
          500: '#C87552',
          600: '#B05E3D',
          700: '#8E7356',
          800: '#56443E',
          900: '#30231F',
        },
        gold: {
          DEFAULT: '#B69B7D',
          light: '#F4EBDD',
          dark: '#8E7356',
          metallic: 'linear-gradient(135deg, #B69B7D 0%, #C87552 50%, #30231F 100%)',
        },
        espresso: {
          950: '#221815',
          900: '#30231F',
          800: '#3D2E29',
          700: '#56443E',
          600: '#725D55',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        editorial: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        script: ['"Great Vibes"', '"Cormorant Garamond"', 'cursive'],
        display: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 16px 36px -14px rgba(48, 35, 31, 0.08), 0 0 12px rgba(182, 155, 125, 0.14)',
        'luxury-hover': '0 22px 44px -12px rgba(48, 35, 31, 0.14), 0 0 20px rgba(200, 117, 82, 0.18)',
        'gold-glow': '0 10px 25px -5px rgba(200, 117, 82, 0.28)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

