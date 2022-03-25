import { Button, Input, Link, Stack, Text } from "@chakra-ui/react";
import React, { FormEvent, useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import { FloatFormControl, PasswordInput } from "../../../components/custom";
import { useAuth } from "../context";

export default function SigninForm() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [isSubmiting, setIsSubmiting] = useState(false);

  const handleSubmit = (e: FormEvent | undefined) => {
    e?.preventDefault();

    console.log("Sign in");
    setIsSubmiting(true);
    setTimeout(() => {
      signIn();
      setIsSubmiting(false);
      navigate("/admin");
    }, 3000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={5}>
        <FloatFormControl label="Email" id="email">
          <Input placeholder=" " />
        </FloatFormControl>
        <FloatFormControl label="Password" id="password">
          <PasswordInput />
        </FloatFormControl>
        <Stack spacing={10} pt={2}>
          <Button
            type="submit"
            isLoading={isSubmiting}
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
