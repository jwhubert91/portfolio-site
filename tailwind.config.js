/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        snowWhite: "#FFFBFF",
        primary: "#4F46E5",
        goldenYellow: "#FFDE00",
        error: "#FF521B",
        xiketicBlack: "#020122",
        mutedGray: "#E5E4E3",
        culturedBlue: "#EDF2F4",
      },
    },
  },
  plugins: [],
}
