'use client'

import React from 'react'
import { FaSearch } from '@/icons'
import { useRouter } from 'next-nprogress-bar'

export default function Search() {
  const [search, setSearch] = React.useState<string>('')
  const router = useRouter()

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const keyWord = search.replace(/\s+/g, '+')

      //Thay các khoản trắng liên tiếp thành +
      router.push(`/tim-kiem?q=${keyWord}`)
      setSearch('')
    }
  }

  return (
    <div className='group flex items-center rounded-full bg-white/5 backdrop-blur-md px-4 py-2 border border-white/10 focus-within:border-primary focus-within:bg-black/60 focus-within:shadow-[0_0_20px_rgba(229,9,20,0.3)] transition-all duration-300'>
      <FaSearch size={16} className='text-white/50 group-focus-within:text-primary transition-colors cursor-pointer mr-2' onClick={() => {
        if(search.trim()) {
           router.push(`/tim-kiem?q=${search.replace(/\s+/g, '+')}`)
           setSearch('')
        }
      }} />
      <input
        type='text'
        placeholder='Tìm kiếm phim...'
        className='w-[150px] md:w-[200px] lg:w-[250px] bg-transparent text-[14px] text-white placeholder-white/40 outline-none transition-all duration-300'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  )
}
