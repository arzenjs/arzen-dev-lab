// Theme colors resolve through CSS variables (defined in app/globals.css),
// so every existing class name keeps working unchanged in both themes.
// `:root` holds the original dark palette; `.light` mirrors the slate ramp
// inverted. next-themes toggles the class on <html> from the OS preference.
const cssVar = (name) => `rgb(var(${name}) / <alpha-value>)`

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        fg: cssVar('--fg'),
        slate: {
          50: cssVar('--slate-50'), 100: cssVar('--slate-100'), 200: cssVar('--slate-200'),
          300: cssVar('--slate-300'), 400: cssVar('--slate-400'), 500: cssVar('--slate-500'),
          600: cssVar('--slate-600'), 700: cssVar('--slate-700'), 800: cssVar('--slate-800'),
          900: cssVar('--slate-900'), 950: cssVar('--slate-950'),
        },
        x: { DEFAULT: cssVar('--x'), glow: 'rgba(6,182,212,0.3)', dim: 'rgba(6,182,212,0.1)' },
        o: { DEFAULT: cssVar('--o'), glow: 'rgba(244,63,94,0.3)', dim: 'rgba(244,63,94,0.1)' },
        board: { bg: cssVar('--board-bg'), line: cssVar('--board-line'), cell: cssVar('--board-cell'), hover: cssVar('--board-hover') },
        win: { DEFAULT: cssVar('--win'), glow: 'rgba(245,158,11,0.4)' },
      },
    },
  },
  plugins: [],
}
