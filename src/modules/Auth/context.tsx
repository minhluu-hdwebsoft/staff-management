/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRegisterParams } from "@hdwebsoft/intranet-api-sdk/libs/api/auth/models";
import { User } from "@hdwebsoft/intranet-api-sdk/libs/api/user/models";
import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { LoadingPage } from "../../components/common/LoadingPage";
import toast from "../../utils/toast";

interface AuthContextType {
  currentUser: User | undefined;
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (values: UserRegisterParams) => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const navigate = useNavigate();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const currentUser = useRef<User>();
  const isAuthenticated = useRef<boolean>(false);

  useEffect(() => {
    async function getAuthenticate() {
      try {
        if (await api.auth.getAuthToken()) {
          await api.auth.refreshToken();
        }
        const [isAuth, user] = await Promise.all([api.auth.isAuthenticated(), api.user.me()]);
        isAuthenticated.current = isAuth;
        currentUser.current = user;
      } catch (error) {
        isAuthenticated.current = false;
      } finally {
        setIsLoadingUser(true);
      }
    }
    getAuthenticate();
  }, []);

  const signOut = async () => {
    await api.auth.logout();
    isAuthenticated.current = false;
    navigate("/");
  };

  const signIn = async (username: string, password: string) => {
    try {
      await api.auth.login(username, password);
      isAuthenticated.current = true;
      currentUser.current = await api.user.me();
      navigate("/");
      toast({
        title: "Sign in Success",
        description: "Welcome to Staff Management System",
        status: "success",
      });
    } catch (error: any) {
      toast({
        title: "Sign in Failture",
        description: error.message ? error.message : "Unknow error",
        status: "error",
      });
    } finally {
      Promise.resolve;
    }
  };

  const register = async (values: UserRegisterParams): Promise<void> => {
    values.code = "7000";
    try {
      await api.auth.register(values);
      toast({
        title: "Sign up Success",
        description: "Welcome to HDWEBSOFT",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      navigate("/sign-in");
    } catch (error: any) {
      toast({
        title: "Sign up Failture",
        description: error.message ? error.message : "Unknow error",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } finally {
      Promise.resolve();
    }
  };

  if (!isLoadingUser) {
    return <LoadingPage />;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated.current,
        currentUser: currentUser.current,
        signIn,
        signOut,
        register,
      }}
    >
      {children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
