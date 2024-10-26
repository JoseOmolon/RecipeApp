/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#de2c4d",   // Corrected: `colors` should be an object
        secondary: "#fb923c", // Added secondary correctly within the `colors` object
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        averia: ["Averia Serif Libre", "serif"],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],

      },
      container:{
        center: true,
        padding: {
          default: "1rem",
          sm: "1rem",
          lg: "1rem",
          xl: "1rem",
          "2xl": "6rem",
        },
      },
    },
  },
  plugins: [],
}
