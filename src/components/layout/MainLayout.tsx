import { Box } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import SidebarWithHeader from "./SidebarWithHeader";

interface MainLayoutProps {
  children?: ReactElement;
}

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <SidebarWithHeader>
      <Box>{props.children}</Box>
    </SidebarWithHeader>
  );
};
