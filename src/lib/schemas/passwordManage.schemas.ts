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
