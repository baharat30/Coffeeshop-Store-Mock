/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // همه فایل‌های پروژه
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'custom-green': '#598f5b',
      },
      fontFamily: {
        caveat: ['Caveat', 'cursive'],
        dancingScript: ['Dancing Script', 'cursive'],
        satisfy: ['Satisfy', 'cursive'],
        greatVibes: ['Great Vibes', 'cursive'],
        kaushanScript: ['Kaushan Script', 'cursive'],
        allura: ['Allura', 'cursive'],
        playfairDisplay: ['Playfair Display', 'serif'],
        pacifico: ['Pacifico', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
