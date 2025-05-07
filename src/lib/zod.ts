import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password must be at most 32 characters"),
});

export const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "Nama is required" })
      .min(1, "Nama is required"),
    email: z
      .string({ required_error: "Email is required" })
      .min(1, "Email is required")
      .email("Invalid email"),
    password: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters"),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password must be at most 32 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const filmSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  videoUrl: z.string().min(1, "Video URL is required"),
  genreId: z.string().min(1, "Genre is required"),
  maxAge: z.number().min(1, "Max Age is required"),
  totalEpisode: z.number().min(1, "Total Episode is required"),
  rating: z.number().min(1, "Rating is required"),
  type: z.string().min(1, "Type is required"),
  tag: z.string().min(1, "Tag is required"),
});

export const genreSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
