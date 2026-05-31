import { Metadata } from 'next'

import React from 'react'
import FavoriteMovies from './FavoriteMovies'

export const metadata: Metadata = {
  title: 'Phim yêu thích',
  description: 'Danh sách phim yêu thích của bạn'
}

export default function Favorite() {
  return (
    <div className='w-full px-2 md:px-12 lg:px-20 pt-32 relative z-20 min-h-screen'>
      <div className='relative z-50 mb-8 flex flex-col items-start border-b border-white/10 pb-4'>
        <h1 className='text-3xl font-bold uppercase tracking-wider text-white'>
          <span className='text-primary mr-3'>❤️</span> PHIM YÊU THÍCH
        </h1>
      </div>
      <FavoriteMovies />
    </div>
  )
}
