import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Layers, Plus, Minus, Eye, Trash2 } from 'lucide-react'

export default function StackSimulator(){
  const [stack, setStack] = useState(["index.html","script.js","styles.css"])
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')
  const MAX = 10

  function showMessage(msg, type = 'info'){
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 2500)
  }

  function push(){
    if (stack.length >= MAX){ 
      showMessage(`Stack Overflow! Maximum capacity (${MAX}) reached`, 'error')
      return 
    }
    if (input === ''){ 
      showMessage('Please enter a value', 'error')
      return 
    }
    setStack(prev => [ ...prev, input ])
    setInput('')
    showMessage(`Pushed "${input}" onto stack`, 'success')
  }
  
  function pop(){
    if (stack.length === 0){ 
      showMessage('Stack Underflow! Stack is empty', 'error')
      return 
    }
    const popped = stack[stack.length - 1]
    setStack(prev => prev.slice(0, prev.length -1))
    showMessage(`Popped "${popped}" from stack`, 'success')
  }
  
  function peek(){
    if (stack.length === 0) {
      showMessage('Stack is empty', 'info')
    } else {
      showMessage(`Top element: "${stack[stack.length-1]}"`, 'info')
    }
  }

  function clear(){
    setStack([])
    showMessage('Stack cleared', 'info')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Layers size={32} />
          <h1 className="text-2xl font-bold">Stack Simulator</h1>
        </div>
        <p className="text-white/90 text-sm">LIFO (Last In, First Out) data structure visualization</p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Element Value</label>
            <input 
              value={input} 
              onChange={e=>setInput(e.target.value)} 
              className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" 
              placeholder="Enter value"
              onKeyPress={e => e.key === 'Enter' && push()}
            />
          </div>
          
          <button 
            onClick={push} 
            className="flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <Plus size={18} /> Push
          </button>
          
          <button 
            onClick={pop} 
            className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <Minus size={18} /> Pop
          </button>
          
          <button 
            onClick={peek} 
            className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition font-medium"
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Stack Visualization</h3>
          
          <div className="flex flex-col-reverse items-center gap-2 min-h-[300px] justify-end">
            <div className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-t-none rounded-b-lg"></div>
            <AnimatePresence mode="popLayout">
              {stack.slice().reverse().map((v, idx) => {
                const actualIdx = stack.length - 1 - idx
                return (
                  <motion.div 
                    key={actualIdx} 
                    layout
                    initial={{opacity:0, y:-20, scale: 0.8}} 
                    animate={{opacity:1, y:0, scale: 1}} 
                    exit={{opacity:0, y: -20, scale: 0.8}}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`w-full text-center ${
                      idx === 0 
                        ? 'bg-gradient-to-r from-orange-400 to-red-500' 
                        : 'bg-gradient-to-r from-orange-300 to-orange-400'
                    } text-white rounded-lg px-4 py-3 shadow-lg font-medium relative`}
                  >
                    {v}
                    {idx === 0 && (
                      <span className="absolute -right-2 -top-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow">
                        TOP
                      </span>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
            
            {stack.length === 0 && (
              <div className="text-gray-400 text-center py-12">
                <Layers size={48} className="mx-auto mb-2 opacity-50" />
                <p>Stack is empty</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Panel */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Stack Info</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Current Size:</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">{stack.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Max Capacity:</span>
                <span className="font-bold text-gray-900 dark:text-white">{MAX}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Available Space:</span>
                <span className="font-bold text-green-600 dark:text-green-400">{MAX - stack.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Top Element:</span>
                <span className="font-bold text-purple-600 dark:text-purple-400">
                  {stack.length ? stack[stack.length - 1] : '—'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-4 rounded-xl">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white text-sm">Use Cases</h4>
            <ul className="text-xs text-gray-700 dark:text-gray-300 space-y-1">
              <li>• Browser history (back button)</li>
              <li>• Undo/Redo functionality</li>
              <li>• Function call stack</li>
              <li>• Expression evaluation</li>
              <li>• Backtracking algorithms</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white text-sm">Time Complexity</h4>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <div className="text-gray-600 dark:text-gray-400">Push</div>
                <div className="font-mono font-bold text-green-600">O(1)</div>
              </div>
              <div>
                <div className="text-gray-600 dark:text-gray-400">Pop</div>
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