import { extendTheme } from '@chakra-ui/react';

const heyTheme = extendTheme({
  colors: {
    hey: {
      main: '#F96400',
      sub: '#F7B500',
      normalGray: '#999999',
      darkGray: '#777777',
      lightGray: '#D9D9D9',
      red: '#E53E3E',
      lightOrange: '#FEEBCB',
      kakaoOrange: '#FBE34D',
    },

    heys: {
      50: '#FFFAF0',
      100: '#FEEBC8',
      200: '#FBD38D',
      300: '#F6AD55',
      400: '#ED8936',
      500: '#DD6B20',
      600: '#F96400',
      700: '#9C4221',
      800: '#7B341E',
      900: '#652B19',
    },

    blue: {
      500: '#F96400',
    },

    PHOTO: {
      100: '#FFEDED',
      200: '#FFEDED',
      800: '#FF0000',
    },

    LETTERING: {
      100: '#E7F9ED',
      200: '#E7F9ED',
      800: '#006B0B',
    },

    CHARACTER_IMAGE: {
      100: '#FFECF7',
      200: '#FFECF7',
      800: '#E2007E',
    },

    CHARACTER_MODEL: {
      100: '#FFF1D7',
      200: '#FFF1D7',
      800: '#D07B0D',
    },

    ETC: {
      100: '#EEF0F6',
      200: '#EEF0F6',
      800: '#5F656D',
    },
  },
});

export default heyTheme;
