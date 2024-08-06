import React from "react";
import {
  MdDateRange,
  IoMdTime,
  MdLocalMovies,
  IoEarth,
  IoLanguage,
} from "@/icons";
import usefetch from "@/hooks/useFetch";

export default async function MoviePage({
  params,
}: {
  params: { name: string };
}) {
  const { data: movieDetail } = await usefetch<MovieDetail>(
    `/phim/${params.name}`,
  );

  return (
    <div className="mt-2 min-h-screen bg-black p-2">
      <div className="grid grid-cols-4 gap-x-5">
        <div className="flex h-full items-center">
          <img src={movieDetail?.seoOnPage.seoSchema.image} alt="img" />
        </div>
        {/* Content */}
        <div className="col-span-3 space-y-4 py-12">
          <h1 className="text-[45px] font-semibold">
            {movieDetail?.item.name}
          </h1>
          <h4 className="font-semibold">
            Diễn viên :{" "}
            <span className="text-primary">
              {movieDetail?.item.actor.join(", ")}
            </span>
          </h4>

          <div className="flex items-center gap-x-4">
            <div className="rounded px-2 py-1 ring-1">
              {movieDetail?.item.episode_current}
            </div>
            <div className="rounded px-2 py-1 ring-1">
              {movieDetail?.item.quality}
            </div>
            <span>
              {movieDetail?.item.category
                .map((category) => category.name)
                .join(", ")}
            </span>
          </div>

          <div className="flex items-center gap-x-4">
            <span className="flex items-center">
              <MdDateRange
                className="mr-2 inline-block text-primary"
                size={20}
              />
              {movieDetail?.item.year}
            </span>
            <span className="flex items-center">
              <IoMdTime className="mr-2 inline-block text-primary" size={20} />
              {movieDetail?.item.time}
            </span>
            <span className="flex items-center">
              <IoLanguage
                className="mr-2 inline-block text-primary"
                size={20}
              />
              {movieDetail?.item.lang}
            </span>
          </div>

          <div className="flex items-center gap-x-4">
            <span className="flex items-center">
              <MdLocalMovies
                className="mr-2 inline-block text-primary"
                size={20}
              />
              11/12 Tập
            </span>
            <span className="flex items-center">
              <IoEarth className="mr-2 inline-block text-primary" size={20} />
              {movieDetail?.item.country[0].name}
            </span>
          </div>
          <span
            className="mt-5 inline-block"
            dangerouslySetInnerHTML={{
              __html: movieDetail?.item.content ?? "",
            }}
          />
        </div>
      </div>

      {/* Video */}
      <div className="mt-10">
        <video width="100%" controls>
          <source src={"https://vip.opstream13.com/share/a35fe7f7fe8217b4369a0af4244d1fca"} type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
