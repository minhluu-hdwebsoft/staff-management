import { Button, Input, Link, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link as ReactLink } from "react-router-dom";
import { FloatFormControl, PasswordInput } from "../../../components/custom";
import { useLogin } from "../hooks";

interface SigninType {
  email: string;
  password: string;
}

export default function SigninForm(): JSX.Element {
  const { isLoading, login } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SigninType>();

  const onSubmit: SubmitHandler<SigninType> = (values) => {
    login(values.email, values.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={5}>
        <FloatFormControl label="Email" id="email" errorMessage={errors.email?.message}>
          <Input placeholder="Please enter email..." {...register("email", { required: "This is required" })} />
        </FloatFormControl>
        <FloatFormControl label="Password" id="password" errorMessage={errors.password?.message}>
          <PasswordInput
            placeholder="Please enter password..."
            inputRegister={{ ...register("password", { required: "This is required" }) }}
          />
        </FloatFormControl>
        <Stack spacing={10} pt={2}>
          <Button
            type="submit"
            isLoading={isSubmitting || isLoading}
            loadingText="Submitting"
            size="lg"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Sign In
          </Button>
        </Stack>
        <Stack pt={3}>
          <Text align={"center"}>
            {"Don't have account?"}{" "}
            <Link as={ReactLink} to="/sign-up" color={"blue.400"}>
              Sign up
            </Link>
          </Text>
        </Stack>
      </Stack>
    </form>
  );
}
