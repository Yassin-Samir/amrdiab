"use client";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useSongs } from "./SongContext";
import { Slider } from "@/shadcn-components/ui/slider";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { RxSpeakerLoud } from "react-icons/rx";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn-components/ui/tooltip";
import { ImLoop2 } from "react-icons/im";

function MediaPlayer({
  albumName,
  poster,
}: {
  albumName: string;
  poster: string;
}) {
  const { currentSong, songs, updateCurrentSong, os } = useSongs();
  const [CurrentTime, setCurrentTime] = useState<number>(0);
  const [Paused, setPaused] = useState(true);
  const [Volume, setVolume] = useState(1);
  const [Loop, setLoop] = useState(false);
  const audioRef = useRef<HTMLAudioElement>();
  const sliderRef = useRef<HTMLDivElement>(null);
  const lastVolumeChose = useRef<number>(Volume);
  const [Loading, startTransition] = useTransition();
  const prevSong = useCallback(
    () =>
      updateCurrentSong((currentSong) => {
        if (!currentSong) return currentSong;
        const songIndex = songs.current.findIndex(
          ({ id }) => id === currentSong.id
        );
        const songDoc =
          songs.current[
            songIndex === 0 ? songs.current.length - 1 : songIndex - 1
          ];
        return { ...songDoc };
      }),
    []
  );
  const nextSong = useCallback(
    () =>
      updateCurrentSong((currentSong) => {
        if (!currentSong) return currentSong;
        const songIndex = songs.current.findIndex(
          ({ id }) => id === currentSong.id
        );
        const songDoc =
          songs.current[
            songIndex === songs.current.length - 1 ? 0 : songIndex + 1
          ];
        return { ...songDoc };
      }),
    []
  );
  const startTrack = async () => {
    try {
      await audioRef.current.play();
    } catch (error) {
      console.log({ PlayError: error });
    }
  };
  const setMediaSessionMetadata = useCallback(
    (albumName: string, title: string, poster: string) => {
      if (!("mediaSession" in window.navigator)) return;
      navigator.mediaSession.metadata = new MediaMetadata({
        title,
        artist: "Amr diab",
        album: albumName,
        artwork: [
          {
            src: poster,
            type: "image/jpg",
            sizes: "600*600",
          },
        ],
      });
      const audioObj = audioRef.current;
      navigator.mediaSession.setActionHandler("seekto", (e) => {
        audioObj.currentTime = e.seekTime;
      });
      navigator.mediaSession.setActionHandler("previoustrack", prevSong);
      navigator.mediaSession.setActionHandler("nexttrack", nextSong);
      navigator.mediaSession.setActionHandler("stop", () => audioObj.pause());
      navigator.mediaSession.setActionHandler("play", () => {
        startTransition(startTrack);
      });
      navigator.mediaSession.setActionHandler("pause", (e) => audioObj.pause());
      navigator.mediaSession.setActionHandler("seekbackward", null);
      navigator.mediaSession.setActionHandler("seekforward", null);
    },
    []
  );

  useLayoutEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.src = "/5-seconds-silence.mp3";
    audioRef.current.load();
    return () => {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
    };
  }, []);
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.ontimeupdate = ({ currentTarget }: Event) => {
      const audioElement = currentTarget as HTMLAudioElement;
      setCurrentTime(audioElement.currentTime);
      if (!("mediaSession" in window.navigator)) return;
      if (!window.navigator.mediaSession.metadata) return;
      const { duration, playbackRate, currentTime: position } = audioElement;
      if (
        [duration, playbackRate, position].filter((value) =>
          Number.isNaN(value)
        ).length
      )
        return;
      navigator.mediaSession.setPositionState({
        duration,
        playbackRate,
        position,
      });
    };
    audioRef.current.onended = ({ currentTarget }: Event) => {
      if ((currentTarget as HTMLAudioElement).loop) return;
      nextSong();
    };
    audioRef.current.onplaying = () => setPaused(false);
    audioRef.current.onpause = () => setPaused(true);
    if (audioRef.current.src !== "/5-seconds-silence.mp3") return;
    audioRef.current.play();
  }, []);
  useEffect(() => {
    if (!currentSong) return;
    const audioObj = audioRef.current;
    if (!(audioObj instanceof HTMLAudioElement)) return;
    audioObj.pause();
    audioObj.src = currentSong.link;
    audioObj.load();
    audioObj.volume = Volume;
    setMediaSessionMetadata(albumName, currentSong.name, poster);
    startTransition(startTrack);
    return () => {
      setCurrentTime(0);
    };
  }, [currentSong]);
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = Volume;
    audioRef.current.loop = Loop;
    const timeout = setTimeout(
      () => (Volume <= 0 ? null : (lastVolumeChose.current = Volume)),
      500
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [Volume, Loop]);
  if (!currentSong) return;
  return (
    <div
      className={`
      fixed  
      bottom-0 
      left-0
      z-[1000]
      w-full
      px-2
      md:px-4
      py-4
    bg-animationShade
    text-white
      flex 
      justify-between
      items-center
      md:gap-4
      gap-2
    `}
    >
      <div className="w-1/5 max-w-[230px] overflow-hidden ">
        <p className="text-xs sm:text-sm text-greyShade tracking-widest">
          PLAYING
        </p>
        <h1
          className="text-xs sm:text-sm md:text-base lg:text-lg 
        font-semibold max-sm:max-h-4 text-nowrap relative 
        whitespace-nowrap break-keep "
        >
          {currentSong.name}
          <div className="z-50 h-full w-1/5 absolute top-0 right-0 bg-gradient-to-r from-transparent to-animationShade"></div>
        </h1>
      </div>
      <div className="grow">
        <div className="max-w-[720px] w-full mx-auto">
          <div className="gap-4  flex items-center justify-center mb-4">
            <ImLoop2 size={15} className={"invisible"} />
            <GrCaretPrevious
              color="white"
              fill="white"
              onClick={() => {
                if (Loading) return;
                prevSong();
              }}
              className="cursor-pointer text-lg md:text-xl lg:text-2xl"
            />
            {Paused ? (
              <FaPlay
                className="cursor-pointer text-xl md:text-2xl lg:text-3xl"
                onClick={async () => {
                  if (Loading) return;
                  startTransition(startTrack);
                }}
                color="white"
                fill="white"
                size={25}
              />
            ) : (
              <FaPause
                className="cursor-pointer text-xl md:text-2xl lg:text-3xl"
                onClick={() => {
                  if (Loading) return;
                  audioRef.current.pause();
                }}
                color="white"
                fill="white"
                size={25}
              />
            )}
            <GrCaretNext
              className="cursor-pointer text-lg md:text-xl lg:text-2xl"
              color="white"
              fill="white"
              onClick={() => {
                if (Loading) return;
                nextSong();
              }}
            />
            <TooltipProvider delayDuration={500}>
              <Tooltip>
                <TooltipContent side="top" sideOffset={7.5}>
                  Loop
                </TooltipContent>
                <TooltipTrigger className="ml-0.5">
                  <ImLoop2
                    onClick={() => setLoop((prev) => !prev)}
                    size={15}
                    className={`${Loop ? "fill-blue-600" : "fill-white"}`}
                  />
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center justify-center gap-2 lg:gap-4">
            {/* current Time */}
            <span
              className="text-white text-xs sm:text-sm
      max-w-[60px] text-center "
            >
              {Math.floor(CurrentTime / 60) < 10
                ? "0" + Math.floor(CurrentTime / 60)
                : Math.floor(CurrentTime / 60)}
              :
              {Math.floor(CurrentTime % 60) < 10
                ? "0" + Math.floor(CurrentTime % 60)
                : Math.floor(CurrentTime % 60)}
            </span>
            {/* time slider */}
            <div
              className="relative cursor-pointer w-9/12 h-2 bg-slate-50 text-black overflow-hidden"
              ref={sliderRef}
              onClick={(e) => {
                if (Loading) return;
                const clickX =
                  e.clientX - e.currentTarget.getBoundingClientRect().left;
                audioRef.current.currentTime =
                  (clickX / e.currentTarget.clientWidth) * currentSong.duration;
              }}
            >
              {Loading ? (
                <div className="w-1/4 absolute top-0 bg-blue-600  h-full animate-loading"></div>
              ) : (
                <div
                  className="absolute inset-0 bg-blue-600 w-0"
                  style={{
                    width: `${(CurrentTime / currentSong.duration) * 100}%`,
                  }}
                ></div>
              )}
            </div>
            {/* duration */}
            <span
              className="text-greyShade text-xs sm:text-sm 
            max-w-[60px] text-center "
            >
              {Math.floor(currentSong.duration / 60) < 10
                ? "0" + Math.floor(currentSong.duration / 60)
                : Math.floor(currentSong.duration / 60)}
              :
              {Math.floor(currentSong.duration % 60) < 10
                ? "0" + Math.floor(currentSong.duration % 60)
                : Math.floor(currentSong.duration % 60)}
            </span>
          </div>
        </div>
      </div>
      <div className="w-1/5 max-w-[150px] flex gap-2 md:gap-4 items-center justify-end ">
        {os.name.match(/IOS|MAC/gi) ? null : (
          <>
            <RxSpeakerLoud
              size={20}
              className="cursor-pointer"
              onClick={() =>
                setVolume((prev) => (prev ? 0 : lastVolumeChose.current))
              }
            />
            <Slider
              max={1}
              min={0}
              defaultValue={[1]}
              className="h-2  w-full select-none"
              step={0.01}
              value={[Volume]}
              onValueChange={([value]) => setVolume(value)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default MediaPlayer;
