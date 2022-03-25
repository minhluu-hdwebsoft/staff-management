import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./pages/MainLayout";
import SignInPage from "./pages/SignInPage";
import SignupPage from "./pages/SignupPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/admin"} />} />
      <Route path="/sign-in" element={<SignInPage />} />
      <Route path="/sign-up" element={<SignupPage />} />
      <Route path="/admin" element={<MainLayout />} />
    </Routes>
  );
};
