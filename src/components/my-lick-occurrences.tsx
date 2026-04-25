"use client";

import { QueryLickOccurrencesDbAction, LickOccurrenceWithRelations } from "@/actions/query-lick-occurrences-db-action";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function MyLickOccurrences() {
  const [myLickOccurrences, setMyLickOccurrences] = useState<
    LickOccurrenceWithRelations[] | null
  >(null);

  // this loads the db on page load
  useEffect(() => {
    toast.info("Querying database...");

    // can't use await directly inside useEffect(), so we create an async fn INSIDE useEffect()
    const callDbQueryer = async () => {
      try {
        const { error, data } = await QueryLickOccurrencesDbAction();

        if (error) {
          toast.error(error);
          return;
        }
        if (!data || data.length === 0) {
          toast.info("Database is empty!");
          return;
        }
        setMyLickOccurrences(data);

        // only runs if no error
        toast.success("Database fetched!");
      } catch (err) {
        console.error(">> Error from my-lick-occurrences.tsx:", err);
        toast.error(`Network error: ${err}`);
      }
    };
    callDbQueryer();
  }, []); // empty array as 2nd arg => run once on mount

  return (
    <div className="mb-8 mx-4 flex flex-col items-center space-y-2">
      {myLickOccurrences && (
        <div className="mt-2 max-h-128 overflow-x-auto overflow-y-auto border rounded">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                <th className="text-left">Lick</th>
                <th className="text-center">Song</th>
                <th className="text-center">Artist</th>
                <th className="text-center">Timestamp (seconds)</th>
                <th className="text-center">Audio</th>
              </tr>
            </thead>
            <tbody>
              {myLickOccurrences.map((lickOccurrence) => (
                <tr key={lickOccurrence.id} className="even:bg-gray-50">
                  <td>{lickOccurrence.lick.name}</td>
                  <td>{lickOccurrence.song.title}</td>
                  <td>{lickOccurrence.song.artist}</td>
                  <td>{lickOccurrence.timestampSecs}</td>
                  <td>
                    <audio
                      controls
                      preload="none"
                      src={lickOccurrence.audioUrl}
                    ></audio>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
