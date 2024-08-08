// Phim nổi bật

import usefetch from "@/hooks/useFetch";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const dataFirm2 = [
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

export default async function FeaturedMovies() {
  const { data } = await usefetch<ResponseMovies>(
    `/danh-sach/?sort_field=tmdb.vote_count&year=${new Date().getFullYear()}`,
  );
  if (!data) return null;

  const { items } = data;

  const dataFirm = items.length > 5 ? items.slice(0, 6) : items;
  const domain_img = process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE;
  return (
    <div className="mt-2 ">
      {dataFirm.map((firm) => {
        return (
          <Link key={firm._id} href={`/movie/${firm.slug}`}>
            <div className="mb-2 grid grid-cols-3">
              <div className="col-span-1 mr-2 overflow-hidden rounded">
                <img
                  src={`${domain_img}/${firm.thumb_url}`}
                  alt="Phimnoibat"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </div>

              <div className="col-span-2 space-y-4">
                <p className="text-wrap line-clamp-2">{firm.name}</p>
                <p className="text-wrap text-primary">
                  {firm.year} - {firm.lang}
                </p>
                <button className="text-wrap px-2 border border-white">{firm.quality}</button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
