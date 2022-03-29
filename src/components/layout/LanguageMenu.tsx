import { Avatar, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface LanguageItem {
  // id: "vn" | "en";
  [key: string]: {
    name: string;
    iconUrl: string;
  };
}

const languageList: LanguageItem = {
  en: {
    name: "English",
    iconUrl: "/locales/en/en.png",
  },
  vn: {
    name: "Tiếng Việt",
    iconUrl: "/locales/vn/vn.png",
  },
};

function LanguageMenu() {
  const { i18n } = useTranslation();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        size="lg"
        variant="ghost"
        aria-label="change language"
        icon={<Avatar size={"sm"} name="Dan Abrahmov" src={languageList[i18n.language].iconUrl} />}
      />
      <MenuList>
        {Object.keys(languageList).map((item) => {
          return (
            <MenuItem as={HStack} p="2" key={item} onClick={() => i18n.changeLanguage(item)}>
              <Avatar size={"sm"} name={languageList[item].name} src={languageList[item].iconUrl} />
              <Text>{languageList[item].name}</Text>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default LanguageMenu;
