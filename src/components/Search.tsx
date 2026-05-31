'use client'

import React, { useRef, useState } from 'react'
import { FaSearch } from '@/icons'
import { useRouter } from 'next-nprogress-bar'
import clsx from 'clsx'

export default function Search({ onOpenChange }: { onOpenChange?: (isOpen: boolean) => void }) {
  const [search, setSearch] = React.useState<string>('')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleOpen = (val: boolean) => {
    setIsOpen(val)
    onOpenChange?.(val)
  }

  const handleSubmit = () => {
    if(search.trim()) {
       router.push(`/tim-kiem?q=${search.replace(/\s+/g, '+')}`)
       setSearch('')
       handleOpen(false)
       inputRef.current?.blur() // Đóng bàn phím trên mobile
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className='relative flex items-center z-[100]'>
      {/* Mobile Icon Button */}
      <button 
        className={clsx('md:hidden p-2 text-white/50 hover:text-primary transition-colors', isOpen && 'invisible opacity-0')}
        onClick={() => {
          handleOpen(true)
          setTimeout(() => inputRef.current?.focus(), 100)
        }}
      >
        <FaSearch size={22} />
      </button>

      {/* Search Input Container */}
      <div className={clsx(
        'absolute right-0 md:relative flex items-center rounded-full bg-[#1a1a1a] md:bg-white/5 backdrop-blur-md px-4 py-2 border border-white/10 focus-within:border-primary md:focus-within:bg-black/60 focus-within:shadow-[0_0_20px_rgba(229,9,20,0.3)] transition-all duration-300 origin-right',
        isOpen ? 'scale-x-100 opacity-100 w-[240px] sm:w-[300px]' : 'scale-x-0 opacity-0 w-0 md:scale-x-100 md:opacity-100 md:w-auto'
      )}>
        <FaSearch size={16} className='text-white/50 focus-within:text-primary transition-colors cursor-pointer mr-2 shrink-0' onClick={handleSubmit} />
        <input
          ref={inputRef}
          type='text'
          placeholder='Tìm kiếm phim...'
          className='w-full md:w-[200px] lg:w-[250px] bg-transparent text-[14px] text-white placeholder-white/40 outline-none transition-all duration-300'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => {
            // Cho phép click vào icon search trước khi đóng
            setTimeout(() => {
               if(!search) handleOpen(false)
            }, 200)
          }}
        />
      </div>
    </div>
  )
}
