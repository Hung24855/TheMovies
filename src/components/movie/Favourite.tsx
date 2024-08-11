"use client";
import React, { useContext, useEffect, useState } from "react";
import { CiShare2, CiHeart, FaHeartBroken } from "@/icons";
import { AppContext } from "@/context/app.context";
import clsx from "clsx";
import { InfoMovie } from "@/context/type";
import { toast } from "react-toastify";

export default function Favourite({
  slug,
  name,
  thumb_url,
  lang,
  year,
  quality,
  status,
  episode_current,
}: InfoMovie) {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const {
    state: { favoriteMovies = [] },
    dispatch,
  } = useContext(AppContext);

  useEffect(() => {
    setIsFavourite(favoriteMovies.some((movie) => movie.slug === slug));
  }, [favoriteMovies, slug]);

  return (
    <div className="flex w-full items-center justify-center gap-x-2 rounded-lg bg-[#191919] px-4 py-4 text-black md:w-max md:gap-x-6 md:px-8">
      <div
        className="flex cursor-pointer flex-col items-center gap-1"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast("Sao chép liên kết thành công!");
        }}
      >
        <CiShare2 size={20} color="white" />
        <span className="text-white">Share</span>
      </div>
      <button className="rounded-2xl border-2 border-primary bg-primary px-4 py-2">
        {status !== "trailer" ? <a href="#video">Xem</a> : "Trailer"}
      </button>
      <div
        className={clsx(
          "flex cursor-pointer items-center justify-center gap-x-2 rounded-2xl border-2 border-primary px-4 py-2 text-white",
          {
            "bg-red-600": isFavourite,
          },
        )}
        onClick={() => {
          if (!isFavourite) {
            dispatch({
              type: "Add",
              payload: {
                slug,
                name,
                thumb_url,
                lang,
                year,
                quality,
                status,
                episode_current,
              },
            });
          }

          if (isFavourite) {
            dispatch({
              type: "Remove",
              payload: slug,
            });
          }
        }}
      >
        {isFavourite ? (
          <FaHeartBroken size={16} color="white" />
        ) : (
          <CiHeart size={20} />
        )}
        <span>{isFavourite ? "Bỏ thích" : "Yêu thích"}</span>
      </div>
    </div>
  );
}
