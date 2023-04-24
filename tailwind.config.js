/** @type {import('tailwindcss').Config} */
module.exports = {
  webpack: {
    configure: {
      experiments: {
        topLevelAwait: true,
      },
    },
  },
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}