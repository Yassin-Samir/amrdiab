import Image from "next/image";
import React from "react";
import biggerLogo from "@/app/assets/AD-logo-7-2019-1.png";
import Link from "next/link";
function Footer() {
  return (
    <footer className="w-full h-auto flex flex-col items-center  py-[90px] px-2.5 bg-[#0f0f0f] !text-[#7b7a7a]">
      <ul className="flex mb-7  items-center  gap-5 flex-wrap justify-center text-[14px] font-bold">
        <li>
          <Link href={"/"}>HOME</Link>
        </li>
        <li>
          <Link href={"/about"}>ABOUT</Link>
        </li>
        <li>
          <Link href={"/albums"}>ALBUMS</Link>
        </li>
      </ul>
      <Image
        src={biggerLogo}
        alt="amr diab logo"
        quality={100}
        className="w-[86px] h-[100px] object-contain"
      />
      <p className="text-sm mt-[20px] text-inherit">
        Copyrights Reserved, Nay for Media 2000-{new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;
