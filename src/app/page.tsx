import FeaturedMovies from '@/components/home/FeaturedMovies'
import ListFirm from '@/components/shared/ListFirm'
import FilterFirm from '@/components/shared/FilterFirm'
import usefetch from '@/hooks/useFetch'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function Home() {
  // Lấy toàn bộ dữ liệu song song (Parallel Data Fetching) để tối ưu tốc độ tải trang
  const [
    { data: phimHotData },
    { data: phimBoData },
    { data: phimLeData },
    { data: hoatHinhData },
    { data: coTrangData },
    { data: genresData },
    { data: countriesData }
  ] = await Promise.all([
    usefetch<ResponseMovies>('/danh-sach/phim-hot?limit=15'),
    usefetch<ResponseMovies>('/danh-sach/phim-bo?limit=15'),
    usefetch<ResponseMovies>('/danh-sach/phim-le?limit=15'),
    usefetch<ResponseMovies>('/danh-sach/hoat-hinh?limit=15'),
    usefetch<ResponseMovies>('/the-loai/co-trang?limit=15'),
    usefetch<ResponseGenres>('/the-loai'),
    usefetch<ResponseCountries>('/quoc-gia')
  ])

  if (!phimBoData || !phimLeData) {
    return notFound()
  }

  // Cắt bớt dữ liệu để hiển thị cho đẹp gọn
  const phimBo = phimBoData?.items?.slice(0, 15) || []
  const phimLe = phimLeData?.items?.slice(0, 15) || []
  const hoatHinh = hoatHinhData?.items?.slice(0, 15) || []
  const coTrang = coTrangData?.items?.slice(0, 15) || []
  const phimHot = phimHotData?.items?.slice(0, 15) || []

  return (
    <div className='w-full pt-20 bg-[#0a0a0a] min-h-screen text-white'>
      <div className='w-full px-2 md:px-6 lg:px-10 mx-auto max-w-[2000px]'>
        
        {/* ĐỀ CỬ (Slider) */}
        <div className='mb-8'>
          <h2 className='text-[22px] font-bold uppercase mb-4 text-white uppercase font-sans'>
            PHIM CHIẾU RẠP
          </h2>
          <FeaturedMovies />
        </div>

        {/* 2-Column Layout */}
        <div className='flex flex-col lg:flex-row gap-8 pb-12'>
          
          {/* Main Content (Left) */}
          <div className='lg:w-3/4 w-full'>
            
            {/* Bộ Lọc Phim */}
            <div className='relative z-50 mb-6 pb-6 border-b border-white/10'>
              <FilterFirm genres={genresData?.items ?? []} countries={countriesData?.items ?? []} />
            </div>

            {/* Phim Bộ */}
            <div className='flex items-center justify-between mb-4 pb-2 border-b border-white/10'>
              <h2 className='text-[20px] font-bold uppercase text-[#ff9800]'>
                PHIM BỘ
              </h2>
              <Link href='/phim-bo' className='text-sm text-gray-400 hover:text-white transition-colors'>Xem thêm {'>'}</Link>
            </div>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 mb-10'>
              <ListFirm dataFirm={phimBo} />
            </div>
            
            {/* Phim Lẻ */}
            <div className='flex items-center justify-between mb-4 pb-2 border-b border-white/10'>
              <h2 className='text-[20px] font-bold uppercase text-[#ff9800]'>
                PHIM LẺ
              </h2>
              <Link href='/phim-le' className='text-sm text-gray-400 hover:text-white transition-colors'>Xem thêm {'>'}</Link>
            </div>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 mb-10'>
              <ListFirm dataFirm={phimLe} />
            </div>

            {/* Phim Hoạt Hình */}
            {hoatHinh.length > 0 && (
              <>
                <div className='flex items-center justify-between mb-4 pb-2 border-b border-white/10'>
                  <h2 className='text-[20px] font-bold uppercase text-[#ff9800]'>
                    PHIM HOẠT HÌNH
                  </h2>
                  <Link href='/hoat-hinh' className='text-sm text-gray-400 hover:text-white transition-colors'>Xem thêm {'>'}</Link>
                </div>
                <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 mb-10'>
                  <ListFirm dataFirm={hoatHinh} />
                </div>
              </>
            )}

            {/* Phim Cổ Trang */}
            {coTrang.length > 0 && (
              <>
                <div className='flex items-center justify-between mb-4 pb-2 border-b border-white/10'>
                  <h2 className='text-[20px] font-bold uppercase text-[#ff9800]'>
                    PHIM CỔ TRANG
                  </h2>
                  <Link href='/the-loai/co-trang' className='text-sm text-gray-400 hover:text-white transition-colors'>Xem thêm {'>'}</Link>
                </div>
                <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 mb-10'>
                  <ListFirm dataFirm={coTrang} />
                </div>
              </>
            )}
          </div>

          {/* Sidebar (Right) */}
          <div className='lg:w-1/4 w-full'>
            <div className='bg-[#111] p-4 rounded-md border border-white/5'>
              <h2 className='text-[16px] font-bold text-[#ff9800] uppercase mb-4 pb-2 border-b border-white/10'>
                PHIM HOT TRONG TUẦN
              </h2>
              
              <div className='flex flex-col gap-4'>
                {phimHot.map((movie, index) => (
                  <Link key={movie._id} href={`/phim/${movie.slug}`} className='group flex items-start gap-3 cursor-pointer'>
                    {/* Rank Circle */}
                    <div className='w-6 h-6 shrink-0 rounded-full bg-[#ff9800] text-white flex items-center justify-center text-xs font-bold'>
                      {index + 1}
                    </div>
                    
                    {/* Details */}
                    <div className='flex flex-col'>
                      <h3 className='text-[14px] font-medium text-white line-clamp-1 group-hover:text-primary transition-colors'>
                        {movie.name}
                      </h3>
                      <p className='text-[11px] text-gray-400 mt-1'>
                        {Math.floor(Math.random() * 50000 + 10000).toLocaleString('vi-VN')} lượt xem
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
