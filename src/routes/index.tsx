import { Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { Home } from "../pages/home/Home";
import SignUpPage from "@/pages/auth/signup/SignUpPage";
import WelcomePage from "@/pages/auth/welcome/WelcomePage";
import LoginPage from "@/pages/auth/login/LoginPage";
import ForgotPassword from "@/pages/password-management/ForgotPassword";
import OTPVerification from "@/pages/password-management/OTPVerification";
import FlightBooking from "@/pages/flight-booking/FlightBooking";
import SeatBookingPage from "@/pages/flight-booking/SeatBookingPage";
import HotelPage from "@/pages/hotel/HotelPage";
import HotelAboutPage from "@/pages/hotel/HotelAboutPage";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function AppRoutes() {
  return (
    <Provider store={store}>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route
          path="favorite"
          element={
            <div className="pt-[110px] p-8">
              <h1>Favorite Page</h1>
            </div>
          }
        />
        <Route
          path="compare"
          element={
            <div className="pt-[110px] p-8">
              <h1>Compare Page</h1>
            </div>
          }
        />
        <Route
          path="maps"
          element={
            <div className="pt-[110px] p-8">
              <h1>Maps Page</h1>
            </div>
          }
        />
      </Route>
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/otp-verify" element={<OTPVerification />} />
      <Route path="/flight-booking" element={<FlightBooking />} />
      <Route path="/seat-booking" element={<SeatBookingPage />} />
      <Route path="/hotel" element={<HotelPage />} />
      <Route path="hotel/:hotelId" element={<HotelAboutPage />} />
        <Route path="hotel/:hotelId/:tab" element={<HotelAboutPage />} />
    </Routes>
    </Provider>
  );
}
