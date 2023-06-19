/** @type {import('tailwindcss').Config} */
module.exports = {
  prefix: '',
  content: [
    './projects/ng-components/src/**/*.{html,ts,css,scss}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio')
  ],
  corePlugins: {
    preflight: true,
  }
};