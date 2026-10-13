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
          950: '#0B1220', // Main Dark Navy Background
          900: '#0E1726',
          850: '#0F172A',
          800: '#131F37',
          750: '#182846',
          700: '#1E293B',
          600: '#334155',
        },
        electric: {
          accent: '#2563EB', // Primary Electric Blue
          500: '#3B82F6',
          400: '#60A5FA',
          300: '#93C5FD',
          glow: 'rgba(37, 99, 235, 0.5)',
        },
        tech: {
          offwhite: '#F8FAFC',
          slate: '#94A3B8',
          muted: '#64748B',
          border: '#1E293B',
          card: '#0F172A',
          cardHover: '#131F37',
        },
        surface: {
          50: '#0F172A',
          100: '#131F37',
          200: '#1E293B',
          300: '#334155',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-electric': '0 0 25px -4px rgba(37, 99, 235, 0.45)',
        'glow-electric-lg': '0 0 45px -8px rgba(37, 99, 235, 0.6)',
        'glow-sm': '0 0 15px -3px rgba(37, 99, 235, 0.35)',
        'glow-md': '0 0 25px -5px rgba(37, 99, 235, 0.45)',
        'glow-lg': '0 0 40px -10px rgba(37, 99, 235, 0.55)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'card-dark': '0 10px 30px -10px rgba(2, 6, 23, 0.6), 0 0 1px 1px rgba(30, 41, 59, 0.8)',
        'card-hover': '0 20px 40px -12px rgba(37, 99, 235, 0.25), 0 0 1px 1px rgba(37, 99, 235, 0.4)',
        'card-glow': '0 10px 30px -10px rgba(37, 99, 235, 0.25), 0 0 1px 1px rgba(37, 99, 235, 0.3)',
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
