import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRightLeft, Plus, Minus, Eye, Trash2 } from 'lucide-react'

export default function QueueSimulator(){
  const [queue, setQueue] = useState(["Print Job 1","Email Send","File Upload"])
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')
  const MAX = 12

  function showMessage(msg, type = 'info'){
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 2500)
  }

  function enqueue(){
    if (queue.length >= MAX){ 
      showMessage(`Queue Full! Maximum capacity (${MAX}) reached`, 'error')
      return 
    }
    if (input === ''){ 
      showMessage('Please enter a value', 'error')
      return 
    }
    setQueue(prev => [ ...prev, input ])
    showMessage(`Enqueued "${input}" to rear`, 'success')
    setInput('')
  }
  
  function dequeue(){
    if (queue.length === 0){ 
      showMessage('Queue Empty! Nothing to dequeue', 'error')
      return 
    }
    const dequeued = queue[0]
    setQueue(prev => prev.slice(1))
    showMessage(`Dequeued "${dequeued}" from front`, 'success')
  }
  
  function peek(){
    if (queue.length === 0) {
      showMessage('Queue is empty', 'info')
    } else {
      showMessage(`Front element: "${queue[0]}"`, 'info')
    }
  }

  function clear(){
    setQueue([])
    showMessage('Queue cleared', 'info')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <ArrowRightLeft size={32} />
          <h1 className="text-2xl font-bold">Queue Simulator</h1>
        </div>
        <p className="text-white/90 text-sm">FIFO (First In, First Out) data structure visualization</p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Element Value</label>
            <input 
              value={input} 
              onChange={e=>setInput(e.target.value)} 
              className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              placeholder="Enter value"
              onKeyPress={e => e.key === 'Enter' && enqueue()}
            />
          </div>
          
          <button 
            onClick={enqueue} 
            className="flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <Plus size={18} /> Enqueue
          </button>
          
          <button 
            onClick={dequeue} 
            className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <Minus size={18} /> Dequeue
          </button>
          
          <button 
            onClick={peek} 
            className="flex items-center gap-2 px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <Eye size={18} /> Peek
          </button>

          <button 
            onClick={clear} 
            className="flex items-center gap-2 px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <Trash2 size={18} /> Clear
          </button>
        </div>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div 
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                messageType === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                messageType === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Visualization */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Queue Visualization</h3>
          
          {queue.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <ArrowRightLeft size={48} className="mx-auto mb-2 opacity-50" />
              <p>Queue is empty</p>
            </div>
          ) : (
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-3 items-center min-w-max">
                <div className="text-sm font-semibold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  FRONT →
                </div>
                <AnimatePresence mode="popLayout">
                  {queue.map((v, idx) => (
                    <motion.div 
                      key={idx}
                      layout
                      initial={{opacity:0, x:-20, scale: 0.8}} 
                      animate={{opacity:1, x:0, scale: 1}} 
                      exit={{opacity:0, x:-20, scale: 0.8}}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className={`px-4 py-3 ${
                        idx === 0 
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-r from-blue-400 to-cyan-500'
                      } text-white rounded-lg shadow-lg font-medium whitespace-nowrap relative min-w-[120px] text-center`}
                    >
                      {v}
                      {idx === 0 && (
                        <span className="absolute -top-2 -left-2 bg-blue-700 text-white text-xs px-2 py-1 rounded-full shadow">
                          FRONT
                        </span>
                      )}
                      {idx === queue.length - 1 && (
                        <span className="absolute -top-2 -right-2 bg-cyan-600 text-white text-xs px-2 py-1 rounded-full shadow">
                          REAR
                        </span>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div className="text-sm font-semibold text-cyan-600 dark:text-cyan-400 whitespace-nowrap">
                  ← REAR
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Queue Info</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Current Size:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{queue.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Max Capacity:</span>
                <span className="font-bold text-gray-900 dark:text-white">{MAX}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Available Space:</span>
                <span className="font-bold text-green-600 dark:text-green-400">{MAX - queue.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Front Element:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400 truncate max-w-[150px]">
                  {queue.length ? queue[0] : '—'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Rear Element:</span>
                <span className="font-bold text-cyan-600 dark:text-cyan-400 truncate max-w-[150px]">
                  {queue.length ? queue[queue.length - 1] : '—'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white text-sm">Use Cases</h4>
            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Print job scheduling</li>
              <li>• Process scheduling in OS</li>
              <li>• Breadth-first search (BFS)</li>
              <li>• Handling requests on servers</li>
              <li>• Call center systems</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white text-sm">Time Complexity</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-gray-600 dark:text-gray-400">Enqueue</div>
                <div className="font-mono font-bold text-green-600">O(1)</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">Dequeue</div>
                <div className="font-mono font-bold text-green-600">O(1)</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">Peek</div>
                <div className="font-mono font-bold text-green-600">O(1)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}