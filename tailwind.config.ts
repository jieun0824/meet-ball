import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/***/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        bgColor: '#1E1E1E',
        pointColor: '#20ECC7',
        cardColor: '#3C3F45',
        selectColor: '#3C3F45',
        textColor: '#20ECC7',
      },
      gridTemplateColumns: {
        // Simple column grid
        table1: '44px repeat(1, minmax(0, 1fr))',
        table2: '44px repeat(2, minmax(0, 1fr))',
        table3: '44px repeat(3, minmax(0, 1fr))',
        table4: '44px repeat(4, minmax(0, 1fr))',
        table5: '44px repeat(5, minmax(0, 1fr))',
        table6: '44px repeat(6, minmax(0, 1fr))',
        table7: '44px repeat(7, minmax(0, 1fr))',
      },
      screens: {
        mobile: { max: '768px' }, //for low resolution tablets, mobiles
        laptop: { min: '769px', max: '1024px' }, //for low resolution laptops
        desktop: { min: '1025px' },
      },
    },
    fontFamily: {
      montserrat: ['var(--font-montserrat)'],
      roboto: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
};
export default config;
