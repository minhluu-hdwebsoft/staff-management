import { useAppDispatch, useAppSelector } from "app/hooks";
import { useQueryParams } from "hooks/useQueryParams";
import { useEffect, useState } from "react";
import { shallowEqual } from "react-redux";
import { selectEmployeeListId, selectIsFetchingEmployee, selectTotalEmployee } from "../selector";
import { employeeActions } from "../slice";
import { EmployeeFilterParams } from "../types";

export const useFetchAllEmployee = () => {
  const dispatch = useAppDispatch();
  const { query, updateParams } = useQueryParams<EmployeeFilterParams>();

  const [filter, setFilter] = useState<EmployeeFilterParams>({
    ...query,
    page: query?.page || 1,
    limit: query?.limit || 10,
    order: query?.order || "",
  });

  const employeeList = useAppSelector(selectEmployeeListId, shallowEqual);
  const totalItem = useAppSelector(selectTotalEmployee);
  const isFetching = useAppSelector(selectIsFetchingEmployee);

  useEffect(() => {
    updateParams(filter);
    dispatch(employeeActions.fetchList(filter));
  }, [filter]);

  return {
    employeeList,
    totalItem,
    isFetching,
    filter,
    setFilter,
  };
};
