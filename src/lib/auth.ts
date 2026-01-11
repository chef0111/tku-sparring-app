import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { tanstackStartCookies } from "better-auth/tanstack-start";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  emailAndPassword: {
    enabled: true,
  },
  experimental: { joins: true },
  advanced: {
    database: {
      generateId: false,
    },
  },
  plugins: [tanstackStartCookies()],
});
