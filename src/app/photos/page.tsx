"use client";

import { getPhotosAction } from "@/actions/get-s3-photos-action";
import PhotoAlbum from "@/components/photo-album";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SeedPhotosAction } from "@/actions/seed-photos-action";
import { toast } from "sonner";
import { Camera, Sprout } from "lucide-react";
import { Photo } from "@/generated/prisma/client";

export default function Page() {
  const [isPending, setIsPending] = useState(false);
  const [dbIsEmpty, setDbIsEmpty] = useState(false);
  const [myPhotos, setMyPhotos] = useState<Photo[] | null>(null);

  async function handleSeedDbSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsPending(true);

    try {
      toast.info("Seeding database...");
      const start = Date.now();
      const { error, count } = await SeedPhotosAction();

      if (error) {
        console.error(">> [seed-photos-action] Failed to seed photos:", error);
        toast.error(error);
        return;
      }

      if (!count || count === 0) {
        setDbIsEmpty(true);
        toast.info("Database is empty!");
        return;
      } else {
        setDbIsEmpty(false);
      }

      // only runs if no error
      const ms = Date.now() - start;
      toast.success(`Database seeded in ${Math.floor(ms / 1000)} seconds`);
    } catch (err) {
      console.error(">> Error from my-photos.tsx:", err);
      toast.error(`Network error: ${err}`);
    } finally {
      // always re-enable button
      setIsPending(false);
    }
  }

  async function getPhotos(album: string) {
    toast.info(`Getting photos from ${album}...`);
    // get photos metadata from db
    const { error, data } = await getPhotosAction(album);

    if (error || !data) {
      console.error(">> Error from photos/page.tsx");
      return <div>Error loading photos: {error}</div>;
    }

    setMyPhotos(data);
    return data;
  }

  const albums = [
    {
      name: "Photos of Jess Taking Photos",
      location: "jessTakingPhotos",
    },
    {
      name: "Asia, 2025-26",
      location: "travel_2025-26",
    },
  ];

  // use  metadata to display s3 photos (using urls)
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-4xl my-8 mx-4">Photos</h3>

      {albums.map((album, i) => (
        <Button
          key={i}
          className="m-2"
          onClick={() => getPhotos(album.location)}
        >
          <Camera />
          {album.name}
        </Button>
      ))}

      {myPhotos && <PhotoAlbum photos={myPhotos} />}

      <form
        onSubmit={handleSeedDbSubmit}
        className="mt-16 space-y-2 flex flex-col items-center"
      >
        <p className="text-sm">Photos looking empty?</p>
        <p className="text-sm">
          If you&apos;ve got 30 seconds, seed the database!
        </p>
        <Button className="w-52" disabled={isPending}>
          <Sprout />
          {isPending ? "Thinking..." : "Seed database"}
        </Button>
      </form>
    </div>
  );
}
