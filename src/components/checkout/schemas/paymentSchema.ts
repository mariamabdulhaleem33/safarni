// src/schemas/paymentSchema.ts
import * as z from "zod";
// =============
// Paypal Schema
// =============
export const paypalSchema = z.object({
  fullName: z.string().min(3, "name should be at least 3 characters long"),
  email: z.string().email("invalid email address"),
});
export type PaypalFormData = z.infer<typeof paypalSchema>;
// =================
// MasterCard Schema
// =================
export const mastercardSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  validDate: z.string().refine((val) => {
    const [day, month, year] = val.split("/").map(Number);
    const expiryDate = new Date(year, month - 1, day);
    return expiryDate > new Date();
  }, "The card has expired or the date is invalid : ex:18/1/2018"),
  cvv: z
    .string()
    .length(3, "CVV must be 3 digits")
    .regex(/^\d+$/, "CVV must contain numbers only"),
});
export type MasterCardData = z.infer<typeof mastercardSchema>;
// =================
// Visa Schema
// =================
export const visacardSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  validDate: z.string().refine((val) => {
    const [day, month, year] = val.split("/").map(Number);
    const expiryDate = new Date(year, month - 1, day);
    return expiryDate > new Date();
  }, "The card has expired or the date is invalid : ex:18/1/2018"),
  cvv: z
    .string()
    .length(3, "CVV must be 3 digits")
    .regex(/^\d+$/, "CVV must contain numbers only"),
});
export type VisaCardData = z.infer<typeof visacardSchema>;
