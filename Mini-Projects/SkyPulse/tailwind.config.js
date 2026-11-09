/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sky: { clear: '#1e90ff', cloudy: '#6b7280', rainy: '#374151', snowy: '#94a3b8', night: '#0f172a', storm: '#1e293b' },
        glass: { DEFAULT: 'rgba(255,255,255,0.12)', border: 'rgba(255,255,255,0.18)', hover: 'rgba(255,255,255,0.2)', text: 'rgba(255,255,255,0.9)', muted: 'rgba(255,255,255,0.6)', dim: 'rgba(255,255,255,0.4)' },
      },
    },
  },
  plugins: [],
}