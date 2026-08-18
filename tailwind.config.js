/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Noto Serif SC'", "'Instrument Serif'", 'serif'],
        body: ["'Noto Sans SC'", "'Barlow'", 'sans-serif'],
      },
      colors: {
        honey: '#e0952f',
        gold: '#b9821f',
        ink: {
          DEFAULT: 'oklch(0.28 0.04 55)',
          muted: 'oklch(0.5 0.03 55)',
          faint: 'oklch(0.62 0.025 55)',
        },
        paper: {
          0: 'oklch(0.955 0.02 75)',
          1: 'oklch(0.93 0.02 75)',
          2: 'oklch(0.9 0.02 75)',
          3: 'oklch(0.87 0.02 75)',
        },
        rule: 'oklch(0.28 0.04 55 / 0.12)',
      },
    },
  },
  plugins: [],
}
