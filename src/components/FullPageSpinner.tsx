import { Flex, Spinner } from "@chakra-ui/react";


export function FullPageSpinner() {
  return (
    <Flex
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spinner
          thickness='4px'
          speed='0.65s'
          color='gray.800'
          size='xl'
        />
      </Flex>
  );
}
