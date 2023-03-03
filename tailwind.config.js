/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#0ab68b',
      'primary2': '#028174',
      'secondary': '#92de8b',
      'secondary2': '#ffe3b3' 
    },
    extend: {
      width: {
        '98': '400px',
        '99': '450',
        '100': '500px'
      }
    },
  },
  plugins: [],
}
