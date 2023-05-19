/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./views/**/*.{html,js,ejs}",
      "./views/*.{html,js,ejs}"],
  theme: {
    extend: {
        fontFamily: {
            primary: ['Nunito']
        }, colors: {
            primary: '#bfdbfe'
        }
    },
  },
  plugins: [],
}

