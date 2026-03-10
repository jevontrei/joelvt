"use server";

import { prisma } from "@/lib/prisma-neon";
import { Photo } from "@/generated/prisma/client";
import { notifyDiscord } from "./notify-discord-action";

type dbQuerySuccessType = {
  error: null;
  data: Photo[];
};

type dbQueryErrorType = {
  error: string;
  data: null;
};

type dbQueryType = dbQuerySuccessType | dbQueryErrorType;

export async function getPhotosAction(album: string): Promise<dbQueryType> {
  try {
    // first get photos metadata from postgres
    const dbResponse = await prisma.photo.findMany({
      where: {
        album: album,
      },
      orderBy: { display_order: "asc" },
      // orderBy: { orientation: "asc" },
    });

    await notifyDiscord(
      `Photos metadata db queried: ${dbResponse.length} photos found`,
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
