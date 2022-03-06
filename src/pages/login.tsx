import React, { useEffect, useState } from 'react';

import { useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { SignInCard } from "../components/SignInCard";

import { ExternalPage } from "../layout/ExternalPage";

export default function LogInPage() {
  useErrorToasts();

  return (
    <ExternalPage>
      <SignInCard />
    </ExternalPage>
  );
}

const errorMessages = {
  Signin: "Try signing in with a different account.",
  OAuthSignin: "Try signing in with a different account.",
  OAuthCallback: "Try signing with a different account.",
  OAuthCreateAccount: "Try signing with a different account.",
  EmailCreateAccount: "Try signing with a different account.",
  Callback: "Try signing in with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "Check your email address.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  default: "Unable to sign in.",
};

const messageFor = (e: LoginError) => e && (errorMessages[e] ?? errorMessages.default);

type LoginError = "Signin" | "Callback";

function useErrorToasts() {
  const { query: { error } } = useRouter();

  const toast = useToast();
  const router = useRouter();

  const errors = error as LoginError;

  useEffect(() => {
    router.replace('/login', undefined, { shallow: true });

    if (errors === undefined) return;

    if (Array.isArray(errors)) {
      errors.map((error: LoginError) => {
        toast({
          title: 'Login Error',
          description: messageFor(error),
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
          variant: 'subtle'
        });
      });
      return;
    }

    toast({
      title: 'Login Error',
      description: messageFor(errors),
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top-right',
      variant: 'top-accent',
    });
  }, [error]);
}
