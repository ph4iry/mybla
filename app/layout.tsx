import type { Metadata } from 'next'
import './globals.css';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import Sidebar from '@/components/v3/Sidebar';
import KWrapper from '@/components/v3/KWrapper';
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
    <html lang="en" className={`${rootFont.className} ${headingFont.variable}`} suppressHydrationWarning>
      <head>
        {/* apply the saved (or system) theme before first paint so the page doesn't flash */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}` }} />
      </head>
      <Analytics />
      <body className="h-screen flex">
        <KWrapper>
          <Sidebar />
          <div className="w-full h-screen flex flex-col min-w-0">
            <TopBar />
            <div className="flex-1 min-h-0 p-4 md:p-8 overflow-hidden">
              {children}
            </div>
          </div>
        </KWrapper>
        {/* <Footer /> */}
      </body>
    </html>
  )
}
