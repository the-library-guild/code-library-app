import React from 'react';

import { Flex, Box, Stack, Heading, useColorModeValue } from '@chakra-ui/react';

import { SignInButton } from './SignInButton';
import { LibraryLogo } from './LibraryLogo';

import { ToggleColorModeButton } from '../components/ToggleColorMode';

export function SignInCard() {
  return (
    <Stack spacing={8} mx={'auto'} maxW={'lg'} px={4}>
      <Stack align={'center'} p={'8'}>
        <LibraryLogo />
        <Heading fontSize={'4xl'}>Treedom Library</Heading>
      </Stack>
      <Box
        rounded={'lg'}
        bg={useColorModeValue('white', 'gray.700')}
        boxShadow={'lg'}
        p={8}
      >
        <SignInButton />
      </Box>
      <Flex align="end" justify={'center'}>
        <ToggleColorModeButton w={'2'} bg={'none'} />
      </Flex>
    </Stack>
  );
}
