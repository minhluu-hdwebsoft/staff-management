import { VStack } from "@chakra-ui/react";
import React from "react";
import { CustomBreadcrumb } from "../components/custom";
import EmployeeList from "../modules/Employee/List/EmployeeList";

function EmployeeListPage() {
  return (
    <VStack spacing={5} justifyContent="stretch" alignItems={"stretch"}>
      <CustomBreadcrumb />
      <EmployeeList />
    </VStack>
  );
}

export default EmployeeListPage;
