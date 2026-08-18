/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        heading: ["'Noto Serif SC'", "'Instrument Serif'", 'serif'],
        body: ["'Noto Sans SC'", "'Barlow'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}
