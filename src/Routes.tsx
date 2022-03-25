import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/common/PrivateRoute";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/admin"} />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/admin" element={<PrivateRoute />}>
        <Route index element={<h1>Admin Page</h1>} />
      </Route>
    </Routes>
  );
};
