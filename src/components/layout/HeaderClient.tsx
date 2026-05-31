'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMdArrowDropdown } from '../../icons'
import SideBarMenu from '../SideBarMenu'
import Search from '../Search'
import clsx from 'clsx'

export default function HeaderClient({
  genres,
  countries
}: {
  genres: Genres[]
  countries: Country[]
}) {
  const pathname = usePathname()
  
  // Smart Scroll state
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isTop, setIsTop] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY === 0) {
        setIsTop(true)
        setShow(true)
      } else {
        setIsTop(false)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // if scroll down hide the navbar
          setShow(false)
        } else {
          // if scroll up show the navbar
          setShow(true)
        }
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(path)
  }

  return (
    <nav 
      className={clsx(
        'fixed inset-x-0 top-0 z-[90] transition-all duration-300 group/nav',
        isTop ? 'h-[72px] bg-black/80 backdrop-blur-md border-b border-white/5' : 'h-[64px] bg-[#000000] shadow-xl border-b border-white/10'
      )}
    >
      <div className='w-full px-2 md:px-6 lg:px-10 h-full mx-auto max-w-[2000px]'>
        <div className='flex h-full w-full items-center justify-between'>
          <div className='flex h-full items-center gap-x-2 md:gap-x-8'>
            <div className='flex items-center gap-x-2 md:gap-x-4'>
              {/* Menu button */}
              <SideBarMenu genres={genres} countries={countries} />
              
              {/* Personalized Logo */}
              <Link href='/' className='relative group flex items-center gap-2'>
                {/* The "NH" Mark */}
                <div className='w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-primary/80 to-primary/20 flex items-center justify-center border border-primary/50 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(229,9,20,0.6)] transition-all duration-300'>
                  <span className='font-black text-xs md:text-sm text-white drop-shadow-md tracking-tighter'>NH</span>
                </div>
                {/* Text Logo */}
                <span className={clsx(
                  'text-[17px] md:text-xl font-black tracking-widest text-white transition-all duration-300 group-hover:text-primary',
                  isSearchOpen ? 'hidden md:block' : 'block'
                )}>
                  HONG<span className='text-primary'>MOVIE</span>
                </span>
              </Link>
            </div>

            {/* Nav Links */}
            <div className='hidden h-full lg:flex items-center gap-x-6'>
              <Link 
                href='/' 
                className={clsx(
                  'text-[15px] font-semibold transition-colors duration-200',
                  isActive('/') ? 'text-primary' : 'text-white hover:text-primary'
                )}
              >
                Trang Chủ
              </Link>
              <Link 
                href='/phim-le' 
                className={clsx(
                  'text-[15px] font-semibold transition-colors duration-200',
                  isActive('/phim-le') ? 'text-primary' : 'text-white hover:text-primary'
                )}
              >
                Phim Lẻ
              </Link>
              <Link 
                href='/phim-bo' 
                className={clsx(
                  'text-[15px] font-semibold transition-colors duration-200',
                  isActive('/phim-bo') ? 'text-primary' : 'text-white hover:text-primary'
                )}
              >
                Phim Bộ
              </Link>

              {/* Thể loại Dropdown */}
              <div className='group h-full flex items-center cursor-pointer'>
                <span className={clsx(
                    'flex items-center gap-1 text-[15px] font-semibold transition-colors duration-200',
                    isActive('/the-loai') ? 'text-primary' : 'text-white group-hover:text-primary'
                  )}>
                  Thể Loại
                  <IoMdArrowDropdown size={18} className='transition-transform duration-300 group-hover:rotate-180' />
                </span>
                
                {/* Mega Menu Dropdown */}
                <div className='absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 cursor-default'>
                  <div className='bg-[#111] border border-white/5 rounded-md p-6 shadow-2xl min-w-[600px]'>
                    <div className='grid grid-cols-4 gap-x-6 gap-y-3 text-start'>
                      {genres.map(({ _id, name, slug }: Genres) => (
                          <Link key={_id} href={`/the-loai/${slug}`} className='group/link block'>
                            <div className={clsx(
                              'whitespace-nowrap text-[13px] transition-colors duration-200',
                              pathname === `/the-loai/${slug}` ? 'text-primary font-bold' : 'text-gray-400 group-hover/link:text-primary'
                            )}>
                              {name}
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quốc gia Dropdown */}
              <div className='group h-full flex items-center cursor-pointer'>
                <span className={clsx(
                    'flex items-center gap-1 text-[15px] font-semibold transition-colors duration-200',
                    isActive('/quoc-gia') ? 'text-primary' : 'text-white group-hover:text-primary'
                  )}>
                  Quốc Gia
                  <IoMdArrowDropdown size={18} className='transition-transform duration-300 group-hover:rotate-180' />
                </span>
                
                <div className='absolute left-1/2 top-full -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 cursor-default'>
                  <div className='bg-[#111] border border-white/5 rounded-md p-6 shadow-2xl min-w-[500px]'>
                    <div className='grid grid-cols-3 gap-x-6 gap-y-3 text-start'>
                      {countries.map(({ _id, slug, name }: Country) => (
                        <Link key={_id} href={`/quoc-gia/${slug}`} className='group/link block'>
                          <div className={clsx(
                            'whitespace-nowrap text-[13px] transition-colors duration-200',
                            pathname === `/quoc-gia/${slug}` ? 'text-primary font-bold' : 'text-gray-400 group-hover/link:text-primary'
                          )}>
                            {name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Link 
                href='/yeu-thich' 
                className={clsx(
                  'text-[15px] font-semibold transition-colors duration-200',
                  isActive('/yeu-thich') ? 'text-primary' : 'text-white hover:text-primary'
                )}
              >
                Yêu Thích
              </Link>
            </div>
          </div>

          {/* Search Area */}
          <div className='flex items-center h-full'>
            <Search onOpenChange={(open) => setIsSearchOpen(open)} />
          </div>
        </div>
      </div>
    </nav>
  )
}
