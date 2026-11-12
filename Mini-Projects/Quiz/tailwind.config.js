// Theme tokens that differ between light and dark are driven by CSS
// variables (see app/globals.css). next-themes toggles the `.dark` class on
// <html> based on the operating system's color scheme, and the variables
// swap the palette automatically — component class names stay unchanged.
const cssVar = (name) => `rgb(var(${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        quiz: {
          bg: cssVar('--quiz-bg'),
          surface: cssVar('--quiz-surface'),
          card: cssVar('--quiz-card'),
          border: cssVar('--quiz-border'),
          accent: cssVar('--quiz-accent'),
          accentHover: cssVar('--quiz-accentHover'),
          correct: '#22c55e', correctBg: 'rgba(34,197,94,0.1)',
          incorrect: '#ef4444', incorrectBg: 'rgba(239,68,68,0.1)',
          text: cssVar('--quiz-text'),
          muted: cssVar('--quiz-muted'),
          dim: cssVar('--quiz-dim'),
        },
      },
    },
  },
  plugins: [],
}
