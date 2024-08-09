import Link from "next/link";
import MaxWithContainer from "./MaxWithContainer";
import { IoMdArrowDropdown } from "../../icons";
import SideBarMenu from "../SideBarMenu";
import usefetch from "@/hooks/useFetch";
import Search from "../Search";

export default async function Header() {
  const { data: genres } = await usefetch<ResponseGenres>("/the-loai", 36000);
  const { data: countries } = await usefetch<ResponseCountries>(
    "/quoc-gia",
    36000,
  );

  return (
    <nav className="sticky inset-x-0 top-0 z-50 h-14 gap-x-2 bg-black/60 backdrop-blur-lg">
      <MaxWithContainer>
        <div className="flex h-full w-full items-center justify-between px-2">
          <div className="flex h-full items-center">
            {/* Menu button */}
            <SideBarMenu genres={genres?.items} countries={countries?.items} />
            {/* Logo */}
            <img
              src="/Logo.png"
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
                href="/phim-le"
                className="flex h-full items-center hover:text-primary"
              >
                Phim lẻ
              </Link>
              <Link
                href="/phim-bo"
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
                      genres.items.map(({ _id, name, slug }: Genres) => (
                        <Link key={_id} href={`/genres/${slug}`}>
                          <div className="whitespace-nowrap hover:text-primary">
                            {name}
                          </div>
                        </Link>
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
                {countries && countries.items.length > 0 && (
                  <div className="dropdown">
                    <div className="grid w-max grid-cols-2 gap-x-5 gap-y-2 text-start md:grid-cols-3 lg:grid-cols-4">
                      {countries.items.map(({ _id, slug, name }: Country) => (
                        <Link key={_id} href={`/country/${slug}`}>
                          <div className="whitespace-nowrap hover:text-primary">
                            {name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </button>
              <Link
                href="/favourite"
                className="flex h-full items-center hover:text-primary"
              >
                Yêu thích
              </Link>
            </div>
          </div>

          {/* Search */}
          <Search />
        </div>
      </MaxWithContainer>
    </nav>
  );
}
