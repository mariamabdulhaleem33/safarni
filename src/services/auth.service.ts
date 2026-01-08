import api from "@/api/axios"
import type { LoginFormType } from "@/schemas/loginSchema"
import type { SignupFormType } from "@/schemas/signupSchema"

export const signup = async (data: SignupFormType) => {
  const response = await api.post("register", {
    full_name: data.name,
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation,
  })
  console.log(response.data)
  return response.data
}
export const login = async (data: LoginFormType) => {
  const response = await api.post("login", {
    email: data.email,
    password: data.password,
  })
  console.log(response.data)
  return response.data
}
