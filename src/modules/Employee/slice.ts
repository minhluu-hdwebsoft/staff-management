/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateEmployeeParam,
  Employee,
  EmployeeQueryParams,
  UpdateEmployeeParam,
} from "@hdwebsoft/intranet-api-sdk/libs/api/hr/models";
import { Pagination } from "@hdwebsoft/intranet-api-sdk/libs/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterParams } from "../../models";

interface EmployeeState {
  isFetching: boolean;
  isCreating: boolean;
  isEditing: boolean;
  employeeList: Pagination<Employee>;
  errorMessage: string;
  selectedEmployee: Employee | undefined;
}

const initialState: EmployeeState = {
  isFetching: false,
  isCreating: false,
  isEditing: false,
  selectedEmployee: undefined,
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
    create: (state: EmployeeState, action: PayloadAction<{ avatar: undefined | File; data: CreateEmployeeParam }>) => {
      state.isCreating = true;
    },
    createSuccess: (state: EmployeeState) => {
      state.isCreating = false;
    },
    createfailture: (state: EmployeeState, action: PayloadAction<string>) => {
      state.isCreating = false;
      state.errorMessage = action.payload;
    },
    fetchEmployeeById: (state: EmployeeState, action: PayloadAction<string>) => {
      state.isFetching = true;
    },
    fetchEmployeeByIdSuccess: (state: EmployeeState, action: PayloadAction<Employee>) => {
      state.isFetching = false;
      state.selectedEmployee = action.payload;
    },
    update: (state: EmployeeState, action: PayloadAction<{ avatar: undefined | File; data: UpdateEmployeeParam }>) => {
      state.isCreating = true;
    },
    updateSuccess: (state: EmployeeState) => {
      state.isCreating = false;
    },
    updatefailture: (state: EmployeeState, action: PayloadAction<string>) => {
      state.isCreating = false;
      state.errorMessage = action.payload;
    },
  },
});

export const employeeActions = employeeSlice.actions;

export default employeeSlice.reducer;
