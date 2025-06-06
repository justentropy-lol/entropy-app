/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        flamingo: "#fc8eac",
        bground: "#e596ac",
        brand: "#f391ac",
      },
      fontFamily: {
        sans: ['"Sand"', "sans-serif"], // Set Roboto as the default sans font
        display: ['"Circe"', "sans-serif"], // Set Bobby Jones as the default sans font
      },
      screens: {
        sm: "500px",
        md: "640px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1280px",
      },
      fontSize: {
        xs: "0.625rem",
        sm: "0.75rem",
      },
    },
  },
  plugins: [],
};
