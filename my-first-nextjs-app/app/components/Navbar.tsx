import Link from 'next/link'
import DarkModeToggle from './DarkModeToggle'

export default function Navbar() {
  return (
    <nav className="bg-primary dark:bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">My Gallery</Link>
        <div className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
          <DarkModeToggle />
        </div>
      </div>
    </nav>
  )
}
