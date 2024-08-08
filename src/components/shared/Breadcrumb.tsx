//Trang chủ > Phim bộ > Nhất niệm vĩnh hằng
import React from "react";

const Breadcrumbs = [
  { id: 1, name: "Trang chủ" },
  { id: 2, name: "Phim bộ" },
];

export default function Breadcrumb() {
  return (
    <div className="flex h-9 w-full items-center gap-x-1 rounded p-2 bg-black">
      {Breadcrumbs.map((item, index) => (
        <span key={item.id} className="cursor-pointer">
          {item.name}{" "}
          {index !== Breadcrumbs.length - 1 && (
            <span className="text-primary">&gt;</span>
          )}{" "}
        </span>
      ))}
    </div>
  );
}
