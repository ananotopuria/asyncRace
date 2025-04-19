/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        lighterGrey: "#8D99AE",
        black: "#2B2D42",
        purple: "#7209B7",
        red: "#E63946",
        coral: "#FF6B6B",
        orange: "#FF8C42",
        green: "#A8FF60",
        gold: "#FFD700",
        yellow: "#FFED66",
        blue: "#3A86FF",
        teal: "#00A8B5",
      },
      fontFamily: {
        bruno: ['"Bruno Ace"', "cursive"],
        racing: ['"Racing Sans One"', "cursive"],
      },
    },
  },
  plugins: [],
};
