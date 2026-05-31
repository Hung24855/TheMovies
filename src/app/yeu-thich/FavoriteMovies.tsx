"use client"
import { AppContext } from '@/context/app.context'
import React, { Fragment, useContext } from 'react'
import ListFirm from '@/components/shared/ListFirm'

export default function FavoriteMovies() {
    const {
      state: { favoriteMovies = [] }
    } = useContext(AppContext)
  return (
    <Fragment>{favoriteMovies.length > 0 ? (
      <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 pb-10'>
        <ListFirm dataFirm={favoriteMovies as any} />
      </div>
    ) : (
      <div className='flex flex-col items-center justify-center py-32 opacity-50'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-20 h-20 mb-6 text-white/50">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
        <h1 className='text-2xl font-medium tracking-wide'>Chưa có phim yêu thích nào</h1>
      </div>
    )}</Fragment>
  )
}
