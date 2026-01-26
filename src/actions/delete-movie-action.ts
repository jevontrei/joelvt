"use server";

import { prisma } from "@/lib/prisma-neon";
import { Movie } from "@/generated/prisma/client";
import { notifyDiscord } from "./notify-discord-action";

type DeleteMovieSuccessType = {
  error: null;
  // what should this be?
  data: Movie;
};

type DeleteMovieErrorType = {
  error: string;
  data: null;
};

type DeleteMovieType = DeleteMovieSuccessType | DeleteMovieErrorType;

export async function DeleteMovieAction(
  movieId: string,
): Promise<DeleteMovieType> {
  try {
    // // first, get movie from db (we need access to the watched status)
    // const movie = await prisma.movie.findUnique({ where: { id: movieId } });

    // // need this for race conditions etc
    // if (!movie) {
    //   return { error: `Movie with id ${movieId} not found`, data: null };
    // }

    // // then update movie in db
    // // in case you're wondering, yes this returns the whole movie object
    // const dbResponse = await prisma.movie.update({
    //   where: { id: movieId },
    //   data: { watched: !movie.watched },
    // });

    // await notifyDiscord(
    //   // this logic looks backwards but it's because we're flipping the EXISTING status
    //   `Movie watch status updated: ${movie.title} is ${!movie.watched ? "watched" : "unwatched"}`,
    // );

    // // return data to browser
    // return {
    //   error: null,
    //   data: dbResponse,
    };
  } catch (err) {
    console.log("Error in database fetching/deleting:", err);
    return { error: String(err), data: null };
  }
}
