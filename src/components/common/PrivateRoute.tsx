import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../modules/Auth/context";
import { MainLayout } from "../layout/MainLayout";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={"/sign-in"} />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
};
