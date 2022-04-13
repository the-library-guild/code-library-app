import React from 'react';

import {
  Flex,
  FlexProps,
  HStack,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { useUserInfo } from '../../hooks/use-user-info.hook';
import { FiMenu } from 'react-icons/fi';
import { HomeLink } from './HomeLink';
import { ToggleColorModeButton } from '../../components/ToggleColorMode';
import { UserDropdown } from './UserDropdown';

interface HeaderProps extends FlexProps {
  onOpen: () => void;
}
export const Header = ({ onOpen, ...rest }: HeaderProps) => {
  const { user } = useUserInfo();

  return (
    <Flex
      px={4}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between' }}
      {...rest}
    >
      <Flex justifyContent={'center'} alignItems={'center'} gap={'4'}>
        <IconButton
          display={'flex'}
          onClick={onOpen}
          variant="ghost"
          fontSize={'2xl'}
          aria-label="open menu"
          icon={<FiMenu />}
        />

        <HomeLink />
      </Flex>

      <HStack spacing={{ base: '2', md: '6' }}>
        <ToggleColorModeButton />
        <UserDropdown user={user} />
      </HStack>
    </Flex>
  );
};
