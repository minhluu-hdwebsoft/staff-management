import { InputGroup, chakra } from "@chakra-ui/react";
import { ReactNode, useRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import React from "react";

interface CustomFileUploadProps {
  register: UseFormRegisterReturn;
  accept?: string;
  multiple?: boolean;
  children?: ReactNode;
}

export interface FormValues {
  file_: FileList;
}

export function CustomFileUpload(props: CustomFileUploadProps) {
  const { register, accept, multiple, children } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { ref, ...rest } = register as { ref: (instance: HTMLInputElement | null) => void };

  const handleClick = () => inputRef.current?.click();

  return (
    <InputGroup onClick={handleClick} justifyContent={"center"}>
      <chakra.input
        type={"file"}
        multiple={multiple || false}
        hidden
        accept={accept}
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <>{children}</>
    </InputGroup>
  );
}
