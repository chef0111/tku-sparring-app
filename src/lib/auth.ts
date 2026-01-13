import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";
import { username } from "better-auth/plugins";
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
  plugins: [
    username({
      minUsernameLength: 3,
      displayUsernameValidator: (displayUsername) => {
        return /^[a-zA-Z0-9_-]+$/.test(displayUsername);
      },
      validationOrder: {
        username: "post-normalization",
        displayUsername: "post-normalization",
      },
    }),
    tanstackStartCookies(),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
