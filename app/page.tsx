import { Metadata } from "next";
import ImageSwiper from "./components/Home/ImageSwiper";
import SoundPlayer from "./components/SoundPlayer/soundPlayer";
import taamaPoster from "@/app/assets/taama/El-Taama-HomePage.jpg";
import taamaBackground from "@/app/assets/taama/PlayList2024.jpg";
import LatestNews from "./components/Home/LatestNews";
import LatestReleases from "./components/Home/LatestReleases";
import LatestMusic from "./components/Home/LatestMusic";

export const metadata: Metadata = {
  title: "Amr Diab Hadaba",
  other: {
    "google-site-verification": "rYxsKkyoFvlrgH8dpWqr35UfGc3kt05nDeD4Ga9fjDw",
  },
};
export default function Home() {
  return (
    <>
      <ImageSwiper />
      <main className="max-w-[1200px] mx-auto">
        <SoundPlayer poster={taamaPoster} background={taamaBackground} />
        <LatestNews />
        <LatestMusic />
        <hr className="w-full mt-10 mb-12" />
        <LatestReleases />
      </main>
    </>
  );
}
