import { mixed } from 'styled-system';

const black = '#0C0F0A';
const wood = '#715E5B';
const amaranth = '#E83151';
const pink = 'pink';
const white = '#fff';

const lineHeights = {
  normal: 1,
  wide: 1.2,
  wider: 1.7,
};
const fonts = {
  playfair: 'Playfair Display,  serif',
  opensans: 'Open Sans, sans-serif',
};
const fontSizes = [12, 14, 16, 20, 24, 32, 48, 64, 82];
const fontWeights = {
  normal: 400,
  semi: 500,
  bold: 700,
};
// Variants common
const common = {
  texts: {
    lineHeight: lineHeights.wider,
  },
  buttons: {
    padding: '16px 32px',
    borderRadius: '1px',
    fontFamily: fonts.opensans,
  },
  links: {
    fontSize: fontSizes[2],
    fontWeight: fontWeights.semi,
    lineHeight: lineHeights.normal,
  },
};
export default {
  breakpoints: ['40em', '52em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256],
  shadows: {
    small: '0 0 4px rgba(0, 0, 0, .125)',
    large: '0 0 24px rgba(0, 0, 0, .125)',
    hard: '0 0 16px rgba(0, 0, 0, .25)',
    extreme: '0 0 16px rgba(0, 0, 0, .35)',
  },
  borders: {
    green: `2px solid ${black}`,
  },
  fontSizes,
  fontWeights,
  lineHeights,
  fonts,
  colors: {
    black,
    wood,
    pink,
    amaranth,
    white,
  },
  // Variants
  headings: {
    h1: mixed({
      lineHeight: lineHeights.wide,
      fontSize: [6, 8],
      fontWeight: fontWeights.bold,
    }),
    h2: {
      lineHeight: lineHeights.normal,
      fontSize: fontSizes[5],
    },
    h3: {
      lineHeight: lineHeights.wide,
      fontFamily: fonts.opensans,
      fontSize: fontSizes[3],
    },
  },
  texts: {
    normal: {
      ...common.texts,
    },
    lead: {
      ...common.texts,
      fontSize: fontSizes[3],
      fontWeight: fontWeights.semi,
    },
    wide: {
      ...common.texts,
      fontSize: fontSizes[4],
    },
  },
  buttons: {
    borderLeft: {
      ...common.buttons,
      color: black,
      backgroundColor: white,
      borderLeft: `5px solid ${black}`,
    },
  },
  links: {
    pink: {
      ...common.links,
      color: pink,
      lineHeight: lineHeights.wider,
      '&:hover': {
        color: amaranth,
      },
    },
  },
};
