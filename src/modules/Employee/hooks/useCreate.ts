import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectIsCreatingEmployee } from "../selector";
import { employeeActions } from "../slice";
import { CreatePayload } from "../types";

export const useCreate = () => {
  const dispatch = useAppDispatch();
  const isCreating = useAppSelector(selectIsCreatingEmployee);

  const create = (values: CreatePayload) => {
    dispatch(employeeActions.create(values));
  };

  return {
    isCreating,
    create,
  };
};
