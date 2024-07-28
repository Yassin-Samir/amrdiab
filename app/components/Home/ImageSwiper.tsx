"use client";
import newYork from "@/app/assets/swipe/AD-NewYork-Home.jpg";
import vodafone from "@/app/assets/swipe/Vodafone2023-Slider.jpg";
import taama from "@/app/assets/swipe/taama.jpg";
import Image from "next/image";
import { useEffect, useState } from "react";
const images = [taama, newYork, vodafone];
function ImageSwiper() {
  const [CurrentImgIndex, setCurrentImgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <>
      <div className="relative w-full h-[100dvh]">
        {images &&
          images.map((ImgSrc) => (
            <Image
              src={ImgSrc}
              key={ImgSrc.src}
              alt="amr diab image"
              loading="eager"
              className={`absolute inset-0 w-full h-full object-cover z-[-1] 
                opacity-0 transition-[opacity] 
                duration-200 ease-in ${
                  images[CurrentImgIndex] === ImgSrc ? "!z-10 !opacity-100" : ""
                }`}
            />
          ))}
      </div>
    </>
  );
}

export default ImageSwiper;
