import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context";

export const useLogout = () => {
  const navigate = useNavigate();
  const { authProvider, setAuthState } = useAuth();

  const logout = async () => {
    await authProvider.logout();
    setAuthState(false);
    navigate("/");
  };

  return logout;
};
