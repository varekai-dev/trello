import { Navbar } from '@/components'
import './globals.css'
import type { Metadata } from 'next'
import { ReactQueryProvider } from '@/providers'

export const metadata: Metadata = {
  title: 'Trello Clone',
  description: 'Trello Clone build with Next.js and Tailwind CSS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="dark bg-gray-900 h-full" suppressHydrationWarning={true}>
        <ReactQueryProvider>
          <Navbar />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
