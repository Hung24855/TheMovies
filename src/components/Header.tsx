import Link from "next/link";
import { IoMdArrowDropdown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import MaxWithContainer from "./MaxWithContainer";
import { FaSearch } from "react-icons/fa";
import SideBarMenu from "./SideBarMenu";

const genres = [
  {
    id: 1,
    name: "Tất cả",
  },
  {
    id: 2,
    name: "Hành động",
  },
  {
    id: 3,
    name: "Viễn tưởng",
  },
  {
    id: 4,
    name: "Xuyên không",
  },
  {
    id: 5,
    name: "Cổ trang",
  },
  {
    id: 6,
    name: "Tình cảm",
  },
  {
    id: 7,
    name: "Hoạt hình",
  },
];

export default function Header() {
  return (
    <nav className="sticky inset-x-0 top-0 z-50 h-14 gap-x-2 bg-black/60 text-white backdrop-blur-lg">
      <MaxWithContainer>
        <div className="flex h-full w-full items-center justify-between px-2">
          <div className="flex h-full items-center">
            {/* Menu button */}
            <SideBarMenu/>
            {/* Logo */}
            <img
              src="./logo.png"
              alt="Logo"
              style={{ width: "50px", filter: "invert(100%)",marginRight:"10px" }}
              className="hidden md:block"
            />
            <div className=" h-full gap-x-6 hidden md:flex">
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
                    {genres.map((genre) => (
                      <div
                        key={genre.id}
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
                    <div className="whitespace-nowrap hover:text-primary">
                      Hàn quốc
                    </div>
                    <div className="whitespace-nowrap hover:text-primary">
                      Trung quốc
                    </div>
                    <div className="whitespace-nowrap hover:text-primary">
                      Mỹ
                    </div>
                    <div className="whitespace-nowrap hover:text-primary">
                      Thái lan
                    </div>
                    <div className="whitespace-nowrap hover:text-primary">
                      Tình cảm
                    </div>
                    <div className="whitespace-nowrap hover:text-primary">
                      Âu mỹ
                    </div>
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
          <div className="flex items-center rounded bg-white px-1">
            <input
              type="text"
              placeholder="Tìm kiếm phim..."
              className="px-2 py-1 text-black outline-none"
            ></input>

            <FaSearch size={20} color="gray" className="cursor-pointer" />
          </div>
        </div>
      </MaxWithContainer>
    </nav>
  );
}
