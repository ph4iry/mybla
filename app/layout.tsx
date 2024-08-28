import type { Metadata } from 'next'
import './globals.css';
import { Plus_Jakarta_Sans } from 'next/font/google';
// import Provider from '@/components/themes/Provider';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Image from 'next/image';
import { Analytics } from "@vercel/analytics/react";

const rootFont = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

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
    <html lang="en" className={`${rootFont.className}`}>
      <Analytics />
      <body className={`min-h-screen flex flex-col`}>
        <Image width={2000} height={1000} src="/gradient-dark.png" alt="" className="dark:block hidden !w-screen !h-screen fixed top-0 left-0 z-[-1] opacity-25" />
        <Image width={2000} height={1000} src="/gradient-light.png" alt="" className="block dark:hidden !w-screen !h-screen fixed top-0 left-0 z-[-1]" />
        <Navbar />
        <div className="px-6 md:px-20 py-8 grow flex justify-center">
          <main className="flex flex-col flex-1 max-w-6xl w-full relative">
            {children}
          </main>
        </div>
        <Footer />
      </body>
    </html>
  )
}
