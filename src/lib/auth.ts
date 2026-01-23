import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  // need to do all the prisma/db setup first, before we set up better auth, so that better auth knows what we're using and what tables to generate etc
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
});
