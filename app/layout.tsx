import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Provider from '@/components/themes/Provider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'myBLA',
  description: 'Boston Latin Academy Resources only a click away',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Provider>
          <Navbar />
          <div className="px-6 md:px-24 py-8 grow flex justify-center">
            <main className="flex flex-col flex-1 max-w-6xl w-full  ">
              {children}
            </main>
          </div>
          <Footer />
        </Provider>  
      </body>
    </html>
  )
}
