import { z } from "zod"

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

export const signupSchema = z
  .object({
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
        message: "Invalid phone number format",
      }),

    password_confirmation: z
      .string()
      .min(1, { message: "password must be at least 8 charcater" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Please ensure both passwords are identical",
    path: ["password_confirmation"],
  })

export type SignupFormType = z.infer<typeof signupSchema>
