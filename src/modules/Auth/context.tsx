import React, { ReactElement, useContext, useState } from "react";

interface AuthContextType {
  isLogin: boolean;
  signIn: () => void;
  signOut: () => void;
}
const AuthContext = React.createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const authLocalStorage = localStorage.getItem("author");
  const [isLogin, setIsLogin] = useState<boolean>(Boolean(authLocalStorage));

  const signOut = () => {
    localStorage.removeItem("author");
    setIsLogin(false);
  };

  const signIn = () => {
    localStorage.setItem("author", "login");
    setIsLogin(true);
  };
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isLogin,
      }}
    >
      {children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
