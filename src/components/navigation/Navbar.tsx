import {
  Box,
  useColorModeValue,
  Stack,
  Center,
  Heading,
} from '@chakra-ui/react';

import { useSession } from "next-auth/react";

import { Content } from '../../layout/Content';
import { ToggleColorModeButton } from '../../layout/ToggleColorMode';

import { UserDropdown } from './UserDropdown';

export function Navbar() {
  const { data: session } = useSession();

  const user = session!.user!;

  return (
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
            <UserDropdown user={user} />
          </Stack>
        </Center>
      </Content>
    </Box>
  );
}
