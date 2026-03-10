"use server";

import seedData from "@/seed-photos.json" assert { type: "json" };
import { prisma } from "@/lib/prisma-neon";
import { Photo } from "@/generated/prisma/client";

type SeedPhotoType = {
  title: string;
  album: string;
  description: string;
  s3_url: string;
  s3_key: string;
  display_order: number;
};

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
    const photos: SeedPhotoType[] = [];

    // if this is too slow, can try using Promise.all()
    for (const photo of seedData) {
      if (!photo.id) {
        // could rating here possibly be missing? try it - try seeding with a missing rating
        continue;
      }

      photos.push({
        title: photo["title"],
        album: photo["album"],
        description: photo["description"],
        s3_url: photo["s3_url"],
        s3_key: photo["s3_key"],
        display_order: photo["display_order"],
      });
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
