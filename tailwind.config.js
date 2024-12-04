/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{tsx,ts}",
    "./src/emails/**/*.{tsx,ts}"
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          primary: '#3B82F6',
          secondary: '#10B981'
        }
      }
    }
  },
  plugins: []
}
