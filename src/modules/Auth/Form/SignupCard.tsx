import { Box, Button, Flex, Heading, HStack, Input, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { FloatFormControl, PasswordInput } from "../../../components/custom";

export default function SignupCard() {
  return (
    <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
      <Stack align={"center"}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Sign up
        </Heading>
        <Text fontSize={"lg"} color={"gray.600"}>
          from Minh with love ✌️❤️❤️❤️❤️❤️
        </Text>
      </Stack>
      <Box minW={"450px"} w={"full"} bg={useColorModeValue("white", "gray.900")} boxShadow={"2xl"} rounded={"lg"} p={8}>
        <Stack spacing={5}>
          <HStack>
            <Box>
              <FloatFormControl label="First Name" id="first-name">
                <Input placeholder=" " />
              </FloatFormControl>
            </Box>
            <Box>
              <FloatFormControl label="Last Name" id="last-name">
                <Input placeholder=" " />
              </FloatFormControl>
            </Box>
          </HStack>
          <FloatFormControl label="Email" id="email">
            <Input placeholder=" " />
          </FloatFormControl>
          <FloatFormControl label="Password" id="password">
            <PasswordInput />
          </FloatFormControl>
          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Sign up
            </Button>
          </Stack>
          <Stack pt={3}>
            <Text align={"center"}>
              Already a user? <Link color={"blue.400"}>Login</Link>
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
