import React from 'react'
import { Clock, Database } from 'lucide-react'

export default function ComplexityCard({ time, space }){
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-5 rounded-xl shadow-lg border border-indigo-100 dark:border-indigo-800">
      <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm">Complexity Analysis</h4>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-800 rounded-lg">
            <Clock size={18} className="text-indigo-600 dark:text-indigo-300" />
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Time Complexity</div>
            <div className="font-mono font-bold text-lg text-indigo-600 dark:text-indigo-400">{time}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-800 rounded-lg">
            <Database size={18} className="text-purple-600 dark:text-purple-300" />
          </div>
          <div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Space Complexity</div>
            <div className="font-mono font-bold text-lg text-purple-600 dark:text-purple-400">{space}</div>
          </div>
        </div>
      </div>
    </div>
  )
}