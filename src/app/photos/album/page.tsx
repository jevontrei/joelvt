"use client";

import { SeedPhotosAction } from "@/actions/seed-photos-action";
import { Button } from "@/components/ui/button";
import { Photo } from "@/generated/prisma/client";
import { Sprout } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export default function JessTakingPhotos(photos: Photo) {
  const [isPending, setIsPending] = useState(false);
  const [dbIsEmpty, setDbIsEmpty] = useState(false);

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

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 p-8">
        {Array.from(photos).map((photo) => (
          <div key={photo.id}>
            <Image
              src={photo.s3_url}
              alt={photo.title || "Photo"}
              width={400}
              height={400}
              className="object-cover h-auto"
            />
            <p className="pt-1">{photo.description}</p>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSeedDbSubmit}
        className="mt-16 space-y-2 flex flex-col items-center"
      >
        <p className="text-sm">Database looking empty?</p>
        <p className="text-sm">If you&apos;ve got 30 seconds, seed it!</p>
        <Button className="w-52" disabled={isPending}>
          <Sprout />
          {isPending ? "Thinking..." : "Seed database"}
        </Button>
      </form>
    </div>
  );
}
