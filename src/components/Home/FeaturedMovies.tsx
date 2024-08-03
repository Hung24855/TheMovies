// Phim nổi bật
import { dataFirm } from '@/app/page';
import Image from 'next/image';
import React from 'react'




export default function FeaturedMovies() {
  return (
    <div className="mt-2 px-1">
        {dataFirm.slice(0,5).map((firm) => {
          return (
            <div className="mb-1 flex gap-x-1 cursor-pointer" key={firm.id}>
              <div className="mb-2 flex h-auto lg:h-16 w-1/3 overflow-hidden rounded-sm">
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
