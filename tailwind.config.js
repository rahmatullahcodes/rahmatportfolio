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
        navy: {
          950: '#060B14',
          900: '#0B132B',
          850: '#0F172A',
          800: '#16203D',
          700: '#1E293B',
          600: '#334155',
        },
        electric: {
          300: '#7DD3FC',
          400: '#38BDF8',
          500: '#0284C7',
          600: '#0369A1',
          accent: '#2563EB',
        },
        surface: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(56, 189, 248, 0.3)',
        'glow-md': '0 0 25px -5px rgba(14, 165, 233, 0.45)',
        'glow-lg': '0 0 40px -10px rgba(56, 189, 248, 0.5)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'card-light': '0 10px 25px -5px rgba(15, 23, 42, 0.04), 0 8px 10px -6px rgba(15, 23, 42, 0.02)',
        'card-hover': '0 20px 35px -10px rgba(15, 23, 42, 0.09), 0 1px 3px 0 rgba(0, 0, 0, 0.05)',
        'card-glow': '0 10px 30px -10px rgba(56, 189, 248, 0.2), 0 0 1px 1px rgba(56, 189, 248, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 7s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
        'marquee': 'marquee 28s linear infinite',
        'blob': 'blob 9s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.08)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
