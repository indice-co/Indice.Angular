module.exports = {
  purge: [],
  content: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        'notification': 'spin 1s linear 3',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
