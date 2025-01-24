/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '5px': '5px',
      },
      colors: {
        'custom-yellow': '#ffd481', // Tambahkan warna kustom di sini
      },
      fontFamily: {
        sans : ["Poppins", "sans-serif"],
        cursive : ["Allura", "cursive"]
      },
      container : {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        }
      }
    },
  },
  plugins: [],
};
