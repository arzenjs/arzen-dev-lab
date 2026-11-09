/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        x: { DEFAULT: '#06b6d4', glow: 'rgba(6,182,212,0.3)', dim: 'rgba(6,182,212,0.1)' },
        o: { DEFAULT: '#f43f5e', glow: 'rgba(244,63,94,0.3)', dim: 'rgba(244,63,94,0.1)' },
        board: { bg: '#1e293b', line: '#334155', cell: '#0f172a', hover: '#1a2536' },
        win: { DEFAULT: '#f59e0b', glow: 'rgba(245,158,11,0.4)' },
      },
    },
  },
  plugins: [],
}