"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { Movie } from "@/generated/prisma/client";
import { DeleteMovieAction } from "@/actions/delete-movie-action";
import { QueryMoviesDbAction } from "@/actions/query-movies-db-action";
import { ToggleWatchedStatusAction } from "@/actions/toggle-watched-status-action";
import { SeedMoviesAction } from "@/actions/seed-movies-action";
import { Sprout, Trash2 } from "lucide-react";
import Image from "next/image";

// we needed this Record<> type because object keys are usually strings
const ratingColors: Record<number, string> = {
  0: "bg-transparent",
  1: "bg-red-500",
  2: "bg-orange-500",
  3: "bg-yellow-500",
  4: "bg-lime-500",
  5: "bg-green-500",
  6: "bg-blue-500",
  7: "bg-fuchsia-500",
};

// make an array version (shallow copy) for mapping over below
const ratingColorsArray = Object.entries(ratingColors).slice(1, 8);

export default function MyMoviesDb() {
  const [myMovies, setMyMovies] = useState<Movie[] | null>(null);
  const [dbIsEmpty, setDbIsEmpty] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // "useMemo is a React Hook that lets you cache the result of a calculation between re-renders"
  const sortedMovies = useMemo(() => {
    if (!myMovies) return null;

    return [...myMovies].sort((a, b) => {
      // handle null ratings first
      if (a.rating === null) return 1; // send nulls to end
      if (b.rating === null) return -1; // send nulls to end
      // return negative if a should come before b
      // return positive if b should come before a
      // return 0 if equal
      return b.rating - a.rating; // highest rating first
    });
  }, [myMovies]);

  // this loads the db on page load
  useEffect(() => {
    setIsPending(true);

    toast.info("Querying database...");

    // can't use await directly inside useEffect(), so we create an async fn INSIDE useEffect()
    const callDbQueryer = async () => {
      try {
        const { error, data } = await QueryMoviesDbAction();

        if (error) {
          toast.error(error);
          return;
        }
        if (!data || data.length === 0) {
          setDbIsEmpty(true);
          toast.info("Database is empty!");
          return;
        }
        setMyMovies(data);

        // only runs if no error
        toast.success("Database fetched!");
      } catch (err) {
        console.error(">> Error from my-movies.tsx:", err);
        toast.error(`Network error: ${err}`);
      } finally {
        // always re-enable button
        setIsPending(false);
      }
      // Errors in Promises don't get caught by regular try/catch unless you await the Promise
    };
    callDbQueryer();
  }, []); // empty array as 2nd arg = run once on mount

  async function handleSeedDbSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsPending(true);
    try {
      toast.info("Seeding database...");
      const start = Date.now();
      const { error, count } = await SeedMoviesAction();

      if (error) {
        console.error(">> [seed-movies-action] Failed to seed movies:", error);
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

      // now need to re-query db (state will be state therein)
      QueryMoviesDbAction();
    } catch (err) {
      console.error(">> Error from my-movies.tsx:", err);
      toast.error(`Network error: ${err}`);
    } finally {
      // always re-enable button
      setIsPending(false);
    }
  }
  async function handleToggleWatchedClick(movieId: string) {
    // note: we don't need evt or evt.preventDefault() here because handleToggleWatchedClick is not coming from a form element or link click -- so there's no reload to prevent
    setIsPending(true);

    try {
      toast.info("Thinking...");

      const { error, data } = await ToggleWatchedStatusAction(movieId);

      if (error) {
        console.error(
          ">> [toggle-watched-status-action] Failed to fetch movies or toggle status:",
          error,
        );
        toast.error(error);
        return;
      }

      // i don't think this would happen, except maybe in a crazy unlucky scenario (?)
      if (!data) {
        setDbIsEmpty(true);
        toast.info("Database is empty!");
        return;
      }

      // only runs if no error
      toast.success("Success!");

      //  update myMovies with data
      if (!myMovies) return; // early return just to satisfy ts (myMovies won't be null here because of {myMovies && ...} below)
      const updatedMyMovies = myMovies.map((movie) =>
        movie.id === data.id ? data : movie,
      );
      setMyMovies(updatedMyMovies);
    } catch (err) {
      console.error(">> Error from my-movies.tsx:", err);
      toast.error(`Network error: ${err}`);
    } finally {
      // always re-enable button
      setIsPending(false);
    }
  }

  async function handleDeleteMovieClick(movieId: string) {
    setIsPending(true);

    try {
      toast.info("Thinking...");

      const { error, data } = await DeleteMovieAction(movieId);

      if (error) {
        console.error(
          ">> [delete-movie-action] Failed to delete movie:",
          error,
        );
        toast.error(error);
        return;
      }

      // i don't think this would happen, except maybe in a crazy unlucky scenario (?)
      if (!data) {
        setDbIsEmpty(true);
        toast.info("Database is empty");
        return;
      }

      // only runs if no error
      toast.success("Movie deleted");

      //  update myMovies with data
      if (!myMovies) return; // early return just to satisfy ts (myMovies won't be null here because of {myMovies && ...} below)
      // need to do this to actually remove the deleted movie from our state and therefore trigger a re-render
      const updatedMyMoviesInclNull = myMovies.map((movie) =>
        movie.id === data.id ? null : movie,
      );
      const updatedMyMovies = updatedMyMoviesInclNull.filter(
        (movie) => movie !== null,
      );
      setMyMovies(updatedMyMovies);
    } catch (err) {
      console.error(">> Error from my-movies.tsx:", err);
      toast.error(`Network error: ${err}`);
    } finally {
      // always re-enable button
      setIsPending(false);
    }
  }

  return (
    <div className="mb-8 mx-4 flex flex-col items-center space-y-2">
      {sortedMovies && (
        <div className="mt-2 max-h-128 overflow-x-auto overflow-y-auto border rounded">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                <th className="text-left">Title</th>
                <th className="text-center">Released</th>
                <th className="text-center">Watched?</th>
                <th className="text-center">Joel&apos;s rating</th>
                <th className="text-center">TMDb rating</th>
                {/* <th className="text-center">Added by</th> */}
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {sortedMovies.map((movie) => (
                <tr key={movie.id} className="even:bg-gray-50">
                  <td>
                    <div className="w-48 overflow-auto">{movie.title}</div>
                  </td>

                  <td>{movie.release_date}</td>

                  <td>
                    <div className="w-full flex justify-center">
                      <Button
                        className={`${movie.watched ? "bg-blue-500 text-white " : "bg-gray-200  text-black"} hover:bg-yellow-300 `}
                        disabled={isPending}
                        size="sm"
                        onClick={() => handleToggleWatchedClick(movie.id)}
                      >
                        {movie.watched ? (
                          <Image
                            src="/toggle-right.svg"
                            alt="toggled on icon"
                            width={20}
                            height={20}
                          />
                        ) : (
                          <Image
                            src="/toggle-left.svg"
                            alt="toggled off icon"
                            width={20}
                            height={20}
                          />
                        )}
                      </Button>
                    </div>
                  </td>

                  <td className="h-full m-2 rounded-md text-sm flex items-center">
                    <div className="w-full">
                      {ratingColorsArray.map((color, i) => (
                        <span
                          key={i}
                          // need to use inline-block because by default, spans (and other inline elements) ignore width and height properties
                          className={`${
                            movie.watched &&
                            movie.rating &&
                            movie.rating >= Number(color[0])
                              ? `${ratingColors[i + 1]} inline-block size-3`
                              : "bg-transparent"
                          }`}
                        ></span>
                      ))}
                    </div>
                  </td>

                  <td>
                    <div
                      className={`w-full px-4 py-2 text-sm flex items-center justify-center  text-black rounded-md`}
                      //  ${
                      // movie.vote_average
                      // ? movie.vote_average > 7.0
                      // ? "bg-purple-500"
                      // : "bg-gray-500"
                      // : "bg-transparent"
                      // }
                      // `}
                    >
                      <strong>{movie.vote_average?.toFixed(1)}</strong>
                    </div>
                  </td>

                  <td
                  // className="w-full flex justify-center"
                  >
                    <div className="w-full mx-2">
                      <Button
                        className="bg-destructive"
                        disabled={isPending}
                        size="sm"
                        onClick={() => handleDeleteMovieClick(movie.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
