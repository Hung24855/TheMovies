'use client'

import React from 'react'
import { GiHamburgerMenu, IoMdClose, IoIosArrowForward } from '@/icons'
import Link from 'next/link'
import { movieTypes } from '@/app/[typeParam]/constants';

export default function SideBarMenu({ genres, countries }: { genres: Genres[]; countries: Country[] }) {
  const [open, setOpen] = React.useState<boolean>(false)
  const [openSubMenuGenre, setopenSubMenuGenreGenre] = React.useState<boolean>(false)
  const [openSubMenuCountry, setopenSubMenuCountry] = React.useState<boolean>(false)
  const [openSubMenuTypeMovie, setopenSubMenuTypeMovie] = React.useState<boolean>(false)

  return (
    <div className='md:hidden'>
      <div onClick={() => setOpen(!open)} className='relative z-[100] p-1 -ml-1 cursor-pointer'>
        <GiHamburgerMenu size={32} className={`mr-2 md:hidden ${open && 'hidden'}`} />
      </div>

      {/* Overlay */}
      {open && <div className='fixed inset-0 h-screen bg-black/50 md:hidden z-40' onClick={() => setOpen(false)}></div>}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-50 h-screen w-[70%] sm:w-[55%] bg-[#0a0a0a] border-r border-white/10 p-4 shadow-2xl transition-transform duration-500 ease-in-out ${
          !open ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className='flex items-center justify-center gap-2 mt-2 mb-8'>
          <div className='w-8 h-8 rounded-full bg-gradient-to-br from-primary/80 to-primary/20 flex items-center justify-center border border-primary/50'>
            <span className='font-black text-xs text-white drop-shadow-md tracking-tighter'>NH</span>
          </div>
          <span className='text-lg font-black tracking-widest text-white'>
            HONG<span className='text-primary'>MOVIE</span>
          </span>
        </div>
        <div className='mt-2 h-full text-left'>
          <ul>
            <Link href='/'>
              <li
                className='flex cursor-pointer items-center rounded py-3 pl-1 font-semibold hover:bg-slate-100/60'
                onClick={() => {
                  setOpen(!open)
                }}
              >
                Trang chủ
              </li>
            </Link>
            <Link href='/phim-bo'>
              <li
                className='flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60'
                onClick={() => {
                  setOpen(!open)
                }}
              >
                Phim bộ
              </li>
            </Link>
            <Link href='/phim-le'>
              <li
                className='flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60'
                onClick={() => {
                  setOpen(!open)
                }}
              >
                Phim lẻ
              </li>
            </Link>
            <li>
              <div
                className='flex h-full w-full cursor-pointer justify-between rounded py-3 pl-1 hover:bg-slate-100/60'
                onClick={() => setopenSubMenuTypeMovie(!openSubMenuTypeMovie)}
              >
                <span>Loại phim</span>
                <IoIosArrowForward
                  size={20}
                  className={`transition-transform duration-500 ${openSubMenuTypeMovie && 'rotate-90'}`}
                />
              </div>
              {/* Sub menu */}
              <ul
                className={`${openSubMenuTypeMovie ? 'overflow-y-auto' : 'overflow-y-hidden'} scrollbar-custom duration-500 ease-in-out ${
                  openSubMenuTypeMovie ? 'max-h-52' : 'max-h-0'
                }`}
              >
                {movieTypes.slice(0, -3)?.map(({ slug, name }) => (
                  <Link href={`/${slug}`} key={slug}>
                    <li
                      className='cursor-pointer rounded py-2 pl-4 hover:bg-slate-100/60'
                      key={slug}
                      onClick={() => {
                        setOpen(!open)
                      }}
                    >
                      <span className='mr-1'>&bull;</span>
                      {name}
                    </li>
                  </Link>
                ))}
              </ul>
            </li>
            <li>
              <div
                className='flex h-full w-full cursor-pointer justify-between rounded py-3 pl-1 hover:bg-slate-100/60'
                onClick={() => setopenSubMenuGenreGenre(!openSubMenuGenre)}
              >
                <span>Thể loại</span>
                <IoIosArrowForward
                  size={20}
                  className={`transition-transform duration-500 ${openSubMenuGenre && 'rotate-90'}`}
                />
              </div>
              {/* Sub menu */}
              <ul
                className={`${openSubMenuGenre ? 'overflow-y-auto' : 'overflow-y-hidden'} scrollbar-custom duration-500 ease-in-out ${
                  openSubMenuGenre ? 'max-h-52' : 'max-h-0'
                }`}
              >
                {genres &&
                  genres.length > 0 &&
                  genres?.map(({ _id, slug, name }) => (
                    <Link href={`/the-loai/${slug}`} key={_id}>
                      <li
                        className='cursor-pointer rounded py-2 pl-4 hover:bg-slate-100/60'
                        key={_id}
                        onClick={() => {
                          setOpen(!open)
                        }}
                      >
                        <span className='mr-1'>&bull;</span>
                        {name}
                      </li>
                    </Link>
                  ))}
              </ul>
            </li>
            <li>
              <div
                className='flex h-full w-full cursor-pointer justify-between rounded py-3 pl-1 hover:bg-slate-100/60'
                onClick={() => setopenSubMenuCountry(!openSubMenuCountry)}
              >
                <span>Quốc gia</span>
                <IoIosArrowForward
                  size={20}
                  className={`transition-transform duration-500 ${openSubMenuCountry && 'rotate-90'}`}
                />
              </div>
              {/* Sub menu */}
              <ul
                className={`${openSubMenuCountry ? 'overflow-y-auto' : 'overflow-y-hidden'} scrollbar-custom duration-500 ease-in-out ${
                  openSubMenuCountry ? 'max-h-52' : 'max-h-0'
                }`}
              >
                {countries &&
                  countries.length > 0 &&
                  countries?.map(({ _id, slug, name }) => (
                    <Link href={`/quoc-gia/${slug}`} key={_id}>
                      <li
                        className='cursor-pointer rounded py-2 pl-4 hover:bg-slate-100/60'
                        key={_id}
                        onClick={() => {
                          setOpen(!open)
                        }}
                      >
                        <span className='mr-1'>&bull;</span>
                        {name}
                      </li>
                    </Link>
                  ))}
              </ul>
            </li>
            <Link href={'/yeu-thich'}>
              <li
                className='flex cursor-pointer items-center rounded py-3 pl-1 hover:bg-slate-100/60'
                onClick={() => {
                  setOpen(!open)
                }}
              >
                Yêu thích
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  )
}
