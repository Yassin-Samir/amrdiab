import { db } from "@/app/firebase";
import Head from "next/head";
import Image from "next/image";
import { notFound } from "next/navigation";
import SongPlayer from "./songPlayer";
import { Metadata } from "next";
export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const albumDoc = await db.collection("albums").doc(id).get();
  if (!albumDoc.exists) notFound();
  return { title: `${albumDoc.data().title} Album` };
}
type song = {
  link: string;
  duration: number;
  name: string;
  id: string;
};
async function page({ params: { id } }: { params: { id: string } }) {
  const albumDoc = await db.collection("albums").doc(id).get();
  if (!albumDoc.exists) notFound();
  const albumData = albumDoc.data();
  const albumCollection = await db.collection(`albums/${id}/songs`).get();
  const albumsSongs = albumCollection.docs.map((song): song => {
    const songData = song.data();
    return {
      id: song.id,
      link: songData.link,
      duration: songData.duration,
      name: songData.name,
    };
  });
  return (
    <main className="max-w-[1200px] mx-auto mt-[140px] mb-20">
      {/* album title */}
      <div className="mx-auto text-center my-12">
        <h1 className="text-5xl text-white font-bold">{albumData.title}</h1>
        <p className="text-base text-[#7a7b7b] mt-2.5">{albumData.year}</p>
      </div>
      <div className="flex w-[95%] mx-auto justify-between flex-wrap gap-5  ">
        {/* album data */}
        <div className="md:w-[400px] h-fit">
          <Image
            src={albumData.poster}
            alt={albumData.title}
            width={100}
            height={100}
            className="w-full h-full md:max-w-[400px] md:max-h-[400px] object-contain"
          />
          <div className="flex items-center mt-3">
            <svg
              className="inline w-4 h-4 mr-2.5"
              fill="#7b7a7a"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l80 0 0 56-80 0 0-56zm0 104l80 0 0 64-80 0 0-64zm128 0l96 0 0 64-96 0 0-64zm144 0l80 0 0 64-80 0 0-64zm80-48l-80 0 0-56 80 0 0 56zm0 160l0 40c0 8.8-7.2 16-16 16l-64 0 0-56 80 0zm-128 0l0 56-96 0 0-56 96 0zm-144 0l0 56-64 0c-8.8 0-16-7.2-16-16l0-40 80 0zM272 248l-96 0 0-56 96 0 0 56z" />
            </svg>{" "}
            <p className="text-[#7b7a7a] text-base">
              {formatDateNatively(albumData.createdAt.toDate())}
            </p>
          </div>
          <div className="flex items-center mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline w-4 h-4 mr-2.5"
              fill="#7b7a7a"
              viewBox="0 0 512 512"
            >
              <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" />
            </svg>{" "}
            <p className="text-[#7b7a7a] text-base">Amr diab</p>
          </div>
          <p className="text-[#7b7a7a] mt-3">
            <span className="tracking-[1px] uppercase text-sm">
              Number of discs :{" "}
            </span>
            {albumCollection.size}
          </p>
        </div>
        <div className="md:1/2 h-full grow">
          {albumsSongs &&
            albumsSongs.map((songData) => (
              <SongPlayer {...songData} key={songData.id} />
            ))}
        </div>
      </div>
    </main>
  );
}

function formatDateNatively(date: Date) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
}
export default page;
