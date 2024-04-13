/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      general: ['Ubuntu', 'sans-serif'],
    },
    extend: {
      colors: {
        synth: {
          green1: '#1EFCA3',
          green2: '#1BE393',
          green3: '#17BD7A',
          green4: '#0F7D51',
          green5: '#073D28',
          neutral1: '#FAFAFA',
          neutral2: '#EBEBEB',
          neutral3: '#858585',
          neutral4: '#494949',
          neutral5: '#171717',
        },
      },
    },
  },
  plugins: ['prettier-plugin-tailwindcss'],
};
