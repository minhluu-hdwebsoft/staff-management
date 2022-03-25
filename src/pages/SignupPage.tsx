import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import SignupCard from "../modules/Auth/Form/SignupCard";

export default function SignupPage() {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <SignupCard />
    </Flex>
  );
}
