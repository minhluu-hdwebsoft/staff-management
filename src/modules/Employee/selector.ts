import { RootState } from "../../app/store";

export const selectEmployeeList = (state: RootState) => state.employee.employeeList.results;
export const selectEmployeeListId = (state: RootState) => state.employee.employeeList.results.map((item) => item.id);
export const selectEmployeeById = (state: RootState, id: string) =>
  state.employee.employeeList.results.find((item) => item.id === id);
export const selectTotalEmployee = (state: RootState) => state.employee.employeeList.count;
export const selectIsFetchingEmployee = (state: RootState) => state.employee.isFetching;
