"use client";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { useSongs } from "./SongContext";

function SongViewer({
  name,
  duration,
  id,
  index,
  albumName,
}: {
  duration: number;
  albumName: string;
  name: string;
  id: string;
  index: number;
}) {
  const { updateCurrentSong, currentSong, songs } = useSongs();
  const currentSongId = currentSong?.id || "";
  return (
    <div
      className={`bg-[#0c0c0c] w-full py-3 px-2 md:px-5 mb-1 flex items-center
    cursor-pointer text-greyShade hover:text-white
    ${currentSongId === id ? "!text-white !bg-[#ffffff1c]" : ""} 
    hover:bg-[#ffffff1c] group
    `}
      id={id}
      onClick={() =>
        updateCurrentSong({
          ...songs.current.find((songDoc) => songDoc.id === id),
        })
      }
    >
      <div className="mr-4">
        <FaPause
          className={`hidden ${currentSongId === id ? "!block" : ""} text-base`}
          size={11}
          color="inherit"
        />
        <FaPlay
          className={`${
            currentSongId === id ? "!" : ""
          }hidden group-hover:block text-base`}
          size={11}
          color="inherit"
        />
        <span
          className={`${
            currentSongId === id ? "!hidden" : ""
          } text-base text-inherit  group-hover:hidden`}
        >
          {index}
        </span>
      </div>
      <div>
        <h3
          className={`text-inherit ${
            currentSongId === id ? "font-medium" : ""
          }`}
        >
          {name}
        </h3>
        <p className="text-xs text-inherit">{albumName}</p>
      </div>
      <p
        className="text-inherit text-sm  w-1/4 
      max-w-[60px] text-center  ml-auto"
      >
        {Math.floor(duration / 60) < 10
          ? "0" + Math.floor(duration / 60)
          : Math.floor(duration / 60)}
        :
        {Math.floor(duration % 60) < 10
          ? "0" + Math.floor(duration % 60)
          : Math.floor(duration % 60)}
      </p>
    </div>
  );
}
export default SongViewer;
