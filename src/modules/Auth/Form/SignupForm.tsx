import { Box, Button, Heading, HStack, Input, Link, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { FloatFormControl, PasswordInput } from "../../../components/custom";

export default function SignupForm() {
  return (
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
      <FloatFormControl label="Password" id="password" helperText="How to make a strong password ?">
        <PasswordInput />
      </FloatFormControl>
      <FloatFormControl label="Confirm password" id="confirm-password">
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
          Already a user?{" "}
          <Link as={ReactLink} to={"/sign-in"} color={"blue.400"}>
            Login
          </Link>
        </Text>
      </Stack>
    </Stack>
  );
}
