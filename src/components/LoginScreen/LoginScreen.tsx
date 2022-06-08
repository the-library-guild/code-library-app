import React, { useEffect } from 'react';

import { Flex, useColorModeValue } from '@chakra-ui/react';

import { SignInCard } from '@/components/SignInCard/SignInCard';
import { useToasts } from '@/hooks/use-toasts';

const messageByError = {
  Signin: 'Try signing in with a different account.',
  Callback: 'Something is off with our servers. Please try again later.',
  Default: 'Unable to log you in.',
};

const messageFor = (e: LoginError) =>
  e && (messageByError[e] ?? messageByError.Default);

export type LoginError = 'Signin' | 'Callback';

export function LoginScreen({ error }) {
  const { showError, toastControls } = useToasts();

  useEffect(() => {
    if (error === undefined) return;

    const errors = (Array.isArray(error) ? error : [error]) as LoginError[];

    errors.map((error: LoginError) => {
      showError({
        title: 'Unsuccessful login',
        description: messageFor(error),
      });
    });

    return () => toastControls.closeAll();
  }, [error, showError, toastControls]);

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
