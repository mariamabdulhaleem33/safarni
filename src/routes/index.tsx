import ForgotPassword from "@/pages/password-management/ForgotPassword";
import OTPVerification from "@/pages/password-management/OTPVerification";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="otp-verify" element={<OTPVerification />} />
    </Routes>
  );
}
