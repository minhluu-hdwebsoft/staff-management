import { Box } from "@chakra-ui/react";
import React from "react";
import { CustomSearchInput } from "../../../../components/custom";

interface EmployeeFilterProps {
  onChange?: (values: { search: string }) => void;
}

function EmployeeFilter({ onChange }: EmployeeFilterProps) {
  const handleSearchInputChange = (value: string) => {
    onChange &&
      onChange({
        search: value,
      });
  };

  return (
    <Box>
      <CustomSearchInput onChange={handleSearchInputChange} />
    </Box>
  );
}

export default EmployeeFilter;
