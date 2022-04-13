import React from 'react';
import {
  Box,
  Flex,
  useColorModeValue,
  Link,
  Text,
  BoxProps,
} from '@chakra-ui/react';
import { LibraryLogo } from '../LibraryLogo';
import { SidebarItem } from './SidebarItem';
import { IconType } from 'react-icons';
import { FiCompass, FiSettings, FiStar, FiTrendingUp } from 'react-icons/fi';

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Explore', icon: FiCompass, href: '/' },
  {
    name: 'Books you borrowed',
    icon: FiTrendingUp,
    href: '/students/borrowed',
  },
  { name: 'Books you reserved', icon: FiStar, href: '/students/reservations' },
];

export const SidebarContent = ({ ...rest }: BoxProps) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={'full'}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link
          href="/"
          style={{ textDecoration: 'none' }}
          _focus={{ boxShadow: 'none' }}
        >
          <Flex as={'h2'} fontWeight={'bold'} gap={'2'} alignItems={'center'}>
            <LibraryLogo height={'24'} />
            <Text fontSize={'2xl'}>Treedom Library</Text>
          </Flex>
        </Link>
      </Flex>
      {LinkItems.map((link) => (
        <SidebarItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </SidebarItem>
      ))}
    </Box>
  );
};
