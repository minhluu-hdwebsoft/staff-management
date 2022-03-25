import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { MainLayout } from "./pages/MainLayout";
import SigninCard from "./modules/Auth/Form/SigninCard";
import { AppRoutes } from "./Routes";

function App() {
  return (
    // <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
    //   <SigninCard />
    // </Flex>
    <AppRoutes />
  );
}

export default App;
