"use client";
import React, { createContext, Ref, useRef, useState } from "react";
import { track } from "./types";

export const soundContext = createContext<{
  currentTrack: track;
  tracksRef: React.MutableRefObject<track[]>;
  updateTrack: React.Dispatch<React.SetStateAction<track>>;
}>({
  currentTrack: null,
  tracksRef: null,
  updateTrack: null,
});
function SoundProvider({
  children,
  tracks,
}: {
  children: React.ReactNode;
  tracks: track[];
}) {
  const [currentTrack, setTrack] = useState(null);
  const tracksRef = useRef<track[]>(tracks);
  return (
    <soundContext.Provider
      value={{ updateTrack: setTrack, currentTrack, tracksRef }}
    >
      {children}
    </soundContext.Provider>
  );
}

export default SoundProvider;
