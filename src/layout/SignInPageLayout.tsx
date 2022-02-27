import React, { ReactNode } from "react";

import { Flex, useColorModeValue } from "@chakra-ui/react";

interface SignInPageLayoutProps {
    children: ReactNode;
}

export function SignInPageLayout({ children }: SignInPageLayoutProps) {
    return (
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        {children}
      </Flex>
    );
}
