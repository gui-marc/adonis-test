/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.tsx',
    './src/**/*.ts',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-radix-colors')],
}

