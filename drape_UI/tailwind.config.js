/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Ubuntu"], // Set Barlow as the default sans-serif font
      },
      colors: {
        dark: "#343a40",
        primary: "#24C1E0",
        primary_light: "#E6F9EF",
        secondary: "#24C1E0"
      },
    },
  },
  plugins: [],
};
