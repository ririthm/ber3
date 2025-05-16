"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image src="/logo-white.png" alt="NutriMatch Logo White" width={120} height={40} priority />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">
              Home
            </Link>
            <Link href="/recommendations" className="text-gray-700 hover:text-green-600 font-medium">
              Food Recommendations
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-green-600 font-medium">
              FAQ
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 px-2 pt-2 pb-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/recommendations"
                className="text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Food Recommendations
              </Link>
              <Link
                href="/faq"
                className="text-gray-700 hover:text-green-600 font-medium px-3 py-2 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}