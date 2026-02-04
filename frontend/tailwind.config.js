/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc9fb',
          400: '#36aef7',
          500: '#0c92eb',
          600: '#0173ca',
          700: '#025ba3',
        },
      },
    },
  },
  plugins: [],
};
