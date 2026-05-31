// Phim nổi bật
import usefetch from '@/hooks/useFetch'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default async function FeaturedMovies() {
  const { data } = await usefetch<ResponseMovies>(
    `/danh-sach/phim-chieu-rap?sort_field=tmdb.vote_count&limit=15&year=${new Date().getFullYear()}`
  )
  if (!data) return null
  const { items } = data
  const dataFirm = items.slice(0, 15)
  const domain_img = process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE
  return (
    <div className='flex gap-4 overflow-x-auto pb-4 pt-1 scrollbar-custom snap-x'>
      {dataFirm.map(({ _id, slug, thumb_url, name, year, lang, quality }) => {
        return (
          <Link key={_id} href={`/phim/${slug}`}>
            <div className='group relative flex flex-col w-36 md:w-48 shrink-0 cursor-pointer snap-start'>
              <div className='relative w-full aspect-[2/3] overflow-hidden rounded-md bg-[#111] mb-2 shadow-md group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all'>
                <Image
                  src={`${domain_img}/${thumb_url}`}
                  alt={name || 'Phimnoibat'}
                  fill
                  sizes="(max-width: 768px) 150px, 200px"
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
                
                {/* Play Button Overlay */}
                <div className='absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                  <div className='transform scale-90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 flex items-center justify-center w-10 h-10 rounded-full bg-primary/90 text-white shadow-[0_0_20px_rgba(229,9,20,0.6)]'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-1">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>

                <div className='absolute top-1 left-1 bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white/80 rounded-sm z-20'>
                  {lang}
                </div>
                <div className='absolute top-1 right-1 bg-[#ff9800] px-1.5 py-0.5 text-[10px] font-bold text-white rounded-sm z-20 shadow-sm'>
                  {quality}
                </div>
              </div>

              <div className='flex flex-col px-1'>
                <p className='line-clamp-1 text-[13px] font-bold text-white transition-colors group-hover:text-primary'>
                  {name}
                </p>
                <div className='flex items-center text-[11px] text-gray-400 mt-0.5'>
                  <span>{year}</span>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
