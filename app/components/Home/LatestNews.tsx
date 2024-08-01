"use client";
import Image from "next/image";
import Link from "next/link";
const news = [
  {
    poster:
      "https://amrdiab.net/wp-content/uploads/2024/06/Dubai2024-June-News.jpg",
    date: " June 18, 2024",
    title: "Full House in Dubai with Amr Diab",
    description:
      "Egyptian megastar Amr Diab wowed fans at Dubai's Coca-Cola Arena during a spectacular Eid Al-Adha concert. Known as…",
  },
  {
    poster:
      "https://amrdiab.net/wp-content/uploads/2024/06/AmrDiabinBeirut-2024.jpg",
    date: " June 17, 2024",
    title: "Beirut had a Music Night to Remember",
    description:
      "Egyptian megastar Amr Diab wowed fans at Dubai's Coca-Cola Arena during a spectacular Eid Al-Adha concert. Known as…",
  },
  {
    poster:
      "https://amrdiab.net/wp-content/uploads/2024/05/AmrDiab-Pepsi2024-News.jpg",
    date: " May 26, 2024",
    title: "amr-diab-with-pepsi",
    description:
      "Egyptian megastar Amr Diab wowed fans at Dubai's Coca-Cola Arena during a spectacular Eid Al-Adha concert. Known as…",
  },
];
function LatestNews() {
  return (
    <div className="max-w-[1200px] w-[95%] mx-auto">
      <h1 className="text-5xl text-start  font-extrabold text-white mb-3">
        Latest News
      </h1>
      <p className="text-base text-[#7b7a7a]">
        Find the latest news of Amr Diab
      </p>
      <Link
        target="_blank"
        href="/news"
        className="
        text-end ml-auto 
        text-main 
        cursor-pointer block"
      >
        View all news
      </Link>
      <hr className="mt-10" />
      <div
        className="grid  my-10 mx-auto 
      justify-center min-[1090px]:justify-between 
      grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10"
      >
        {news &&
          news.map((newsData) => <News {...newsData} key={newsData.date} />)}
      </div>
    </div>
  );
}
function News({
  poster,
  date,
  title,
  description,
}: {
  poster: string;
  date: string;
  title: string;
  description: string;
}) {
  return (
    <Link href={"/"} className="group h-fit w-full">
      <Image
        src={poster}
        alt={title}
        width={340}
        height={195}
        quality={100}
        className="size-full object-contain"
      />
      <p className="text-sm text-[#7b7a7a] mt-5 mb-3">{date}</p>
      <p className="text-xl  text-white font-bold transition-[color] duration-100 ease-in group-hover:text-main">
        {title}
      </p>
      <p className="text-sm text-[#7b7a7a]  text-ellipsis w-full mt-2 mb-2">
        {description}
      </p>
      <span className="mt-5 transition-[color] duration-100 ease-in group-hover:text-main  text-white text-base">
        Read More
      </span>
    </Link>
  );
}

export default LatestNews;
