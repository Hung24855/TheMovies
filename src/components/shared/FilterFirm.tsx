"use client";
import { gennerateYear } from "@/base/utils/gennerate";
import clsx from "clsx";
import { useRouter } from "next-nprogress-bar";
import React, { useState } from "react";
import { TiDeleteOutline } from "@/icons";

type FilterFirmProps = {
  genres?: Genres[];
  countries?: Country[];
};

//Gennerate ra 1 mảng các năm từ năm hiện tại về trước
const years: number[] = gennerateYear(10);
type filter = {
  name: string | number;
  slug: string | number;
};

export default function FilterFirm({ genres=[], countries=[] }: FilterFirmProps) {
  const router = useRouter();
  const [selectedSort, setSelectedSort] = useState<filter | undefined>();
  const [selectedGenre, setSelectedGenre] = useState<filter | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<filter | undefined>();
  const [selectedYear, setSelectedYear] = useState<filter | undefined>();

  // Hiện thị
  const [showFilter, setShowFilter] = useState(false);
  const [showFilterRenges, setShowFilterRenges] = useState(false);
  const [showFilterCountries, setShowFilterCountries] = useState(false);
  const [showFilterYears, setShowFilterYears] = useState(false);

  const handleSortClick = ({ name, slug }: filter) => {
    setSelectedSort({
      name,
      slug,
    });
    setShowFilter(!showFilter);
  };

  const handleGenreClick = ({ name, slug }: filter) => {
    setSelectedGenre({
      name,
      slug,
    });
    setShowFilterRenges(!showFilterRenges);
  };

  const handleCountryClick = ({ name, slug }: filter) => {
    setSelectedCountry({
      name,
      slug,
    });
    setShowFilterCountries(!showFilterCountries);
  };

  const handleYearClick = ({ name, slug }: filter) => {
    setSelectedYear({
      name,
      slug,
    });
    setShowFilterYears(!showFilterYears);
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
    <div className="mt-2 flex min-h-8 flex-wrap items-center gap-2 rounded px-2 md:gap-4">
      {/* Cha */}
      <div
        className="relative z-10 cursor-pointer rounded bg-gray-800 px-2 py-1 font-light"
        onClick={() => setShowFilter(!showFilter)}
      >
        {selectedSort?.name && (
          <div
            className="absolute -right-1 -top-1 size-4 rounded-full text-white"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedSort(undefined);
            }}
          >
            <TiDeleteOutline size={20} />
          </div>
        )}
        <span>{selectedSort?.name ?? "--Sắp xếp--"}</span>
        {/* Dropdown */}
        {showFilter && (
          <div className="before-arrow absolute left-1/2 top-full z-10 min-h-14 w-max -translate-x-1/2 animate-fade-in-down rounded-sm bg-black/90 text-start">
            <ul className="space-y-2 rounded-sm p-2 font-normal">
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
        )}
      </div>

      <div
        className="relative cursor-pointer rounded bg-gray-800 px-2 py-1 font-light"
        onClick={() => setShowFilterRenges(!showFilterRenges)}
      >
        {selectedGenre?.name && (
          <div
            className="absolute -right-1 -top-1 size-4 rounded-full text-white"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedGenre(undefined);
            }}
          >
            <TiDeleteOutline size={20} />
          </div>
        )}
        <span>{selectedGenre?.name ?? "--Thể loại--"}</span>
        {/* Dropdown */}
        {showFilterRenges && (
          <div className="before-arrow absolute left-1/2 top-full z-10 min-h-14 w-max -translate-x-1/2 animate-fade-in-down rounded-sm bg-black/90 text-start">
            <ul
              className={clsx(
                "scrollbar-custom max-h-48 space-y-2 overflow-hidden overflow-y-auto rounded-sm p-2 font-normal",
              )}
            >
              {genres &&
                genres?.map(({ _id, name, slug }) => (
                  <li
                    key={_id}
                    onClick={() =>
                      handleGenreClick({
                        name: name,
                        slug: slug,
                      })
                    }
                    className="by-1 px-2 hover:text-primary"
                  >
                    {name}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <div className="relative cursor-pointer rounded bg-gray-800 px-2 py-1 font-light" 
      onClick={() => setShowFilterCountries(!showFilterCountries)}>
        {selectedCountry?.name && (
          <div
            className="absolute -right-1 -top-1 size-4 rounded-full text-white"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedCountry(undefined);
            }}
          >
            <TiDeleteOutline size={20} />
          </div>
        )}
        <span>{selectedCountry?.name ?? "--Quốc gia--"}</span>
        {/* Dropdown */}
        {showFilterCountries && (
          <div className="before-arrow absolute left-1/2 top-full z-10 min-h-14 w-max -translate-x-1/2 animate-fade-in-down rounded-sm bg-black/90 text-start">
            <ul
              className={clsx(
                "scrollbar-custom max-h-48 space-y-2 overflow-hidden overflow-y-auto rounded-sm p-2 font-normal",
              )}
            >
              {countries &&
                countries?.map(({ _id, name, slug }) => (
                  <li
                    key={_id}
                    onClick={() =>
                      handleCountryClick({
                        name: name,
                        slug: slug,
                      })
                    }
                    className="by-1 px-2 hover:text-primary"
                  >
                    {name}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      <div
        className="relative cursor-pointer rounded bg-gray-800 px-2 py-1 font-light"
        onClick={() => setShowFilterYears(!showFilterYears)}
      >
        {selectedYear?.name && (
          <div
            className="absolute -right-1 -top-1 size-4 rounded-full text-white"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedYear(undefined);
            }}
          >
            <TiDeleteOutline size={20} />
          </div>
        )}
        <span>{selectedYear?.name ?? "--Năm phát hành--"}</span>
        {showFilterYears && (
          <div className="before-arrow absolute left-1/2 top-full z-10 min-h-14 w-max -translate-x-1/2 animate-fade-in-down rounded-sm bg-black/90 text-start">
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
        )}
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
