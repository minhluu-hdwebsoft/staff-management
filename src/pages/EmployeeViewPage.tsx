import { VStack } from "@chakra-ui/react";
import React from "react";
import { CustomBreadcrumb } from "../components/custom";
import EmployeeViewForm from "../modules/Employee/Form/EmployeeView";

function EmployeeViewPage() {
  return (
    <VStack spacing={5} justifyContent="stretch" alignItems={"stretch"}>
      <CustomBreadcrumb />
      <EmployeeViewForm />
    </VStack>
  );
}

export default EmployeeViewPage;
