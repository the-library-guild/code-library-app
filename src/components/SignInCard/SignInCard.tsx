import React from 'react';

import { Flex, Stack, Heading } from '@chakra-ui/react';

import { LibraryLogo } from '@/components/LibraryLogo';
import { SignInButton } from '.';

import { ToggleColorModeButton } from '@/components/ToggleColorMode';

export function SignInCard() {
  return (
    <Stack spacing={12} mx={'auto'} w={'lg'} maxW={'100%'} px={[4, 8]}>
      <Stack align={'center'}>
        <LibraryLogo />
        <Heading fontSize={'4xl'}>Treedom Library</Heading>
      </Stack>
      <SignInButton />
      <Flex align="end" justify={'center'}>
        <ToggleColorModeButton w={'2'} bg={'none'} />
      </Flex>
    </Stack>
  );
}
