import React from 'react'
import { MdDateRange, IoMdTime, MdLocalMovies, IoEarth, IoLanguage, CiShare2, CiHeart } from '@/icons'
import usefetch from '@/hooks/useFetch'
import Episodes from '@/components/movie/Episodes'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Favourite from '@/components/movie/Favourite'

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
  searchParams: { tap: string }
}) {
  const { tap = '1' } = searchParams

  const { data: movieDetail } = await usefetch<MovieDetail>(`/phim/${params.name}`)

  if(!movieDetail) {
    notFound()
  }
  const { item, seoOnPage } = movieDetail

  const {
    slug,
    name,
    actor = [],
    episode_current,
    quality,
    year,
    time,
    lang,
    episode_total,
    status,
    country = [],
    content,
    episodes = []
  } = item

  const {
    seoSchema: { image }
  } = seoOnPage

  const { server_data: ListFirm = [] } = episodes[0]

  let srcIframe =
    ['completed', 'ongoing'].includes(status) && episode_current.toLowerCase() !== 'full'
      ? ListFirm.filter((firm) => firm.name === tap)[0]?.link_embed
      : ListFirm[0]?.link_embed

  if (!srcIframe && status !== 'trailer') {
    return notFound()
  }

  return (
    <div className='min-h-screen p-2'>
      {/* Thông tin phim */}
      <div className='grid grid-cols-4 gap-x-5 bg-black/90 p-2'>
        <div className='col-span-4 flex h-full items-center justify-center md:col-span-1'>
          <img src={image} alt='img' className='h-full w-2/3 rounded object-cover md:w-full' />
        </div>
        {/* Content */}
        <div className='col-span-4 space-y-3 py-2 md:col-span-3'>
          <h1 className='text-[26px] font-semibold md:text-[40px]'>{name}</h1>
          <h4 className='font-semibold'>
            Diễn viên : <span className='text-primary'>{actor.join(', ')}</span>
          </h4>

          <div className='flex flex-wrap items-center gap-x-4 gap-y-2'>
            <div className='rounded px-2 py-1 ring-1'>{episode_current}</div>
            <div className='rounded px-2 py-1 ring-1'>{quality}</div>
            <span>{movieDetail.item.category.map((category) => category.name).join(', ')}</span>
          </div>

          <div className='flex items-center gap-x-4'>
            <span className='flex items-center'>
              <MdDateRange className='mr-2 inline-block text-primary' size={20} />
              {year}
            </span>
            <span className='flex items-center'>
              <IoMdTime className='mr-2 inline-block text-primary' size={20} />
              {time}
            </span>
            <span className='flex items-center'>
              <IoLanguage className='mr-2 inline-block text-primary' size={20} />
              {lang}
            </span>
          </div>

          <div className='flex items-center gap-x-4'>
            <span className='flex items-center'>
              <MdLocalMovies className='mr-2 inline-block text-primary' size={20} />
              {status === 'ongoing'
                ? `${episode_current} / ${episode_total}`
                : `${episode_total} / ${episode_total} Tập`}
            </span>
            <span className='flex items-center'>
              <IoEarth className='mr-2 inline-block text-primary' size={20} />
              {country[0].name}
            </span>
          </div>
          {/* Mô tả phim */}
          <span
            className='mt-5 inline-block text-sm'
            dangerouslySetInnerHTML={{
              __html: content ?? ''
            }}
          />
          {/* Yêu thích phim */}
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
        </div>
      </div>

      {/* Phát video */}
      {status !== 'trailer' && (
        <>
          <div className='mb-8 mt-8 bg-gray-500/70 md:mb-20 md:mt-24' id='video'>
            <iframe
              src={srcIframe}
              width='100%'
              className='aspect-video h-[200px] w-full overflow-hidden bg-stone-900 md:h-auto'
              allowFullScreen
              referrerPolicy='no-referrer'
            ></iframe>
          </div>
          {/* Chọn tập phim */}
          <p>{episodes[0].server_name}</p>
          <Episodes ListFirm={ListFirm} initEpisode={tap} />
        </>
      )}
    </div>
  )
}
