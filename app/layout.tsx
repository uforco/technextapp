import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ReduxProvider from '@/redux/ReduxProvider';

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Shortify',
  description: 'Shortify Create by Md Sharif',
  generator: 'https://sharifdev.vercel.app',
  icons: {
    icon: [
      {
        url: '/favicon-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicon-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  console.log("========layout======>>>", process.env.NODE_ENV);

  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
         <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  )
}
