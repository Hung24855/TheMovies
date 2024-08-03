"use client";
import React, { useState } from "react";

export default function FilterFirm() {
  const [selectedSort, setSelectedSort] = useState<string>();
  const [selectedGenre, setSelectedGenre] = useState<string>();

  const handleSortClick = (value:string) => {
    setSelectedSort(value);
  };

  const handleGenreClick = (value:string) => {
    setSelectedGenre(value);
  };

  return (
    <div className="mt-2 flex min-h-8 items-center md:gap-4 gap-2 rounded px-2 flex-wrap">
      <div className="group relative z-10 cursor-pointer rounded bg-gray-800 px-2 py-1 font-light">
        <span>{selectedSort ?? "--Sắp xếp--"}</span>
        <div className="before-arrow before-arrow absolute left-1/2 top-full z-10 hidden min-h-14 w-max -translate-x-1/2 animate-fade-in-down rounded-sm bg-black/90 text-start group-hover:block">
          <ul className="space-y-2 overflow-hidden rounded-sm p-2 font-normal">
            <li
              onClick={() => handleSortClick("Năm sản xuất")}
              className="by-1 px-2 hover:text-primary"
            >
              Năm sản xuất
            </li>
            <li
              onClick={() => handleSortClick("Tên phim a-z")}
              className="by-1 px-2 hover:text-primary"
            >
              Tên phim a-z
            </li>
            <li
              onClick={() => handleSortClick("Lượt xem")}
              className="by-1 px-2 hover:text-primary"
            >
              Lượt xem
            </li>
          </ul>
        </div>
      </div>
      <div className="group relative cursor-pointer rounded bg-gray-800 px-2 py-1 font-light">
        <span>{selectedGenre ?? "--Thể loại--"}</span>
        <div className="before-arrow before-arrow absolute left-1/2 top-full z-10 hidden min-h-14 w-max -translate-x-1/2 animate-fade-in-down rounded-sm bg-black/90 text-start group-hover:block">
          <ul className="space-y-2 overflow-hidden rounded-sm p-2 font-normal">
            <li
              onClick={() => handleGenreClick("Cổ trang - Thần thoại")}
              className="by-1 px-2 hover:text-primary"
            >
              Cổ trang - Thần thoại
            </li>
            <li
              onClick={() => handleGenreClick("Võ thuật - Kiếm Hiệp")}
              className="by-1 px-2 hover:text-primary"
            >
              Võ thuật - Kiếm Hiệp
            </li>
            <li
              onClick={() => handleGenreClick("Tâm lý - Tình cảm")}
              className="by-1 px-2 hover:text-primary"
            >
              Tâm lý - Tình cảm
            </li>
            <li
              onClick={() => handleGenreClick("Hoạt hình")}
              className="by-1 px-2 hover:text-primary"
            >
              Hoạt hình
            </li>
          </ul>
        </div>
      </div>
      <div className="relative cursor-pointer rounded bg-gray-800 px-2 py-1 font-light">
        --Định dạng--
      </div>
      <div className="relative cursor-pointer rounded bg-gray-800 px-2 py-1 font-light">
        --Quốc gia--
      </div>
      <div className="relative cursor-pointer rounded bg-gray-800 px-2 py-1 font-light">
        --Năm phát hành--
      </div>
      <button className="rounded bg-gray-800 px-2 py-1 ring-2">Lọc phim</button>
    </div>
  );
}
