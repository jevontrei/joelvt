"use server";

// do i even need to write "use server"?

import { prisma } from "@/lib/prisma-neon";
import { notifyDiscord } from "./notify-discord-action";

// define types for the return value of this action; to prevent annoying typescript complaints in search-forecast-form.tsx
// type export -- must import with exact name
export type BookDataType = {
  title: string;
  watched: boolean;
  //   year: number;
};

type ActionSuccessType = {
  error: null;
  data: BookDataType;
};

type ActionErrorType = {
  error: string;
  data: null;
};

// the ~pipe here ("|") is typescript union type? not a normal OR operator
type ActionResultType = ActionSuccessType | ActionErrorType;

// Promise here is a generic type; <ActionResultType> is a generic type argument
export async function SearchBooksAction(
  formData: FormData,
): Promise<ActionResultType> {
  try {
    // get form inputs
    // for more robust validation, could use zod or valibot
    const title = String(formData.get("title"));

    // validate
    if (!title) {
      console.error(">> Title error...");
      return {
        error: "Please enter your title",
        data: null,
      };
    }

    // make API request
    // https://developers.google.com/books/docs/v1/reference/volumes/list
    const q = encodeURIComponent(title); // this changes spaces to %20 etc
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}`;
    // const options = {
    //   method: "GET",
    //   headers: {
    //     accept: "application/json",
    //     Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}`,
    //   },
    // };

    const response = await fetch(url);
    const json = await response.json();
    if (json.error) {
      // why isn't this printing the whole json error but the above console log is?
      console.error(`>> Error while searching books: ${json}`);
      return { error: "Error", data: null };
    }
    const results: BookDataType[] = json["results"];
    // const result = json["results"][0];

    const books: BookDataType[] = results.map((book) => ({
      title: book["title"],
      watched: book["watched"],
    }));
    const book = books[0];

    // add book to db
    // await prisma.book.create({ data: book });

    // await notifyDiscord(`Books API called and db updated: ${book.title}`);

    // return data to browser
    return { error: null, data: book };
  } catch (err) {
    console.error(`Error: ${err}`);

    if (err instanceof Error) {
      return {
        error: "Error occurred",
        data: null,
      };
    }

    // fallback for unknown error (without details... see log for details)
    return { error: "Unexpected error occurred", data: null };
  }
}
