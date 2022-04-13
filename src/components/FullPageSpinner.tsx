import React from 'react';

import { Flex, Spinner, useColorModeValue } from '@chakra-ui/react';

export function FullPageSpinner() {
  return (
    <Flex
      position={'absolute'}
      top={0}
      bottom={0}
      left={0}
      right={0}
      margin={'auto'}
      height={100}
      width={100}
      alignContent={'center'}
      justifyItems={'center'}
      textAlign={'center'}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        color={useColorModeValue('gray.600', 'gray.300')}
        size="xl"
      />
    </Flex>
  );
}
