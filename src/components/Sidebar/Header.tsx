import React, { ReactNode } from 'react';

import { Flex, FlexProps, HStack } from '@chakra-ui/react';
import { useColorModeVariant } from '../../hooks/use-color-mode-variant.hook';

interface HeaderProps extends FlexProps {
  children: ReactNode;
}
export const Header = ({ children, ...rest }: HeaderProps) => {
  const lightOrDark = useColorModeVariant();

  return (
    <Flex
      px={4}
      w={'100%'}
      height={20}
      align={'center'}
      bg={lightOrDark('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={lightOrDark('gray.200', 'gray.700')}
      justifyContent={'space-between'}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export function HeaderLeftSideNode({ children }: { children: ReactNode }) {
  return (
    <Flex justifyContent={'center'} alignItems={'center'} gap={'2'}>
      {children}
    </Flex>
  );
}

export function HeaderRightSideNode({ children }: { children: ReactNode }) {
  return <HStack>{children}</HStack>;
}
