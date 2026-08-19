import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(): JSX.Element {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold">
          Jema Digital
        </Link>
        <nav className="space-x-4">
          <Link to="/services" className="text-sm text-gray-700 hover:text-gray-900">Services</Link>
          <Link to="/work" className="text-sm text-gray-700 hover:text-gray-900">Work</Link>
          <Link to="/about" className="text-sm text-gray-700 hover:text-gray-900">About</Link>
          <Link to="/contact" className="text-sm text-gray-700 hover:text-gray-900">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
