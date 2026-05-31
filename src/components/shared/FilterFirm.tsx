'use client'
import { gennerateYear } from '@/base/utils/gennerate'
import clsx from 'clsx'
import { useRouter } from 'next-nprogress-bar'
import React, { useState, useEffect, useRef } from 'react'
import { TiDeleteOutline } from '@/icons'
import { IoMdArrowDropdown } from '@/icons'
import { movieTypes } from '@/app/[typeParam]/constants'

type FilterFirmProps = {
  genres: Genres[]
  countries: Country[]
}

const years: number[] = gennerateYear(10)
type filter = {
  name: string | number
  slug: string | number
}

enum FilterType {
  sort = 'sort',
  genre = 'genre',
  country = 'country',
  year = 'year',
  typeMovie = 'type'
}

export default function FilterFirm({ genres = [], countries = [] }: FilterFirmProps) {
  const router = useRouter()
  const [selectedSort, setSelectedSort] = useState<filter | undefined>()
  const [selectedGenre, setSelectedGenre] = useState<filter | undefined>()
  const [selectedCountry, setSelectedCountry] = useState<filter | undefined>()
  const [selectedYear, setSelectedYear] = useState<filter | undefined>()
  const [selectedTypeMovie, setSelectedTypeMovie] = useState<filter | undefined>()

  const [activeFilter, setActiveFilter] = useState<FilterType | null>(null)
  const filterRef = useRef<HTMLDivElement>(null)

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setActiveFilter(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleFilter = (filterType: FilterType) => {
    setActiveFilter(prev => prev === filterType ? null : filterType)
  }

  const handleFilterClick = (filterType: FilterType, filter: filter | undefined) => {
    switch (filterType) {
      case FilterType.sort:
        setSelectedSort(filter)
        break
      case FilterType.genre:
        setSelectedGenre(filter)
        break
      case FilterType.country:
        setSelectedCountry(filter)
        break
      case FilterType.year:
        setSelectedYear(filter)
        break
      case FilterType.typeMovie:
        setSelectedTypeMovie(filter)
        break
    }
    setActiveFilter(null) // Close after selecting
  }

  const handleFilter = () => {
    const params = {
      sort_field: selectedSort?.slug,
      category: selectedGenre?.slug,
      country: selectedCountry?.slug,
      year: selectedYear?.slug
    }

    const searchParams = Object.entries(params)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
     
    selectedTypeMovie ? router.push(`/${selectedTypeMovie.slug}?${searchParams}`) : router.push(`?${searchParams}`)
  }

  const renderFilterButton = (
    filterType: FilterType,
    selectedFilter: filter | undefined,
    placeholder: string,
    options: filter[] | MovieType[]
  ) => {
    const isActive = activeFilter === filterType;
    const hasSelection = !!selectedFilter;

    return (
      <div className='relative' key={filterType}>
        <div
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all duration-300 border text-sm font-medium',
            isActive || hasSelection 
              ? 'bg-primary/10 border-primary text-white shadow-[0_0_15px_rgba(229,9,20,0.2)]' 
              : 'bg-[#1a1a1a] border-white/10 text-gray-400 hover:bg-[#222] hover:text-white hover:border-white/20'
          )}
          onClick={() => toggleFilter(filterType)}
        >
          <span className='truncate max-w-[120px]'>
            {selectedFilter?.name ?? placeholder}
          </span>
          <IoMdArrowDropdown 
            size={18} 
            className={clsx(
              'transition-transform duration-300',
              isActive ? 'rotate-180 text-primary' : (hasSelection ? 'text-primary' : 'text-gray-500')
            )} 
          />
          
          {hasSelection && (
            <div
              className='ml-1 flex items-center justify-center rounded-full bg-white/10 p-[2px] hover:bg-primary hover:text-white transition-colors'
              onClick={(e) => {
                e.stopPropagation()
                handleFilterClick(filterType, undefined)
              }}
            >
              <TiDeleteOutline size={16} />
            </div>
          )}
        </div>

        {/* Dropdown Menu */}
        <div 
          className={clsx(
            'absolute left-0 top-[calc(100%+8px)] z-50 min-w-[200px] w-max rounded-2xl bg-[#111]/95 backdrop-blur-xl border border-white/10 p-2 shadow-2xl transition-all duration-300 origin-top',
            isActive ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
          )}
        >
          <ul className='scrollbar-hide max-h-60 overflow-y-auto space-y-1'>
            {options.map(({ name, slug }) => {
              const isSelected = selectedFilter?.slug === slug;
              return (
                <li
                  key={slug}
                  onClick={() => handleFilterClick(filterType, { name, slug })}
                  className={clsx(
                    'px-4 py-2 rounded-xl cursor-pointer text-sm font-medium transition-all duration-200 flex items-center justify-between',
                    isSelected 
                      ? 'bg-primary/20 text-primary' 
                      : 'text-gray-300 hover:bg-white/5 hover:text-white hover:pl-5'
                  )}
                >
                  {name}
                  {isSelected && <span className='w-1.5 h-1.5 rounded-full bg-primary animate-pulse'></span>}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full md:w-auto relative z-50' ref={filterRef}>
      <div className='flex flex-col md:flex-row items-center gap-3 bg-black/40 backdrop-blur-md p-3 md:p-4 rounded-md border border-white/5 shadow-lg'>
        <div className='hidden md:flex items-center gap-2 text-white/50 border-r border-white/10 pr-4 mr-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
          </svg>
          <span className='font-semibold tracking-wide uppercase text-sm whitespace-nowrap'>Bộ Lọc</span>
        </div>

        <div className='flex flex-wrap gap-2 w-full md:pb-0'>
          {renderFilterButton(FilterType.sort, selectedSort, 'Sắp xếp', [
            { name: 'Năm xuất bản', slug: 'year' },
            { name: 'Theo tên A-Z', slug: 'name' }
          ])}
          {renderFilterButton(FilterType.typeMovie, selectedTypeMovie, 'Loại phim', movieTypes.slice(0,-3))}
          {renderFilterButton(FilterType.genre, selectedGenre, 'Thể loại', genres)}
          {renderFilterButton(FilterType.country, selectedCountry, 'Quốc gia', countries)}
          {renderFilterButton(
            FilterType.year,
            selectedYear,
            'Năm phát hành',
            years.map((year) => ({ name: year, slug: year }))
          )}
        </div>
        
        <button 
          className='w-full md:w-auto md:ml-auto px-6 py-2.5 rounded-md bg-primary text-white font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(229,9,20,0.4)] hover:shadow-[0_0_30px_rgba(229,9,20,0.8)] hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group shrink-0'
          onClick={handleFilter}
        >
          <span className='relative z-10'>Lọc Phim</span>
          <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out'></div>
        </button>
      </div>
    </div>
  )
}
