module.exports = {
  content: ["./*.html", "./assets/js/*.js"],
  theme: {
    extend: {
      colors: {
        primary: '#0D9488', primarydark: '#0F766E', secondary: '#2DD4BF',
        accent: '#EA580C', ink: '#134E4A', muted: '#5B7A77', surface: '#FFFFFF',
      },
      fontFamily: {
        display: ['Figtree', 'Noto Sans TC', 'sans-serif'],
        sans: ['Noto Sans', 'Noto Sans TC', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
