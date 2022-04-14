import React, { ReactText } from 'react';
import NextLink from 'next/link';
import { IconType } from 'react-icons';
import {
  Flex,
  Icon,
  useColorModeValue,
  Link,
  FlexProps,
} from '@chakra-ui/react';

interface SidebarItemProps extends FlexProps {
  icon: IconType;
  href: string;
  onClose: () => void;
  children: ReactText;
}
export const SidebarItem = ({
  onClose,
  icon,
  href,
  children,
  ...rest
}: SidebarItemProps) => {
  return (
    <NextLink href={href} passHref>
      <Link
        onClick={onClose}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: useColorModeValue('gray.200', 'gray.600'),
            color: useColorModeValue('gray.800', 'gray.50'),
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: useColorModeValue('gray.800', 'gray.50'),
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </NextLink>
  );
};
