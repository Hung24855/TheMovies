"use client";

import React from "react";
import { GiHamburgerMenu, IoMdClose, IoIosArrowForward } from "@/icons";
import { useRouter } from "next/navigation";


export default function SideBarMenu({
  genres,
  countries,
}: {
  genres: Genres[] | null;
  countries: Country[] | null;
}) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [openSubMenuGenre, setopenSubMenuGenreGenre] =
    React.useState<boolean>(false);
  const [openSubMenuCountry, setopenSubMenuCountry] =
    React.useState<boolean>(false);

  const router = useRouter();

  return (
    <div className="md:hidden">
      <div onClick={() => setOpen(!open)}>
        <GiHamburgerMenu
          size={35}
          className={`mr-4 cursor-pointer md:hidden ${open && "hidden"}`}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-10 h-screen w-1/2 bg-black/90 p-2 transition-transform duration-500 ease-in-out ${
          !open ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="text-center font-bold">THE MOVIES</div>
        <div className="mt-2 h-full text-left">
          <ul>
            <li
              className="flex cursor-pointer items-center rounded py-3 pl-1 font-semibold hover:bg-slate-100/60"
              onClick={() => {
                setOpen(!open);
                router.push("/");
              }}
            >
              Trang chủ
            </li>
            <li
              className="flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60"
              onClick={() => {
                setOpen(!open);
                router.push("/phim-bo");
              }}
            >
              Phim bộ
            </li>
            <li
              className="flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60"
              onClick={() => {
                setOpen(!open);
                router.push("/phim-le");
              }}
            >
              Phim lẻ
            </li>
            <li>
              <div
                className="flex h-full w-full cursor-pointer justify-between rounded py-3 pl-1 hover:bg-slate-100/60"
                onClick={() => setopenSubMenuGenreGenre(!openSubMenuGenre)}
              >
                <span>Thể loại</span>
                <IoIosArrowForward
                  size={20}
                  className={`transition-transform duration-500 ${
                    openSubMenuGenre && "rotate-90"
                  }`}
                />
              </div>
              {/* Sub menu */}
              <ul
                className={`${openSubMenuGenre ? "overflow-y-auto" : "overflow-y-hidden"} scrollbar-custom duration-500 ease-in-out ${
                  openSubMenuGenre ? "max-h-52" : "max-h-0"
                }`}
              >
                {genres &&
                  genres.length > 0 &&
                  genres?.map((genre) => (
                    <li
                      className="cursor-pointer rounded py-2 pl-8 hover:bg-slate-100/60"
                      key={genre._id}
                      onClick={() => {
                        setOpen(!open);
                        router.push(`/genres/${genre.slug}`);
                      }}
                    >
                      <span className="mr-1">&bull;</span>
                      {genre.name}
                    </li>
                  ))}
              </ul>
            </li>
            <li>
              <div
                className="flex h-full w-full cursor-pointer justify-between rounded py-3 pl-1 hover:bg-slate-100/60"
                onClick={() => setopenSubMenuCountry(!openSubMenuCountry)}
              >
                <span>Quốc gia</span>
                <IoIosArrowForward
                  size={20}
                  className={`transition-transform duration-500 ${
                    openSubMenuCountry && "rotate-90"
                  }`}
                />
              </div>
              {/* Sub menu */}
              <ul
                className={`${openSubMenuCountry ? "overflow-y-auto" : "overflow-y-hidden"} scrollbar-custom duration-500 ease-in-out ${
                  openSubMenuCountry ? "max-h-52" : "max-h-0"
                }`}
              >
                {countries &&
                  countries.length > 0 &&
                  countries?.map((country) => (
                    <li
                      className="cursor-pointer rounded py-2 pl-8 hover:bg-slate-100/60"
                      key={country._id}
                      onClick={() => {
                        setOpen(!open);
                        router.push(`/country/${country.slug}`);
                      }}
                    >
                      <span className="mr-1">&bull;</span>
                      {country.name}
                    </li>
                  ))}
              </ul>
            </li>
            <li className="flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60">
              Sắp chiếu
            </li>
          </ul>
        </div>
        <IoMdClose
          size={35}
          className="absolute right-1 top-1 cursor-pointer"
          onClick={() => setOpen(false)}
        />
      </div>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 h-screen bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}
    </div>
  );
}
