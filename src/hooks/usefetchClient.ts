"use client"
import { useEffect, useState } from 'react'

export default function usefetchClient<T>(url:string) {
  const [data,setData] = useState<T[]|null>(null)
  const [loading,setLoading] = useState<boolean>(false)
  const [error,setError] = useState<Error|null>(null)
 
  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_API
      try {
        const fullUrl = url.startsWith("/")
          ? `${baseUrl}${url}`
          : `${baseUrl}/${url}`
        const response = await fetch(fullUrl).then((res) => res.json())
        const data: T[]|null = response.data.items
        setData(data)
      } catch (error) {
        setError(error as Error)
      }
      finally {
          setLoading(false)
      }
    }
    fetchData()
  },[url])
  
  return {data,loading,error}
}
