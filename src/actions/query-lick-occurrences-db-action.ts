"use server";

import { prisma } from "@/lib/prisma-neon";
import { LickOccurrence } from "@/generated/prisma/client"; // "client" = Prisma's library name, not client-side code (works on server too)
import { notifyDiscord } from "./notify-discord-action";

type DbQuerySuccessType = {
  error: null;
  data: LickOccurrence[];
};

type DbQueryErrorType = {
  error: string;
  data: null;
};

type DbQueryType = DbQuerySuccessType | DbQueryErrorType;

export async function QueryLickOccurrencesDbAction(): Promise<DbQueryType> {
  try {
    const dbResponse = await prisma.lickOccurrence.findMany();

    await notifyDiscord(
      `LickOccurrences db queried: ${dbResponse.length} lickOccurrences found`,
    );

    // return data to browser
    return {
      error: null,
      data: dbResponse,
    };
  } catch (err) {
    console.error(">> Error in database fetching:", err);
    return { error: String(err), data: null };
  }
}
