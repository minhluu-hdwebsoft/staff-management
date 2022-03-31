/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateEmployeeParam,
  Employee,
  EmployeeQueryParams,
  UpdateEmployeeParam,
} from "@hdwebsoft/intranet-api-sdk/libs/api/hr/models";
import { UploadFile } from "@hdwebsoft/intranet-api-sdk/libs/api/upload/models";
import { Pagination } from "@hdwebsoft/intranet-api-sdk/libs/type";
import { PayloadAction } from "@reduxjs/toolkit";
import { all, call, put, takeLatest } from "redux-saga/effects";
import api from "../../api";
import { FilterParams } from "../../models";
import history from "../../utils/history";
import toast from "../../utils/toast";
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

async function fetchEmployeeById(action: PayloadAction<string>) {
  try {
    const id = action.payload;
    return await api.hr.employee.get(id);
  } catch (error) {
    throw error;
  }
}

async function createEmployee(data: CreateEmployeeParam) {
  try {
    return await api.hr.employee.create(data);
  } catch (error) {
    throw error;
  }
}

async function updateEmployee(data: UpdateEmployeeParam) {
  try {
    return await api.hr.employee.update(data);
  } catch (error) {
    throw error;
  }
}

async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    return await api.uploadFile.uploadImage(formData);
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
    toast({
      title: error.message ? error.message : "Unknow error",
      status: "error",
    });
    yield put(employeeActions.fetchFailture(error.message ? error.message : "Unknow error"));
  }
}

function* workerFetchById(action: PayloadAction<string>) {
  try {
    const response: Employee = yield call(fetchEmployeeById, action);
    if (response) {
      yield put(employeeActions.fetchEmployeeByIdSuccess(response));
    }
  } catch (error: any) {
    toast({
      title: error.message ? error.message : "Unknow error",
      status: "error",
    });
    yield put(employeeActions.fetchFailture(error.message ? error.message : "Unknow error"));
  }
}

function* workerCreate(action: PayloadAction<{ avatar: undefined | File; data: CreateEmployeeParam }>) {
  try {
    const { avatar, data } = action.payload;
    const uploadReponse: UploadFile = avatar ? yield call(uploadImage, avatar) : undefined;
    const response: Employee = yield call(createEmployee, {
      ...data,
      avatar: uploadReponse ? `https://intranet.dev2.hdwebsoft.co/media${uploadReponse.file_path}` : undefined,
    });

    if (response) {
      yield put(employeeActions.createSuccess());
      toast({
        title: "Create Employee Success",
        status: "success",
      });
      history.push("/employee");
    }
  } catch (error: any) {
    toast({
      title: error.message ? error.message : "Unknow error",
      status: "error",
    });
    yield put(employeeActions.createfailture(error.message ? error.message : "Unknow error"));
  }
}

function* workerUpdate(action: PayloadAction<{ avatar: undefined | File; data: UpdateEmployeeParam }>) {
  try {
    const { avatar, data } = action.payload;
    const uploadReponse: UploadFile = avatar ? yield call(uploadImage, avatar) : undefined;
    const response: Employee = yield call(updateEmployee, {
      ...data,
      avatar: uploadReponse ? `https://intranet.dev2.hdwebsoft.co/media${uploadReponse.file_path}` : undefined,
    });

    if (response) {
      yield put(employeeActions.updateSuccess());
      toast({
        title: "Update Employee Success",
        status: "success",
      });
      history.push("/employee");
    }
  } catch (error: any) {
    toast({
      title: error.message ? error.message : "Unknow error",
      status: "error",
    });
    yield put(employeeActions.updatefailture(error.message ? error.message : "Unknow error"));
  }
}

// WATCHER
function* watcher() {
  yield takeLatest(employeeActions.getList.type, workerFetchList);
  yield takeLatest(employeeActions.create.type, workerCreate);
  yield takeLatest(employeeActions.update.type, workerUpdate);
  yield takeLatest(employeeActions.fetchEmployeeById.type, workerFetchById);
}

export default function* employeeSaga() {
  console.log("Run Employee Saga !");
  yield all([watcher()]);
}
