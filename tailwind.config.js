/** @type {import('tailwindcss').Config} */

const { createTheme, nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'bg-color': '#151515',
      'text-primary': '#d9d9d9',
      'text-secondary': '#FBD1A2',
      'secondary-hover': '#fbd1a2c2',
      'label-color': '#d9d9d97a',
      'border-color': '#d9d9d929'
    },
    extend: {
      colors: {
        default: '#2C497F',
        primary: '#82BCA1',  // Custom primary button color
        danger: '#E08594',  // Custom danger button color
        secondary: '#FBD1A2',
        // info: 'FBD1A2'
      },
      fontFamily: {
        'anek-kannada': ['Anek Kannada', 'sans-serif'],
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

