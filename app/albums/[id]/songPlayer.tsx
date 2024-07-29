"use client";
import { Slider } from "@/shadcn-components/ui/slider";
import React, { useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";

function SongPlayer({
  name,
  link,
  duration,
}: {
  name: string;
  link: string;
  duration: number;
}) {
  const audioRef = useRef<HTMLAudioElement>();
  const sliderRef = useRef<HTMLDivElement>();
  const [Paused, setPaused] = useState<boolean>(true);
  const [Volume, setVolume] = useState(0.5);
  const [CurrentTime, setCurrentTime] = useState<number>(0);
  useEffect(() => {
    setVolume(audioRef.current.volume);
  }, []);
  return (
    <div className="bg-[#0c0c0c] w-full py-3 px-2 md:px-5 mb-1">
      <h3 className="text-[#7b7a7a]">
        {name?.replace(/([A-Z])/g, " $1").trim()}
      </h3>
      <div className="flex w-full gap-2 justify-between items-center my-3">
        <audio
          onTimeUpdate={(e) => {
            setCurrentTime(e.currentTarget.currentTime);
            e.currentTarget.currentTime === e.currentTarget.duration
              ? setPaused(true)
              : null;
          }}
          src={link}
          ref={audioRef}
          preload="auto"
          onVolumeChange={(e) => setVolume(e.currentTarget.volume)}
        />
        {Paused ? (
          <FaPlay
            onClick={() => {
              audioRef.current?.play();
              setPaused((prev) => !prev);
            }}
            fill="white"
            size={20}
            className="cursor-pointer"
          />
        ) : (
          <FaPause
            onClick={() => {
              audioRef.current.pause();
              setPaused((prev) => !prev);
            }}
            fill="white"
            size={20}
            className="cursor-pointer"
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
          className="relative cursor-pointer w-9/12 h-3 bg-slate-50 text-black"
          ref={sliderRef}
          onClick={(e) => {
            const clickX =
              e.clientX - e.currentTarget.getBoundingClientRect().left;
            audioRef.current.currentTime =
              (clickX / e.currentTarget.clientWidth) * duration;
          }}
        >
          <div
            className="absolute inset-0 bg-blue-600 w-0"
            style={{
              width: `${(CurrentTime / duration) * 100}%`,
            }}
          ></div>
        </div>
        <p className="text-white text-sm  w-1/4 max-w-[60px] text-center ">
          {Math.floor(duration / 60) < 10
            ? "0" + Math.floor(duration / 60)
            : Math.floor(duration / 60)}
          :
          {Math.floor(duration % 60) < 10
            ? "0" + Math.floor(duration % 60)
            : Math.floor(duration % 60)}
        </p>
        <AiFillSound size={20} fill="#fff" />
        <Slider
          max={1}
          min={0}
          defaultValue={[0.3]}
          className="h-2.5 w-1/4 max-w-[150px]  bg-white"
          step={0.01}
          value={[Volume]}
          onValueChange={([value]) => {
            audioRef.current.volume = value;
          }}
        />
      </div>
    </div>
  );
}
export default SongPlayer;
