/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        blue: {
          50: '#c05d00',
          100: '#c05d00',
          200: '#c05d00',
          300: '#c05d00',
          400: '#c05d00',
          500: '#c05d00',
          600: '#c05d00',
          700: '#c05d00',
          800: '#c05d00',
          900: '#c05d00',
        },
      }
    },
  },
  plugins: [],
};