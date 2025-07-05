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
      'bg-color': '#191919',
      'text-primary': '#F9F3EF',
      'text-secondary': '#FBD1A2',
      'text-accent': '#82BCA1',
      'secondary-hover': '#fbd1a2c2',
      'label-color': '#d9d9d97a',
      'border-color': '#d9d9d929'
    },
    extend: {
      colors: {
        default: '#2C497F',
        primary: '#8AB2A6',  // Custom primary button color
        danger: '#E08594',  // Custom danger button color
        secondary: '#FBD1A2', // custom secondary button

      },
      fontFamily: {
        'venti': ['Venti CF', 'sans-serif'],
        'sans': ['Venti CF', 'ui-sans-serif', 'system-ui'],
      },
      fontWeight: {
        'thin': '100', 
        'light': '300',  
        'medium': '500', 
        'bold': '700', 
        'black': '900',  
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

