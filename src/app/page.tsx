import Pagination from '@/base/libs/Pagination'
import FeaturedMovies from '@/components/home/FeaturedMovies'
import FilterFirm from '@/components/shared/FilterFirm'
import ListFirm from '@/components/shared/ListFirm'
import usefetch from '@/hooks/useFetch'
import { notFound } from 'next/navigation'

export default async function Home({ searchParams }: MovieContext) {
  const { page = '1', category, year = '2024', sort_type, country, sort_field } = searchParams

  // const searchParamsString = new URLSearchParams(
  //   Object.entries(searchParams).map(([key, value]) => [key, String(value)]),
  // ).toString();

  const query = `/danh-sach/phim-moi-cap-nhat?page=${page}&year=${year}${category && `&category=${category}`}${
    sort_type && `&sort_type=${sort_type}`
  }${country && `&country=${country}`}${
    sort_field === 'name' ? `&sort_field=${sort_field}&sort_type=asc` : sort_field === 'year' && `&sort_field=year`
  }`

  const { data } = await usefetch<ResponseMovies>(query)

  const [genresData, countriesData] = await Promise.all([
    usefetch<ResponseGenres>('/the-loai'),
    usefetch<ResponseCountries>('/quoc-gia')
  ])

  if (!data) {
    return notFound()
  }

  const {
    items: dataFirm = [],
    params: { pagination }
  } = data
  let totalPage = Math.ceil(pagination.totalItems / pagination.totalItemsPerPage)
  if (totalPage === 0) totalPage = 1

  if (Number(page) > totalPage) {
    return notFound()
  }

  return (
    <div className='mt-2 grid grid-cols-8 gap-x-2'>
      <div className='col-span-full bg-black lg:col-span-6'>
        {/* Danh sách phim */}
        <div className='z-10 mt-2 min-h-screen rounded'>
          <h1 className='ml-2 font-bold'>PHIM MỚI CẬP NHẬT</h1>

          <FilterFirm genres={genresData.data?.items ?? []} countries={countriesData.data?.items ?? []} />

          {/* Danh sách phim */}
          <div className='mt-2 grid grid-cols-2 gap-2 px-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
            <ListFirm dataFirm={dataFirm} />
          </div>
        </div>

        {/* Phân trang */}
        {pagination && totalPage > 1 && (
          <div className='flex items-center justify-center bg-black pb-10 pt-16'>
            <Pagination totalPage={totalPage} initPage={Number(page)} />
          </div>
        )}
      </div>

      {/* Phim nổi bật */}
      <div className='z-10 col-span-full mt-4 min-h-screen rounded bg-black px-2 pt-2 md:mt-0 lg:col-span-2'>
        <h1 className='text-center'>PHIM NỔI BẬT</h1>
        <FeaturedMovies />
      </div>
    </div>
  )
}
