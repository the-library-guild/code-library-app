import React, { useEffect } from 'react';

import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { SignInCard } from '../components/SignInCard';

import { ExternalPage } from '../components/ExternalPage';

export default function LogInPage() {
  useShowToastsOnError();

  return (
    <ExternalPage>
      <SignInCard />
    </ExternalPage>
  );
}

const errorMessages = {
  Signin: 'Try signing in with a different account.',
  Callback:
    "We're facing issues while trying to connect to one of our servers.",
  Default: 'Unable to sign in.',
};

const messageFor = (e: LoginError) =>
  e && (errorMessages[e] ?? errorMessages.Default);

type LoginError = 'Signin' | 'Callback';

function useShowToastsOnError() {
  const toast = useToast();
  const {
    replace,
    query: { error },
  } = useRouter();

  useEffect(() => {
    if (error === undefined) return;

    replace('/login', undefined, { shallow: true });

    const errors = (Array.isArray(error) ? error : [error]) as LoginError[];

    errors.map((error: LoginError) => {
      toast({
        title: 'Error',
        description: messageFor(error),
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
        variant: 'top-accent',
      });
    });
  }, [error, replace, toast]);
}
