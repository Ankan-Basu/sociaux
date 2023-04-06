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
    
    extend: {
      width: {
        '100px': '100px',
        '600px': '600px',
        '700px': '700px',
        '98': '400px',
        '99': '450px',
        '100': '500px',
        '101': '520px'
      },
      height: {
        '100px': '100px',
        '100': '500px'
      },
      colors: {
        'primary': '#0ab68b',
        'primary2': '#028174',
        'secondary': '#92de8b',
        'secondary2': '#ffe3b3',
        'deactiv': '#e2e8f0'
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80'
      },

      animation: {
        scrollAppear: "scrollAppear 1.5s linear 1"
      },

      keyframes: {
        scrollAppear: {
          "0%": {
            opacity: 0,
            transform: "scale(0.75)" 
          },
          "50%": {
            opacity: 50,
            transform: "scale(0.875)"
          },
          "100%": {
            opacity: 100,
            transform: "scale(1.00)"
          }
        }
      }
    },
    
  },
  plugins: [],
}