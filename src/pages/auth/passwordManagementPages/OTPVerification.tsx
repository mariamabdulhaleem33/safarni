import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupFormType } from "@/schemas/signupSchema";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { firebaseSignup } from "@/services/auth.service";
import React from "react";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";

export const useSignup = () => {
  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
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
      placeholder: "example@email.com",
      register: register("email"),
      error: errors.email,
      icon: React.createElement(HiOutlineMail, { className: ICON_STYLE }),
    },
    {
      id: "password",
      label: "Password",
      type: "password",
      placeholder: "********",
      register: register("password"),
      error: errors.password,
      icon: React.createElement(HiOutlineLockClosed, {
        className: ICON_STYLE,
      }),
    },
    {
      id: "password_confirmation",
      label: "Confirm Password",
      type: "password",
      placeholder: "********",
      register: register("password_confirmation"),
      error: errors.password_confirmation,
      icon: React.createElement(HiOutlineLockClosed, {
        className: ICON_STYLE,
      }),
    },
  ];

  const { mutate, isPending } = useMutation({
    mutationFn: firebaseSignup,
    onSuccess: (data, variables) => {
      toast.success("Verification email sent");

      navigate("/auth/otp-verify", {
        state: {
          uid: data.uid,
          email: variables.email,
        },
      });
    },
    onError: (error: any) => {
      toast.error(error.message || "Signup failed");
    },
  });

  const onSubmit = (data: SignupFormType) => {
    mutate(data);
  };

  return {
    handleSubmit,
    onSubmit,
    inputs,
    hasPasswordError,
    passwordValue,
    isPending,
  };
};
