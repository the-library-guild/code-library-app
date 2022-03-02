import {
    Flex,
    Box,
    Stack,
    Heading,
    Text,
    useColorModeValue
  } from "@chakra-ui/react";

  import { ToggleColorModeButton } from "./Navbar";
import { SignInButton } from "./SignInButton";
import { LibraryLogo } from "./LibraryLogo";

export function SignIn() {
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"} p={"8"}>
          <LibraryLogo />
          <Heading fontSize={"4xl"}>CODE Library</Heading>
          <Text
            fontSize={"lg"}
            color={useColorModeValue("gray.600", "gray.300")}
          >
            Sign in to your account
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <SignInButton />
        </Box>
        <Flex align="end" justify={"center"}>
          <ToggleColorModeButton w={"2"} bg={"none"} />
        </Flex>
      </Stack>
    </Flex>
  );
}

