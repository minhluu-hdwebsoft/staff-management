import { Box, Button, HStack, Input, Link, Stack, Text } from "@chakra-ui/react";
import { UserRegisterParams } from "@hdwebsoft/intranet-api-sdk/libs/api/auth/models";
import React from "react";
import { useForm } from "react-hook-form";
import { Link as ReactLink } from "react-router-dom";
import { FloatFormControl, PasswordInput } from "../../../components/custom";

export default function SignupForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<UserRegisterParams>();

  const onSubmit = async (values: UserRegisterParams) => {
    // await userRegister(values);
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <HStack>
          <Box>
            <FloatFormControl label="First Name" id="first_name" errorMessage={errors.first_name?.message}>
              <Input placeholder=" " {...register("first_name", { required: "This is required" })} />
            </FloatFormControl>
          </Box>
          <Box>
            <FloatFormControl label="Last Name" id="last_name" errorMessage={errors.last_name?.message}>
              <Input placeholder=" " {...register("last_name", { required: "This is required" })} />
            </FloatFormControl>
          </Box>
        </HStack>
        <FloatFormControl label="Email" id="email" errorMessage={errors.email?.message}>
          <Input placeholder=" " {...register("email", { required: "This is required" })} />
        </FloatFormControl>
        <FloatFormControl label="Username" id="username" errorMessage={errors.username?.message}>
          <Input placeholder=" " {...register("username", { required: "This is required" })} />
        </FloatFormControl>
        <FloatFormControl
          label="Password"
          id="password1"
          helperText="How to make a strong password ?"
          errorMessage={errors.password1?.message}
        >
          <PasswordInput inputRegister={{ ...register("password1", { required: "This is required" }) }} />
        </FloatFormControl>
        <FloatFormControl label="Confirm password" id="password2" errorMessage={errors.password2?.message}>
          <PasswordInput inputRegister={{ ...register("password2", { required: "This is required" }) }} />
        </FloatFormControl>
        <Stack spacing={10} pt={2}>
          <Button
            isLoading={isSubmitting}
            type="submit"
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
    </form>
  );
}
