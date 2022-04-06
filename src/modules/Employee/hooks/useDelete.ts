import api from "api";
import { useAppDispatch } from "app/hooks";
import { useQueryParams } from "hooks/useQueryParams";
import { ActionStatus } from "models";
import { useMutation, useQueryClient } from "react-query";
import toast from "utils/toast";
import { employeeActions } from "../slice";
import { EmployeeFilterParams } from "../types";

const queryStatus = {
  error: ActionStatus.FAILTURE,
  idle: ActionStatus.IDLE,
  loading: ActionStatus.PENDING,
  success: ActionStatus.SUCCESS,
};

export const useDelete = (id?: string) => {
  const { query } = useQueryParams<EmployeeFilterParams>();
  const queryClient = useQueryClient();
  const { mutate: deleteMutate, status } = useMutation(
    () => {
      if (id) {
        return api.hr.employee.delete(id);
      }
      return Promise.resolve();
    },
    {
      onSuccess: () => {
        toast({
          title: "Delete employee success",
          status: "success",
        });
        queryClient.invalidateQueries("employeeList");
      },
      onError: (error: Error) => {
        toast({
          title: "Delete employee fail",
          status: "success",
          description: error.message ? error.message : "Unknow error",
        });
      },
    },
  );

  const dispatch = useAppDispatch();

  const deleteEmployee = () => {
    deleteMutate();
  };

  const bulkDelete = () => {
    dispatch(employeeActions.bulkDelete(query));
  };

  return {
    deleteStatus: queryStatus[status],
    deleteEmployee,
    bulkDelete,
  };
};
