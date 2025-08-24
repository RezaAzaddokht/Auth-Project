import { z } from "zod";

// Validate Iranian mobile number format: starts '09' + 9 digits
export const phoneSchema = z
  .string()
  .regex(/^09\d{9}$/, { message: "Invalid Iranian mobile number. Must start with 09 and be 11 digits." });

export const authFormSchema = z.object({
  phoneNumber: phoneSchema,
});