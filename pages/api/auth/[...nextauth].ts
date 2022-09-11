import { NextApiHandler } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";

import prisma from "../../../lib/prisma";
import AuthService from "../../../service/auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: AuthService.authorize,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
  },
};

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;
