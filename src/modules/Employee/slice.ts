import { Employee, EmployeeQueryParams } from "@hdwebsoft/intranet-api-sdk/libs/api/hr/models";
import { Pagination } from "@hdwebsoft/intranet-api-sdk/libs/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterParams } from "../../models";

interface EmployeeState {
  isFetching: boolean;
  employeeList: Pagination<Employee>;
  errorMessage?: string;
}

const initialState: EmployeeState = {
  isFetching: false,
  employeeList: {
    results: [],
    previous: undefined,
    count: 0,
    next: undefined,
  },
  errorMessage: "",
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getList: (state: EmployeeState, action: PayloadAction<FilterParams<EmployeeQueryParams>>) => {
      state.isFetching = true;
    },
    fetchListSuccess: (state: EmployeeState, action: PayloadAction<Pagination<Employee>>) => {
      state.isFetching = false;
      state.employeeList = action.payload;
    },
    fetchFailture: (state: EmployeeState, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    },
  },
});

export const employeeActions = employeeSlice.actions;

export default employeeSlice.reducer;
