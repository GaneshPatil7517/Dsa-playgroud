import React from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, List, Layers, ArrowRightLeft, GitBranch, Map } from 'lucide-react'

export default function Home(){
  return (
    <div className="space-y-6">
      <header className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to DSA Playground</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Interactive visualizations for sorting algorithms and fundamental data structures.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link to="/sorting" className="group p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 size={28} />
            <h2 className="text-xl font-semibold">Sorting</h2>
          </div>
          <p className="text-indigo-100 text-sm">5 algorithms with step-by-step mode</p>
        </Link>

        <Link to="/linked-list" className="group p-6 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <List size={28} />
            <h2 className="text-xl font-semibold">Linked List</h2>
          </div>
          <p className="text-green-100 text-sm">With memory address visualization</p>
        </Link>

        <Link to="/stack" className="group p-6 bg-gradient-to-br from-orange-500 to-red-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <Layers size={28} />
            <h2 className="text-xl font-semibold">Stack</h2>
          </div>
          <p className="text-orange-100 text-sm">LIFO operations with animations</p>
        </Link>

        <Link to="/queue" className="group p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <ArrowRightLeft size={28} />
            <h2 className="text-xl font-semibold">Queue</h2>
          </div>
          <p className="text-blue-100 text-sm">FIFO operations visualized</p>
        </Link>

        <Link to="/binary-tree" className="group p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <GitBranch size={28} />
            <h2 className="text-xl font-semibold">Binary Tree</h2>
          </div>
          <p className="text-purple-100 text-sm">BST with insert, delete, search</p>
        </Link>

        <Link to="/pathfinding" className="group p-6 bg-gradient-to-br from-cyan-500 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-center gap-3 mb-2">
            <Map size={28} />
            <h2 className="text-xl font-semibold">Pathfinding</h2>
          </div>
          <p className="text-cyan-100 text-sm">BFS, DFS on grid visualization</p>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">🎯 New Features</h3>
        <ul className="space-y-2 text-gray-600 dark:text-gray-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">✓</span>
            <span><strong>Custom Array Input:</strong> Enter your own values for sorting</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">✓</span>
            <span><strong>Step-by-Step Mode:</strong> Manual control with explanations</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">✓</span>
            <span><strong>Array Presets:</strong> Quick test with sorted, reverse, random arrays</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">✓</span>
            <span><strong>Code Display:</strong> View pseudocode for each algorithm</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">✓</span>
            <span><strong>Binary Tree:</strong> Full BST visualization with traversals</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-indigo-500 mt-1">✓</span>
            <span><strong>Pathfinding:</strong> BFS & DFS on interactive grid</span>
          </li>
        </ul>
      </div>
    </div>
  )
}