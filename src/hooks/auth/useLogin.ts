
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormType } from "@/schemas/loginSchema"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import { login } from "@/services/auth.service"
import type { User } from "firebase/auth"
import React from "react"
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi"

export const useLogin = () => {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({
    resolver: zodResolver(loginSchema),
  })

  const ICON_STYLE = "text-gray-500 text-lg"

  const inputs = [
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
  ]

  const { mutate, isPending } = useMutation<User, Error, LoginFormType>({
    mutationFn: login,
    onSuccess: async (user) => {
      if (!user.emailVerified) {
        toast.error("Please verify your email first")
        return
      }

      const token = await user.getIdToken()
      localStorage.setItem("Token", token)
      localStorage.setItem(
        "userData",
        JSON.stringify({
          uid: user.uid,
          email: user.email,
        })
      )

      toast.success("Logged in successfully")
      navigate("/")
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (data: LoginFormType) => {
    mutate(data)
  }

  return {
    handleSubmit,
    onSubmit,
    inputs,
    isPending,
  }
}