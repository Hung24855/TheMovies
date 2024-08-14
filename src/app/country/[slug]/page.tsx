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
  const { page = '1', category, year = '2024', sort_type, country, sort_field } = searchParams

  const { data } = await usefetch<ResponseMovies>(
    clsx(
      `/quoc-gia/${params.slug}?page=${page}&year=${year}`,
      category && `&category=${category}`,
      sort_type && `&sort_type=${sort_type}`,
      country && `&country=${country}`,
      sort_field === 'name' ? `&sort_field=${sort_field}&sort_type=asc` : '&sort_field=year'
    ).replace(/\s+/g, '')
  )

  if (!data) {
    return notFound()
  }

  const { titlePage } = data

  const { items: dataFirm = [], params: paramsMovie } = data

  const { pagination } = paramsMovie
  const totalPage = Math.ceil(pagination?.totalItems / pagination?.totalItemsPerPage)

  if (Number(page) > totalPage) {
    return notFound()
  }

  const [{ data: genres }, { data: countries }] = await Promise.all([
    usefetch<ResponseGenres>('/the-loai'),
    usefetch<ResponseCountries>('/quoc-gia')
  ])

  return (
    <Fragment>
     
      <div className='mt-2 min-h-screen bg-black pt-2'>
        <h1 className='ml-2 font-bold'>{`PHIM ${titlePage}`.toUpperCase()}</h1>
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
