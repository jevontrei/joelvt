"use client";

import { toast } from "sonner";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useState } from "react";
import { SearchBooksAction, BookDataType } from "@/actions/search-books-action";

// https://developers.google.com/books/docs/v1/reference/volumes/get

export default function SearchBooksForm() {
  const [isPending, setIsPending] = useState(false);
  const [bookResults, setBookResults] = useState<BookDataType | null>(null);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsPending(true);

    try {
      toast.info("Thinking...");
      const formData = new FormData(evt.target as HTMLFormElement);
      const { error, data } = await SearchBooksAction(formData);
      if (error) {
        toast.error(error);
        return;
      }
      // only runs if no error
      toast.success("Success!");
      setBookResults(data);
    } catch (err) {
      if (err instanceof TypeError) {
        console.error(">> Oops! TypeError:", err);
        return;
      }
      toast.error(`Hmmm, ${err}`);
    } finally {
      // ALWAYS re-enable button
      setIsPending(false);
    }
  }

  return (
    <div className="p-8">
      {bookResults && (
        <div className="mt-8 max-h-96 overflow-y-auto border rounded">
          <p>Result:</p>
          {bookResults.title}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-sm w-full space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">
            Search book titles (with the Google Books API)
          </Label>
          <Input id="title" name="title" />
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          Search
        </Button>
      </form>
    </div>
  );
}
