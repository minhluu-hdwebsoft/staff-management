import { Box, Center, Container, Heading } from "@chakra-ui/react";
import React from "react";

function App() {
  return (
    <Box height={"100vh"} justifyContent={"center"} alignItems={"center"} display="flex">
      <Heading textTransform={"uppercase"}>This app is using Chakra UI</Heading>
    </Box>
  );
}

export default App;
