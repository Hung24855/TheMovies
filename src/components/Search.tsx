"use client";

import React from "react";
import { FaSearch } from "@/icons";
import { useRouter } from "next-nprogress-bar";

export default function Search() {
  const [search, setSearch] = React.useState<string>("");
  const router = useRouter();

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const keyWord = search.replace(/\s+/g, "+");
       //Thay các khoản trắng liên tiếp thành +
      router.push(`/tim-kiem?q=${keyWord}`);
      setSearch("");
    }
  };

  return (
    <div className="flex items-center rounded bg-white px-1">
      <input
        type="text"
        placeholder="Tìm kiếm phim..."
        className="w-[200px] px-2 py-1 text-black outline-none md:w-auto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={onKeyDown}
      ></input>

      <FaSearch size={20} color="gray" className="cursor-pointer" />
    </div>
  );
}
