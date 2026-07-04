/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          primary: '#E91E8C',
        },
        cyan: {
          primary: '#00BCD4',
        },
        dark: {
          bg: '#0A0A0A',
          surface: '#111111',
          border: '#1E1E1E',
        }
      },
    },
  },
  plugins: [],
}