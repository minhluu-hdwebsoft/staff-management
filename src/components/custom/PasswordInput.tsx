import { Button, Input, InputGroup, InputProps, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export const PasswordInput = (props: InputProps & { inputRegister?: UseFormRegisterReturn }) => {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <InputGroup>
      <Input type={show ? "text" : "password"} {...props} {...props.inputRegister} placeholder=" " />
      <InputRightElement width="4.5rem" height={"38px"}>
        <Button h="1.75rem" size="sm" onClick={handleClick}>
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
