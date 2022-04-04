import { useAppDispatch, useAppSelector } from "app/hooks";
import { selectIsEditingEmployee } from "../selector";
import { employeeActions } from "../slice";
import { UpdatePayload } from "../types";

export const useUpdate = () => {
  const dispatch = useAppDispatch();
  const isUpdating = useAppSelector(selectIsEditingEmployee);

  const update = (values: UpdatePayload) => {
    dispatch(employeeActions.update(values));
  };

  return {
    isUpdating,
    update,
  };
};
