module.exports = {
  content: ["./*.html", "./assets/js/*.js"],
  theme: {
    extend: {
      colors: {
        ink: '#1C1814', inksoft: '#574E42', paper: '#F4EEE1', paper2: '#EAE0CB',
        card: '#FBF7EE', line: '#D8C9AE', orange: '#C2410C', orangebright: '#EA580C',
        seal: '#A8362B',
      },
      fontFamily: {
        display: ['Noto Serif TC', 'Noto Serif', 'serif'],
        sans: ['Noto Sans TC', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
