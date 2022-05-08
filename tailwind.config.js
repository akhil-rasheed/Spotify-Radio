const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Montserrat", "system-ui"],
    },
    extend: {
      colors: {
        gray: colors.slate,
      },
    },
  },
  plugins: [],
};
