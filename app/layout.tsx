import type { Metadata } from 'next'
import './globals.css';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import Sidebar from '@/components/v3/Sidebar';
import KWrapper from '@/components/v3/KWrapper';
import { PiStarFourFill } from 'react-icons/pi';
import TopBar from '@/components/v3/TopBar';

const rootFont = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] })

const headingFont = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600', '700', '800', '900'], style: ['normal', 'italic'], variable: '--font-playfair-display' })

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
    <html lang="en" className={`${rootFont.className} ${headingFont.variable}`}>
      <Analytics />
      <body className="h-screen flex">
        <KWrapper>
          <Sidebar />
          <div className="w-full">
            <TopBar />
            <div className="h-[85%] p-4 md:p-10 overflow-hidden">
              {children}
            </div>
          </div>
        </KWrapper>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
