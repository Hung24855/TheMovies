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
      <div onClick={() => setOpen(!open)}>
        <GiHamburgerMenu size={35} className={`mr-4 cursor-pointer md:hidden ${open && 'hidden'}`} />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 z-10 h-screen w-[55%] bg-black/80 p-2 backdrop-blur-lg transition-transform duration-500 ease-in-out ${
          !open ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className='text-center font-bold'>THE MOVIES</div>
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
                    <Link href={`/genres/${slug}`} key={_id}>
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
                    <Link href={`/country/${slug}`} key={_id}>
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
            <Link href={'/favourite'}>
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
        <IoMdClose size={35} className='absolute right-1 top-1 cursor-pointer' onClick={() => setOpen(false)} />
      </div>

      {/* Overlay */}
      {open && <div className='fixed inset-0 h-screen bg-black/50 md:hidden' onClick={() => setOpen(false)}></div>}
    </div>
  )
}
