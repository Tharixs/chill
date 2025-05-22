"use server";
import { prisma } from "@/lib/prisma";
import { generateSecureToken } from "@/lib/utils";
import { signUpSchema } from "@/lib/zod";
import bcryptjs from "bcryptjs";
import { sendEmail } from "./email-actions";
import VerificationTemplate from "@/components/verifivation-template";
import { signIn } from "next-auth/react";
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

    // send email verification
    const emailVerificationToken = generateSecureToken();

    await prisma.user.update({
      where: {
        id: createdUser?.id,
      },
      data: {
        email_verify_token: emailVerificationToken,
      },
    });

    await sendEmail({
      to: [createdUser?.email],
      subject: "Verifikasi Email",
      react: (
        <VerificationTemplate
          email={createdUser?.email}
          emailVerificationToken={`${process.env.NEXT_PUBLIC_API_URL}/verify-email?token=${emailVerificationToken}`}
        />
      ),
    });

    return {
      success: true,
      message:
        "Akun berhasil dibuat. Silahkan cek email Anda untuk verifikasi.",
    };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}

export async function handleSignin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    if (!user.email_verified) {
      return {
        success: false,
        message: "Email belum diverifikasi.",
      };
    }

    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false, // jangan redirect otomatis
    });

    if (result?.ok && !result?.error) {
      return {
        success: true,
        message: "Berhasil login.",
      };
    } else {
      return {
        success: false,
        message: "Email atau password salah!",
      };
    }
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
