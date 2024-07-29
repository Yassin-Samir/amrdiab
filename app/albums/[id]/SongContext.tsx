"use client";
import { createContext, MutableRefObject, useContext, useRef } from "react";
type songs = { id: string; ref: MutableRefObject<HTMLAudioElement> };
export const songContext = createContext<{
  songs: MutableRefObject<songs[]> | null;
}>({ songs: null });
export function useSongs() {
  return useContext(songContext);
}
export function SongProvider({ children }: { children: React.ReactNode }) {
  const songsRef = useRef<songs[]>([]);
  return (
    <songContext.Provider value={{ songs: songsRef }}>
      {children}
    </songContext.Provider>
  );
}
