"use client";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import test from "@/app/assets/swipe/AD-NewYork-Home.jpg";
export default function Album({
  title,
  poster,
  year,
  id,
}: {
  title: string;
  poster: StaticImageData;
  year: number | string;
  id?: string;
}) {
  const animationRef = useRef<HTMLDivElement>();
  const [Loaded, setLoaded] = useState(false);

  return (
    <Link
      href={`/albums/${id}`}
      className="group py-3 px-2 w-full h-fit overflow-hidden"
    >
      <div className=" relative">
        <Image
          className={`mx-auto object-contain w-full aspect-square pulse select-none absolute z-100 inset-0
            transition-opacity
            ${Loaded ? "opacity-0" : "opacity-100"}`}
          alt="thumbnail"
          src={`/albums/loadImage?src=${poster}`}
          fill
          priority
        />
        <Image
          className={`object-contain select-none w-full h-full transition-opacity  `}
          src={poster}
          alt={title}
          width={200}
          height={200}
          onLoad={() => setLoaded(true)}
        />
      </div>
      <h1 className="text-lg transition-colors duration-200 ease-out group-hover:text-main mt-2.5 text-white">
        {title}
      </h1>
      <span className="block mt-1 text-base text-greyShade">{year}</span>
    </Link>
  );
}
