import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import SigninCard from "../modules/Auth/Form/SigninCard";

export default function SignInPage() {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <SigninCard />
    </Flex>
  );
}
