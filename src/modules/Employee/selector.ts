import { RootState } from "../../app/store";

export const selectEmployeeList = (state: RootState) => state.employee.employeeList.results;
export const selectEmployeeListId = (state: RootState) => state.employee.employeeList.results.map((item) => item.id);
export const selectEmployeeById = (state: RootState, id: string) =>
  state.employee.employeeList.results.find((item) => item.id === id);

export const selectTotalEmployee = (state: RootState) => state.employee.employeeList.count;

export const selectIsFetchingEmployee = (state: RootState) => state.employee.isFetching;
export const selectIsCreatingEmployee = (state: RootState) => state.employee.isCreating;
export const selectIsEditingEmployee = (state: RootState) => state.employee.isEditing;
export const selectBulkDeleteStatus = (state: RootState) => state.employee.bulkDeleteStatus;

export const selectedEmployee = (state: RootState) => state.employee.selectedEmployee;
export const selectSelectedEmployeeIds = (state: RootState) => state.employee.selectedEmployeeIds;
export const selectIsEmployeeSelected = (state: RootState, employeeId: string) =>
  Boolean(state.employee.selectedEmployeeIds.find((item) => item === employeeId));
export const selectedEmployeeDeletingStatus = (state: RootState, employeeId: string) =>
  state.employee.deletingEmployee[employeeId]?.status;
