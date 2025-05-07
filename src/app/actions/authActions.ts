"use server";
import { prisma } from "@/lib/prisma";
import { signUpSchema } from "@/lib/zod";
import bcryptjs from "bcryptjs";

export async function handleSignUp({
  name,
  email,
  password,
  confirmPassword,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const parsedCredentials = signUpSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!parsedCredentials.success) {
      return { success: false, message: "Invalid data." };
    }

    // check if the email is already taken
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists. Login to continue.",
      };
    }

    // hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return createdUser;
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
