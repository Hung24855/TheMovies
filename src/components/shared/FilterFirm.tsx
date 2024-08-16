'use client'
import { gennerateYear } from '@/base/utils/gennerate'
import clsx from 'clsx'
import { useRouter } from 'next-nprogress-bar'
import React, { useState } from 'react'
import { TiDeleteOutline } from '@/icons'
import { movieTypes } from '@/app/[typeParam]/constants'

type FilterFirmProps = {
  genres: Genres[]
  countries: Country[]
}

//Gennerate ra 1 mảng các năm từ năm hiện tại về trước
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

  // Hiện thị
  const [showFilter, setShowFilter] = useState(false)
  const [showFilterRenges, setShowFilterRenges] = useState(false)
  const [showFilterCountries, setShowFilterCountries] = useState(false)
  const [showFilterYears, setShowFilterYears] = useState(false)
  const [showFilterTypeMovie, setShowFilterTypeMovie] = useState(false)

  const toggleFilter = (filterType: FilterType) => {
    switch (filterType) {
      case FilterType.sort:
        setShowFilter(!showFilter)
        setShowFilterRenges(false)
        setShowFilterCountries(false)
        setShowFilterYears(false)
        setShowFilterTypeMovie(false)
        break
      case FilterType.genre:
        setShowFilterRenges(!showFilterRenges)
        setShowFilter(false)
        setShowFilterCountries(false)
        setShowFilterYears(false)
        setShowFilterTypeMovie(false)
        break
      case FilterType.country:
        setShowFilterCountries(!showFilterCountries)
        setShowFilter(false)
        setShowFilterRenges(false)
        setShowFilterYears(false)
        setShowFilterTypeMovie(false)
        break
      case FilterType.year:
        setShowFilterYears(!showFilterYears)
        setShowFilter(false)
        setShowFilterRenges(false)
        setShowFilterCountries(false)
        setShowFilterTypeMovie(false)
        break
      case FilterType.typeMovie:
        setShowFilterTypeMovie(!showFilterTypeMovie)
        setShowFilter(false)
        setShowFilterRenges(false)
        setShowFilterCountries(false)
        setShowFilterYears(false)
        break
    }
  }
  const handleFilterClick = (filterType: FilterType, filter: filter | undefined) => {
    switch (filterType) {
      case FilterType.sort:
        setSelectedSort(filter)
        filter && toggleFilter(FilterType.sort)
        break
      case FilterType.genre:
        setSelectedGenre(filter)
        filter && toggleFilter(FilterType.genre)
        break
      case FilterType.country:
        setSelectedCountry(filter)
        filter && toggleFilter(FilterType.country)
        break
      case FilterType.year:
        setSelectedYear(filter)
        filter && toggleFilter(FilterType.year)
        break
      case FilterType.typeMovie:
        setSelectedTypeMovie(filter)
        filter && toggleFilter(FilterType.typeMovie)
        break
    }
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
    showFilterState: boolean,
    options: filter[] | MovieType[]
  ) => (
    <div
      className='relative cursor-pointer rounded bg-gray-800 px-2 py-1 font-light'
      onClick={() => toggleFilter(filterType)}
    >
      {selectedFilter?.name && (
        <div
          className='absolute -right-1 -top-1 size-4 rounded-full text-white'
          onClick={(e) => {
            e.stopPropagation()
            handleFilterClick(filterType, undefined)
          }}
        >
          <TiDeleteOutline size={20} />
        </div>
      )}
      <span>{selectedFilter?.name ?? placeholder}</span>
      {showFilterState && (
        <div className='before-arrow absolute left-1/2 top-full z-10 min-h-14 w-max -translate-x-1/2 animate-fade-in-down rounded-sm bg-black/90 text-start'>
          <ul
            className={clsx(
              'scrollbar-custom max-h-48 space-y-2 overflow-hidden overflow-y-auto rounded-sm p-2 font-normal'
            )}
          >
            {options.map(({ name, slug }) => (
              <li
                key={slug}
                onClick={() => handleFilterClick(filterType, { name, slug })}
                className='by-1 px-2 hover:text-primary'
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )

  return (
    <div className='mt-2 flex min-h-8 flex-wrap items-center gap-2 rounded px-2 md:gap-4'>
      {/* Cha */}
      {renderFilterButton(FilterType.sort, selectedSort, '--Sắp xếp--', showFilter, [
        { name: 'Năm xuất bản', slug: 'year' },
        { name: 'Theo tên A-Z', slug: 'name' }
      ])}
      {renderFilterButton(FilterType.typeMovie, selectedTypeMovie, '--Loại phim--', showFilterTypeMovie, movieTypes.slice(0,-3))}
      {renderFilterButton(FilterType.genre, selectedGenre, '--Thể loại--', showFilterRenges, genres)}
      {renderFilterButton(FilterType.country, selectedCountry, '--Quốc gia--', showFilterCountries, countries)}
      {renderFilterButton(
        FilterType.year,
        selectedYear,
        '--Năm phát hành--',
        showFilterYears,
        years.map((year) => ({ name: year, slug: year }))
      )}
      <button className='rounded bg-gray-800 px-2 py-1 ring-2' onClick={handleFilter}>
        Lọc phim
      </button>
    </div>
  )
}
