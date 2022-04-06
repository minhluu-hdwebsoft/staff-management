import api from "api";
import { useQueryParams } from "hooks/useQueryParams";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { EmployeeFilterParams } from "../types";

export const useFetchAllEmployee = () => {
  const { query, updateParams } = useQueryParams<EmployeeFilterParams>();

  const [filter, setFilter] = useState<EmployeeFilterParams>({
    ...query,
    page: query?.page || 1,
    limit: query?.limit || 10,
    order: query?.order || "",
  });

  const { data, isFetching, isLoading, refetch } = useQuery(
    ["employeeList", filter],
    () => {
      return api.hr.employee.list(filter.q, filter.queryParams, filter.order, filter.page, filter.limit);
    },
    {
      // staleTime: 30000,
      keepPreviousData: true,
    },
  );

  useEffect(() => {
    updateParams(filter);
    // refetch();
  }, [filter]);

  return {
    employeeList: data?.results.map((item) => item.id) || [],
    totalItem: data?.count || 0,
    isFetching: isFetching || isLoading,
    filter,
    setFilter,
  };
};
