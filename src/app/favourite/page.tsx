"use client";
import { AppContext } from "@/context/app.context";
import Link from "next/link";
import React, { useContext } from "react";

export default function Favorite() {
  const {
    state: { favoriteMovies = [] },
    dispatch,
  } = useContext(AppContext);

  console.log(favoriteMovies);

  return (
    <div className="mt-2 min-h-screen bg-black/80 p-2">
      <h1 className="font-bold">PHIM YÊU THÍCH</h1>
      {/* Phim sắp chiếu */}
      {favoriteMovies.length > 0 ? <div className="mt-2 grid grid-cols-2 gap-2 pb-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {favoriteMovies.map(
          ({ lang, name, thumb_url, year, quality, slug, episode_current }) => (
            <Link key={name} href={`/movie/${slug}`}>
              <div className="relative mb-2 mt-2 flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded duration-200">
                <img
                  src={thumb_url}
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
          ),
        )}
      </div> : <div className="text-white text-3xl text-center">Không có phim nào trong danh sách</div>}
    </div>
  );
}
