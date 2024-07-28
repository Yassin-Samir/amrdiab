import Image from "next/image";

function LatestReleases() {
  return (
    <div className="mx-auto w-full flex flex-wrap justify-center  gap-10 mb-10">
      <div className=" min-[960px]:w-1/2 w-[95%]  h-full self-start">
        <h1 className="text-3xl  text-white font-extrabold">
          Discover Amr Diab newest albums & singles.
        </h1>
        <p className="text-base mt-5 text-[#7b7a7a]">
          Amr Diab’s hard work and passion to creating quality music and new
          stylized musical techniques was his ultimate aim throughout the years.
          Browse through his discography to find out your favorite music hits
        </p>
      </div>
      <Image
        className="w-full h-full max-w-[400px] max-h-[400px]"
        alt="amr diab"
        width={100}
        height={100}
        src={"https://amrdiab.net/wp-content/uploads/2022/11/ElSer-Cover.jpg"}
      />
    </div>
  );
}

export default LatestReleases;
