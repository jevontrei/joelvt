// default export -- can import with any name
export default function Page() {
  return (
    <div className="px-8 pt-8 max-w-lg flex flex-col items-center gap-4">
      <p className="text-center">Welcome to my corner of the internet.</p>
      <p className="text-center">
        A full-stack Next.js project with a movies database (TMDb API), travel
        photos (AWS SDK), a reading list, and a music language database (Spotify
        Web API).
      </p>
    </div>
  );
}
