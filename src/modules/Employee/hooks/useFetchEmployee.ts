import { Employee } from "@hdwebsoft/intranet-api-sdk/libs/api/hr/models";
import api from "api";
import { useQuery } from "react-query";

export const useFetchEmployee = (id: string) => {
  const { isFetching, data: employee } = useQuery<Employee>(["employee", id], () => api.hr.employee.get(id));

  return {
    employee,
    isFetching,
  };
};
