"use client";
import { Slider } from "@/shadcn-components/ui/slider";
import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";
import { ImLoop2 } from "react-icons/im";
import { getOS } from "@/app/utils";
import { useSongs } from "./SongContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shadcn-components/ui/tooltip";

function SongPlayer({
  name,
  link,
  duration,
  id,
  poster,
  albumName,
}: {
  duration: number;
  albumName: string;
  poster: string;
  name: string;
  link: string;
  id: string;
}) {
  const audioRef = useRef<HTMLAudioElement>();
  const sliderRef = useRef<HTMLDivElement>();
  const [Paused, setPaused] = useState<boolean>(true);
  const [Volume, setVolume] = useState(0.5);
  const [CurrentTime, setCurrentTime] = useState<number>(0);
  const [IsIos, setIsIos] = useState(false);
  const [Loop, setLoop] = useState(false);
  const [Loading, setLoading] = useState(true);
  const { songs } = useSongs();
  useEffect(() => {
    if (!("mediaSession" in window.navigator)) return;
    if (Paused) return;
    navigator.mediaSession.metadata = new MediaMetadata({
      title: name.replace(/^\s+/g, ""),
      artist: "Amr diab",
      album: albumName,
      artwork: [
        {
          src: poster,
          type: "image/jpg",
        },
      ],
    });
    /**
     * media session api
     */
    /*  navigator.mediaSession.setActionHandler("pause", () =>
      audioRef.current.pause()
    );
    navigator.mediaSession.setActionHandler(
      "play",
      async () => await audioRef.current.play()
    );
    navigator.mediaSession.setActionHandler("seekto", (e) => {
      audioRef.current.currentTime = e.seekTime;
    });
    navigator.mediaSession.setActionHandler("previoustrack", async () => {
      const songIndex = songs.current.findIndex((song) => song.id === id);
      const songDoc =
        songs.current[
          songIndex === 0 ? songs.current.length - 1 : songIndex - 1
        ];
      songs.current.map(({ id, ref }) => {
        if (id === songDoc.id) return;
        ref.current.pause();
      });
      if (!IsIos) {
        songDoc.ref.current.play();
        return;
      }
      songDoc.ref.current.volume = 0;
      await songDoc.ref.current.play();
      songDoc.ref.current.volume = 1;
    });
    navigator.mediaSession.setActionHandler("nexttrack", async () => {
      const songIndex = songs.current.findIndex((song) => song.id === id);
      const songDoc =
        songs.current[
          songIndex === songs.current.length - 1 ? 0 : songIndex + 1
        ];
      songs.current.map(({ id, ref }) => {
        if (id === songDoc.id) return;
        ref.current.pause();
      });
      if (!IsIos) {
        songDoc.ref.current.play();
        return;
      }
      songDoc.ref.current.volume = 0;
      await songDoc.ref.current.play();
      songDoc.ref.current.volume = 1;
    }); */
  }, [Paused]);
  useLayoutEffect(() => {
    const os = getOS();
    if (os === "Mac" || os === "iOS") {
      setIsIos(true);
      return;
    }
  }, []);
  useEffect(() => {
    songs.current.push({ id, ref: audioRef });
    setVolume(audioRef.current.volume);
    if (audioRef.current.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      setLoading(false);
      return;
    }
    audioRef.current.load();
  }, []);
  return (
    <div className="bg-[#0c0c0c] w-full py-3 px-2 md:px-5 mb-1" id={id}>
      <h3
        className={`text-greyShade ${!Paused ? "!text-white font-medium" : ""}`}
      >
        {name?.replace(/([A-Z])/g, " $1").trim()}
      </h3>
      <div className="flex w-full gap-2 justify-between items-center my-3">
        <audio
          onTimeUpdate={async (e) => {
            setCurrentTime(e.currentTarget.currentTime);
            setLoading(false);
            if (e.currentTarget.currentTime !== e.currentTarget.duration) {
              setPaused(audioRef.current.paused);
              /* media session api stuff */
              /*   if (
                !("mediaSession" in window.navigator) ||
                e.currentTarget.paused ||
                Paused ||
                navigator.mediaSession.metadata.title ===
                  name.replace(/^\s+/g, "")
              )
                return;
              navigator.mediaSession.setPositionState({
                duration: duration,
                playbackRate: e.currentTarget.playbackRate,
                position: e.currentTarget.currentTime,
              }); */
              return;
            }
            setPaused(true);
            const songIndex = songs.current.findIndex((song) => song.id === id);
            const songDoc = Loop
              ? songs.current[songIndex]
              : songs.current[
                  songIndex === songs.current.length - 1 ? 0 : songIndex + 1
                ];
            if (!IsIos) {
              await songDoc.ref.current.play();
              return;
            }
            songDoc.ref.current.volume = 0;
            await songDoc.ref.current.play();
            songDoc.ref.current.volume = 1;
          }}
          preload="metadata"
          src={link}
          ref={audioRef}
          onPause={() => setPaused(true)}
          onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
          onCanPlay={() => setLoading(false)}
          onError={(e) => {
            console.log({ error: e.currentTarget.error });
          }}
        />
        {Paused ? (
          <FaPlay
            onClick={async () => {
              if (Loading) return;
              songs.current.map((song) => {
                if (song.id === id) return;
                song.ref.current.pause();
              });
              await audioRef.current?.play();
              setPaused((prev) => !prev);
            }}
            fill="white"
            size={"20px"}
            className={`cursor-pointer ${
              Loading ? "!cursor-no-drop fill-[#afafaf] opacity-75" : ""
            }`}
          />
        ) : (
          <FaPause
            onClick={() => {
              if (Loading) return;
              audioRef.current.pause();
              setPaused((prev) => !prev);
            }}
            fill="white"
            size={"20px"}
            className={`cursor-pointer ${
              Loading ? "!cursor-no-drop fill-[#afafaf] opacity-75" : ""
            }`}
          />
        )}
        <p className="text-white text-sm">
          {" "}
          {Math.floor(CurrentTime / 60) < 10
            ? "0" + Math.floor(CurrentTime / 60)
            : Math.floor(CurrentTime / 60)}
          :
          {Math.floor(CurrentTime % 60) < 10
            ? "0" + Math.floor(CurrentTime % 60)
            : Math.floor(CurrentTime % 60)}
        </p>
        {/* time slider */}
        <div
          className="relative cursor-pointer w-9/12 h-3 bg-slate-50 text-black overflow-hidden"
          ref={sliderRef}
          onClick={(e) => {
            if (Loading) return;
            const clickX =
              e.clientX - e.currentTarget.getBoundingClientRect().left;
            audioRef.current.currentTime =
              (clickX / e.currentTarget.clientWidth) * duration;
            if (
              audioRef.current.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA
            )
              return;
            if ((clickX / e.currentTarget.clientWidth) * duration <= 0) return;
            setLoading(true);
          }}
        >
          {Loading ? (
            <div className="w-1/4 absolute top-0 bg-blue-600  h-full animate-loading">
              {" "}
            </div>
          ) : (
            <div
              className="absolute inset-0 bg-blue-600 w-0"
              style={{
                width: `${(CurrentTime / duration) * 100}%`,
              }}
            ></div>
          )}
        </div>
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
        <p className="text-greyShade text-sm  w-1/4 max-w-[60px] text-center ">
          {Math.floor(duration / 60) < 10
            ? "0" + Math.floor(duration / 60)
            : Math.floor(duration / 60)}
          :
          {Math.floor(duration % 60) < 10
            ? "0" + Math.floor(duration % 60)
            : Math.floor(duration % 60)}
        </p>
        {!IsIos ? (
          <>
            <AiFillSound size={20} fill="#fff" />
            <Slider
              max={1}
              min={0}
              defaultValue={[1]}
              className="h-2 w-2/6 max-w-[150px] select-none"
              step={0.01}
              value={[Volume]}
              onValueChange={([value]) => {
                audioRef.current.volume = value;
              }}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
export default SongPlayer;
