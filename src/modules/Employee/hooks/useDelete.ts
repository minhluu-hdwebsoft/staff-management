import { useAppDispatch, useAppSelector } from "app/hooks";
import { useQueryParams } from "hooks/useQueryParams";
import { ActionStatus } from "models";
import { selectedEmployeeDeletingStatus } from "../selector";
import { employeeActions } from "../slice";
import { EmployeeFilterParams } from "../types";

export const useDelete = (id?: string) => {
  const { query } = useQueryParams<EmployeeFilterParams>();
  const dispatch = useAppDispatch();
  const deleteStatus = id ? useAppSelector((state) => selectedEmployeeDeletingStatus(state, id)) : ActionStatus.IDLE;

  const deleteEmployee = () => {
    if (id) dispatch(employeeActions.delete({ id, filter: query }));
  };

  const bulkDelete = () => {
    dispatch(employeeActions.bulkDelete(query));
  };

  return {
    deleteStatus,
    deleteEmployee,
    bulkDelete,
  };
};
