import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "../components/layout/MainLayout";
import { Home } from "../pages/home/Home";
import SignUpPage from "@/pages/auth/signup/SignUpPage";
import WelcomePage from "@/pages/auth/welcome/WelcomePage";
import LoginPage from "@/pages/auth/login/LoginPage";
import ForgotPassword from "@/pages/auth/passwordManagementPages/ForgotPassword";
import OTPVerification from "@/pages/auth/passwordManagementPages/OTPVerification";
import FlightBooking from "@/pages/flight-booking/FlightBooking";
import SeatBookingPage from "@/pages/flight-booking/SeatBookingPage";
import AuthLayout from "@/components/layout/AuthLayout";
import Destination from "@/pages/destination/Destination";
import HotelPage from "@/pages/hotel/HotelPage";
import HotelAboutPage from "@/pages/hotel/HotelAboutPage";
import { Favorites } from "@/pages/favourite/Favorites";
import { Provider } from "react-redux";

import { store } from "@/store";
import BoardingPassPage from "@/pages/flight-booking/BoardingPassPage";
import FilterPanelPage from "@/pages/flight-booking/FilterPanelPage";
import { FlightBookingForm } from "@/pages/flight-booking/FlightBookingForm";
import PaymentPage from "@/components/checkout/PaymentPage";
import SuccessPage from "@/components/checkout/pages/SuccessPage";
import ErrorPage from "@/components/checkout/pages/ErrorPage";

import CarsPage from "@/pages/cars";
import CarDetailsPage from "@/pages/cars/details";
import PickUpPage from "@/pages/cars/pickup";
import ProfileSettings from "@/components/profile/ProfileSettings";
import CompareToursPage from "@/pages/compare/CompareToursPage";
import Search from "@/pages/Search/Search";
import { PersonalInformation } from "@/components/profile";
import { AccountSecurity } from "@/components/profile/AccountSecurity";
import NewPassword from "@/pages/auth/passwordManagementPages/NewPassword";
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
          <Route path="payment/:id" element={<PaymentPage />} />
          <Route path="payment/success" element={<SuccessPage />} />
          <Route path="payment/error/:paymentId" element={<ErrorPage />} />
          <Route path="/destination" element={<Destination />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route index element={<Navigate to="/welcome" replace />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="otp-verify" element={<OTPVerification />} />
          <Route path="new-password" element={<NewPassword />} />
          {/* <Route path="success" element={<ResetPassSuccess />} /> */}
        </Route>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verify" element={<OTPVerification />} />
        <Route path="/flight-booking" element={<FlightBooking />} />
        <Route path="/seat-booking" element={<SeatBookingPage />} />
        <Route path="/hotel" element={<HotelPage />} />
        <Route path="/hotel/:hotelId" element={<HotelAboutPage />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="favorite" element={<Favorites />} />
          <Route path="compare" element={<CompareToursPage />} />
          <Route
            path="search"
            element={
              <div className="pt-27.5 p-8">
                <Search />
              </div>
            }
          />
          <Route
            path="maps"
            element={
              <div className="pt-27.5 p-8">
                <h1>Maps Page</h1>
              </div>
            }
          />
          <Route path="payment/:id" element={<PaymentPage />} />
          <Route path="payment/success" element={<SuccessPage />} />
          <Route path="payment/error/:paymentId" element={<ErrorPage />} />
        </Route>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="welcome" element={<WelcomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route index element={<Navigate to="forgot-password" replace />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="otp-verify" element={<OTPVerification />} />
          <Route path="new-password" element={<NewPassword />} />
          {/* <Route path="success" element={<ResetPassSuccess />} /> */}
        </Route>
        <Route path="/flight-booking" element={<FlightBooking />} />
        <Route path="/seat-booking" element={<SeatBookingPage />} />
        <Route path="/boarding-pass" element={<BoardingPassPage />} />
        <Route path="/filter-panel" element={<FilterPanelPage />} />
        <Route path="/flight-form" element={<FlightBookingForm />} />
        <Route path="/hotel" element={<HotelPage />} />
        <Route path="hotel/:hotelId" element={<HotelAboutPage />} />
        <Route path="hotel/:hotelId/:tab" element={<HotelAboutPage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:id" element={<CarDetailsPage />} />
        <Route path="/cars/:id/pick-up" element={<PickUpPage />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/personal-info" element={<PersonalInformation />} />
        <Route path="/security" element={<AccountSecurity />} />
      </Routes>
    </Provider>
  );
}
