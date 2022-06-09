import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  initialColorMode: 'system',
  colors: {
    primary: {
      50: '#35daad',
      100: '#35daad',
      200: '#97dcc9',
    },
    secondary: {
      100: '#4059AD',
      200: '#6577b2',
    },
  },
  components: {
    Button: {
      variants: {
        outline: {
          _hover: { bg: 'none', filter: 'brightness(80%)' },
        },
        ghost: {
          _hover: { bg: 'none', filter: 'brightness(80%)' },
        },
      },
    },
  },
});
