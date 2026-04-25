// default export -- can import with any name
export default function Page() {
  return (
    <div className="px-8 max-w-lg flex flex-col items-center gap-4">
      <h2 className="text-4xl mt-8 mb-4 mx-4">Joel von Treifeldt</h2>
      <p className="text-center">Welcome to my corner of the internet.</p>
      <p className="text-center">
        A full-stack Next.js project with a movies database (TMDb API), travel
        photos (AWS SDK), a reading list, and a music language database (Spotify
        Web API).
      </p>
    </div>
  );
}
