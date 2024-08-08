"use client";
import { gennerateYear } from "@/base/utils/gennerate";
import clsx from "clsx";
import { useRouter } from "next-nprogress-bar";
import React, { useState } from "react";

type FilterFirmProps = {
  genres: Genres[] | null;
  countries: Country[] | null;
};

//Gennerate ra 1 mảng các năm từ năm hiện tại về trước
const years: number[] = gennerateYear(10);
type filter = {
  name: string | number;
  slug: string | number;
};

export default function FilterFirm({ genres, countries }: FilterFirmProps) {
  const [selectedSort, setSelectedSort] = useState<filter | undefined>();
  const [selectedGenre, setSelectedGenre] = useState<filter | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<filter | undefined>();
  const [selectedYear, setSelectedYear] = useState<filter | undefined>();
  const router = useRouter();

  const handleSortClick = ({ name, slug }: filter) => {
    setSelectedSort({
      name,
      slug,
    });
  };

  const handleGenreClick = ({ name, slug }: filter) => {
    setSelectedGenre({
      name,
      slug,
    });
  };

  const handleCountryClick = ({ name, slug }: filter) => {
    setSelectedCountry({
      name,
      slug,
    });
  };

  const handleYearClick = ({ name, slug }: filter) => {
    setSelectedYear({
      name,
      slug,
    });
  };

  const handleFilter = () => {
    const params = {
      sort_field: selectedSort?.slug,
      category: selectedGenre?.slug,
      country: selectedCountry?.slug,
      year: selectedYear?.slug,
    };

    const searchParams = (Object.keys(params) as (keyof typeof params)[])
      .filter((key) => params[key] !== undefined)
      .map((key) => `${key}=${params[key]}`)
      .join("&");
    router.push(`?${searchParams}`);
  };

  return (
    <div className="mt-2  min-h-8 flex-wrap items-center gap-2 rounded px-2 flex md:gap-4">
      <div className="group relative z-10 cursor-pointer rounded bg-gray-800 px-2 py-1 font-light">
        <span>{selectedSort?.name ?? "--Sắp xếp--"}</span>
        <div className="before-arrow before-arrow absolute left-1/2 top-full z-10 hidden min-h-14 w-max -translate-x-1/2 animate-fade-in-down rounded-sm bg-black/90 text-start group-hover:block">
          <ul className="space-y-2 overflow-hidden rounded-sm p-2 font-normal">
            <li
              onClick={() =>
                handleSortClick({ name: "Năm xuất bản", slug: "year" })
              }
              className="by-1 px-2 hover:text-primary"
            >
              Năm xuất bản
            </li>
            <li
              onClick={() =>
                handleSortClick({ name: "Tên phim a-z", slug: "name" })
              }
              className="by-1 px-2 hover:text-primary"
            >
              Tên phim a-z
            </li>
          </ul>
        </div>
      </div>
      <div className="group relative cursor-pointer rounded bg-gray-800 px-2 py-1 font-light">
        <span>{selectedGenre?.name ?? "--Thể loại--"}</span>
        <div className="before-arrow before-arrow absolute left-1/2 top-full z-10 hidden min-h-14 w-max -translate-x-1/2 animate-fade-in-down rounded-sm bg-black/90 text-start group-hover:block">
          <ul
            className={clsx(
              "scrollbar-custom max-h-48 space-y-2 overflow-hidden overflow-y-auto rounded-sm p-2 font-normal",
            )}
          >
            {genres &&
              genres?.map((genre) => (
                <li
                  key={genre._id}
                  onClick={() =>
                    handleGenreClick({
                      name: genre.name,
                      slug: genre.slug,
                    })
                  }
                  className="by-1 px-2 hover:text-primary"
                >
                  {genre.name}
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div className="group relative cursor-pointer rounded bg-gray-800 px-2 py-1 font-light">
        <span>{selectedCountry?.name ?? "--Quốc gia--"}</span>
        <div className="before-arrow before-arrow absolute left-1/2 top-full z-10 hidden min-h-14 w-max -translate-x-1/2 animate-fade-in-down rounded-sm bg-black/90 text-start group-hover:block">
          <ul
            className={clsx(
              "scrollbar-custom max-h-48 space-y-2 overflow-hidden overflow-y-auto rounded-sm p-2 font-normal",
            )}
          >
            {countries &&
              countries?.map((country) => (
                <li
                  key={country._id}
                  onClick={() =>
                    handleCountryClick({
                      name: country.name,
                      slug: country.slug,
                    })
                  }
                  className="by-1 px-2 hover:text-primary"
                >
                  {country.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="group relative cursor-pointer rounded bg-gray-800 px-2 py-1 font-light">
        <span>{selectedYear?.name ?? "--Năm phát hành--"}</span>
        <div className="before-arrow before-arrow absolute left-1/2 top-full z-10 hidden min-h-14 w-max -translate-x-1/2 animate-fade-in-down rounded-sm bg-black/90 text-start group-hover:block">
          <ul
            className={clsx(
              "scrollbar-custom max-h-48 space-y-2 overflow-hidden overflow-y-auto rounded-sm p-2 font-normal",
            )}
          >
            {years.map((year) => (
              <li
                key={year}
                onClick={() => handleYearClick({ name: year, slug: year })}
                className="by-1 px-2 hover:text-primary"
              >
                {year}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        className="rounded bg-gray-800 px-2 py-1 ring-2"
        onClick={handleFilter}
      >
        Lọc phim
      </button>
    </div>
  );
}
