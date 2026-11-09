/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        task: {
          bg: '#fafafa', surface: '#ffffff', border: '#e5e7eb',
          accent: '#6366f1', accentHover: '#4f46e5', accentLight: '#eef2ff',
          danger: '#ef4444', dangerHover: '#dc2626', success: '#22c55e',
          text: '#1f2937', muted: '#9ca3af', completed: '#d1d5db',
        },
      },
    },
  },
  plugins: [],
}