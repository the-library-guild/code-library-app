import React from 'react';

import { useColorModeValue } from '@chakra-ui/react';

export function useColorModeVariant() {
  const isDarkMode = useColorModeValue(false, true);

  const lightOrDark = React.useCallback(
    (light: string, dark: string) => (isDarkMode ? dark : light),
    [isDarkMode]
  );

  return lightOrDark;
}
