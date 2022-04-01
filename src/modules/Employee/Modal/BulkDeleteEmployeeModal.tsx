import { Box, Button, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/hooks";
import { ActionStatus } from "../../../models";
import { selectBulkDeleteStatus } from "../selector";

function BulkDeleteEmployeeModal({ onCancel, onOk }: { onOk: () => void; onCancel: () => void }) {
  const bulkDeleteStatus = useAppSelector(selectBulkDeleteStatus);

  useEffect(() => {
    if (bulkDeleteStatus === ActionStatus.SUCCESS) {
      onCancel();
    }
  }, [bulkDeleteStatus]);

  return (
    <VStack spacing={5} alignItems={"stretch"}>
      <Text>{"Are you sure you want to delete this information? "}</Text>
      <Box display={"flex"} justifyContent={"end"}>
        <Button mr={3} onClick={onCancel}>
          Close
        </Button>
        <Button
          loadingText="Deleting"
          isLoading={bulkDeleteStatus === ActionStatus.PENDING}
          colorScheme="red"
          onClick={onOk}
        >
          Delete
        </Button>
      </Box>
    </VStack>
  );
}

export default BulkDeleteEmployeeModal;
