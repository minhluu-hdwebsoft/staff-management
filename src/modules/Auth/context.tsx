import { useToast } from "@chakra-ui/react";
import { UserRegisterParams } from "@hdwebsoft/intranet-api-sdk/libs/api/auth/models";
import { User } from "@hdwebsoft/intranet-api-sdk/libs/api/user/models";
import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";

interface AuthContextType {
  currentUser: User | undefined;
  isAuthenticated: boolean;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  register: (values: UserRegisterParams) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const currentUser = useRef<User>();
  const isAuthenticated = useRef<boolean>(false);

  // console.log(navigate("/"));

  useEffect(() => {
    async function getAuthenticate() {
      try {
        isAuthenticated.current = await api.auth.isAuthenticated();
        currentUser.current = await api.user.me();
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
      navigate("/admin");
      toast({
        title: "Sign in Success",
        description: "Welcome to Staff Management System",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    } catch (error: any) {
      toast({
        title: "Sign in Failture",
        description: error.message ? error.message : "Unknow error",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
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
    return <h1>Loading</h1>;
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

// export const useDisclosure = (defaultValue: boolean) => {
//   const [isOpen, setIsOpen] = useState(defaultValue || false);

//   const onOpen = () => {
//     setIsOpen(true);
//   };
//   const onClose = () => {
//     setIsOpen(false);
//   };

//   return {
//     isOpen,
//     onOpen,
//     onClose,
//   };
// };
