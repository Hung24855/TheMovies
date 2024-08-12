import Link from "next/link";
import React, { Fragment } from "react";

export default function ListFirm({
  dataFirm = [],
}: {
  dataFirm: ResponseMovies["items"];
}) {
  const domain_img = process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE;

  return (
    <Fragment>
      {dataFirm.length > 0 ? (
        dataFirm.map(({_id,slug,thumb_url,name,lang,year,quality,episode_current,}) => {
            return (
              <Link key={_id} href={`/movie/${slug}`}>
                <div className="relative mb-2 mt-2 flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded duration-200">
                  <img
                    src={`${domain_img}/${thumb_url}`}
                    alt="phim"
                    style={{ width: "100%", objectFit: "cover", flex: 1 }}
                    loading="lazy"
                  />
                  <div className="px-1">
                    <h2 className="mt-1 line-clamp-2 min-h-12 font-semibold">
                      {name}
                    </h2>
                    <div className="flex justify-between text-[12px]">
                      <span className="mt-1">{lang}</span>
                      <span className="mt-1 text-primary">{year}</span>
                    </div>
                  </div>
                  {/* Số tập */}
                  {episode_current && (
                    <div className="absolute left-2 top-2 rounded bg-gray-800/60 px-2 py-1 text-sm text-white">
                      {episode_current.toLowerCase().startsWith("hoàn tất")
                        ? `${episode_current.replace(/[Hh]oàn [Tt]ất/, "Full")}`
                        : episode_current}
                    </div>
                  )}
                  {/* HD */}
                  {quality && (
                    <div className="absolute right-2 top-2 rounded bg-gray-800/60 px-2 py-1 text-sm text-primary">
                      {quality}
                    </div>
                  )}
                </div>
              </Link>
            );
          },
        )
      ) : (
        <h1>Không tìm thấy kết quả</h1>
      )}
    </Fragment>
  );
}
