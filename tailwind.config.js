/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background-color': '#070707',
        'dark-blue': '#030712',
        'light-blue': '#8ba8fa'
      },
    },
  },
  plugins: [],
}

