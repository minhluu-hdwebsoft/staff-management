import { VStack } from "@chakra-ui/react";
import React from "react";
import { CustomBreadcrumb } from "../components/custom";
import EmployeeEditForm from "../modules/Employee/Form/EmployeeEdit";

function EmployeeEditPage() {
  return (
    <VStack spacing={5} justifyContent="stretch" alignItems={"stretch"}>
      <CustomBreadcrumb />
      <EmployeeEditForm />
    </VStack>
  );
}

export default EmployeeEditPage;
