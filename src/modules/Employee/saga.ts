import { Employee, EmployeeQueryParams } from "@hdwebsoft/intranet-api-sdk/libs/api/hr/models";
import { Pagination } from "@hdwebsoft/intranet-api-sdk/libs/type";
import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "../../api";
import { FilterParams } from "../../models";
import { employeeActions } from "./slice";

// ASYNC
async function fetchEmployeeList(action: PayloadAction<FilterParams<EmployeeQueryParams>>) {
  try {
    const { q, queryParams, order, page, limit } = action.payload;
    return await api.hr.employee.list(q, queryParams, order, page, limit);
  } catch (error) {
    throw error;
  }
}

// WORKER
function* workerFetchList(action: PayloadAction<FilterParams<EmployeeQueryParams>>) {
  try {
    const response: Pagination<Employee> = yield call(fetchEmployeeList, action);
    if (response) {
      yield put(employeeActions.fetchListSuccess(response));
    }
  } catch (error: any) {
    yield put(employeeActions.fetchFailture(error.message ? error.message : "Unknow error"));
  }
}

// WATCHER
function* watcherFetchList() {
  yield takeLatest(employeeActions.getList.type, workerFetchList);
}

export default function* employeeSaga() {
  console.log("Run Employee Saga !");
  yield all([watcherFetchList()]);
}
