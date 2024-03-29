import {
  Avatar,
  Center,
  Checkbox,
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
import { FiCheck, FiEdit2, FiEye, FiMoreVertical, FiTrash2, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { useModal } from "../../../hooks";
import { ActionStatus } from "../../../models";
import DeleteEmployeeModal from "../Modal/DeleteEmployeeModal";
import { selectedEmployeeDeletingStatus, selectEmployeeById, selectIsEmployeeSelected } from "../selector";

interface EmployeeListItemProps {
  id: string;
  onDelete?: (id: string) => void;
  onCheck?: (id: string, isChecked: boolean) => void;
}

const renderIconButton = (deleteStatus: ActionStatus) => {
  const props = {
    colorScheme: "gray",
    icon: <FiMoreVertical />,
  };

  switch (deleteStatus) {
    case ActionStatus.SUCCESS:
      props.colorScheme = "green";
      props.icon = <FiCheck />;
      break;
    case ActionStatus.SUCCESS:
      props.colorScheme = "red";
      props.icon = <FiX />;
      break;
    default:
      break;
  }

  return (
    <IconButton
      size={"sm"}
      aria-label="more-button"
      icon={props.icon}
      colorScheme={props.colorScheme}
      isActive={!Boolean(deleteStatus)}
      isLoading={deleteStatus === ActionStatus.PENDING}
    />
  );
};

export default function EmployeeListItem({ id, onDelete, onCheck }: EmployeeListItemProps) {
  const { open, close } = useModal();

  const employee = useAppSelector((state) => selectEmployeeById(state, id));
  const deleteStatus = useAppSelector((state) => selectedEmployeeDeletingStatus(state, id));
  const isSelected = useAppSelector((state) => selectIsEmployeeSelected(state, id));
  const navigate = useNavigate();
  if (!employee) return null;

  const displayName = `${employee.first_name} ${employee.last_name}`;

  const handleOnpenDeleteModal = () => {
    open({
      title: `Remove ${displayName}`,
      content: (
        <DeleteEmployeeModal
          employee={employee}
          onOk={() => {
            onDelete && onDelete(id);
          }}
          onCancel={close}
        />
      ),
      footer: null,
      size: "xl",
    });
  };

  return (
    <Tr key={employee.id}>
      <Td>
        <Checkbox
          size="lg"
          colorScheme="blue"
          isChecked={isSelected}
          onChange={(e) => {
            onCheck && onCheck(id, e.target.checked);
          }}
        />
      </Td>
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
          {deleteStatus ? (
            renderIconButton(deleteStatus)
          ) : (
            <Popover trigger="hover">
              <PopoverTrigger>{renderIconButton(deleteStatus)}</PopoverTrigger>
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
                        onClick={handleOnpenDeleteModal}
                      />
                    </Tooltip>
                  </PopoverHeader>
                </PopoverContent>
              </Portal>
            </Popover>
          )}
        </Center>
      </Td>
    </Tr>
  );
}
