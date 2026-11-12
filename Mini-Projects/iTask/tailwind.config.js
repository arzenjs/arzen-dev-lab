// Theme colors resolve through CSS variables (defined in app/globals.css),
// so every existing `task-*` class keeps working unchanged in both themes.
// `:root` holds the ORIGINAL light palette; `.dark` maps it to a consistent
// dark complement. next-themes toggles the class on <html> from the OS
// preference — no manual toggle.
const cssVar = (name) => `rgb(var(${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        task: {
          bg: cssVar('--task-bg'),
          surface: cssVar('--task-surface'),
          border: cssVar('--task-border'),
          accent: cssVar('--task-accent'),
          accentHover: cssVar('--task-accentHover'),
          accentLight: cssVar('--task-accentLight'),
          danger: cssVar('--task-danger'),
          dangerHover: cssVar('--task-dangerHover'),
          success: cssVar('--task-success'),
          text: cssVar('--task-text'),
          muted: cssVar('--task-muted'),
          completed: cssVar('--task-completed'),
        },
      },
    },
  },
  plugins: [],
}
