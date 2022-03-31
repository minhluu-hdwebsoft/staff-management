import { FormControl, FormErrorMessage, FormHelperText, FormLabel } from "@chakra-ui/react";
import React, { ReactElement } from "react";

interface FloatFormControlProps {
  id?: string;
  children?: ReactElement;
  helperText?: string;
  label?: string;
  errorMessage?: string;
  isRequire?: boolean;
  isInvaild?: boolean;
}

export const FloatFormControl = (props: FloatFormControlProps) => {
  const { helperText, label, errorMessage, children, isInvaild, id, ...rest } = props;

  return (
    <FormControl id={id} {...rest} isInvalid={Boolean(errorMessage) || isInvaild}>
      {/* <Input type={type} name={name} placeholder={placeholder || " "} value={value} defaultValue={defaultValue || ""} /> */}
      {/* It is important that the Label comes after the Control due to css selectors */}
      {label && <FormLabel>{label || "Label"}</FormLabel>}
      {children}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
      {errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
};
