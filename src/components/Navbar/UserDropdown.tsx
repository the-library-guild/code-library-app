import React from "react";

import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  Text,
} from "@chakra-ui/react";

import { signOut } from "next-auth/react";

import { FaSignOutAlt } from "react-icons/fa";

interface UserInfo {
  name?: string | undefined;
  image?: string | undefined;
  email: string;
}

interface UserDropdownProps {
  user: UserInfo;
  [key: string]: any;
}

export function UserDropdown({ user, ...props }: UserDropdownProps) {
  return (
    <Menu {...props}>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
      >
        <Avatar name={user.name} src={user.image} size={"sm"} />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <Center my={"2"}>
          <Avatar name={user.name} src={user.image} size={"xl"} />
        </Center>
        <Center>
          <Stack
            align={"center"}
            px={{ base: "6", md: "8" }}
            py={{ base: "2", md: "4" }}
          >
            <Text fontWeight={"bold"} fontSize={["sm", "md"]}>
              {user.name}
            </Text>
            <Text fontSize={["sm", "md"]}>{user.email}</Text>
          </Stack>
        </Center>
        <MenuDivider />
        <MenuItem icon={<FaSignOutAlt />} onClick={() => signOut()}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
