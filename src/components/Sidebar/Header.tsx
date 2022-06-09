import React, { PropsWithChildren, ReactNode } from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';
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
      height={14}
      justify={'center'}
      bg={lightOrDark('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={lightOrDark('gray.200', 'gray.700')}
      {...rest}
    >
      <Flex maxW={1400} w={'100%'} justifyContent={'space-between'}>
        {children}
      </Flex>
    </Flex>
  );
};

type HeaderNodeProps = PropsWithChildren & FlexProps;

export function HeaderLeftSideNode({ children, ...rest }: HeaderNodeProps) {
  return (
    <Flex alignItems={'center'} gap={'2'} {...rest}>
      {children}
    </Flex>
  );
}

export function HeaderRightSideNode({ children, ...rest }: HeaderNodeProps) {
  return (
    <Flex alignItems={'center'} gap={'2'} {...rest}>
      {children}
    </Flex>
  );
}
