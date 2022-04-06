import { Button, Link, Stack, Text } from "@chakra-ui/react";
import { Form, Input, PasswordInput } from "components/custom/Form";
import React from "react";
import { SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link as ReactLink } from "react-router-dom";
import yup from "utils/yupGlobal";
import { useLogin } from "../hooks";

interface SigninType {
  email: string;
  password: string;
}

const validateSchema = yup.object({
  email: yup.string().required("Required").email("Email invalid"),
  password: yup.string().password().required("Required"),
});

export default function SigninForm(): JSX.Element {
  const { isLoading, login } = useLogin();
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<SigninType> = (values) => {
    login(values.email, values.password);
  };

  return (
    <Form onSubmit={onSubmit} schema={validateSchema}>
      <Stack spacing={5}>
        <Input name="email" label={t("Email")} inputProps={{ placeholder: t("Please enter", { field: t("Email") }) }} />
        <PasswordInput
          name="password"
          label={t("Password")}
          inputProps={{ placeholder: t("Please enter", { field: t("Password") }) }}
        />
        <Stack spacing={10} pt={2}>
          <Button
            type="submit"
            isLoading={isLoading}
            loadingText={t("Submitting")}
            size="lg"
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            {t("Sign In")}
          </Button>
        </Stack>
        <Stack pt={3}>
          <Text align={"center"}>
            {t("Don't have account?")}
            <Link as={ReactLink} to="/sign-up" color={"blue.400"}>
              {t("Sign up")}
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Form>
  );
}
