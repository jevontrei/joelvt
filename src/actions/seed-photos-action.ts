"use server";

import seedData from "@/seed-photos.json" assert { type: "json" };
import { prisma } from "@/lib/prisma-neon";
import { Photo } from "@/generated/prisma/client";

type SeedActionSuccessType = {
  error: null;
  // createMany() just returns a count
  count: number;
};

type SeedActionErrorType = {
  error: string;
  count: null;
};

type SeedActionResultType = SeedActionSuccessType | SeedActionErrorType;

export type SeedJsonType = {
  title: string;
  rating: number;
};

export async function SeedPhotosAction(): Promise<SeedActionResultType> {
  try {
    const photos: Photo[] = [];

    // if this is too slow, can try using Promise.all()
    for (const photos of seedData) {
      if (!photos.id) {
        // could rating here possibly be missing? try it - try seeding with a missing rating
        continue;
      }
    }

    // add photos to db
    const dbResponse = await prisma.photo.createMany({
      data: photos,
      skipDuplicates: true,
    });

    // return data to browser
    return { error: null, count: dbResponse.count };
  } catch (err) {
    // log full error details for debugging
    console.error(">> Error while seeding photos:", err);

    if (err instanceof Error) {
      return { error: err.message, count: null };
    }

    return { error: "Unexpected error occurred", count: null };
  }
}
