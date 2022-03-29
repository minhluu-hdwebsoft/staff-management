import { VStack } from "@chakra-ui/react";
import React from "react";
import { CustomBreadcrumb } from "../components/custom";
import EmployeeList from "../modules/Employee/List/EmployeeList";

function EmployeeListPage() {
  return (
    <VStack spacing={5} justifyContent="stretch" alignItems={"stretch"}>
      <CustomBreadcrumb />
      {/* <InputGroup maxWidth={600} minWidth={400} w="full">
        <InputLeftElement pointerEvents="none">
          <AiOutlineSearch />
        </InputLeftElement>
        <Input type="text" placeholder="Search ..." />
      </InputGroup> */}
      {/* <div>EmployeeListPage</div> */}
      <EmployeeList />
    </VStack>
  );
}

export default EmployeeListPage;
