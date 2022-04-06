module.exports = {
  content: [
    "./index.html",
    './public/index.html',
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  plugins: [
    require('tailwindcss'),
  ],
}
