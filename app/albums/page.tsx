import Image, { StaticImageData } from "next/image";
import { db } from "@/app/firebase";
import Link from "next/link";
import { Metadata } from "next";
import SearchBar from "./autoComplete";
import SearchContext from "./SearchBox";
export const metadata: Metadata = {
  title: "Amr Diab Albums",
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

function Album({
  title,
  poster,
  year,
  id,
}: {
  title: string;
  poster: StaticImageData;
  year: number | string;
  id?: string;
}) {
  return (
    <Link
      href={`/albums/${id}`}
      className="group py-3 px-2 overflow-hidden h-fit"
    >
      <Image
        className={"object-contain select-none w-full h-full "}
        src={poster}
        alt={title}
        width={200}
        height={200}
      />
      <h1 className="text-lg transition-colors duration-200 ease-out group-hover:text-main  mt-2.5 text-white">
        {title}
      </h1>
      <span className="block mt-1 text-base text-greyShade">{year}</span>
    </Link>
  );
}
export default page;
