/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern-desktop": "url('/public/img/pattern-bg-desktop.png')",
        "hero-pattern-mobile": "url('/public/img/pattern-bg-mobile.png')",
      },
    },
  },
  plugins: [],
};
