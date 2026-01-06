import { z } from "zod"

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const signupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" }),

  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .regex(passwordRegex, {
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    }),
})

export type SignupFormType = z.infer<typeof signupSchema>
