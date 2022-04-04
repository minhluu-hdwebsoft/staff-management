import { Box, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import SignupForm from "../modules/Auth/Form/SignupForm";

export default function SignupPage() {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            ❤️❤️❤️ from Minh with love ✌️❤️❤️
          </Text> */}
        </Stack>
        <Box
          minW={"450px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={8}
        >
          <SignupForm />
        </Box>
      </Stack>
    </Flex>
  );
}
