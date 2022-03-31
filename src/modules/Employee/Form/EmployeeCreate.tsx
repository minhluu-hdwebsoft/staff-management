import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { FormType } from "../../../models";
import { employeeActions } from "../slice";
import EmployeeForm, { FormData } from "./component/EmployeeForm";

function EmployeeCreateForm() {
  const dispatch = useDispatch();
  const handleFormSubmit = (data: FormData) => {
    const {
      firstName,
      lastName,
      file_,
      email,
      gender,
      dateOfBirth,
      joined,
      nickname,
      phoneNumber,
      personalEmail,
      status,
      code,
    } = data;
    const avatarFile = file_.item(0);
    dispatch(
      employeeActions.create({
        avatar: avatarFile || undefined,
        data: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          gender: gender,
          status: status,
          allocable: true,
          phone: phoneNumber,
          code: code,
          personal_email: personalEmail,
          nickname: nickname,
          dob: moment(dateOfBirth).format("YYYY-MM-DD"),
          starting_date: moment(joined).format("YYYY-MM-DD"),
        },
      }),
    );
  };

  return (
    <Tabs variant="enclosed">
      <TabList>
        <Tab>Details</Tab>
        <Tab>Contract</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <EmployeeForm type={FormType.CREATE} onSubmit={handleFormSubmit} />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default EmployeeCreateForm;
