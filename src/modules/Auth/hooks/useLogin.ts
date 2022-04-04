import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "utils/toast";
import { useAuth } from "../Context";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { authProvider, setAuthState } = useAuth();

  const login = async (username: string, password: string) => {
    try {
      setIsLoading(true);
      await authProvider.login(username, password);
      const identity = await authProvider.getIdentity();
      setAuthState(true, identity);
      navigate("/");
      toast({
        title: "Sign in Success",
        description: "Welcome to Staff Management System",
        status: "success",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Sign in Failture",
          description: error.message ? error.message : "Unknow error",
          status: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, login };
};
