/** @type {import('tailwindcss').Config} */

const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'bg-color': '#191919',
      'card-bg': '#a1a1a196',
      'text-primary': '#d9d9d9'
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
}

