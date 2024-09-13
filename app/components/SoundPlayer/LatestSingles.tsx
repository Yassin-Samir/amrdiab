"use client";
import Image, { StaticImageData } from "next/image";
import { PlayIcon } from "@radix-ui/react-icons";
import { Ref, useRef } from "react";
import SoundProvider from "./soundContext";
import useSoundContext from "./useSoundContext";
import AudioPlayer from "./audioPlayer";
import Link from "next/link";
const latestSingles = [
  {
    src: "https://amrdiab.net/wp-content/uploads/2024/03/Tetehabi.mp3",
    headline: "Tethabi",
  },
  {
    src: "https://amrdiab.net/wp-content/uploads/2024/03/El-Taama.mp3",
    headline: "El Ta'ama",
  },
  {
    src: "https://amrdiab.net/wp-content/uploads/2024/03/HekayetnaHelwa.mp3",
    headline: "Hekayetna Helwa",
  },
  {
    src: "https://amrdiab.net/wp-content/uploads/2024/03/AlKelmaElHelwa.mp3",
    headline: "Al Kelma El Helwa",
  },
];
function SoundPlayer({
  poster,
  background,
}: {
  poster: StaticImageData;
  background: StaticImageData;
}) {
  return (
    <>
      <h1 className="text-5xl font-extrabold  text-white text-center mt-[200px] mx-auto ">
        Listen to Amr Diab
      </h1>
      <span className="text-greyShade text-base block mt-5 text-center mx-auto">
        2024
      </span>
      <div
        className="
    overflow-hidden 
    flex my-10 mx-auto w-full flex-col h-max
    md:flex-row md:h-[570px] "
      >
        {/* poster */}
        <Image
          src={poster}
          alt="poster"
          className="
        h-full md:w-[35%] object-cover 
        md:max-w-[400px] max-h-[570px] w-full"
        />
        {/* sound player par */}
        <div className="relative md:w-[65%] h-full w-full">
          {/* background */}
          <Image
            src={background}
            alt="background"
            className="absolute z-[-1] inset-0 w-full h-full object-cover"
          />
          {/* header */}
          <div className="flex justify-between flex-wrap px-5 items-center h-[150px] text-white">
            <h1 className="text-[2rem] font-bold">Latest Singles</h1>

            <Link
              href="/albums"
              className="
            py-4 px-5 rounded-md 
            border-2  
            border-solid  
            border-main
            transition-[background-color]
            duration-200 
            ease-linear
            bg-main hover:bg-transparent 
            uppercase
            text-center
            max-[500px]:grow"
            >
              LISTEN TO FULL TRACKS
            </Link>
          </div>
          <SoundProvider tracks={latestSingles}>
            <ul>
              {latestSingles &&
                latestSingles.map((songData) => (
                  <TrackListItem {...songData} key={songData.src} />
                ))}
              <div className="w-full bg-transparent h-[10rem]"></div>
            </ul>
            <AudioPlayer />
          </SoundProvider>
        </div>
      </div>
    </>
  );
}

function TrackListItem({ headline, src }: { headline: string; src: string }) {
  const soundContext = useSoundContext();
  const { currentTrack, updateTrack } = soundContext;
  return (
    <>
      <li className="p-5 flex items-center justify-start hover:bg-[#0a0a30]">
        <PlayIcon
          className="cursor-pointer size-5"
          onClick={() => updateTrack({ headline, src })}
          color="#bf987c"
        />
        <span
          className={`text-xl font-medium ${
            currentTrack?.headline === headline ? "!text-white" : ""
          } text-greyShade ml-5`}
        >
          {headline}
        </span>
        <span className="ml-auto  text-greyShade">0:30</span>
      </li>
    </>
  );
}
export default SoundPlayer;
