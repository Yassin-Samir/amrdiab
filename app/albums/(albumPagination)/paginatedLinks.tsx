"use client";
import Link from "next/link";
import { useParams } from "next/navigation";

function PaginatedLinks() {
  const params = useParams();
  const page = params?.pageNumber;

  return (
    <div className="mt-12 flex mx-auto justify-between items-center max-w-[300px] w-full">
      <Link
        href={`/albums/page/${
          Number.isNaN(Number(page)) ? "2" : Number(page) + 1
        }`}
        prefetch
        className="text-white text-lg
         hover:text-main transition-colors ease-in-out duration-300"
      >
        OLDER MUSIC
      </Link>
      {!Number.isNaN(Number(page)) ? (
        <Link
          href={`/albums/${
            Number(page) === 2 ? "" : `page/${Number(page) - 1}`
          }`}
          prefetch
          className="text-white text-lg
         hover:text-main transition-colors ease-in-out duration-300"
        >
          NEWER MUSIC
        </Link>
      ) : null}
    </div>
  );
}

export default PaginatedLinks;
