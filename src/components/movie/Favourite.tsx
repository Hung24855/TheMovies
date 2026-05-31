'use client'
import React, { useContext, useEffect, useState } from 'react'
import { CiShare2, CiHeart, FaHeartBroken } from '@/icons'
import { AppContext } from '@/context/app.context'
import clsx from 'clsx'
import { InfoMovie } from '@/context/type'
import { toast } from 'react-toastify'

export default function Favourite({ slug, name, thumb_url, lang, year, quality, status, episode_current }: InfoMovie) {
  const [isFavourite, setIsFavourite] = useState<boolean>(false)
  const {
    state: { favoriteMovies = [] },
    dispatch
  } = useContext(AppContext)

  useEffect(() => {
    setIsFavourite(favoriteMovies.some((movie) => movie.slug === slug))
  }, [favoriteMovies, slug])

  return (
    <div className='flex items-center gap-2 md:gap-3'>
      {/* Nút Share */}
      <div
        className='flex cursor-pointer items-center justify-center w-10 h-10 shrink-0 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 transition-all duration-300'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          toast('Sao chép liên kết thành công!')
        }}
        title="Chia sẻ"
      >
        <CiShare2 size={18} className='text-white' />
      </div>

      {/* Nút Xem Phim */}
      {status !== 'trailer' && (
        <a 
          href='#video'
          className='flex items-center justify-center rounded-md bg-primary text-white font-bold px-4 py-2 hover:shadow-[0_0_20px_rgba(229,9,20,0.5)] hover:-translate-y-0.5 transition-all duration-300'
        >
          Xem Phim
        </a>
      )}

      {/* Nút Yêu thích */}
      <div
        className={clsx(
          'flex cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5',
          isFavourite 
            ? 'bg-primary/20 text-primary border-primary shadow-[0_0_15px_rgba(229,9,20,0.2)]' 
            : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10 hover:text-white'
        )}
        onClick={() => {
          if (!isFavourite) {
            dispatch({
              type: 'Add',
              payload: { slug, name, thumb_url, lang, year, quality, status, episode_current }
            })
          } else {
            dispatch({ type: 'Remove', payload: slug })
          }
        }}
      >
        {isFavourite ? <FaHeartBroken size={16} /> : <CiHeart size={20} />}
        <span className='text-sm whitespace-nowrap'>{isFavourite ? 'Bỏ thích' : 'Yêu thích'}</span>
      </div>
    </div>
  )
}
