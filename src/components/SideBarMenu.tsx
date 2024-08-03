"use client";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose, IoIosArrowForward } from "react-icons/io";

export default function SideBarMenu() {
  const [open, setOpen] = React.useState(false);
  const [openSubMenu, setOpenSubMenu] = React.useState(false);

  return (
    <div>
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
            <li className="flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60">
              Danh sách phim
            </li>
            <li className="flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60">
              Phim bộ
            </li>
            <li className="flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60">
              Phim lẻ
            </li>
            <li>
              <div
                className="flex h-full w-full cursor-pointer justify-between rounded py-3 pl-1 hover:bg-slate-100/60"
                onClick={() => setOpenSubMenu(!openSubMenu)}
              >
                <span>Thể loại</span>
                <IoIosArrowForward
                  size={20}
                  className={`transition-transform duration-500 ${
                    openSubMenu && "rotate-90"
                  }`}
                />
              </div>
              {/* Sub menu */}
              <ul
                className={`${openSubMenu ? "overflow-y-auto" : "overflow-y-hidden"} scrollbar-custom duration-500 ease-in-out ${
                  openSubMenu ? "max-h-52" : "max-h-0"
                }`}
              >
                <li className="cursor-pointer rounded py-2 pl-8 hover:bg-slate-100/60">
                  <span className="mr-1">&bull;</span>Hành động
                </li>
                <li className="cursor-pointer rounded py-2 pl-8 hover:bg-slate-100/60">
                  <span className="mr-1">&bull;</span>Hoạt hình
                </li>
                <li className="cursor-pointer rounded py-2 pl-8 hover:bg-slate-100/60">
                  <span className="mr-1">&bull;</span>Kinh dị
                </li>
                <li className="cursor-pointer rounded py-2 pl-8 hover:bg-slate-100/60">
                  <span className="mr-1">&bull;</span>Cổ trang
                </li>
                <li className="cursor-pointer rounded py-2 pl-8 hover:bg-slate-100/60">
                  <span className="mr-1">&bull;</span>Tình cảm
                </li>
                <li className="cursor-pointer rounded py-2 pl-8 hover:bg-slate-100/60">
                  <span className="mr-1">&bull;</span>Viễn tưởng
                </li>
              </ul>
            </li>
            <li className="flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60">
              Quốc gia
            </li>
            <li className="flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60">
              Chiếu rạp
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
