import { useAuth } from "modules/Auth/Context";
import React, { Suspense } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { MainLayout } from "../layout/MainLayout";
import { LoadingPage } from "./LoadingPage";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage />;
  }

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
