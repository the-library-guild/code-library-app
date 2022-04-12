import React from 'react';

import { Button, useColorMode, ButtonProps } from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const ToggleColorModeButton = ({ ...props }: ButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button bg="'gray.800'" onClick={toggleColorMode} {...props}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
