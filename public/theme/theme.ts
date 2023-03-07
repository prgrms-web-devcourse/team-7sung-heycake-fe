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
  },
});

export default heyTheme;
