import Pagination from '@/base/libs/Pagination'
import FilterFirm from '@/components/shared/FilterFirm'
import ListFirm from '@/components/shared/ListFirm'
import usefetch from '@/hooks/useFetch'
import clsx from 'clsx'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { Fragment } from 'react'
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: movieDetail } = await usefetch<MovieDetail>(`/quoc-gia/${params.slug}`)

  if (!movieDetail) {
    return {
      title: 'Not found'
    }
  }

  const { titleHead } = movieDetail.seoOnPage

  return {
    title: titleHead
  }
}

export default async function CountryPage({ searchParams, params }: MovieContext) {
  const { page = '1', category, year, sort_type, country, sort_field } = searchParams

  const { data } = await usefetch<ResponseMovies>(
    clsx(
      `/quoc-gia/${params.slug}?page=${page}${year && `&year=${year}`}`,
      category && `&category=${category}`,
      sort_type && `&sort_type=${sort_type}`,
      country && `&country=${country}`,
      '&sort_field=modified.time&sort_type=desc'
    ).replace(/\s+/g, '')
  )

  if (!data) {
    return notFound()
  }

  const { titlePage } = data

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
      <div className='w-full px-4 md:px-12 lg:px-20 pt-20 relative z-20 min-h-screen'>
        <div className='pb-10'>
          <div className='relative z-50 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-white/10 pb-4'>
            <h1 className='text-2xl font-bold uppercase tracking-wider text-white mb-4 md:mb-0'>
              {`PHIM ${titlePage}`.toUpperCase()}
            </h1>
            <FilterFirm genres={genres?.items ?? []} countries={countries?.items ?? []} />
          </div>
          {dataFirm.length > 0 ? (
            <Fragment>
              <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-7'>
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
