import Link from "next/link";
import React, { Fragment } from "react";

export default function ListFirm({
  dataFirm,
}: {
  dataFirm: ResponseMovies["items"];
}) {
  const domain_img = process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE;

  return (
    <Fragment>
      {dataFirm.length > 0 ? (
        dataFirm.map((firm) => {
          return (
            <Link key={firm._id} href={`/movie/${firm.slug}`}>
              <div className="relative mb-2 mt-2 flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded duration-200">
                <img
                  src={`${domain_img}/${firm.thumb_url}`}
                  alt="phim"
                  style={{ width: "100%", objectFit: "cover", flex: 1 }}
                />
                <div className="px-1">
                  <h2 className="mt-1 line-clamp-2 min-h-12 font-semibold">
                    {firm.name}
                  </h2>
                  <div className="flex justify-between text-[12px]">
                    <span className="mt-1">{firm.lang}</span>
                    <span className="mt-1 text-primary">{firm.year}</span>
                  </div>
                </div>
                {/* Số tập */}
                {firm.episode_current && (
                  <div className="absolute left-2 top-2 rounded bg-gray-800/60 px-2 py-1 text-sm text-white">
                    {firm.episode_current.toLowerCase().startsWith("hoàn tất")
                      ? `${firm.episode_current.replace(/[Hh]oàn [Tt]ất/, "Full")}`
                      : firm.episode_current}
                  </div>
                )}
                {/* HD */}
                {firm.quality && (
                  <div className="absolute right-2 top-2 rounded bg-gray-800/60 px-2 py-1 text-sm text-primary">
                    {firm.quality}
                  </div>
                )}
              </div>
            </Link>
          );
        })
      ) : (
        <h1>Không tìm thấy kết quả</h1>
      )}
    </Fragment>
  );
}
