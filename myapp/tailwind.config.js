/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customRed: '#f95959',
        customGray: '#e3e3e3',
        customLightBlue:'#66bfbf',
        customLightBlue100:'#e4f1fe',
      },
    },
  },
  plugins: [],
}

