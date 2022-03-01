import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  ButtonProps,
} from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { signOut } from "next-auth/react";

export const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export const ToggleColorModeButton = ({...props}: ButtonProps) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} {...props}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}

export function Navbar() {
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} w="100%">
        <Flex h='16' alignItems='center' justifyContent={"space-between"} maxW={"1480"} p={"8"}>
          <Box>
            <Heading size="lg">
              CODE Library
            </Heading>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <ToggleColorModeButton />
              <SideMenu />

            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

const SideMenu = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}>
        <Avatar
          size={'sm'}
          src={'https://avatars.dicebear.com/api/male/username.svg'}
        />
      </MenuButton>
      <MenuList alignItems={'center'}>
        <br />
        <Center>
          <Avatar
            size={'2xl'}
            src={'https://avatars.dicebear.com/api/male/username.svg'}
          />
        </Center>
        <br />
        <Center>
          <p>Username</p>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem onClick={() => signOut()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
