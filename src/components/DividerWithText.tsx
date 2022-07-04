import { PropsWithChildren } from 'react';

import { Divider, Flex, Text } from '@chakra-ui/react';

export function DividerWithText({ children }: PropsWithChildren) {
  return (
    <>
      <Flex justify={'space-even'} gap={2} align={'center'}>
        <Divider />
        <Text fontSize={'smaller'}>{children}</Text>
        <Divider />
      </Flex>
    </>
  );
}
