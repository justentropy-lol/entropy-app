/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        flamingo: "#fc8eac",
      },
      fontFamily: {
        sans: ['"Roboto"', "sans-serif"], // Set Roboto as the default sans font
        display: ['"Bobby Jones Soft"', "Arial", "sans-serif"], // Set Bobby Jones as the default sans font
      },
      screens: {
        sm: "640px", // Default small
        md: "768px", // Default medium
        lg: "1024px", // Default large
        xl: "1280px", // Default extra-large
        "2xl": "1536px", // Default double extra-large
      },
    },
  },
  plugins: [],
};
