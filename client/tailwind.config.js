/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      bodyFont: ['Cabin', 'sans-serif'],
      headingFont: ['Roboto Condensed', 'sans-serif']

    },
    colors: {
      primary50: '#e0fcff',
      primary100: '#bef8fd',
      primary200: '#87eaf2',
      primary300: '#54d1db',
      primary400: '#38bec9',
      primary500: '#2cb1bc',
      primary600: '#14919b',
      primary700: '#0e7c86',
      primary800: '#0a6c74',
      primary900: '#044e54',

      grey50: '#f0f4f8',
      grey100: '#d9e2ec',
      grey200: '#bcccdc',
      grey300: '#9fb3c8',
      grey400: '#829ab1',
      grey500: '#627d98',
      grey600: '#486581',
      grey700: '#334e68',
      grey800: '#243b53',
      grey900: '#102a43',

      black: '#222',
      white: '#fff',
      lightRed: '#f8d7da',
      darkRed: '#842029',
      lightGreen: '#d1e7dd',
      darkGreen: '#0f5132',

      blue: 'rgb(100, 122, 203)',
      lightBlue: 'rgb(224, 232, 249)',
      yellow: 'rgb(233, 185, 73)',
      lightYellow: 'rgb(252, 239, 199)',
      orange: 'rgb(214, 106, 106)',
      lightOrange: 'rgb(255, 238, 238)',

    },
    extend: {},
  },
  plugins: [],
}
