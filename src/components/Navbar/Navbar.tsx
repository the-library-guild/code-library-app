import React from 'react';

import {
  Box,
  useColorModeValue,
  Stack,
  Center,
  Heading,
  Flex,
} from '@chakra-ui/react';

import { ToggleColorModeButton } from '../../layout/ToggleColorMode';
import { UserDropdown } from './UserDropdown';
import { useUserInfo } from './Navbar.hook';

export function Navbar() {
  const { user } = useUserInfo();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} w="100%">
      <Flex h='16' maxW={'1480'} mx={'auto'} w={'100%'} alignItems={'center'} justifyContent={'space-between'} p={'8'}>
        <Box>
          <Heading size="lg">
            CODE Library
          </Heading>
        </Box>

        <Center>
          <Stack direction={'row'} spacing={4}>
            <ToggleColorModeButton />
            <UserDropdown user={user} />
          </Stack>
        </Center>
      </Flex>
    </Box>
  );
}
