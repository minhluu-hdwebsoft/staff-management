import {
  Avatar,
  Button,
  Grid,
  GridItem,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { MaritalStatus } from "@hdwebsoft/intranet-api-sdk/libs/api/hr/employee/models";
import { Gender } from "@hdwebsoft/intranet-api-sdk/libs/type";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FiRefreshCw, FiUpload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import api from "../../../../api";
import { useAppSelector } from "../../../../app/hooks";
import { CustomFileUpload, FloatFormControl } from "../../../../components/custom";
import { FormType } from "../../../../models";
import { validateFiles } from "../../../../utils/upload";
import { appRegExp } from "../../../../utils/validate";
import { selectIsCreatingEmployee } from "../../selector";

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
    phoneNumber: yup.string().required().matches(appRegExp.phone, "Phone number is not valid"),
    email: yup.string().email().required(),
    personalEmail: yup.string().email().required(),
  })
  .required();

interface EmployeeFormProps {
  type?: FormType;
  defaultValue?: FormDataOptional;
  onSubmit?: (data: FormData) => void;
}

export default function EmployeeForm({ type = FormType.CREATE, defaultValue, onSubmit }: EmployeeFormProps) {
  const [genaratingCode, setGenaratingCode] = useState<boolean>(false);
  const navigate = useNavigate();
  const isCreating = useAppSelector(selectIsCreatingEmployee);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      ...defaultValue,
      gender: Gender.MALE,
      status: MaritalStatus.SINGLE,
      joined: moment().format("YYYY-MM-DD"),
    },
    resolver: yupResolver(schema),
  });

  const newAvatarUrl = useMemo(() => {
    if (watch("file_") && watch("file_")?.[0]) {
      return URL.createObjectURL(watch("file_")?.[0] as File);
    }
    return getValues().avatarUrl;
  }, [watch("file_")?.[0]]);

  useEffect(() => {
    if (type === FormType.CREATE) {
      handleGenerateEmployeeCodeClick();
    }
  }, []);

  const onFormSubmit: SubmitHandler<FormData> = (data) => onSubmit && onSubmit(data);

  const handleGenerateEmployeeCodeClick = async () => {
    setGenaratingCode(true);
    const code = await api.hr.employee.identity();
    setValue("code", code);
    setGenaratingCode(false);
  };

  return (
    <form about="create-employee-form" onSubmit={handleSubmit(onFormSubmit)}>
      <VStack w={"full"} spacing={5} justifyContent={"space-between"} alignItems={"stretch"}>
        <Grid
          minHeight={450}
          templateRows={{ base: "repeat(5, 1fr)", md: "repeat(5, 1fr)" }}
          templateColumns="repeat(8, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={{ base: 1, md: 5 }} colSpan={{ base: 8, md: 2 }}>
            <VStack spacing={5} borderRadius={5} p={5} bgColor={useColorModeValue("gray.300", "whiteAlpha.300")}>
              <Avatar size={"2xl"} name="Upload" src={newAvatarUrl} />
              <CustomFileUpload accept={"image/*"} register={register("file_", { validate: validateFiles })}>
                <Button leftIcon={<FiUpload />}> Upload </Button>
              </CustomFileUpload>
            </VStack>

            <HStack spacing={5} mt={10}>
              <InputGroup size="md">
                <Input placeholder="Enter employee code..." textAlign={"center"} {...register("code")} isReadOnly />
                <InputRightElement>
                  <IconButton
                    isDisabled={type !== FormType.CREATE}
                    size={"sm"}
                    isLoading={genaratingCode}
                    aria-label="Refresh code"
                    icon={<FiRefreshCw />}
                    colorScheme={"blue"}
                    onClick={handleGenerateEmployeeCodeClick}
                  />
                </InputRightElement>
              </InputGroup>
            </HStack>
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <FloatFormControl label="First name" errorMessage={errors.firstName?.message}>
              <Input placeholder="First name..." {...register("firstName")} isReadOnly={type === FormType.VIEW} />
            </FloatFormControl>
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <FloatFormControl label="Last name" errorMessage={errors.lastName?.message}>
              <Input placeholder="Last name..." {...register("lastName")} isReadOnly={type === FormType.VIEW} />
            </FloatFormControl>
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <FloatFormControl label="Date of birth" errorMessage={errors.dateOfBirth?.message}>
              <Input placeholder=" " type={"date"} {...register("dateOfBirth")} isReadOnly={type === FormType.VIEW} />
            </FloatFormControl>
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <FloatFormControl label="Gender" errorMessage={errors.gender?.message}>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    defaultValue={Gender.MALE}
                    value={value}
                    onChange={onChange}
                    isDisabled={type === FormType.VIEW}
                  >
                    <Stack direction="row" spacing={10}>
                      <Radio value={Gender.MALE}>Male</Radio>
                      <Radio value={Gender.FEMALE}>Female</Radio>
                      <Radio value={Gender.OTHER}>Other</Radio>
                    </Stack>
                  </RadioGroup>
                )}
                name="gender"
                control={control}
              />
            </FloatFormControl>
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <FloatFormControl label="Email" errorMessage={errors.email?.message}>
              <Input placeholder="Email..." {...register("email")} isReadOnly={type !== FormType.CREATE} />
            </FloatFormControl>
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <FloatFormControl label="Phone number" errorMessage={errors.phoneNumber?.message}>
              <Input placeholder="Phone..." {...register("phoneNumber")} isReadOnly={type === FormType.VIEW} />
            </FloatFormControl>
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <FloatFormControl label="Status" errorMessage={errors.status?.message}>
              <Controller
                render={({ field: { onChange, value } }) => (
                  <RadioGroup
                    defaultValue={MaritalStatus.SINGLE}
                    value={value}
                    onChange={onChange}
                    isDisabled={type === FormType.VIEW}
                  >
                    <Stack direction="row" spacing={10}>
                      <Radio value={MaritalStatus.SINGLE}>Single</Radio>
                      <Radio value={MaritalStatus.MARRIED}>Married</Radio>
                    </Stack>
                  </RadioGroup>
                )}
                name="status"
                control={control}
              />
            </FloatFormControl>
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <FloatFormControl label="Nickname" errorMessage={errors.nickname?.message}>
              <Input placeholder="Nickname..." {...register("nickname")} isReadOnly={type === FormType.VIEW} />
            </FloatFormControl>
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <FloatFormControl label="Joined" errorMessage={errors.joined?.message}>
              <Input placeholder=" " type={"date"} {...register("joined")} isReadOnly={type === FormType.VIEW} />
            </FloatFormControl>
          </GridItem>
          <GridItem colSpan={{ base: 8, md: 3 }}>
            <FloatFormControl label="Personal email" errorMessage={errors.personalEmail?.message}>
              <Input
                placeholder="Personal email..."
                {...register("personalEmail")}
                isReadOnly={type === FormType.VIEW}
              />
            </FloatFormControl>
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
              <Button type="submit" isLoading={isCreating} colorScheme={"blue"}>
                Submit
              </Button>
            </>
          )}
        </Stack>
      </VStack>
    </form>
  );
}
