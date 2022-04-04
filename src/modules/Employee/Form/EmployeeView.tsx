import { Center, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { FormType } from "../../../models";
import { useFetchEmployee } from "../hooks";
import EmployeeForm from "./component/EmployeeForm";

function EmployeeViewForm() {
  const { id } = useParams();
  const { employee, isFetching } = useFetchEmployee(id as string);

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
                type={FormType.VIEW}
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

export default EmployeeViewForm;
