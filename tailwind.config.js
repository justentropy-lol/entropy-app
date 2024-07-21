/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'flamingo': '#fc8eac',
      },
      fontFamily: {
        sans: ['"Roboto"', 'sans-serif'], // Set Roboto as the default sans font
        display: ['"Bobby Jones Soft"', 'Arial', 'sans-serif'], // Set Bobby Jones as the default sans font
      },
    },
  },
  plugins: [],
}

