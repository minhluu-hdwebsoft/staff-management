import {
  CreateEmployeeParam,
  EmployeeQueryParams,
  UpdateEmployeeParam,
} from "@hdwebsoft/intranet-api-sdk/libs/api/hr/employee/models";
import { FilterParams } from "models";

export type EmployeeFilterParams = FilterParams<EmployeeQueryParams>;

export interface DeletePayload {
  id: string;
  filter: EmployeeFilterParams;
}

export interface CreatePayload {
  avatar: undefined | File;
  data: CreateEmployeeParam;
}

export interface UpdatePayload {
  avatar: undefined | File;
  data: UpdateEmployeeParam;
}
