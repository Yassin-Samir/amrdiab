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
    .orderBy("index", "asc")
    .limit(5)
    .get();
  return (
    albums.docs &&
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
    })
  );
}

export default page;
