import {
  Avatar,
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Stack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { MaritalStatus } from "@hdwebsoft/intranet-api-sdk/libs/api/hr/employee/models";
import { Gender } from "@hdwebsoft/intranet-api-sdk/libs/type";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form, Input, RadioInput, UploadImageInput } from "components/custom/Form";
import { FormType } from "models";
import { useEmployeeIdentity } from "modules/Employee/hooks";
import moment from "moment";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiRefreshCw, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export interface FormData {
  file_: FileList;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  email: string;
  phoneNumber: string;
  status: MaritalStatus;
  nickname: string;
  joined: string;
  personalEmail: string;
  code: string;
}

export interface FormDataOptional {
  file_?: FileList;
  avatarUrl?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  gender?: Gender;
  email?: string;
  phoneNumber?: string;
  status?: MaritalStatus;
  nickname?: string;
  joined?: string;
  personalEmail?: string;
  code?: string;
}

const schema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    dateOfBirth: yup.date().max(moment().subtract(16, "y"), "Only allow 16+ years old!").required(),
    phoneNumber: yup.string().required().phone("Phone is valid"),
    email: yup.string().email().required(),
    personalEmail: yup.string().email().required(),
  })
  .required();

interface EmployeeFormProps {
  type?: FormType;
  defaultValue?: FormDataOptional;
  isLoading?: boolean;
  onSubmit?: (data: FormData) => void;
}

export default function EmployeeForm({ type = FormType.CREATE, defaultValue, onSubmit, isLoading }: EmployeeFormProps) {
  const navigate = useNavigate();
  const { genarating, code, getCode } = useEmployeeIdentity(defaultValue?.code || "");

  const methods = useForm<FormData>({
    defaultValues: {
      ...defaultValue,
      gender: Gender.MALE,
      status: MaritalStatus.SINGLE,
      joined: moment().format("YYYY-MM-DD"),
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (type === FormType.CREATE) {
      getCode();
    }
  }, []);

  console.log(methods.formState.errors);

  useEffect(() => {
    methods.setValue("code", code);
  }, [code]);

  const onFormSubmit: SubmitHandler<FormData> = (data) => onSubmit && onSubmit(data);

  return (
    <Form onSubmit={onFormSubmit} formMethods={methods}>
      <VStack w={"full"} spacing={5} justifyContent={"space-between"} alignItems={"stretch"}>
        <Grid
          minHeight={450}
          templateRows={{ base: "repeat(5, 1fr)", md: "repeat(5, 1fr)" }}
          templateColumns="repeat(8, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={{ base: 1, md: 5 }} colSpan={{ base: 8, md: 2 }}>
            <UploadImageInput name="file_" accept="image/*">
              {({ openFileChoice, fileUrl }) => (
                <VStack
                  w="full"
                  spacing={5}
                  borderRadius={5}
                  p={5}
                  bgColor={useColorModeValue("gray.300", "whiteAlpha.300")}
                >
                  <Avatar size={"2xl"} name="Upload" src={fileUrl || methods.getValues().avatarUrl} />
                  <Button onClick={openFileChoice} leftIcon={<FiUpload />}>
                    Upload
                  </Button>
                </VStack>
              )}
            </UploadImageInput>
            <HStack spacing={5} mt={10}>
              <InputGroup size="md">
                <Input
                  name="code"
                  inputProps={{ isReadOnly: true, placeholder: "Enter employee code...", textAlign: "center" }}
                />
                <InputRightElement>
                  <IconButton
                    isDisabled={type !== FormType.CREATE}
                    size={"sm"}
                    isLoading={genarating}
                    aria-label="Refresh code"
                    icon={<FiRefreshCw />}
                    colorScheme={"blue"}
                    onClick={getCode}
                  />
                </InputRightElement>
              </InputGroup>
            </HStack>
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <Input
              label="First name"
              name="firstName"
              inputProps={{ isReadOnly: type === FormType.VIEW, placeholder: "First name..." }}
            />
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <Input
              label="Last name"
              name="lastName"
              inputProps={{ isReadOnly: type === FormType.VIEW, placeholder: "Last name..." }}
            />
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <Input
              label="Date of birth"
              name="dateOfBirth"
              inputProps={{ isReadOnly: type === FormType.VIEW, type: "date" }}
            />
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <RadioInput
              label="Gender"
              name="gender"
              inputProps={{ isDisabled: type === FormType.VIEW }}
              data={[
                {
                  value: Gender.MALE,
                  title: "Male",
                },
                {
                  value: Gender.FEMALE,
                  title: "Female",
                },
                {
                  value: Gender.OTHER,
                  title: "Other",
                },
              ]}
            />
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <Input
              label="Email"
              name="email"
              inputProps={{ isReadOnly: type !== FormType.CREATE, placeholder: "Email..." }}
            />
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <Input
              label="Phone number"
              name="phoneNumber"
              inputProps={{ isReadOnly: type === FormType.VIEW, placeholder: "Phone..." }}
            />
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <RadioInput
              label="Status"
              name="status"
              inputProps={{ isDisabled: type === FormType.VIEW }}
              data={[
                {
                  value: MaritalStatus.SINGLE,
                  title: "Single",
                },
                {
                  value: MaritalStatus.MARRIED,
                  title: "Married",
                },
              ]}
            />
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <Input
              label="Nickname"
              name="nickname"
              inputProps={{ isReadOnly: type === FormType.VIEW, placeholder: "Nickname..." }}
            />
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <Input label="Joined" name="joined" inputProps={{ isReadOnly: type === FormType.VIEW, type: "date" }} />
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <Input
              label="Personal email"
              name="personalEmail"
              inputProps={{ isReadOnly: type === FormType.VIEW, placeholder: "Personal email..." }}
            />
          </GridItem>
        </Grid>
        <Stack direction={"row"} spacing={5} justifyContent={"end"}>
          {type === FormType.VIEW ? (
            <Button onClick={() => navigate("edit")} colorScheme={"blue"}>
              Edit
            </Button>
          ) : (
            <>
              <Button onClick={() => navigate("/employee")}>Cancel</Button>
              <Button type="submit" loadingText="Submiting" isLoading={isLoading || false} colorScheme={"blue"}>
                Submit
              </Button>
            </>
          )}
        </Stack>
      </VStack>
    </Form>
  );
}
