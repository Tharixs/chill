import Credentials from "next-auth/providers/credentials";
import { prisma } from "./lib/prisma";
import bcryptjs from "bcryptjs";
import { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    role: string; // Menambahkan properti `role`
  }

  interface Session {
    user: {
      id: string;
      email: string;
      role: string; // Pastikan `role` ada di sesi
    };
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    id: string;
    email: string;
    role: string; // Menambahkan properti `role` pada AdapterUser
  }
}

const authConfig: NextAuthOptions = {
  // Ganti ke NextAuthOptions
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        // Validasi kredensial menggunakan prisma dan bcryptjs
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        if (!user || !user.password) {
          return null; // atau throw error, tergantung logika bisnis
        }

        const isValid = bcryptjs.compare(
          credentials?.password || "",
          user.password
        );
        if (!isValid) {
          return null;
        }

        // Menghapus password sebelum mengembalikan user
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }

      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      session.user.email = token.email as string;
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};

export default authConfig;
