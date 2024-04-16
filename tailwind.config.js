/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      general: ['Ubuntu', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'figma-gradient':
          'linear-gradient(135deg, #FF3D00 0%, #FF7361 25%, #B659FF 50%, #00BCFF 75%, #00CF7F 100%)',
        'html-gradient':
          'linear-gradient(135deg, #E34F26 50.07%, #EF642A 50.07%)',
        'react-gradient':
          'linear-gradient(135deg, #222 25.31%, #61DAFB 79.59%);',
      },
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
