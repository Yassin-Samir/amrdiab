"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/assets/AmrDiab-logo-2019.png";
import { useLayoutEffect, useState } from "react";
function nav() {
  const [TriggerBlack, setTriggerBlack] = useState(false);
  useLayoutEffect(() => {
    setTriggerBlack(document.documentElement.scrollTop >= 40);
    const scrollCallback = (e: Event) => {
      const { scrollTop } = document.documentElement;
      setTriggerBlack(scrollTop >= 40);
    };
    window.addEventListener("scroll", scrollCallback);
    return () => {
      window.removeEventListener("scroll", scrollCallback);
    };
  }, []);
  return (
    <>
      <header className={`h-20 fixed inset-0 z-[10000] `}>
        <nav
          className={`h-full bg-transparent ${
            TriggerBlack ? "!bg-[#0f0f0f] " : ""
          } transition-[background-color] ease-linear duration-100 py-2.5 px-2 md:px-5  flex justify-between items-center`}
        >
          <Link href={"/"} className="cursor-pointer w-20 h-12">
            <Image
              quality={100}
              src={logo}
              alt="amr diab logo"
              className="object-contain  size-full"
            />
          </Link>
          <ul className="flex  w-1/2 justify-center gap-x-5 items-center h-full">
            <li>
              <Link
                href={"/"}
                className={
                  "text-white text-[14px] font-bold text-center uppercase hover:text-main transition-colors duration-150 ease-in "
                }
              >
                {" "}
                HOME
              </Link>
            </li>
            <li>
              <Link
                href={"/about"}
                className={
                  "text-white text-[14px] font-bold text-center uppercase hover:text-main transition-colors duration-150 ease-in "
                }
              >
                {" "}
                ABOUT
              </Link>
            </li>
            <li>
              <Link
                href={"/albums"}
                className={
                  "text-white text-[14px] font-bold text-center uppercase hover:text-main transition-colors duration-150 ease-in "
                }
              >
                {" "}
                ALBUMS
              </Link>
            </li>
          </ul>
          <Link href={"/"} className=" cursor-pointer w-20 h-12">
            <Image
              quality={100}
              src={logo}
              alt="amr diab logo"
              className="invisible"
            />
          </Link>
        </nav>
      </header>
    </>
  );
}

export default nav;
