import { Box, Button, Input, Text, Tooltip, useClipboard, VStack } from "@chakra-ui/react";
import { Employee } from "@hdwebsoft/intranet-api-sdk/libs/api/hr/models";
import React, { useEffect, useState } from "react";
import { FloatFormControl } from "../../../components/custom";
import { ActionStatus } from "../../../models";
import { useDelete } from "../hooks";

function DeleteEmployeeModal({
  employee,
  onCancel,
  onOk,
}: {
  employee: Employee;
  onOk: () => void;
  onCancel: () => void;
}) {
  const [inputValue, setInputValue] = useState<string>("");
  const { hasCopied, onCopy } = useClipboard(employee.email);
  const { deleteStatus } = useDelete(employee.id);

  useEffect(() => {
    if (deleteStatus === ActionStatus.SUCCESS) {
      onCancel();
    }
  }, [deleteStatus]);

  return (
    <VStack spacing={5} alignItems={"stretch"}>
      <Text>
        {"You're about to permanently delete your "}
        <Tooltip label={hasCopied ? "Copied" : "Copy"}>
          <Text as={"strong"} onClick={onCopy} cursor={"pointer"}>
            {employee.email}
          </Text>
        </Tooltip>
        {". This will also delete any references to your employee."}
      </Text>
      <FloatFormControl label="Type email address below to delete your employee">
        <Input value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder={employee.email} />
      </FloatFormControl>
      <Box display={"flex"} justifyContent={"end"}>
        <Button mr={3} onClick={onCancel}>
          Close
        </Button>
        <Button
          loadingText="Deleting"
          isLoading={deleteStatus === ActionStatus.PENDING}
          isDisabled={inputValue !== employee.email}
          colorScheme="red"
          onClick={onOk}
        >
          Delete
        </Button>
      </Box>
    </VStack>
  );
}

export default DeleteEmployeeModal;
