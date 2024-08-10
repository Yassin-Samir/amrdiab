import { db } from "@/app/firebase";
import { Metadata } from "next";
import Album from "./album";
export const metadata: Metadata = {
  title: "Amr Diab Albums",
};
export type album = {
  title: string;
  poster: string;
  year: string;
};
async function page() {
  const albums = await db
    .collection("albums")
    .orderBy("createdAt", "desc")
    .get();
  return (
    <main className="max-w-[1600px] mx-auto mt-[140px] mb-20">
      <div className="w-[95%] mx-auto">
        <h1 className="text-4xl text-white font-extrabold ">
          Amr Diab's Albums
        </h1>
        <div
          className="w-full mt-4 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] 
      gap-3 justify-items-center"
        >
          {albums.docs &&
            albums.docs.map((albumDoc) => {
              const albumData = albumDoc.data();
              return (
                <Album
                  key={albumDoc.id}
                  poster={albumData.poster}
                  title={albumData.title}
                  year={albumData.year}
                  id={albumDoc.id}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}

export default page;
