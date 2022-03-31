import React, { ReactNode } from "react";

import { Flex, FlexProps } from "@chakra-ui/react";

interface ContentProps extends FlexProps {
  children: ReactNode;
}

export function Content({ children, ...props }: ContentProps) {
  return (
    <Flex {...props} maxW={"1480"} mx={"auto"}>
      {children}
    </Flex>
  )
}
