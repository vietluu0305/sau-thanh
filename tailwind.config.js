/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F4F1EA',
        sand: '#D9C9AE',
        oak: '#A17B55',
        walnut: '#644632',
        charcoal: '#282722',
      },
      fontFamily: {
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Noto Serif"', 'Georgia', 'serif'],
      },
      maxWidth: {
        container: '1440px',
      },
      transitionTimingFunction: {
        natural: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        250: '250ms',
        350: '350ms',
        500: '500ms',
        700: '700ms',
      },
    },
  },
  plugins: [],
};
