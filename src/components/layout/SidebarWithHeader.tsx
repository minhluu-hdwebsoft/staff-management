import {
  Box,
  BoxProps,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import { FiCompass, FiHome, FiTrendingUp } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import MobileNav from "./MobileNav";
import NavItem from "./NavItem";

interface LinkItemProps {
  name: string;
  icon: IconType;
  key: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "dashboard", icon: FiHome, key: "" },
  { name: "employee", icon: FiTrendingUp, key: "employee" },
  { name: "task", icon: FiCompass, key: "task" },
  // { name: "Favourites", icon: FiStar },
  // { name: "Settings", icon: FiSettings },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  return (
    <Box
      transition="tranlateX 3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          to={`/${link.key}`}
          isActive={`${link.key}` === pathname.split("/")[1]}
        >
          {t(`sidebar.${link.name}`)}
        </NavItem>
      ))}
    </Box>
  );
};

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("white", "gray.900")}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}
