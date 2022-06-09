import React, { ReactNode } from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

interface ContentProps extends FlexProps {
  children: ReactNode;
}

export function Content({ children, ...props }: ContentProps) {
  return (
    <Flex maxW={1200} w={'100%'} {...props}>
      {children}
    </Flex>
  );
}
