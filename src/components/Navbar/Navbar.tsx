import React from "react";
import Link from "next/link";

import {
  Box,
  useColorModeValue,
  Stack,
  Center,
  Heading,
  Flex,
  Text,
} from "@chakra-ui/react";

import { LibraryLogo } from "../LibraryLogo";

import { ToggleColorModeButton } from "../../layout/ToggleColorMode";
import { UserDropdown } from "./UserDropdown";
import { useUserInfo } from "./Navbar.hook";

export function Navbar() {
  const { user } = useUserInfo();

  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} w="100%">
      <Flex
        h="24"
        maxW={"1480"}
        mx={"auto"}
        w={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        p={"8"}
      >
        <Box>
          <Link href="/">
            <Heading
              size="lg"
              display="flex"
              flexDirection="row"
              cursor="pointer"
            >
              <LibraryLogo height="2rem" />
              <Text marginLeft="3rem">CODE Library</Text>
            </Heading>
          </Link>
        </Box>

        <Center>
          <Stack direction={"row"} spacing={4}>
            <ToggleColorModeButton />
            <UserDropdown user={user} />
          </Stack>
        </Center>
      </Flex>
    </Box>
  );
}
