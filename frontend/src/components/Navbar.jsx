import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Sun, Moon, Menu, X, Code2 } from 'lucide-react'

export default function Navbar({ dark, setDark }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { to: '/', label: 'Home' },
    { to: '/sorting', label: 'Sorting' },
    { to: '/linked-list', label: 'Linked List' },
    { to: '/stack', label: 'Stack' },
    { to: '/queue', label: 'Queue' },
    { to: '/binary-tree', label: 'Binary Tree' },
    { to: '/pathfinding', label: 'Pathfinding' },
    { to: '/about', label: 'About' }
  ]

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            <Code2 size={28} className="text-indigo-600 dark:text-indigo-400" />
            DSA Playground
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(item => (
              <NavLink 
                key={item.to}
                to={item.to} 
                className={({isActive}) => `px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setDark(!dark)} 
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {dark ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
            </button>
            
            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-1">
            {navItems.map(item => (
              <NavLink 
                key={item.to}
                to={item.to} 
                onClick={() => setMobileOpen(false)}
                className={({isActive}) => `block px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}