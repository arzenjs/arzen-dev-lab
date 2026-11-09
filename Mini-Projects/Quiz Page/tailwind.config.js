/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        quiz: {
          bg: '#0f172a', surface: '#1e293b', card: '#1e293b', border: '#334155',
          accent: '#818cf8', accentHover: '#6366f1',
          correct: '#22c55e', correctBg: 'rgba(34,197,94,0.1)',
          incorrect: '#ef4444', incorrectBg: 'rgba(239,68,68,0.1)',
          text: '#f1f5f9', muted: '#94a3b8', dim: '#64748b',
        },
      },
    },
  },
  plugins: [],
}