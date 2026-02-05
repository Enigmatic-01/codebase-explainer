/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- must be 'class'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
