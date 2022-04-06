import { Box, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import SigninForm from "../modules/Auth/Form/SigninForm";

export default function SignInPage() {
  const { t } = useTranslation();

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            {t("Sign In")}
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
          <SigninForm />
        </Box>
      </Stack>
    </Flex>
  );
}
