import Link from 'next/link'
import React from 'react'

export default function HeroBanner({ movie }: { movie: any }) {
  if (!movie) return null
  const domain_img = process.env.NEXT_PUBLIC_DOMAIN_CDN_IMAGE
  
  // Use poster_url if available, otherwise fallback to thumb_url
  const bgImage = movie.poster_url 
    ? `${domain_img}/${movie.poster_url}` 
    : `${domain_img}/${movie.thumb_url}`

  return (
    <div className='relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-black'>
      {/* Background Image */}
      <img
        src={bgImage}
        alt={movie.name}
        className='absolute inset-0 w-full h-full object-cover opacity-60 scale-105'
      />
      
      {/* Gradient Overlays for Cinematic Effect */}
      <div className='absolute inset-0 bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/40 to-transparent'></div>
      <div className='absolute inset-0 bg-gradient-to-r from-[#0b0c10] via-[#0b0c10]/50 to-transparent'></div>

      {/* Content */}
      <div className='absolute bottom-0 left-0 w-full p-6 md:p-16 lg:p-24 z-10'>
        <div className='max-w-3xl space-y-4 md:space-y-6'>
          {/* Movie Title */}
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-black text-white drop-shadow-2xl uppercase tracking-wider line-clamp-2'>
            {movie.name}
          </h1>
          
          {/* Metadata */}
          <div className='flex items-center gap-x-4 text-sm md:text-base font-semibold text-gray-300'>
            <span className='text-green-500 font-bold'>Độ Phân Giải: {movie.quality}</span>
            <span>{movie.year}</span>
            <span>{movie.lang}</span>
            {movie.episode_current && (
              <span className='px-2 py-0.5 border border-gray-500 rounded'>{movie.episode_current}</span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className='flex items-center gap-x-4 pt-4'>
            <Link href={`/phim/${movie.slug}`}>
              <button className='flex items-center gap-x-2 bg-white text-black px-6 py-3 rounded-md font-bold text-lg hover:bg-gray-200 transition duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
                Phát
              </button>
            </Link>
            <Link href={`/movie/${movie.slug}`}>
              <button className='flex items-center gap-x-2 bg-gray-500/60 text-white px-6 py-3 rounded-md font-bold text-lg hover:bg-gray-500/80 backdrop-blur-md transition duration-300'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                </svg>
                Thông tin khác
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
