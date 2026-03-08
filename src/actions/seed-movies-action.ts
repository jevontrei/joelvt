"use server";

import seedData from "@/seed-movies.json" assert { type: "json" };
import { prisma } from "@/lib/prisma-neon";
import { TmdbMovieDataType, CallTmdbApiAction } from "./call-tmdb-api-action";

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

type MovieWithRating = TmdbMovieDataType & { rating: number; watched: boolean };

export async function SeedMoviesAction(): Promise<SeedActionResultType> {
  try {
    // search ALL seed movies in TMDb
    // need to keep track of seed id to keep MY ratings of seed movie titles paired with the tmdb search results
    const movies: MovieWithRating[] = [];
    // if this is too slow, can try using Promise.all()
    for (const movie of seedData) {
      if (!movie.title) {
        // could rating here possibly be missing? try it - try seeding with a missing rating
        continue;
      }
      const result = await CallTmdbApiAction(movie.title);
      if (result.data && result.data.length > 0) {
        movies.push({
          // this just grabs the first result
          title: result.data[0]["title"],
          release_date: result.data[0]["release_date"],
          vote_average: result.data[0]["vote_average"],
          // reunite my rating with the search results
          rating: movie.rating,
          // all seeded movies should have been watched and rated
          watched: movie.watched,
        });
      } else {
        console.error(
          `>> Failed seeding movie: ${movie.title} - Error: ${result.error}`,
        );
      }
    }

    // add movies to db
    const dbResponse = await prisma.movie.createMany({
      data: movies,
      skipDuplicates: true,
    });

    // return data to browser
    return { error: null, count: dbResponse.count };
  } catch (err) {
    // log full error details for debugging
    console.error(">> Error while seeding movies:", err);

    if (err instanceof Error) {
      return { error: err.message, count: null };
    }

    return { error: "Unexpected error occurred", count: null };
  }
}
