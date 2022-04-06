import api from "api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import toast from "utils/toast";
import { CreatePayload } from "../types";

const createEmployee = (employee: CreatePayload) => api.hr.employee.create(employee.data);

export const useCreate = () => {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(createEmployee, {
    onSuccess: () => {
      toast({
        title: "Create Employee Success",
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

  const create = (values: CreatePayload) => {
    mutate(values);
  };

  return {
    isCreating: isLoading,
    create,
  };
};
