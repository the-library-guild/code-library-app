import { PropsWithChildren } from 'react';

import { Divider, Text } from '@chakra-ui/react';

export function DividerWithText({ children }: PropsWithChildren) {
  return (
    <>
      <Divider />
      <Text fontSize={'smaller'}>{children}</Text>
      <Divider />
    </>
  );
}
