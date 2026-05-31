import Link from 'next/link'
import React, { Fragment } from 'react'
import Image from 'next/image'

export default function ListFirm({ dataFirm = [] }: { dataFirm: ResponseMovies['items'] }) {
  const domain_img = process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE

  return (
    <Fragment>
      {dataFirm.length > 0 ? (
        dataFirm.map(({ _id, slug, thumb_url, name, lang, year, quality, episode_current }) => {
          return (
            <Link key={_id || slug} href={`/phim/${slug}`} className='block h-full group'>
              <div className='flex h-full flex-col cursor-pointer'>
                {/* Image Container */}
                <div className='relative w-full pt-[140%] overflow-hidden rounded-md bg-[#111] mb-2 shadow-md group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all'>
                  <Image
                    src={thumb_url?.startsWith('http') ? thumb_url : `${domain_img}/${thumb_url}`}
                    alt={name || 'poster'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className='object-cover transition-transform duration-500 ease-out group-hover:scale-105'
                  />
                  
                  {/* Play Button Overlay */}
                  <div className='absolute inset-0 z-10 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                    <div className='transform scale-90 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 flex items-center justify-center w-12 h-12 rounded-full bg-primary/90 text-white shadow-[0_0_20px_rgba(229,9,20,0.6)]'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 ml-1">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {/* Badges */}
                  {episode_current && (
                    <div className='absolute top-1 left-1 bg-black/70 px-1.5 py-0.5 text-[11px] font-medium text-white rounded-sm z-20 shadow-sm whitespace-nowrap overflow-hidden max-w-[80%] text-ellipsis'>
                      {episode_current}
                    </div>
                  )}
                  {quality && (
                    <div className='absolute top-1 right-1 bg-[#ff9800] px-1.5 py-0.5 text-[10px] font-bold text-white rounded-sm z-20 shadow-sm'>
                      {quality}
                    </div>
                  )}
                  
                  {/* Sub/Lang Badge if available */}
                  {lang && (
                    <div className='absolute bottom-1 right-1 bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white/80 rounded-sm z-20'>
                      {lang}
                    </div>
                  )}
                </div>

                {/* Content Area */}
                <div className='flex flex-col px-1'>
                  <h2 className='text-[14px] font-bold text-white line-clamp-1 transition-colors duration-200 group-hover:text-primary'>
                    {name}
                  </h2>
                  <p className='text-[12px] text-gray-400 line-clamp-1 mt-0.5'>
                    {year}
                  </p>
                </div>
              </div>
            </Link>
          )
        })
      ) : (
        <div className='col-span-full flex flex-col items-center justify-center py-20 opacity-50'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mb-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          <h1 className='text-xl font-medium tracking-wide'>Không tìm thấy phim nào</h1>
        </div>
      )}
    </Fragment>
  )
}
