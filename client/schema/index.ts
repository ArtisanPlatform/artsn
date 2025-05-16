import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const registerSchema = z.object({
  name: z.string().min(3, "Name should be at least 3 characters."),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export const profileSchema = z.object({
  firstName: z.string().min(3, "Name should be at least 3 characters").max(20),
  lastName: z
    .string()
    .min(3, "Lastname should be at least 3 characters")
    .max(20),
  email: z.string().email({ message: "Invalid email address" }),
  currentPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  newPassword: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ProfileFormData = z.infer<typeof profileSchema>;
