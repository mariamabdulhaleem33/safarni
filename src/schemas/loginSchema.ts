import { z } from "zod"

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, "Email is required")
    .email("Please enter a valid email address"),

  password: z.string().min(1, "Password is required").regex(passwordRegex, {
    message:
      "Password must contain uppercase, lowercase, number, and special character",
  }),
})

export type LoginFormType = z.infer<typeof loginSchema>
