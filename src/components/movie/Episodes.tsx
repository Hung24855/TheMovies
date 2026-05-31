'use client'
import clsx from 'clsx'
import { useRouter } from 'next-nprogress-bar'
import React, { useState } from 'react'

type ListFirm = {
  name: string
  slug: string
  link_embed: string
}

export default function Episodes({
  ListFirm = [],
  initEpisode,
  serverIndex = 0
}: {
  ListFirm: ListFirm[]
  initEpisode: string
  serverIndex?: number
}) {
  const [Episode, setEpisode] = useState<number>(() => Number(initEpisode))
  const router = useRouter()

  return (
    <div className='mt-4 grid grid-cols-4 gap-2 bg-black p-2 md:grid-cols-8 lg:grid-cols-12'>
      {ListFirm.map(({ name, slug }) => {
        return (
          <button
            className={clsx(
              'rounded bg-[#191919] px-2 py-2 text-center hover:bg-primary hover:text-black md:px-10',
              Episode === Number(slug) && 'bg-primary text-black',
              slug.toLowerCase() === 'full' && 'bg-primary text-black'
            )}
            key={name}
            onClick={() => {
              if (Episode !== Number(name)) {
                setEpisode(Number(name))
                router.push(`?server=${serverIndex}&tap=${name}`, { scroll: false })
              }
            }}
          >
            {name}
          </button>
        )
      })}
    </div>
  )
}
