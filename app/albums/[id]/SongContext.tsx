"use client";
import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import { song } from "./types";
export const songContext = createContext<{
  songs: MutableRefObject<song[]>;
  currentSong: song;
  updateCurrentSong: Dispatch<SetStateAction<song>>;
  os: { name?: string; version?: string };
}>({ songs: null, currentSong: null, updateCurrentSong: null, os: null });
export function useSongs() {
  return useContext(songContext);
}
export function SongProvider({
  children,
  songs,
  os,
}: {
  children: React.ReactNode;
  songs: song[];
  os: { name?: string; version?: string };
}) {
  const songsRef = useRef<song[]>(songs);
  const [CurrentSong, setCurrentSong] = useState<song>(null);
  return (
    <songContext.Provider
      value={{
        songs: songsRef,
        currentSong: CurrentSong,
        updateCurrentSong: setCurrentSong,
        os,
      }}
    >
      {children}
    </songContext.Provider>
  );
}
