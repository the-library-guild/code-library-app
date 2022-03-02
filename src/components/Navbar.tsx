import { ReactNode } from 'react';
import {
  Box,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  ButtonProps,
  Text,
} from '@chakra-ui/react';

import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { FaSignOutAlt } from 'react-icons/fa';

import { signOut, useSession } from "next-auth/react";
import { Content } from '../layout/Content';
import { User } from 'next-auth';

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
  const { data: session } = useSession();

  const user: UserInfo = session!.user!;

  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4} w="100%">
        <Content h='16' alignItems='center' justifyContent={"space-between"} p={"8"}>
          <Box>
            <Heading size="lg">
              CODE Library
            </Heading>
          </Box>

          <Center>
            <Stack direction={'row'} spacing={7}>
              <ToggleColorModeButton />
              <SideMenu user={user} />

            </Stack>
          </Center>
        </Content>
      </Box>
    </>
  );
}

interface UserInfo {
  name?: string | undefined;
  image?: string | undefined;
  email: string;
}

interface SideMenuProps {
  user: UserInfo;
}

const SideMenu = ({ user }: SideMenuProps) => {
  console.log(user);

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={'full'}
        variant={'link'}
        cursor={'pointer'}
        minW={0}>
        <Avatar
          name={user.name}
          size={'sm'}
          src={user.image}
        />
      </MenuButton>
      <MenuList alignItems={'center'}>
        <br />
        <Center>
          <Avatar
            name={user.name}
            size={'2xl'}
            src={user.image}
          />
        </Center>
        <br />
        <Center>
          <Stack justify={'center'} align={'center'} p={'4'}>
            <Text fontWeight={'bold'} fontSize={['md', 'lg']}>{user.name}</Text>
            <Text fontSize={['sm', 'md']}>{user.email}</Text>
          </Stack>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem icon={<FaSignOutAlt />} onClick={() => signOut()}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
}
