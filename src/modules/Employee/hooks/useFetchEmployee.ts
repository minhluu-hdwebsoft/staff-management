import { useAppDispatch, useAppSelector } from "app/hooks";
import { useEffect } from "react";
import { selectedEmployee, selectIsFetchingEmployee } from "../selector";
import { employeeActions } from "../slice";

export const useFetchEmployee = (id: string) => {
  const dispatch = useAppDispatch();

  const employee = useAppSelector(selectedEmployee);
  const isFetching = useAppSelector(selectIsFetchingEmployee);

  const fetchEmployee = (id: string) => {
    dispatch(employeeActions.fetchEmployeeById(id));
  };

  useEffect(() => {
    fetchEmployee(id);
  }, [id]);

  return {
    employee,
    isFetching,
  };
};
