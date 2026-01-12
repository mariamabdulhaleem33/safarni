import z from "zod";

export const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/

export const ForgotPassSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .length(4, "OTP must be 4 digits")
    .regex(/^\d+$/, "OTP must be numbers only"),
});

export const newPassSchema = z.object({
  password: z
    .string()
    .min(8,"Password must be at least 8 char")
    .regex(passwordRegex, {
    message:
      "Password must contain uppercase, lowercase, number, and special character",
  }),

password_confirmation: z
      .string()
      .min(1, { message: "Please confirm password" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });
