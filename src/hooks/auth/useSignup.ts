import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SignupFormType, signupSchema } from "@/schemas/signupSchema";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { signup } from "@/services/auth.service";
type SignUpErrorResponse = {
  message: string;
  errors: serverErrors;
};
type serverErrors = {
  [key: string]: string[];
};
export const useSignup = () => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
  });

  const passwordValue = watch("password", "");

  const hasPasswordError = !!errors.password;

  const ICON_STYLE = "text-gray-500 text-lg";

  const inputs = [
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Hussain Abdelkawy",
      register: register("name"),
      error: errors.name,
      icon: React.createElement(IoPersonOutline, { className: ICON_STYLE }),
    },
    {
      id: "email",
      label: "Email",
      type: "email",
      placeholder: "kneeDue@untitledui.com",
      register: register("email"),
      error: errors.email,
      icon: React.createElement(HiOutlineMail, { className: ICON_STYLE }),
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "************",
      register: register("password"),
      error: errors.password,
      icon: React.createElement(HiOutlineLockClosed, { className: ICON_STYLE }),
    },
    {
      id: "password_confirmation",
      label: "Confirm Password",
      type: "password",
      placeholder: "************",
      register: register("password_confirmation"),
      error: errors.password_confirmation,
      icon: React.createElement(HiOutlineLockClosed, { className: ICON_STYLE }),
    },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: (_data, variables) => {
      console.log("data is fetched", _data);
      console.log(variables.email)
      console.log(_data.data.user_id)
      if (_data) {
        navigate("/auth/otp-verify", { state: { id: _data?.data.user_id , email: variables.email, source:"signup"} });
      }
    },
    onError: (error: AxiosError<SignUpErrorResponse>) => {
      console.log(error);
      const serverErrors = error?.response?.data?.errors;
      if (serverErrors) {
        Object.keys(serverErrors).forEach((key) => {
          setError(key as keyof SignupFormType, {
            message: serverErrors[key][0],
          });
        });
      }
    },
  });
  const onSubmit = (data: SignupFormType) => {
    console.log("onSubmit called", data);
    mutate(data);
  };
  return {
    handleSubmit,
    onSubmit,
    inputs,
    hasPasswordError,
    errors,
    passwordValue,
    isPending,
  };
};
