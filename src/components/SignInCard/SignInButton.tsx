import React from 'react';

import { signIn } from 'next-auth/react';

import { FaGoogle } from 'react-icons/fa';

import { Button, ButtonProps, Icon } from '@chakra-ui/react';

export function SignInButton({ ...rest }: ButtonProps) {
  return (
    <Button
      onClick={() => signIn('google')}
      bg={'primary.100'}
      color={'gray.900'}
      width={'100%'}
      p={6}
      _hover={{
        bg: 'primary.200',
      }}
      {...rest}
    >
      <Icon as={FaGoogle} marginRight={2} />
      Sign in with @code.berlin
    </Button>
  );
}
