import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import SidebarWithHeader from "./SidebarWithHeader";

interface MainLayoutProps {
  children?: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <SidebarWithHeader>
      <Box p={8}>
        <InputGroup maxWidth={600} minWidth={400} w="full">
          <InputLeftElement pointerEvents="none">
            <AiOutlineSearch />
          </InputLeftElement>
          <Input type="text" placeholder="Search ..." />
        </InputGroup>
        {props.children}
      </Box>
    </SidebarWithHeader>
  );
};
