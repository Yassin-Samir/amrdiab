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
      <Image
        className={`mx-auto object-contain w-full aspect-square pulse select-none absolute z-100 inset-0
            transition-opacity
            ${Loaded ? "opacity-0" : "opacity-100"}`}
        alt="thumbnail"
        src={`http://localhost:3000/albums/loadImage?src=${poster}`}
        fill
        priority
      />
      <Image
        src={poster}
        alt={title}
        width={100}
        height={100}
        className={`w-full h-full md:max-w-[400px] md:max-h-[400px] 
        object-contain transition-opacity select-none `}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default AlbumImage;
