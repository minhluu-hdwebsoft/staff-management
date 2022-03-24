import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import SigninCard from "./pages/SigninCard";

function App() {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <SigninCard />
    </Flex>
  );
}

export default App;
