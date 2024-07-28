"use client";
import React, { createContext, Ref, useRef, useState } from "react";

export const soundContext = createContext<{
  headline: string | null;
  ref: React.MutableRefObject<HTMLAudioElement | undefined> | null;
  editContext: React.Dispatch<
    React.SetStateAction<{ headline: string }>
  > | null;
}>({
  headline: null,
  ref: null,
  editContext: null,
});
function SoundProvider({ children }: { children: React.ReactNode }) {
  const [Track, setTrack] = useState({ headline: "fgdgfd" });
  const audioRef = useRef<HTMLAudioElement>();
  return (
    <soundContext.Provider
      value={{ editContext: setTrack, headline: Track.headline, ref: audioRef }}
    >
      {children}
    </soundContext.Provider>
  );
}

export default SoundProvider;
