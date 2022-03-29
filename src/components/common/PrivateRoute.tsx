import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../modules/Auth/context";
import { MainLayout } from "../layout/MainLayout";
import { LoadingPage } from "./LoadingPage";

export const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={"/sign-in"} />;
  }

  return (
    <MainLayout>
      <Suspense fallback={<LoadingPage />}>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};
