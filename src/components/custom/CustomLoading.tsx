import { Box, Center, Spinner } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface CustomLoadingProps {
  children?: ReactElement;
  spinElement?: ReactElement;
  isLoading?: boolean;
}

export function CustomLoading({ children, spinElement, isLoading = false }: CustomLoadingProps) {
  return (
    <Box position={"relative"}>
      <Center
        position={"absolute"}
        top={0}
        left={0}
        bottom={0}
        right={0}
        __css={{
          background: "#fff",
          zIndex: 10,
          opacity: isLoading ? 0.5 : 0,
          visibility: isLoading ? "visible" : "hidden",
          transition: "opacity 0.3s ease",
        }}
      >
        {spinElement || <Spinner />}
      </Center>
      <Box>{children}</Box>
    </Box>
  );
}
