import { ButtonHTMLAttributes } from "react";

import { signIn } from "next-auth/react";

import { FaGoogle } from 'react-icons/fa';

import { Button, Icon } from "@chakra-ui/react";

type SignInButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function SignInButton({ ...rest }: SignInButtonProps) {

  return (
    <Button
      onClick={() => signIn('google')}
      bg={"primary.100"}
      color={"gray.700"}
      _hover={{
        bg: "primary.200"
      }}
      {...rest}
    >
      <Icon as={FaGoogle} marginRight={2} />
      Sign in with your @code email
  </Button>
  );
}
