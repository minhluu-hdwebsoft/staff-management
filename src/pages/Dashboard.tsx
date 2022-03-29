import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { CustomBreadcrumb } from "../components/custom";

export default function DashBoard() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <CustomBreadcrumb />
      <Text fontSize={"4xl"}>{t("title")}</Text>
      <Button onClick={() => i18n.changeLanguage(i18n.language === "en" ? "vn" : "en")}>Change Language</Button>
    </div>
  );
}
