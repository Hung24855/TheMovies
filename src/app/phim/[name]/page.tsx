import React from 'react'
import { MdDateRange, IoMdTime, MdLocalMovies, IoEarth, IoLanguage, CiShare2, CiHeart } from '@/icons'
import usefetch from '@/hooks/useFetch'
import Episodes from '@/components/movie/Episodes'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Favourite from '@/components/movie/Favourite'
import Link from 'next/link'
import { FaEye, FaStar, FaPlay } from 'react-icons/fa'
import ListFirm from '@/components/shared/ListFirm'
import clsx from 'clsx'

import Image from 'next/image'

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  const { data: movieDetail } = await usefetch<MovieDetail>(`/phim/${params.name}`)

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

export default async function MoviePage({
  params,
  searchParams
}: {
  params: { name: string }
  searchParams: { tap?: string; server?: string }
}) {
  const { tap = '1', server = '0' } = searchParams

  const { data: movieDetail } = await usefetch<MovieDetail>(`/phim/${params.name}`)

  if (!movieDetail) {
    notFound()
  }
  const { item, seoOnPage } = movieDetail

  // Fetch related movies based on the first category
  const firstCategory = item.category?.[0]?.slug
  const { data: relatedData } = firstCategory 
    ? await usefetch<ResponseMovies>(`/the-loai/${firstCategory}?limit=12`)
    : { data: null }
  const relatedMovies = relatedData?.items?.slice(0, 12) || []

  const {
    slug,
    name,
    origin_name,
    alternative_names = [],
    actor = [],
    director = [],
    episode_current,
    quality,
    year,
    time,
    lang,
    episode_total,
    status,
    country = [],
    content,
    episodes = [],
    view,
    imdb,
    tmdb,
    trailer_url
  } = item

  const breadCrumb = movieDetail.breadCrumb || []

  const {
    seoSchema: { image }
  } = seoOnPage

  const serverIndex = Number(server) || 0
  const currentServer = episodes[serverIndex] || episodes[0] || {}
  const { server_data: listFirmData = [] } = currentServer

  let srcIframe =
    ['completed', 'ongoing'].includes(status) && episode_current.toLowerCase() !== 'full'
      ? listFirmData.filter((firm: any) =>
          firm.name.startsWith('0') ? firm.name.replace('0', '') === tap.replace('0', '') : firm.name === tap
        )[0]?.link_embed
      : listFirmData[0]?.link_embed

  if (!srcIframe && status !== 'trailer') {
    return notFound()
  }

  return (
    <div className='w-full px-2 md:px-12 lg:px-20 pt-20 relative z-20 min-h-screen pb-20'>
      {/* Breadcrumb */}
      {breadCrumb.length > 0 && (
        <div className='mb-6 flex flex-wrap items-center gap-2 text-sm text-white/50 bg-black/40 backdrop-blur-md px-4 py-3 rounded-md border border-white/5'>
          {breadCrumb.map((bc: any, index: number) => (
            <React.Fragment key={index}>
              {index > 0 && <span>/</span>}
              <Link
                href={bc.slug ? bc.slug.replace('/danh-sach', '') : '#'}
                className={bc.isCurrent ? 'text-primary font-bold tracking-wide' : 'hover:text-white transition-colors'}
              >
                {bc.name}
              </Link>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* Thông tin phim (Cinematic Card) */}
      <div className='bg-glass-card rounded-md p-6 md:p-10 flex flex-col lg:flex-row gap-10 items-start mb-16 relative overflow-hidden'>
        {/* Background Blur Image */}
        <div 
          className="absolute inset-0 opacity-20 blur-3xl pointer-events-none scale-110" 
          style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        ></div>
        
        {/* Shadow gradient to blend bottom edge if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none"></div>

        {/* Poster */}
        <div className='w-full sm:w-1/2 lg:w-1/4 relative z-10 shrink-0 mx-auto lg:mx-0'>
          <div className="relative group rounded-md overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 aspect-[2/3] max-w-[280px] mx-auto lg:max-w-none">
             <Image src={image} alt={name || 'poster'} fill sizes="(max-width: 1024px) 100vw, 300px" className='object-cover transition-transform duration-700 group-hover:scale-105' />
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <a href="#video" className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-[0_0_30px_rgba(229,9,20,0.8)] hover:scale-110 transition-transform">
                 <FaPlay className="ml-1" size={24} />
               </a>
             </div>
          </div>
        </div>

        {/* Content */}
        <div className='w-full lg:w-3/4 space-y-6 relative z-10'>
          <div>
            <h1 className='text-3xl md:text-5xl font-black leading-tight text-white mb-2 text-glow drop-shadow-xl'>{name}</h1>
            {origin_name && (
              <h2 className='text-lg md:text-xl text-white/50 italic tracking-wide'>
                {origin_name} {alternative_names.length > 0 ? `(${alternative_names[0]})` : ''}
              </h2>
            )}
          </div>

          {/* Quick Badges */}
          <div className='flex flex-wrap items-center gap-3 py-2'>
            <div className='rounded-lg bg-primary/90 px-3 py-1 font-black text-sm tracking-wider text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'>
              {episode_current}
            </div>
            <div className='rounded-lg bg-white/10 px-3 py-1 text-sm font-bold tracking-wider border border-white/20 backdrop-blur-md text-white'>
              {quality}
            </div>
            <div className="text-white/60 font-medium">
              {movieDetail.item.category.map((category) => category.name).join(' • ')}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm md:text-base'>
            <div className='space-y-3'>
              <h4 className='flex text-white/80'>
                <span className='w-24 text-white/40 shrink-0'>Đạo diễn:</span> 
                <span className='text-white font-medium'>{director.length > 0 ? director.join(', ') : 'Đang cập nhật'}</span>
              </h4>
              <h4 className='flex text-white/80'>
                <span className='w-24 text-white/40 shrink-0'>Diễn viên:</span> 
                <span className='text-white font-medium'>{actor.length > 0 ? actor.join(', ') : 'Đang cập nhật'}</span>
              </h4>
              <h4 className='flex text-white/80'>
                <span className='w-24 text-white/40 shrink-0'>Quốc gia:</span> 
                <span className='text-white font-medium flex items-center gap-2'>
                  <IoEarth className='text-primary' size={16} /> {country[0]?.name || 'Đang cập nhật'}
                </span>
              </h4>
            </div>

            <div className='space-y-3'>
               <h4 className='flex text-white/80'>
                <span className='w-24 text-white/40 shrink-0'>Năm:</span> 
                <span className='text-white font-medium flex items-center gap-2'>
                  <MdDateRange className='text-primary' size={16} /> {year}
                </span>
              </h4>
              <h4 className='flex text-white/80'>
                <span className='w-24 text-white/40 shrink-0'>Thời lượng:</span> 
                <span className='text-white font-medium flex items-center gap-2'>
                  <IoMdTime className='text-primary' size={16} /> {time}
                </span>
              </h4>
               <h4 className='flex text-white/80'>
                <span className='w-24 text-white/40 shrink-0'>Tập:</span> 
                <span className='text-white font-medium flex items-center gap-2'>
                  <MdLocalMovies className='text-primary' size={16} /> 
                  {status === 'ongoing' ? `${episode_current} / ${episode_total}` : `${episode_total} / ${episode_total} Tập`}
                </span>
              </h4>
            </div>
          </div>

          {/* Ratings & Views & Trailer */}
          <div className='flex flex-wrap items-center gap-4 pt-4 border-t border-white/10'>
            {((imdb?.vote_average ?? 0) > 0 || (tmdb?.vote_average ?? 0) > 0) && (
              <span className='flex items-center text-yellow-500 font-bold bg-yellow-500/10 px-4 py-2 rounded-xl border border-yellow-500/20'>
                <FaStar className='mr-2 drop-shadow-md' size={18} />
                IMDb: {imdb?.vote_average || tmdb?.vote_average}
              </span>
            )}
            <span className='flex items-center text-white/60 bg-white/5 px-4 py-2 rounded-xl border border-white/5'>
              <FaEye className='mr-2' size={18} />
              {view?.toLocaleString() || 0} lượt xem
            </span>
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto md:ml-auto mt-4 md:mt-0">
              <Favourite
                slug={slug}
                name={name}
                thumb_url={image}
                lang={lang}
                year={year}
                quality={quality}
                status={status}
                episode_current={episode_current}
              />
              
              {trailer_url && (
                <a href={trailer_url} target="_blank" rel="noopener noreferrer" className='flex items-center bg-white/10 text-white px-2 py-2 rounded-md font-bold hover:bg-white/20 transition-all duration-300'>
                  <FaPlay className='mr-2' size={12} />
                  Trailer
                </a>
              )}
            </div>
          </div>

          {/* Mô tả phim */}
          <div className="pt-4">
            <h3 className="text-xl font-bold mb-3 text-white">Nội dung phim</h3>
            <span
              className='inline-block text-white/70 leading-relaxed text-[15px]'
              dangerouslySetInnerHTML={{
                __html: content ?? ''
              }}
            />
          </div>
        </div>
      </div>

      {/* Phát video */}
      {status !== 'trailer' && (
        <div className="w-full">
          {/* Iframe */}
          <div className="relative w-full aspect-video rounded-md overflow-hidden shadow-2xl border border-white/10 mb-8 bg-black">
            <iframe 
              src={srcIframe} 
              allowFullScreen 
              className='absolute inset-0 w-full h-full border-0'
              title={name}
            />
          </div>

          {/* Server/Episode Selection */}
          <div className="bg-[#111] border border-white/5 p-6 rounded-md shadow-xl">
            <div className='mb-6'>
              <h3 className='text-xs uppercase tracking-widest text-white/40 font-bold mb-3'>Chọn Server</h3>
              <div className='flex flex-wrap gap-2'>
                {episodes.map((sv, index) => (
                  <Link
                    key={index}
                    href={`?server=${index}`}
                    className={clsx(
                      'px-5 py-2 rounded-md font-bold text-sm transition-all duration-300',
                      serverIndex === index
                        ? 'bg-primary text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {sv.server_name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className='text-xs uppercase tracking-widest text-white/40 font-bold mb-3'>Chọn Tập</h3>
              <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2'>
                {listFirmData.map((firm: any, index: number) => (
                  <Link
                    key={index}
                    href={`?tap=${firm.name}`}
                    className={clsx(
                      'px-2 py-2.5 text-center rounded-md font-bold text-sm transition-all duration-300',
                      (tap === firm.name || (!tap && index === 0))
                        ? 'bg-primary text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]'
                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    {firm.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Phim cùng thể loại (Related Movies) */}
      {relatedMovies.length > 0 && (
        <div className="w-full mt-20">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1.5 h-6 bg-primary rounded-md"></div>
            <h2 className="text-2xl font-bold text-white uppercase tracking-wider text-glow">
              Có thể bạn sẽ thích
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 mb-10">
            <ListFirm dataFirm={relatedMovies} />
          </div>
        </div>
      )}
    </div>
  )
}
