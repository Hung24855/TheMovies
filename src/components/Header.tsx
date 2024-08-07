import Link from "next/link";
import MaxWithContainer from "./MaxWithContainer";

import {IoMdArrowDropdown,FaSearch} from "../icons";
import SideBarMenu from "./SideBarMenu";
import usefetch from "@/hooks/useFetch";

export default async function Header() {
  const { data: genres } = await usefetch<ResponseGenres>("/the-loai");
  const { data: countries } = await usefetch<ResponseCountries>("/the-loai");

  return (
    <nav className="sticky inset-x-0 top-0 z-50 h-14 gap-x-2 bg-black/60  backdrop-blur-lg ">
      <MaxWithContainer>
        <div className="flex h-full w-full items-center justify-between px-2">
          <div className="flex h-full items-center">
            {/* Menu button */}
            <SideBarMenu genres={genres?.items??null} countries={countries?.items??null} />
            {/* Logo */}
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: "50px",
                filter: "invert(100%)",
                marginRight: "10px",
              }}
              className="hidden md:block"
            />
            <div className="hidden h-full gap-x-6 md:flex">
              <Link
                href="/"
                className="flex h-full items-center hover:text-primary"
              >
                Trang chủ
              </Link>
              <Link
                href="/"
                className="flex h-full items-center hover:text-primary"
              >
                Phim lẻ
              </Link>
              <Link
                href="/"
                className="flex h-full items-center hover:text-primary"
              >
                Phim bộ
              </Link>
              <button className="group relative h-full">
                <span className="flex items-center group-hover:text-primary">
                  Thể loại{" "}
                  <span>
                    <IoMdArrowDropdown size={20} />
                  </span>
                </span>
                {/* Dropdown menu */}
                <div className="dropdown">
                  {/* Content of the dropdown */}
                  <div className="grid w-max grid-cols-2 gap-x-5 gap-y-2 text-start md:grid-cols-3 lg:grid-cols-4">
                    {genres &&
                      genres.items.length > 0 &&
                      genres.items.map((genre: Genres) => (
                        <div
                          key={genre._id}
                          className="whitespace-nowrap hover:text-primary"
                        >
                          {genre.name}
                        </div>
                      ))}
                  </div>
                </div>
              </button>
              <button className="group relative h-full">
                <span className="flex items-center group-hover:text-primary">
                  Quốc gia{" "}
                  <span>
                    <IoMdArrowDropdown size={20} />
                  </span>
                </span>
                <div className="dropdown">
                  <div className="grid w-max grid-cols-2 gap-x-5 gap-y-2 text-start md:grid-cols-3 lg:grid-cols-4">
                    {countries &&
                      countries.items.length > 0 &&
                      countries.items.map((genre: Genres) => (
                        <div
                          key={genre._id}
                          className="whitespace-nowrap hover:text-primary"
                        >
                          {genre.name}
                        </div>
                      ))}
                  </div>
                </div>
              </button>
              <Link
                href="/"
                className="flex h-full items-center hover:text-primary"
              >
                Chiếu rạp
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="flex items-center  rounded bg-white px-1">
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              className="px-2 py-1 text-black outline-none w-[200px] md:w-auto"
            ></input>

            <FaSearch size={20} color="gray" className="cursor-pointer" />
          </div>
        </div>
      </MaxWithContainer>
    </nav>
  );
}
