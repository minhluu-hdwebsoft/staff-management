import api from "api";
import { useQuery } from "react-query";

export const useEmployeeIdentity = (defaultCode: string) => {
  const { isFetching, data, refetch } = useQuery<string>("employeeIndentity", () => api.hr.employee.identity());

  return {
    genarating: isFetching,
    code: data || defaultCode,
    getCode: () => refetch(),
  };
};
