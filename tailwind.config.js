/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#00D4FF',
          sky: '#0EA5E9',
          turquoise: '#00FFC8',
          purple: '#8B5CF6',
          violet: '#A855F7',
          pink: '#EC4899',
          dark: '#050816',
          card: '#0B1020',
          panel: '#121B2F',
          border: 'rgba(0, 212, 255, 0.15)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 212, 255, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(14, 165, 233, 0.4)',
        'glow-turquoise': '0 0 25px -5px rgba(0, 255, 200, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'aurora': 'aurora 12s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s infinite linear',
        'glow': 'glow 3s infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        aurora: {
          '0%': { opacity: '0.4', transform: 'scale(1) translate(0, 0)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1) translate(-20px, 15px)' },
          '100%': { opacity: '0.5', transform: 'scale(1.05) translate(20px, -15px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(0, 212, 255, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(0, 255, 200, 0.7))' },
        }
      }
    },
  },
  plugins: [],
}
