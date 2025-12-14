import React from 'react'
import { Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Developer Info */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="text-gray-900 dark:text-white font-semibold text-sm">
              Developed by Ganesh Patil
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">
              Google Developer Relations (DevRel)
            </div>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/GaneshPatil7517" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Github size={20} />
              <span className="font-medium">GitHub</span>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/ganesh-patil-9b74bb30b/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-200 hover:scale-105 shadow-md"
            >
              <Linkedin size={20} />
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>

          {/* Copyright Year */}
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            © {new Date().getFullYear()} DSA Playground
          </div>
        </div>
      </div>
    </footer>
  )
}