import {
  Avatar,
  Container,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  StackDivider,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React, { Children, ReactElement } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../modules/Auth/context";

interface MainLayoutProps {
  children?: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const handleSignoutClick = () => {
    signOut();
    navigate("/");
  };

  return (
    <VStack align="stretch" divider={<StackDivider borderColor="gray.200" />}>
      <Flex px={7} justifyContent={"end"}>
        <Menu>
          <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
            <HStack>
              <Avatar
                size={"sm"}
                src={
                  "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                }
              />
              <VStack display={{ base: "none", md: "flex" }} alignItems="flex-start" spacing="1px" ml="2">
                <Text fontSize="sm">Justina Clark</Text>
                <Text fontSize="xs" color="gray.600">
                  Admin
                </Text>
              </VStack>
            </HStack>
          </MenuButton>
          <MenuList bg={useColorModeValue("white", "gray.900")} borderColor={useColorModeValue("gray.200", "gray.700")}>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleSignoutClick}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Stack p={8} align="center">
        <InputGroup maxWidth={600} minWidth={400} w="full">
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
          </InputLeftElement>
          <Input type="text" placeholder="Search ..." />
        </InputGroup>
        {props.children}
      </Stack>
    </VStack>
  );
};
