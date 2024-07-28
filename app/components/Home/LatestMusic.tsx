import React from "react";

function LatestMusic() {
  return (
    <div>
      <h1 className="text-center text-white mx-auto font-extrabold text-5xl mb-10">
        Latest: Amr Diab's Music Video
      </h1>
      <span className="text-center mx-auto block text-base text-[#7b7a7a] mb-10">
        Amr Diab – El Kelma El Helwa with Vodafone
      </span>
      <iframe
        height="525"
        className="w-[95%] h-auto
         sm:min-h-[200px] md:min-h-[500px] lg:min-h-[700px] mx-auto"
        src="https://www.youtube.com/embed/2E8akmr0FUs"
        title="اعلان ڤودافون رمضان ٢٠٢٤ - الكلمة الحلوة  - عمرو دياب"
        frameBorder="0"
        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default LatestMusic;
