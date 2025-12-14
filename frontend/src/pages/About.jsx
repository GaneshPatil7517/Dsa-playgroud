import React from 'react'

export default function About(){
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">About DSA Playground</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          This learning app visualizes sorting algorithms and simple data structures. It demonstrates step-by-step operations, 
          complexity analysis, and animations to help computer science students understand algorithmic behavior visually.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Algorithms & Data Structures</h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">Sorting Algorithms</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1 ml-3">
              <li><strong>Bubble Sort</strong> - O(n²) time, O(1) space. Simple comparison-based algorithm.</li>
              <li><strong>Selection Sort</strong> - O(n²) time, O(1) space. Finds minimum element repeatedly.</li>
              <li><strong>Insertion Sort</strong> - O(n²) time, O(1) space. Builds sorted array one item at a time.</li>
              <li><strong>Merge Sort</strong> - O(n log n) time, O(n) space. Divide and conquer approach.</li>
              <li><strong>Quick Sort</strong> - O(n log n) average time, O(log n) space. Partition-based sorting.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Data Structures</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1 ml-3">
              <li><strong>Linked List (Singly)</strong> - Dynamic linear structure with nodes and pointers.</li>
              <li><strong>Stack</strong> - LIFO (Last In First Out) structure. Used in undo operations, browser history.</li>
              <li><strong>Queue</strong> - FIFO (First In First Out) structure. Used in task scheduling, print queues.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Time & Space Complexity</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
          Each visualization displays the time and space complexity to help you understand the efficiency and resource usage of each algorithm.
        </p>
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-300 dark:border-gray-600">
                <th className="pb-2 text-gray-900 dark:text-white">Algorithm</th>
                <th className="pb-2 text-gray-900 dark:text-white">Best</th>
                <th className="pb-2 text-gray-900 dark:text-white">Average</th>
                <th className="pb-2 text-gray-900 dark:text-white">Worst</th>
                <th className="pb-2 text-gray-900 dark:text-white">Space</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2">Bubble Sort</td>
                <td>O(n)</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>O(1)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2">Selection Sort</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>O(1)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2">Insertion Sort</td>
                <td>O(n)</td>
                <td>O(n²)</td>
                <td>O(n²)</td>
                <td>O(1)</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-2">Merge Sort</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>O(n)</td>
              </tr>
              <tr>
                <td className="py-2">Quick Sort</td>
                <td>O(n log n)</td>
                <td>O(n log n)</td>
                <td>O(n²)</td>
                <td>O(log n)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-2">Built With</h3>
        <p className="text-indigo-100 text-sm">
          React + Vite + Tailwind CSS + Framer Motion + React Router + Lucide Icons
        </p>
      </div>
    </div>
  )
}