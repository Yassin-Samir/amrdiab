import React, { useEffect, useState } from "react";
import useSoundContext from "./useSoundContext";

function AudioPlayer() {
  const { headline, ref } = useSoundContext();
  const [loadingPercent, setLoadingPercent] = useState<number>(0);
  const [Paused, setPaused] = useState<boolean>(false);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.play();
    const onTimeUpdateCallback = ({ currentTarget }: Event) => {
      setLoadingPercent(
        ((currentTarget as HTMLAudioElement)?.currentTime /
          (currentTarget as HTMLAudioElement)?.duration) *
          100
      );
    };
    const onPlay = () => setPaused(false);
    const onPause = () => setPaused(true);
    ref.current.addEventListener("timeupdate", onTimeUpdateCallback);
    ref.current.addEventListener("play", onPlay);
    ref.current.addEventListener("pause", onPause);
    return () => {
      ref.current.removeEventListener("play", onPlay);
      ref.current.removeEventListener("pause", onPause);
      ref.current.removeEventListener("timeupdate", onTimeUpdateCallback);
    };
  }, [headline]);
  if (!headline || !ref.current) return null;
  return (
    <div className="w-full h-[75px] absolute bottom-0">
      {/* loading slider */}
      <div
        className="w-full  h-1 relative bg-[#7b7a7a] cursor-pointer"
        onClick={(e) => {
          const clickX =
            e.clientX -
            e.currentTarget.parentElement.getBoundingClientRect().left;
          ref.current.currentTime =
            (clickX / e.currentTarget.parentElement.clientWidth) * 30;
        }}
      >
        <div
          style={{ width: `${loadingPercent}%` }}
          className="h-1 absolute top-0 left-0 bg-[#bf987c]"
        ></div>
      </div>
      {/* audio player */}
      <div className="mt-2 w-[90%] items-center mx-auto h-[63px] flex justify-between">
        {/* name of the song */}
        <div>
          <span className="text-sm text-[#7b7a7a] uppercase">PLAYING</span>
          <p className="text-lg text-white font-bold">{headline}</p>
        </div>
        {/* media playback buttons */}
        <div className="h-min">
          {!Paused ? (
            <svg
              className="size-10 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => {
                ref.current.pause();
                setPaused(true);
              }}
              viewBox="0 0 320 512"
            >
              <path
                fill="#ffffff"
                d="M48 64C21.5 64 0 85.5 0 112L0 400c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48L48 64zm192 0c-26.5 0-48 21.5-48 48l0 288c0 26.5 21.5 48 48 48l32 0c26.5 0 48-21.5 48-48l0-288c0-26.5-21.5-48-48-48l-32 0z"
              />
            </svg>
          ) : (
            <svg
              className="size-10 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              onClick={() => {
                ref.current.play();
                setPaused(false);
              }}
            >
              <path
                fill="#ffffff"
                d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
              />
            </svg>
          )}
        </div>
        {/* duration */}
        <div>
          <span className="text-white">
            {Math.floor(((loadingPercent / 100) * 30) / 60)}:
            {Math.floor((loadingPercent / 100) * 30) < 10
              ? "0" + Math.floor((loadingPercent / 100) * 30)
              : Math.floor((loadingPercent / 100) * 30)}
          </span>{" "}
          <span className="text-[#7b7a7a]">/</span>{" "}
          <span className="text-[#7b7a7a]">0:30</span>
        </div>
      </div>
    </div>
  );
}

export default AudioPlayer;
