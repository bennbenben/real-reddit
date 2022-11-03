/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        reddit_orange: "#f54404",
        reddit_red: "#f54404",
        reddit_dark: {
          DEFAULT: "#030303",
          brighter: "#1a1a1a",
          brightest: "#272728",
        },
        reddit_border: {
          DEFAULT: "#343536",
        },
        reddit_text: {
          DEFAULT: "rgb(215,218,220)",
          darker: "#818384",
        },
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }
);
    }),
  ],
};
