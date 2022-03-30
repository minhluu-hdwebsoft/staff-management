import {
  Avatar,
  Box,
  Center,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Td,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { FiEdit2, FiEye, FiMoreVertical, FiTrash2 } from "react-icons/fi";
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
      <Td></Td>
      <Td>
        <Avatar name={displayName} src={employee.avatar} />
        <span>{displayName}</span>
      </Td>
      <Td isNumeric>{employee.code}</Td>
      <Td>{employee.email}</Td>
      <Td>{employee.phone}</Td>
      <Td>Skill</Td>
      <Td>Skill</Td>
      <Td>Skill</Td>
      <Td>Skill</Td>
      <Td>
        <Center>
          <Popover trigger="hover">
            <PopoverTrigger>
              <IconButton size={"sm"} aria-label="more-button" icon={<FiMoreVertical />} />
            </PopoverTrigger>
            <Portal>
              <PopoverContent width={"auto"}>
                <PopoverArrow />
                <PopoverHeader as={HStack} spacing={3}>
                  <Tooltip label="Edit">
                    <IconButton size={"sm"} aria-label="edit" colorScheme={"green"} icon={<FiEdit2 />} />
                  </Tooltip>
                  <Tooltip label="View">
                    <IconButton size={"sm"} aria-label="view" colorScheme={"blue"} icon={<FiEye />} />
                  </Tooltip>
                  <Tooltip label="Delete">
                    <IconButton size={"sm"} aria-label="delete" colorScheme={"red"} icon={<FiTrash2 />} />
                  </Tooltip>
                </PopoverHeader>
              </PopoverContent>
            </Portal>
          </Popover>
        </Center>
      </Td>
    </Tr>
  );
}
