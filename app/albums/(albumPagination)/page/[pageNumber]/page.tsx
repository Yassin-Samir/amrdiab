import { db } from "@/app/firebase";
import { Metadata } from "next";
import Album from "../../album";
import { notFound, redirect } from "next/navigation";
export async function generateMetadata({
  params,
}: {
  params: Record<string, string>;
}): Promise<Metadata> {
  const { pageNumber } = params;
  if (Number.isNaN("fdsfsd")) return;
  return {
    title: `Page ${pageNumber} of Amr diab albums`,
  };
}
export type album = {
  title: string;
  poster: string;
  year: string;
};
export const dynamicParams = true; 
async function page({ params }: { params: Record<string, string> }) {
  const { pageNumber } = params;
  if (Number.isNaN(Number(pageNumber))) return notFound();
  if (Number(pageNumber) === 1) return redirect("/albums");
  const albums = await db
    .collection("albums")
    .orderBy("index", "asc")
    .startAfter(Number(pageNumber) * 5 - 5)
    .limit(5)
    .get();
  if (albums.empty) return notFound();
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
