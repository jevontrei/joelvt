import Image from "next/image";
import { getPhotosAction } from "@/actions/get-s3-photos-action";

export default async function Page() {
  // get photos metadata from db
  const { error, data } = await getPhotosAction();

  if (error || !data) {
    console.error(">> Error from photos/page.tsx");
    return <div>Error loading photos: {error}</div>;
  }

  // use  metadata to display s3 photos (using urls)
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-4xl mt-8 mx-4">Asia, 2025-26</h2>

      <div className="grid grid-cols-2 gap-4 p-8">
        {data.map((photo) => (
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
