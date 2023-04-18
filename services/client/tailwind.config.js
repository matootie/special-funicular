/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [".src/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gg: ["gg sans"],
      },
      colors: {
        fblue: "#5865F2",
        fwhite: "#FFFFFF",
        fblack: "#191919",
        fdarkgray: "#2B2D31",
        fgray: "#313338",
        flightgray: "#AFAFAF",
      },
    },
  },
}
