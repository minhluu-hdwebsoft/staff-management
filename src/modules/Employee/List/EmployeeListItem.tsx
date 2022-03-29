import { Avatar, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectEmployeeById } from "../selector";

interface EmployeeListItemProps {
  id: string;
}

export default function EmployeeListItem({ id }: EmployeeListItemProps) {
  const employee = useAppSelector((state) => selectEmployeeById(state, id));
  if (!employee) return null;

  const displayName = `${employee.first_name} ${employee.last_name}`;

  return (
    <Tr key={employee.id}>
      <Td>
        <Avatar name={displayName} src={employee.avatar} />
      </Td>
      <Td>{displayName}</Td>
      <Td isNumeric>{employee.code}</Td>
      <Td>{employee.email}</Td>
      <Td>{employee.phone}</Td>
      <Td>Skill</Td>
    </Tr>
  );
}
