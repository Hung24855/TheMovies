"use client";
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'


type ListFirm = {
  name: string;
  slug: string;
  link_embed: string;
};

export default function Episodes({ ListFirm,initEpisode }: { ListFirm: ListFirm[]; initEpisode :string}) {
  const [Episode, setEpisode] = useState<number>(()=>Number(initEpisode));
  const router = useRouter();

  
  return (
    <div className="mt-4 grid grid-cols-4 gap-2 bg-black p-2 md:grid-cols-8 lg:grid-cols-12">
      {ListFirm.map((firm,index) => {
        return (
          <button
            className={clsx(
              "rounded bg-[#191919] px-2 py-2 text-center hover:bg-primary hover:text-black md:px-10",
              Episode === Number(firm.slug) && "bg-primary text-black",
              firm.slug.toLowerCase() === "full" && "bg-primary text-black",
            )}
            key={firm.name}
            onClick={() => {
              if (Episode !== Number(firm.slug)) {
                setEpisode(Number(firm.slug));
                router.push(`?tap=${firm.slug}`, { scroll: false });
              }
            }}
          >
            {firm.name}
          </button>
        );
      })}
    </div>
  );
}
