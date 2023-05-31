/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        tablet: { max: "992px" },
      },
      fontFamily: {
        custom: ["Jost", "sans-serif"],
      },
    },
  },
  plugins: [],
};
