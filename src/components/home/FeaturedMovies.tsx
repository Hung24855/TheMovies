// Phim nổi bật
import usefetch from "@/hooks/useFetch";
import Link from "next/link";
import React from "react";


export default async function FeaturedMovies() {
  const { data } = await usefetch<ResponseMovies>(
    `/danh-sach/?sort_field=tmdb.vote_count&year=${new Date().getFullYear()}`,
  );
  if (!data) return null;
  const { items } = data;
  const dataFirm =  items.slice(0, 6) 
  const domain_img = process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE;
  return (
    <div className="mt-2 ">
      {dataFirm.map(({_id, slug, thumb_url, name, year, lang, quality}) => {
        return (
          <Link key={_id} href={`/movie/${slug}`}>
            <div className="mb-2 grid grid-cols-3">
              <div className="col-span-1 mr-2 overflow-hidden rounded">
                <img
                  src={`${domain_img}/${thumb_url}`}
                  alt="Phimnoibat"
                  style={{ width: "100%", objectFit: "cover" }}
                />
              </div>

              <div className="col-span-2 space-y-4">
                <p className="text-wrap line-clamp-2">{name}</p>
                <p className="text-wrap text-primary">
                  {year} - {lang}
                </p>
                <button className="text-wrap px-2 border border-white">{quality}</button>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
