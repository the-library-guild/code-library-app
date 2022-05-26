import React, { useEffect } from 'react';

import { Flex, useColorModeValue, useToast } from '@chakra-ui/react';

import { SignInCard } from '@/components/SignInCard/SignInCard';

const messageByError = {
  Signin: 'Try signing in with a different account.',
  Callback: 'Something is off with our servers. Please try again later.',
  Default: 'Unable to log you in.',
};

const messageFor = (e: LoginError) =>
  e && (messageByError[e] ?? messageByError.Default);

export type LoginError = 'Signin' | 'Callback';

export function LoginScreen({ error }) {
  const showToast = useToast();

  useEffect(() => {
    if (error === undefined) return;

    const errors = (Array.isArray(error) ? error : [error]) as LoginError[];

    errors.map((error: LoginError) => {
      showToast({
        title: 'Unsuccessful login',
        description: messageFor(error),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        variant: 'top-accent',
      });
    });

    return () => showToast.closeAll();
  }, [error, showToast]);

  return (
    <Flex
      height={'100vh'}
      width={'100%'}
      maxW={'100%'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <SignInCard />
    </Flex>
  );
}
