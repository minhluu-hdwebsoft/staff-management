import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoadingPage } from "./components/common/LoadingPage";
import { PrivateRoute } from "./components/common/PrivateRoute";
const EmployeeCreatePage = React.lazy(() => import("./pages/EmployeeCreatePage"));
const EmployeeEditPage = React.lazy(() => import("./pages/EmployeeEditPage"));
const EmployeeViewPage = React.lazy(() => import("./pages/EmployeeViewPage"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const EmployeeListPage = React.lazy(() => import("./pages/EmployeeListPage"));
const SignInPage = React.lazy(() => import("./pages/SignInPage"));
const SignupPage = React.lazy(() => import("./pages/SignupPage"));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<Navigate to={"/admin"} />} />
        <Route path="sign-in" element={<SignInPage />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employee">
            <Route index element={<EmployeeListPage />} />
            <Route path="create" element={<EmployeeCreatePage />} />
            <Route path=":id">
              <Route path="edit" element={<EmployeeEditPage />} />
              <Route index element={<EmployeeViewPage />} />
            </Route>
          </Route>
          <Route path="*" element={"Nothing"} />
        </Route>
      </Routes>
    </Suspense>
  );
};
