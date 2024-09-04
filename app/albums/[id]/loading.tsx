import React from "react";

function Loading() {
  return (
    <div className="mt-[140px] mb-20 mx-auto ">
      {/* title animation */}
      <div className="w-full  my-12 animate-pulse ">
        <div className=" bg-animationShade mx-auto w-[140px]  h-12"></div>
        <div className=" bg-animationShade mx-auto w-[80px] h-6 mt-2.5"></div>
      </div>
      <div className="flex w-[95%] mx-auto justify-between flex-wrap gap-5 animate-pulse">
        {/* album data */}
        <div className="md:w-[400px] w-full h-fit">
          <div className="w-full aspect-square bg-animationShade"></div>
          <div className="flex items-center mt-3">
            <svg
              className="inline w-4 h-4 mr-2.5"
              fill="#7b7a7a"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l80 0 0 56-80 0 0-56zm0 104l80 0 0 64-80 0 0-64zm128 0l96 0 0 64-96 0 0-64zm144 0l80 0 0 64-80 0 0-64zm80-48l-80 0 0-56 80 0 0 56zm0 160l0 40c0 8.8-7.2 16-16 16l-64 0 0-56 80 0zm-128 0l0 56-96 0 0-56 96 0zm-144 0l0 56-64 0c-8.8 0-16-7.2-16-16l0-40 80 0zM272 248l-96 0 0-56 96 0 0 56z" />
            </svg>{" "}
            <div className="w-[110px] h-6 bg-animationShade"></div>
          </div>
          <div className="flex items-center mt-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline w-4 h-4 mr-2.5"
              fill="#7b7a7a"
              viewBox="0 0 512 512"
            >
              <path d="M499.1 6.3c8.1 6 12.9 15.6 12.9 25.7l0 72 0 264c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L448 147 192 223.8 192 432c0 44.2-43 80-96 80s-96-35.8-96-80s43-80 96-80c11.2 0 22 1.6 32 4.6L128 200l0-72c0-14.1 9.3-26.6 22.8-30.7l320-96c9.7-2.9 20.2-1.1 28.3 5z" />
            </svg>{" "}
            <div className="w-16 h-6  bg-animationShade"></div>
          </div>
          <p className="w-40 h-4 mt-3 bg-animationShade"></p>
        </div>
        {/* albums songs */}
        <div className="max-[968px]:w-3/4 h-full grow">
          {/* album song component */}
          <div className="mb-1 bg-[#0c0c0c] w-full py-3 px-2  md:px-5 animate-pulse">
            <div className="h-6 w-1/3 bg-animationShade"></div>
            <div className="mt-1 h-4 w-[10%] bg-animationShade"></div>
          </div>
          <div className="mb-1 bg-[#0c0c0c] w-full py-3 px-2  md:px-5 animate-pulse">
            <div className="h-6 w-1/3 bg-animationShade"></div>
            <div className="mt-1 h-4 w-[10%] bg-animationShade"></div>
          </div>
          <div className="mb-1 bg-[#0c0c0c] w-full py-3 px-2  md:px-5 animate-pulse">
            <div className="h-6 w-1/3 bg-animationShade"></div>
            <div className="mt-1 h-4 w-[10%] bg-animationShade"></div>
          </div>
          <div className="mb-1 bg-[#0c0c0c] w-full py-3 px-2  md:px-5 animate-pulse">
            <div className="h-6 w-1/3 bg-animationShade"></div>
            <div className="mt-1 h-4 w-[10%] bg-animationShade"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
