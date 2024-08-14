"use client";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";

function AlbumImage({
  poster,
  title,
}: {
  poster: StaticImageData;
  title: string;
}) {
  const [Loaded, setLoaded] = useState(false);
  return (
    <div className="relative overflow-hidden">
      {!Loaded ? (
        <div
          className="animate-pulse mx-auto bg-animationShade 
      w-full aspect-square "
        ></div>
      ) : (
        ""
      )}
      <Image
        src={poster}
        alt={title}
        width={100}
        height={100}
        priority
        className={`w-full h-full md:max-w-[400px] md:max-h-[400px] 
        object-contain transition-opacity select-none  ${
          !Loaded ? "absolute z-[-1] opacity-0 inset-0" : ""
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default AlbumImage;
