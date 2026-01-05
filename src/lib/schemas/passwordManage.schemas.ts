import z from "zod";

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
  newPassword: z
    .string()
    .min(8,"Password must be at least 8 char")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/, "Password must contain one special char"),

confirmPassword: z
      .string()
      .min(1, { message: "Please confirm password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
