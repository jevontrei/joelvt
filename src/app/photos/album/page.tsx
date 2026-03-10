"use client";

import { Photo } from "@/generated/prisma/client";
import Image from "next/image";

type PhotoAlbumProps = {
  photos: Photo[];
};

export default function PhotoAlbum({ photos }: PhotoAlbumProps) {
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
    </div>
  );
}
