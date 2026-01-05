import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type LoginFormType, loginSchema } from "@/schemas/loginSchema"
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi"
import React from "react"

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  })

  const onSubmit = (data: LoginFormType) => {
    console.log("Login Data:", data)
  }

  const ICON_STYLE = "text-gray-500 text-lg"

  const inputs = [
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
  ]

  return {
    handleSubmit,
    onSubmit,
    inputs,
  }
}
