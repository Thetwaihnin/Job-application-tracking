import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const existingUser = await db.user.findUnique({
          where: { email: credentials?.email },
        });
        if (!existingUser) {
          console.log(existingUser)
          return null;
        }

        const matchingPassword = await compare(
          credentials.password,
          existingUser.password
        );
        if (!matchingPassword) {
          return null;
        }

        return {
          id: existingUser.id + "",
          name: existingUser.name ?? "",
          email: existingUser.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // console.log("jwt token", token,user,session)
      if (user) {
        return {
          ...token,
          username: user.name,
        };
      }
      return token;
    },
    async session({ session, token}) {
      if (session.user) {
        // console.log("session user", session.user, token);
        session.user.name = token.username as string;
        session.user.id = token.sub as string;
      }
      // console.log("session id", session.user.id);
      return session;
    },
  },
};

export default NextAuth(authOptions);
