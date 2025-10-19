import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '💕 Dành cho em yêu 💕',
  description: 'Một món quà đặc biệt dành cho em',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}

