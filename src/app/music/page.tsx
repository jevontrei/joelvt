import MyLicksDb from "@/components/my-lick-occurrences";

// default export
export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-4xl my-8 mx-4">Lick Language</h3>

      <MyLicksDb />
    </div>
  );
}
