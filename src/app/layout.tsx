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
    <html lang='en' className='select-none scroll-smooth'>
      <head>
        <link rel='icon' href='/logo-white.png' sizes='any' />
      </head>
      <body className={`${inter.className} bg-black/90 text-white`}>
        <ProvidersProgesbar>
          <AppContextProvider>
            <Header />
            <MaxWithContainer>{children}</MaxWithContainer>
            <Footer />
          </AppContextProvider>
          <Toast />
        </ProvidersProgesbar>
      </body>
    </html>
  )
}
