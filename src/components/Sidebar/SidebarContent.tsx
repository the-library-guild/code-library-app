import React from 'react';
import {
  Box,
  CloseButton,
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
}

const LinkItems: Array<LinkItemProps> = [
  { name: 'Explore', icon: FiCompass },
  { name: 'Borrowed books', icon: FiTrendingUp },
  { name: 'Favorites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

interface SidebarContentProps extends BoxProps {
  onClose: () => void;
}

export const SidebarContent = ({ onClose, ...rest }: SidebarContentProps) => {
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
            <Text fontSize={'2xl'}>CODE Library</Text>
          </Flex>
        </Link>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <SidebarItem key={link.name} icon={link.icon}>
          {link.name}
        </SidebarItem>
      ))}
    </Box>
  );
};
