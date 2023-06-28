function composeColor(cssVariableName) {
  return `rgb(var(${cssVariableName}) / <alpha-value>)`;
}

const rem = 16; // 16px

/** 设计师定制 */
const customFontSize = {
  xs: [12, 18],
  sm: [14, 22],
  base: [16, 24],
  lg: [18, 28],
  xl: [20, 32],
  '2xl': [24, 36],
  '3xl': [28, 40],
  '4xl': [32, 44],
  '5xl': [36, 48],
  '6xl': [40, 56],
};

function loadFontSize(fontSizeConfig) {
  for (const key in fontSizeConfig) {
    fontSizeConfig[key] = fontSizeConfig[key].map((item) => {
      const num = item / rem;
      return `${num}rem`;
    });
  }
  return fontSizeConfig;
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: loadFontSize(customFontSize),
    extend: {
      backgroundImage: {},
    },
    // underline
    underlineOffset: {
      sm: '2px',
      md: '4px',
      lg: '6px',
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '0.6rem',
      },
    },
    screens: {
      '2xl': { max: '1536px' },
      // => @media (max-width: 1536px) { ... }
      xl: { max: '1280px' },
      // => @media (max-width: 1280px) { ... }
      lg: { max: '1024px' },
      // => @media (max-width: 1024px) { ... }
      md: { max: '768px' },
      // => @media (max-width: 768px) { ... }
      sm: { max: '640px' },
      // => @media (max-width: 640px) { ... }
      xs: { max: '480px' },
      // => @media (max-width: 480px) { ... }
    },
    extend: {
      boxShadow: {
        card: '0px 2px 10px rgba(0, 80, 125, 0.08)',
        card2: '0px 4px 9px rgba(11, 45, 96, 0.07)',
        card3: '0px 12px 24px rgba(0, 80, 125, 0.08)',
        card4: '0px 5px 16px rgba(0, 80, 125, 0.08)',
        cardLineBottom: 'inset 0px -1px 0px #E8EAF2',
        borderShadow: 'inset 0px 1px 0px #DBECEA;',
      },
      colors: {
        primary: {
          DEFAULT: composeColor('--ux-primary'),
          hover: composeColor('--ux-primary-hover'),
        },
        secondary: {
          DEFAULT: composeColor('--ux-secondary'),
          hover: composeColor('--ux-secondary-hover'),
        },
        display: {
          DEFAULT: composeColor('--ux-display'),
          secondary: composeColor('--ux-display-secondary'),
          tertiary: composeColor('--ux-display-tertiary'),
          inverse: composeColor('--ux-display-inverse'),
          border: composeColor('--ux-color-border'),
          'border-2': composeColor('--ux-color-border-2'),
        },
      },
      borderColor: composeColor('--ux-color-border'),
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};
