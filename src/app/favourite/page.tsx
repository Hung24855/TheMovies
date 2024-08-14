import { Metadata } from 'next'

import React from 'react'
import FavoriteMovies from './FavoriteMovies'

export const metadata: Metadata = {
  title: 'Phim yêu thích',
  description: '...'
}
export default function Favorite() {
  return (
    <div className='mt-2 min-h-screen bg-black/80 p-2'>
      <h1 className='font-bold'>PHIM YÊU THÍCH</h1>
      {/* Phim sắp chiếu */}
      <FavoriteMovies />
    </div>
  )
}
