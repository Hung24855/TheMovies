// Phim nổi bật

import Image from 'next/image';
import React from 'react'

export const dataFirm = [
  {
    id: 1,
    name: "Hồ Yêu Tiểu Hồng Nương: Trúc Nghiệp Thiên",
    decription: "Love in Pavilion (2024)",
    img: "/phim1.jpg",
  },
  {
    id: 2,
    name: "Thiếu Niên Bạch Mã Túy Xuân Phong",
    decription: "Love in Pavilion (2024)",
    img: "/phim2.jpg",
  },
  {
    id: 3,
    name: "Hồ Yêu Tiểu Hồng Nương: Trúc Nghiệp Thiên",
    decription: "Love in Pavilion (2024)",
    img: "/phim3.jpg",
  },
  {
    id: 4,
    name: "Miêu Lĩnh Quỷ Sự",
    decription: "Love in Pavilion (2024)",
    img: "/phim4.jpg",
  },
  {
    id: 5,
    name: "Mục Trung Vô Nhân: Dùng Mắt Trả Mắt",
    decription: "Love in Pavilion (2024)",
    img: "/phim5.jpg",
  },
  {
    id: 6,
    name: "Miêu Lĩnh Quỷ Sự",
    decription: "Love in Pavilion (2024)",
    img: "/phim2.jpg",
  },
  {
    id: 7,
    name: "Mục Trung Vô Nhân: Dùng Mắt Trả Mắt",
    decription: "Love in Pavilion (2024)",
    img: "/phim3.jpg",
  },
  {
    id: 8,
    name: "Thiếu Niên Bạch Mã Túy Xuân Phong",
    decription: "Love in Pavilion (2024)",
    img: "/phim1.jpg",
  },
];


export default function FeaturedMovies() {
  return (
    <div className="mt-2 px-1">
        {dataFirm.slice(0,5).map((firm) => {
          return (
            <div className="mb-1 flex gap-x-1 cursor-pointer w-full" key={firm.id}>
              <div className="mb-2 flex h-auto lg:h-16 md:w-1/3 overflow-hidden rounded-sm">
                <Image
                  src={firm.img}
                  alt="phim1"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  width={100}
                  height={80}
                />
              </div>
              <span className="line-clamp-2 flex-1 overflow-hidden font-normal md:text-sm">
                {firm.name}
              </span>
            </div>
          );
        })} 
    </div>
  );
}
