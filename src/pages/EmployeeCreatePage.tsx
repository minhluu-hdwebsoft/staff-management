import { VStack } from "@chakra-ui/react";
import React from "react";
import { CustomBreadcrumb } from "../components/custom";
import EmployeeCreateForm from "../modules/Employee/Form/EmployeeCreate";

function EmployeeCreatePage() {
  return (
    <VStack spacing={5} justifyContent="stretch" alignItems={"stretch"}>
      <CustomBreadcrumb />
      <EmployeeCreateForm />
    </VStack>
  );
}

export default EmployeeCreatePage;
