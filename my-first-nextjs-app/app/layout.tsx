import './globals.css'
import { Roboto } from 'next/font/google'
import Navbar from './components/Navbar'
import { ThemeProvider } from 'next-themes'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'My Image Gallery',
  description: 'A gallery of beautiful images',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark`}>
        <ThemeProvider attribute="class">
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
