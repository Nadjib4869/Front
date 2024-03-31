/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        footer:'#001235',
        footer2: '#000D1D',
        gold : '#FFD700',
        gold2 : '#FFB700'
      },
    },
  },
  plugins: [],
}