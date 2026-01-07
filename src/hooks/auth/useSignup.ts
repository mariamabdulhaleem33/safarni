import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type SignupFormType, signupSchema } from "@/schemas/signupSchema"
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi"
import { IoPersonOutline } from "react-icons/io5"
import React from "react"

export const useSignup = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormType>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  })
  const passwordValue = watch("password", "")
  const hasPasswordError = !!errors.password

  const onSubmit = (data: SignupFormType) => {
    console.log("Form Data:", data)
  }

  const ICON_STYLE = "text-gray-500 text-lg"

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
  ]

  return {
    handleSubmit,
    onSubmit,
    inputs,
    hasPasswordError,
    errors,
    passwordValue,
  }
}
