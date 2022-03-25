import { Box, Flex, Heading, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import SigninForm from "../modules/Auth/Form/SigninForm";

export default function SignInPage() {
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign in
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            ❤️❤️❤️ from Minh with love ✌️❤️❤️
          </Text>
        </Stack>
        <Box
          minW={"450px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"lg"}
          p={8}
        >
          <SigninForm />
        </Box>
      </Stack>
    </Flex>
  );
}
