import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type LoginFormType, loginSchema } from "@/schemas/loginSchema"
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi"
import React from "react"
import { login } from "@/services/auth.service"
import { useMutation } from "@tanstack/react-query"
// import { useLocation, useNavigate } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import type { AxiosError } from "axios"
import toast from "react-hot-toast"

export const useLogin = () => {
  // const location = useLocation()
  // continue redirect logic later
  // const from = location.state?.from?.pathname || "/"
  const navigate = useNavigate()
  type LoginErrorResponse = {
    message: string
    errors: serverErrors
  }
  type serverErrors = {
    [key: string]: string[]
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
  })

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

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      localStorage.setItem("authToken", response?.data?.token)
      localStorage.setItem("userData", JSON.stringify(response?.data?.user))
      console.log("data is fetched", response)

      if (response) {
        navigate("/")
      }
      toast.success(response?.data?.message)
    },
    onError: (error: AxiosError<LoginErrorResponse>) => {
      console.log(error)
      const serverErrors = error?.response?.data?.errors
      if (serverErrors) {
        Object.keys(serverErrors).forEach((key) => {
          setError(key as keyof LoginFormType, {
            message: serverErrors[key][0],
          })
        })
      }
    },
  })
  const onSubmit = (data: LoginFormType) => {
    console.log("onSubmit called", data)
    mutate(data)
  }

  return {
    handleSubmit,
    onSubmit,
    inputs,
    isPending,
  }
}
