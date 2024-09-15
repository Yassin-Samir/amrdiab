import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useSoundContext from "./useSoundContext";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
function AudioPlayer() {
  const { currentTrack, tracksRef, updateTrack } = useSoundContext();
  const [CurrentTime, setCurrentTime] = useState<number>(0);
  const [Paused, setPaused] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>();
  useLayoutEffect(() => {
    audioRef.current = new Audio();
    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
    };
  }, []);
  useEffect(() => {
    audioRef.current.ontimeupdate = ({ currentTarget }: Event) => {
      const audioElement = currentTarget as HTMLAudioElement;
      setCurrentTime(audioElement.currentTime);
    };
    audioRef.current.onplaying = () => setPaused(false);
    audioRef.current.onpause = () => setPaused(true);
    audioRef.current.onended = nextSong;
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    if (!currentTrack) return;
    audioRef.current.src = currentTrack.src;
    audioRef.current.load();
    audioRef.current.play();
  }, [currentTrack]);
  const prevSong = useCallback(
    () =>
      updateTrack((currentTrack) => {
        if (!currentTrack) return currentTrack;
        const songIndex = tracksRef.current.findIndex(
          ({ src, headline }) =>
            src === currentTrack.src && currentTrack.headline === headline
        );
        if (songIndex === -1) return currentTrack;
        const songDoc =
          tracksRef.current[
            songIndex === 0 ? tracksRef.current.length - 1 : songIndex - 1
          ];
        return { ...songDoc };
      }),
    []
  );
  const nextSong = useCallback(
    () =>
      updateTrack((currentTrack) => {
        if (!currentTrack) return currentTrack;
        const songIndex = tracksRef.current.findIndex(
          ({ src, headline }) =>
            src === currentTrack.src && currentTrack.headline === headline
        );
        if (songIndex === -1) return currentTrack;
        const songDoc =
          tracksRef.current[
            songIndex === tracksRef.current.length - 1 ? 0 : songIndex + 1
          ];
        return { ...songDoc };
      }),
    []
  );

  if (!currentTrack) return;
  return (
    <div className="w-full h-[75px] absolute bottom-0 select-none">
      {/* loading slider */}
      <div
        className="w-full  h-1 relative bg-greyShade cursor-pointer"
        onClick={(e) => {
          const clickX =
            e.clientX - e.currentTarget.getBoundingClientRect().left;

          audioRef.current.currentTime =
            (clickX / e.currentTarget.clientWidth) *
            (audioRef.current.duration || 30);
        }}
      >
        <div
          style={{
            width: `${
              (CurrentTime / (audioRef.current.duration || 30)) * 100
            }%`,
          }}
          className="h-1 absolute top-0 left-0 bg-main"
        ></div>
      </div>
      {/* audio player */}
      <div className="mt-2 w-[95%] items-center mx-auto h-[63px] flex justify-between">
        {/* name of the song */}
        <div className="w-1/4 overflow-x-hidden max-w-[145px]">
          <span className="text-sm text-greyShade uppercase tracking-widest">
            PLAYING
          </span>
          <p className="text-lg text-white font-bold text-nowrap whitespace-nowrap">
            {currentTrack.headline}
          </p>
        </div>
        {/* media playback buttons */}
        <div className="grow flex items-center justify-center gap-2 ">
          <GrCaretPrevious
            className="cursor-pointer"
            onClick={prevSong}
            size={30}
            color="white"
          />
          {Paused ? (
            <FaPlayCircle
              className="cursor-pointer text-3xl md:text-5xl"
              fill="#bf987c"
              onClick={() => {
                audioRef.current.play();
              }}
            />
          ) : (
            <FaPauseCircle
              className="cursor-pointer text-3xl md:text-5xl"
              fill="#bf987c"
              onClick={() => {
                audioRef.current.pause();
              }}
            />
          )}
          <GrCaretNext
            className="cursor-pointer"
            onClick={nextSong}
            size={30}
            color="white"
          />
        </div>
        {/* duration */}
        <div>
          <span className="text-white">
            {Math.floor(CurrentTime / 60) < 10
              ? "0" + Math.floor(CurrentTime / 60)
              : Math.floor(CurrentTime / 60)}
            :
            {Math.floor(CurrentTime % 60) < 10
              ? "0" + Math.floor(CurrentTime % 60)
              : Math.floor(CurrentTime % 60)}
          </span>{" "}
          <span className="text-greyShade">/</span>{" "}
          <span className="text-greyShade">0:30</span>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
