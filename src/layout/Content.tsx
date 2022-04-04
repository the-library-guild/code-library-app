import React, { ReactNode } from "react";

import { Flex, FlexProps } from "@chakra-ui/react";

interface ContentProps extends FlexProps {
  children: ReactNode;
}

export function Content({ children, ...props }: ContentProps) {
  return (
    <Flex maxW={"50rem"} mx={"auto"} w={"100%"} {...props}>
      {children}
    </Flex>
  );
}
