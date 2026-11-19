/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: "#050816",
        darkBgSecondary: "#0B1224",
        darkCard: "#101A30",
        electricBlue: "#38BDF8",
        primaryBlue: "#2563EB",
        cyanAccent: "#22D3EE",
        lightWhite: "#F8FAFC",
        mutedText: "#94A3B8",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'futuristic-grid': 'linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)',
        'electric-glow': 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, rgba(37, 99, 235, 0.05) 50%, transparent 100%)',
      },
      boxShadow: {
        'neon-blue': '0 0 20px -3px rgba(56, 189, 248, 0.35)',
        'neon-glow': '0 0 35px -5px rgba(34, 211, 238, 0.3)',
        'card-glow': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 20px -5px rgba(56, 189, 248, 0.15)',
        'cyber-border': 'inset 0 0 15px rgba(56, 189, 248, 0.15)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

