import { Button, Input, InputGroup, InputProps, InputRightElement } from "@chakra-ui/react";
import React from "react";

export const PasswordInput = (props: InputProps) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Input type={show ? "text" : "password"} {...props} placeholder=" " />
      <InputRightElement width="4.5rem" height={"100%"}>
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </>
  );
};
