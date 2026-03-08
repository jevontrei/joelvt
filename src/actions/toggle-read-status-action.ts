"use server";

import { prisma } from "@/lib/prisma-neon";
import { Book } from "@/generated/prisma/client"; // "client" = Prisma's library name, not client-side code (works on server too)
import { notifyDiscord } from "./notify-discord-action";

type ToggleStatusSuccessType = {
  error: null;
  // what should this be?
  data: Book;
};

type ToggleStatusErrorType = {
  error: string;
  data: null;
};

type ToggleStatusType = ToggleStatusSuccessType | ToggleStatusErrorType;

export async function ToggleReadStatusAction(
  bookId: string,
): Promise<ToggleStatusType> {
  try {
    // first, get book from db (we need access to its read status)
    const book = await prisma.book.findUnique({ where: { id: bookId } });

    // need this for race conditions etc
    if (!book) {
      return { error: `Book with id ${bookId} not found`, data: null };
    }

    // then update book in db
    // in case you're wondering, yes this returns the whole book object
    const dbResponse = await prisma.book.update({
      where: { id: bookId },
      data: { read: !book.read },
    });

    await notifyDiscord(
      // this logic looks backwards but it's because we're flipping the EXISTING status
      `Book watch status updated: ${book.title} is ${!book.read ? "read" : "unread"}`,
    );

    // return data to browser
    return {
      error: null,
      data: dbResponse,
    };
  } catch (err) {
    console.log(">> Error in database fetching:", err);
    return { error: String(err), data: null };
  }
}
