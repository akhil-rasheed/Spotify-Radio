const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Roboto", "system-ui"],
    },
    extend: {
      colors: {
        gray: colors.blue,
      },
    },
  },
  plugins: [],
};
