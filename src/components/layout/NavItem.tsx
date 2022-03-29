import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react";
import { TFunctionResult } from "i18next";
import React, { ReactText } from "react";
import { IconType } from "react-icons";
import { Link as ReactRouterLink } from "react-router-dom";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText | string | TFunctionResult;
  to?: string;
  isActive: boolean;
}
const NavItem = ({ to, icon, children, isActive = false, ...rest }: NavItemProps) => {
  return (
    <Link as={ReactRouterLink} to={to || "#"} style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        __css={
          isActive
            ? {
                bg: "cyan.400",
                color: "white",
              }
            : {
                transition: "0.1s ease",
              }
        }
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;
