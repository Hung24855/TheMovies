import usefetch from '@/hooks/useFetch'
import HeaderClient from './HeaderClient'

export default async function Header() {
  const { data: genres } = await usefetch<ResponseGenres>('/the-loai', 36000)
  const { data: countries } = await usefetch<ResponseCountries>('/quoc-gia', 36000)

  return (
    <HeaderClient genres={genres?.items ?? []} countries={countries?.items ?? []} />
  )
}
