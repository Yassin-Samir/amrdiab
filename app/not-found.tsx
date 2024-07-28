import Link from "next/link";
import React from "react";

function notFound() {
  return (
    <div className=" flex flex-col items-center justify-center    h-[59vh] ">
      <h1 className="text-6xl md:text-[200px] font-extrabold text-white">
        404
      </h1>
      <p className="text-3xl md:text-5xl font-extrabold text-white">Page not found</p>
      <p className=" text-sm text-[#7b7a7a]  mt-5 uppercase">
        The page you are looking for does not exist
      </p>
      <Link
        href={"/"}
        className="
          text-white uppercase mt-3 
          transition ease-linear duration-200 
          text-xs
         hover:text-[#bf987c]"
      >
        Please return to homepage
      </Link>
    </div>
  );
}

export default notFound;
