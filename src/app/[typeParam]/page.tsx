import React, { Fragment } from 'react'
import { movieTypes } from './constants'
import { notFound } from 'next/navigation'
import usefetch from '@/hooks/useFetch'
import ListFirm from '@/components/shared/ListFirm'
import Pagination from '@/base/libs/Pagination'
import clsx from 'clsx'
import FilterFirm from '@/components/shared/FilterFirm'
import { Metadata } from 'next'

export async function generateMetadata({ params, searchParams }: MovieContext): Promise<Metadata> {
  const { typeParam } = params
  const type = movieTypes.find((item) => item.path === typeParam)

  if (!type) {
    return {
      title: 'Not found'
    }
  }

  return {
    title: type.title
  }
}

export default async function SearchPage({ params, searchParams }: MovieContext) {
  const { typeParam } = params
  const { page = '1', q = '', category, year = '2024', sort_type, country, sort_field } = searchParams

  const type = movieTypes.find((item) => item.path === typeParam)
  if (!type) return notFound()

  const paramFilter = clsx(
    `&year=${year}`,
    category && `&category=${category}`,
    sort_type && `&sort_type=${sort_type}`,
    country && `&country=${country}`,
    sort_field === 'name' ? `&sort_field=${sort_field}&sort_type=asc` : '&sort_field=year'
  )
  // url get data
  let url = ''
  if (type.path === 'tim-kiem') {
    url = `/tim-kiem?keyword=${q.replace(/\s+/g, '+')}&page=${page}${paramFilter}`
  } else {
    url = `/danh-sach/${type.path}?&page=${page}${paramFilter}`
  }

  const { data } = await usefetch<ResponseMovies>(url.replace(/\s+/g, ''))

  if (!data) {
    console.log(1)

    return notFound()
  }

  const { items: dataFirm = [], params: paramsMovie } = data

  const { pagination } = paramsMovie
  let totalPage = Math.ceil(pagination?.totalItems / pagination?.totalItemsPerPage)
  if (totalPage === 0) totalPage = 1
  if (Number(page) > totalPage) {
    return notFound()
  }

  const [{ data: genres }, { data: countries }] = await Promise.all([
    usefetch<ResponseGenres>('/the-loai'),
    usefetch<ResponseCountries>('/quoc-gia')
  ])

  return (
    <Fragment>
      {/* <div className="mt-2">
        <Breadcrumb />
      </div> */}
      <div className='mt-2 min-h-screen w-full bg-black/90 pb-2 pt-2'>
        <h1 className='ml-2 font-bold'>{type.title.toUpperCase()}</h1>
        <FilterFirm genres={genres?.items ?? []} countries={countries?.items ?? []} />
        {dataFirm.length > 0 ? (
          <Fragment>
            <div className='mt-2 grid grid-cols-2 gap-2 px-2 pb-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
              <ListFirm dataFirm={dataFirm} />
            </div>
            {/* Phân trang */}
            {pagination && totalPage > 1 && (
              <div className='flex items-center justify-center bg-black pb-10 pt-16'>
                <Pagination totalPage={totalPage} initPage={Number(page)} />
              </div>
            )}
          </Fragment>
        ) : (
          <div className='mt-28 text-center text-3xl font-semibold text-white'>Không có kết quả</div>
        )}
      </div>
    </Fragment>
  )
}
