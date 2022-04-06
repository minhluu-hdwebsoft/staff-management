import api from "api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import toast from "utils/toast";
import { UpdatePayload } from "../types";

const updateEmployee = (employee: UpdatePayload) => api.hr.employee.update(employee.data);

export const useUpdate = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(updateEmployee, {
    onSuccess: () => {
      toast({
        title: "Update Employee Success",
        status: "success",
      });
      navigate("/employee");
    },
    onError: (error: Error) => {
      toast({
        title: error.message ? error.message : "Unknow error",
        status: "error",
      });
    },
  });

  const update = (values: UpdatePayload) => {
    mutate(values);
  };

  return {
    isUpdating: isLoading,
    update,
  };
};
