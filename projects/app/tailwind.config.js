module.exports = {
  // this will also scan library component templates
  content: ['./projects/**/src/**/*.{html,ts}'],
  // switch to the following line to see whether you have forgotten any inline styles in your library component templates
  // content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ],
};
