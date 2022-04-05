import { chakra, ChakraProps, InputGroup } from "@chakra-ui/react";
import React, { ReactElement, useMemo, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FloatFormControl } from "../FloatFormControl";

interface RenderProps {
  openFileChoice: () => void | undefined;
  fileUrl?: string;
}

interface UploadImageInputProps {
  name: string;
  label?: string;
  multiple?: boolean;
  accept?: string;
  inputProps?: ChakraProps;
  children?: (props: RenderProps) => unknown;
}

export const UploadImageInput = ({ multiple, accept, name, label, inputProps, children }: UploadImageInputProps) => {
  const { control } = useFormContext();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => inputRef.current?.click();

  return (
    <Controller
      control={control}
      name={name}
      render={({ fieldState: { error }, field: { ref, value, onChange, ...rest } }) => {
        // Get Image Blob URL
        const fileUrl = useMemo(() => {
          if (value && value?.[0]) {
            return URL.createObjectURL(value?.[0] as File);
          }
          return "";
        }, [value]);

        return (
          <FloatFormControl label={label} errorMessage={error?.message}>
            <InputGroup justifyContent={"center"}>
              <chakra.input
                type={"file"}
                hidden
                multiple={multiple || false}
                accept={accept}
                {...inputProps}
                {...rest}
                onChange={(e) => onChange(e.target.files)}
                ref={(e) => {
                  ref(e);
                  inputRef.current = e;
                }}
              />
              {(children && children({ openFileChoice: handleClick, fileUrl })) as ReactElement}
            </InputGroup>
          </FloatFormControl>
        );
      }}
    />
  );
};
