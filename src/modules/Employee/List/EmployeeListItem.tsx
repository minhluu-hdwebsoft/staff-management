import {
  Avatar,
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
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { selectEmployeeById } from "../selector";

interface EmployeeListItemProps {
  id: string;
  onDelete?: (id: string) => void;
}

export default function EmployeeListItem({ id, onDelete }: EmployeeListItemProps) {
  const employee = useAppSelector((state) => selectEmployeeById(state, id));
  const navigate = useNavigate();
  if (!employee) return null;

  const displayName = `${employee.first_name} ${employee.last_name}`;

  return (
    <Tr key={employee.id}>
      <Td></Td>
      <Td>
        <HStack spacing={3}>
          <Avatar name={displayName} src={employee.avatar} />
          <span>{displayName}</span>
        </HStack>
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
                    <IconButton
                      size={"sm"}
                      aria-label="edit"
                      colorScheme={"green"}
                      icon={<FiEdit2 />}
                      onClick={() => navigate(`/employee/${id}/edit`)}
                    />
                  </Tooltip>
                  <Tooltip label="View">
                    <IconButton
                      size={"sm"}
                      aria-label="view"
                      colorScheme={"blue"}
                      icon={<FiEye />}
                      onClick={() => navigate(`/employee/${id}`)}
                    />
                  </Tooltip>
                  <Tooltip label="Delete">
                    <IconButton
                      size={"sm"}
                      aria-label="delete"
                      colorScheme={"red"}
                      icon={<FiTrash2 />}
                      onClick={() => onDelete && onDelete(id)}
                    />
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
