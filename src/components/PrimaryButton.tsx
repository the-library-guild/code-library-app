import { PropsWithChildren } from 'react';

import { ButtonProps, Button } from '@chakra-ui/react';

type PrimaryButtonProps = PropsWithChildren<ButtonProps>;

export function PrimaryButton({ children, ...props }: PrimaryButtonProps) {
  return (
    <Button
      bg={'primary.100'}
      color={'gray.900'}
      _hover={{
        bg: 'primary.200',
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
