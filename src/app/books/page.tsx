"use client";

import MyBooks from "@/components/my-books";
import SearchBooksForm from "@/components/search-books-form";

// default export
export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-6xl my-8 mx-4">Books</h2>

      <SearchBooksForm />
      <MyBooks />
    </div>
  );
}
