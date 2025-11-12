// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'], // корисно за shadcn/ui
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
