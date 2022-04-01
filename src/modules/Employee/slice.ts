/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  CreateEmployeeParam,
  Employee,
  EmployeeQueryParams,
  UpdateEmployeeParam,
} from "@hdwebsoft/intranet-api-sdk/libs/api/hr/models";
import { Pagination } from "@hdwebsoft/intranet-api-sdk/libs/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ActionStatus, FilterParams } from "../../models";

interface EmployeeState {
  isFetching: boolean;
  isCreating: boolean;
  isEditing: boolean;
  bulkDeleteStatus: ActionStatus;
  selectedEmployeeIds: string[];
  deletingEmployee: {
    [key: string]: {
      status: ActionStatus;
    };
  };
  employeeList: Pagination<Employee>;
  errorMessage: string;
  selectedEmployee: Employee | undefined;
}

const initialState: EmployeeState = {
  isFetching: false,
  isCreating: false,
  isEditing: false,
  bulkDeleteStatus: ActionStatus.IDLE,
  selectedEmployeeIds: [],
  selectedEmployee: undefined,
  deletingEmployee: {},
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
    fetchList: (state: EmployeeState, action: PayloadAction<FilterParams<EmployeeQueryParams> | undefined>) => {
      state.isFetching = true;
      state.deletingEmployee = {};
      state.bulkDeleteStatus = ActionStatus.IDLE;
    },
    fetchListSuccess: (state: EmployeeState, action: PayloadAction<Pagination<Employee>>) => {
      state.isFetching = false;
      state.employeeList = action.payload;
    },
    fetchFailture: (state: EmployeeState, action: PayloadAction<string>) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    },
    fetchEmployeeById: (state: EmployeeState, action: PayloadAction<string>) => {
      state.isFetching = true;
    },
    fetchEmployeeByIdSuccess: (state: EmployeeState, action: PayloadAction<Employee>) => {
      state.isFetching = false;
      state.selectedEmployee = action.payload;
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
    delete: (state: EmployeeState, action: PayloadAction<string>) => {
      state.deletingEmployee[action.payload] = {
        status: ActionStatus.PENDING,
      };
    },
    deleteSuccess: (state: EmployeeState, action: PayloadAction<string>) => {
      state.deletingEmployee[action.payload].status = ActionStatus.SUCCESS;
    },
    deleteFailture: (state: EmployeeState, action: PayloadAction<string>) => {
      state.deletingEmployee[action.payload].status = ActionStatus.FAILTURE;
    },
    addSelectEmployee: (state: EmployeeState, action: PayloadAction<string>) => {
      state.selectedEmployeeIds.push(action.payload);
    },
    removeSelectEmployee: (state: EmployeeState, action: PayloadAction<string>) => {
      state.selectedEmployeeIds = state.selectedEmployeeIds.filter((item) => item !== action.payload);
    },
    cleanAllSelectEmployee: (state: EmployeeState) => {
      state.selectedEmployeeIds = [];
    },
    bulkDelete: (state: EmployeeState) => {
      state.bulkDeleteStatus = ActionStatus.PENDING;
      state.deletingEmployee = state.selectedEmployeeIds.reduce(
        (result, item) => ({ ...result, [item]: { status: ActionStatus.PENDING } }),
        {},
      );
    },
    bulkDeleteSuccess: (state: EmployeeState) => {
      state.bulkDeleteStatus = ActionStatus.SUCCESS;
      state.deletingEmployee = state.selectedEmployeeIds.reduce(
        (result, item) => ({ ...result, [item]: { status: ActionStatus.SUCCESS } }),
        {},
      );
      state.selectedEmployeeIds = [];
    },
    bulkDeleteFailture: (state: EmployeeState, action: PayloadAction<string>) => {
      state.bulkDeleteStatus = ActionStatus.FAILTURE;
      state.errorMessage = action.payload;
      state.deletingEmployee = state.selectedEmployeeIds.reduce(
        (result, item) => ({ ...result, [item]: { status: ActionStatus.FAILTURE } }),
        {},
      );
    },
  },
});

export const employeeActions = employeeSlice.actions;

export default employeeSlice.reducer;
