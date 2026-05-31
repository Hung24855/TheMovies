import React, { Fragment } from 'react'
import { movieTypes } from './constants'
import { notFound } from 'next/navigation'
import usefetch from '@/hooks/useFetch'
import ListFirm from '@/components/shared/ListFirm'
import Pagination from '@/base/libs/Pagination'
import clsx from 'clsx'
import FilterFirm from '@/components/shared/FilterFirm'
import { Metadata } from 'next'

export async function generateMetadata({ params }: MovieContext): Promise<Metadata> {
  const { typeParam } = params
  const type = movieTypes.find((item) => item.slug === typeParam)

  if (!type) {
    return {
      title: 'Not found'
    }
  }

  return {
    title: type.name as string
  }
}

export default async function SearchPage({ params, searchParams }: MovieContext) {
  const { typeParam } = params
  const { page = '1', q = '', category, year, sort_type, country, sort_field } = searchParams

  const type = movieTypes.find((item) => item.slug === typeParam)
  if (!type) return notFound()

  const paramFilter = clsx(
    `${year && `&year=${year}`}`,
    category && `&category=${category}`,
    sort_type && `&sort_type=${sort_type}`,
    country && `&country=${country}`,
    sort_field === 'name' ? `&sort_field=${sort_field}&sort_type=asc` : '&sort_field=year'
  )
  // url get data
  let url = ''
  if (type.slug === 'tim-kiem') {
    url = `/tim-kiem?keyword=${q.replace(/\s+/g, '+')}&page=${page}${paramFilter}`
  } else {
    url = `/danh-sach/${type.slug}?&page=${page}${paramFilter}`
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
      <div className='w-full px-2 md:px-12 lg:px-20 pt-32 relative z-20 min-h-screen'>
        <div className='pb-10'>
          <div className='relative z-50 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4'>
            <h1 className='text-2xl font-bold uppercase tracking-wider text-white mb-4 md:mb-0'>
              {(type.name as string).toUpperCase()}
            </h1>
            <FilterFirm genres={genres?.items ?? []} countries={countries?.items ?? []} />
          </div>
          {dataFirm.length > 0 ? (
            <Fragment>
              <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                <ListFirm dataFirm={dataFirm} />
              </div>
              {/* Phân trang */}
              {pagination && totalPage > 1 && (
                <div className='mt-12 flex items-center justify-center pb-6'>
                  <Pagination totalPage={totalPage} initPage={Number(page)} />
                </div>
              )}
            </Fragment>
          ) : (
            <div className='mt-28 text-center text-3xl font-semibold text-white'>Không có kết quả</div>
          )}
        </div>
      </div>
    </Fragment>
  )
}
