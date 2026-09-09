/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#080808',
          900: '#0a0a0a',
          800: '#111111',
          700: '#161616',
          600: '#1c1c1c',
        },
        chalk: {
          DEFAULT: '#f5f5f5',
          muted: '#9a9a9a',
          faint: '#5c5c5c',
        },
        accent: {
          // Walmart-inspired blue; used very sparingly.
          DEFAULT: '#0a75e0',
          bright: '#2a8bf2',
          soft: '#0071ce',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.05em',
        editorial: '-0.03em',
      },
      fontSize: {
        // Fluid editorial scale
        'display-sm': 'clamp(2.5rem, 6vw, 4rem)',
        'display-md': 'clamp(3rem, 9vw, 7rem)',
        'display-lg': 'clamp(3.5rem, 13vw, 12rem)',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quint': 'cubic-bezier(0.83, 0, 0.17, 1)',
      },
      maxWidth: {
        editorial: '78rem',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
};
