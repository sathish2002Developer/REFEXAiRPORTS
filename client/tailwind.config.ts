import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f4f9',
          100: '#d1e9f3',
          200: '#a3d3e7',
          300: '#75bddb',
          400: '#47a7cf',
          500: '#2879b1',
          600: '#20618e',
          700: '#18496a',
          800: '#103047',
          900: '#081823',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
