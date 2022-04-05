import { Center, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { useParams } from "react-router-dom";
import { FormType } from "../../../models";
import { useFetchEmployee, useUpdate } from "../hooks";
import EmployeeForm, { FormData } from "./component/EmployeeForm";

function EmployeeEditForm() {
  const { id } = useParams();
  const { employee, isFetching } = useFetchEmployee(id as string);

  const { isUpdating, update } = useUpdate();

  const handleFormSubmit = (data: FormData) => {
    if (!employee || !data) return;

    const { firstName, lastName, file_, gender, dateOfBirth, joined, nickname, phoneNumber, personalEmail, status } =
      data;
    const avatarFile = file_?.item(0);

    update({
      avatar: avatarFile || undefined,
      data: {
        ...employee,
        first_name: firstName,
        last_name: lastName,
        gender: gender,
        status: status,
        allocable: true,
        phone: phoneNumber,
        personal_email: personalEmail,
        nickname: nickname,
        dob: moment(dateOfBirth).format("YYYY-MM-DD"),
        starting_date: moment(joined).format("YYYY-MM-DD"),
      },
    });
  };

  return (
    <>
      {isFetching ? (
        <Center height={500}>
          <Spinner />
        </Center>
      ) : employee ? (
        <Tabs variant="enclosed">
          <TabList>
            <Tab>Details</Tab>
            <Tab>Contract</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <EmployeeForm
                type={FormType.EDIT}
                isLoading={isUpdating}
                onSubmit={handleFormSubmit}
                defaultValue={{
                  avatarUrl: employee?.avatar,
                  email: employee?.email,
                  code: employee?.code,
                  firstName: employee?.first_name,
                  lastName: employee?.last_name,
                  dateOfBirth: employee?.dob,
                  gender: employee?.gender,
                  phoneNumber: employee?.phone,
                  status: employee?.status,
                  nickname: employee?.nickname,
                  joined: employee?.starting_date,
                  personalEmail: employee?.personal_email,
                }}
              />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Center height={500}>
          <Heading> Employee Not Found</Heading>
        </Center>
      )}
    </>
  );
}

export default EmployeeEditForm;
