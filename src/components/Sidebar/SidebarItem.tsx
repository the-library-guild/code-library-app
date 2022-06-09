import React from 'react';
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
  children: string;
}
export const SidebarItem = ({
  onClose,
  icon,
  href,
  children,
  ...rest
}: SidebarItemProps) => {
  const isLightMode = useColorModeValue(true, false);

  const colorModeValue = (light: string, dark: string): string => {
    return isLightMode ? light : dark;
  };

  return (
    <NextLink href={href} passHref>
      <Link
        onClick={onClose}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          py={4}
          px={8}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'none',
            filter: 'brightness(80%)',
            color: colorModeValue('gray.500', 'gray.50'),
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: colorModeValue('gray.500', 'gray.50'),
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
