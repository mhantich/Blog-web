import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Footer from '@/components/Footer'
import Navbar from '@/components/NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Blog with Next.js and Express',
  description: 'A blog built with Next.js and Express for the backend API',

  
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className  }`}>
      <Navbar/>
<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen '>

        {children}
</div>
        <Footer/>
      </body>
    </html>
  )
}