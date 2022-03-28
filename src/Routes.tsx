import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoadingPage } from "./components/common/LoadingPage";
import { PrivateRoute } from "./components/common/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route path="/" element={<Navigate to={"/admin"} />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/admin" element={<PrivateRoute />}>
          <Route index element={<Dashboard />} />
          {/* <Route index element={<LoadingPage />} /> */}
        </Route>
      </Routes>
    </Suspense>
  );
};
