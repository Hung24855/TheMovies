import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'react-toastify/dist/ReactToastify.css'
import './globals.css'
import Header from '@/components/layout/Header'
import MaxWithContainer from '@/components/layout/MaxWithContainer'
import Footer from '@/components/layout/Footer'
import ProvidersProgesbar from '@/base/libs/Progesbar'
import AppContextProvider from '@/context/app.context'
import Toast from '@/base/libs/Toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Trang chủ',
  description: 'Website xem phim của Nghiêm Hồng'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
      </head>
      <body className={`${inter.className}`}>
        <ProvidersProgesbar>
          <AppContextProvider>
            <Header />
            <main className="w-full min-h-screen pb-10">{children}</main>
            <Footer />
          </AppContextProvider>
          <Toast />
        </ProvidersProgesbar>
      </body>
    </html>
  )
}
