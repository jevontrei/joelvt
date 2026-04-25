"use server";

import { prisma } from "@/lib/prisma-neon";
import { LickOccurrence } from "@/generated/prisma/client"; // "client" = Prisma's library name, not client-side code (works on server too)
import { notifyDiscord } from "./notify-discord-action";

type DeleteLickOccurrenceSuccessType = {
  error: null;
  // what should this be? -> it should be LickOccurrence, bc the prisma.delete() function returns THE DELETED LICKOCCURRENCE OBJECT!
  data: LickOccurrence;
};

type DeleteLickOccurrenceErrorType = {
  error: string;
  data: null;
};

type DeleteLickOccurrenceType =
  | DeleteLickOccurrenceSuccessType
  | DeleteLickOccurrenceErrorType;

export async function DeleteLickOccurrenceAction(
  lickOccurrenceId: string,
): Promise<DeleteLickOccurrenceType> {
  try {
    // first, get lickOccurrence from db (we need access to the current db situation)
    const lickOccurrence = await prisma.lickOccurrence.findUnique({
      where: { id: lickOccurrenceId },
    });

    // need this for race conditions etc
    if (!lickOccurrence) {
      return {
        error: `LickOccurrence with id ${lickOccurrenceId} not found`,
        data: null,
      };
    }

    // then delete lickOccurrence from db
    // what exactly does this return?? ohh it returns the deleted lickOccurrence object
    const dbResponse = await prisma.lickOccurrence.delete({
      where: { id: lickOccurrenceId },
    });

    await notifyDiscord(
      `LickOccurrence deleted: ${dbResponse.lickId}, ${dbResponse.songId}, ${dbResponse.timestampSecs}`,
    );

    // return data to browser
    return {
      error: null,
      data: dbResponse,
    };
  } catch (err) {
    console.error(">> Error in database fetching/deleting:", err);
    return { error: String(err), data: null };
  }
}
