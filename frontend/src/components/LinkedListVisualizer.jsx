import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, ArrowLeftRight, List, AlertCircle } from 'lucide-react'

function createNode(value, id){
  // Generate a fake memory address (hex format)
  const address = '0x' + (0x1000 + id * 0x10).toString(16).toUpperCase()
  return { id, value, address }
}

export default function LinkedListVisualizer(){
  const [nodes, setNodes] = useState([
    createNode(10, 1), 
    createNode(20, 2), 
    createNode(30, 3)
  ])
  const [value, setValue] = useState('')
  const [pos, setPos] = useState('end')
  const [middleIndex, setMiddleIndex] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')

  function showMessage(msg, type = 'info'){
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 3000)
  }

  function insert(){
    const v = Number(value)
    if (Number.isNaN(v) || value === '') { 
      showMessage('Please enter a valid number', 'error')
      return 
    }
    const id = Date.now()
    const newNode = createNode(v, id)
    
    if (pos === 'start') {
      setNodes(prev => [newNode, ...prev])
      showMessage(`Inserted ${v} at head`, 'success')
    } else if (pos === 'middle') {
      const idx = Number(middleIndex)
      if (Number.isNaN(idx) || middleIndex === '' || idx < 0 || idx > nodes.length) {
        showMessage(`Please enter a valid index (0-${nodes.length})`, 'error')
        return
      }
      setNodes(prev => {
        const newList = [...prev]
        newList.splice(idx, 0, newNode)
        return newList
      })
      showMessage(`Inserted ${v} at index ${idx}`, 'success')
      setMiddleIndex('')
    } else {
      setNodes(prev => [...prev, newNode])
      showMessage(`Inserted ${v} at tail`, 'success')
    }
    setValue('')
  }

  function remove(){
    const v = Number(value)
    if (Number.isNaN(v) || value === '') { 
      showMessage('Please enter a valid number to delete', 'error')
      return 
    }
    const idx = nodes.findIndex(n => n.value === v)
    if (idx === -1){ 
      showMessage(`Value ${v} not found in list`, 'error')
      return 
    }
    setNodes(prev => prev.filter((_,i) => i !== idx))
    showMessage(`Deleted node with value ${v}`, 'success')
    setValue('')
  }

  function reverse(){
    setNodes(prev => [...prev].reverse())
    showMessage('List reversed successfully', 'success')
  }

  function clear(){
    setNodes([])
    showMessage('List cleared', 'info')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <List size={32} />
          <h1 className="text-2xl font-bold">Linked List Visualizer</h1>
        </div>
        <p className="text-white/90 text-sm">Singly Linked List with memory address visualization</p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Node Value</label>
            <input 
              className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
              value={value} 
              onChange={e=>setValue(e.target.value)} 
              placeholder="Enter number" 
              type="number"
            />
          </div>
          
          <div className="min-w-[130px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Position</label>
            <select 
              className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg"
              value={pos} 
              onChange={e=>setPos(e.target.value)}
            >
              <option value="end">At Tail</option>
              <option value="start">At Head</option>
              <option value="middle">At Index</option>
            </select>
          </div>

          {pos === 'middle' && (
            <div className="min-w-[120px]">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Index (0-{nodes.length})</label>
              <input 
                className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" 
                value={middleIndex} 
                onChange={e=>setMiddleIndex(e.target.value)} 
                placeholder="0" 
                type="number"
                min="0"
                max={nodes.length}
              />
            </div>
          )}

          <button 
            onClick={insert} 
            className="flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <Plus size={18} /> Insert
          </button>
          
          <button 
            onClick={remove} 
            className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <Trash2 size={18} /> Delete
          </button>
          
          <button 
            onClick={reverse} 
            className="flex items-center gap-2 px-5 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <ArrowLeftRight size={18} /> Reverse
          </button>

          <button 
            onClick={clear} 
            className="px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            Clear All
          </button>
        </div>

        {/* Message Display */}
        <AnimatePresence>
          {message && (
            <motion.div 
              initial={{opacity: 0, y: -10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                messageType === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' :
                messageType === 'success' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              }`}
            >
              <AlertCircle size={18} />
              <span className="text-sm font-medium">{message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Visualization */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Memory Visualization</h3>
        
        {nodes.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <List size={48} className="mx-auto mb-3 opacity-50" />
            <p>List is empty. Add some nodes to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto pb-4">
            <div className="flex items-center gap-4 min-w-max">
              <AnimatePresence mode="popLayout">
                {nodes.map((n, idx) => (
                  <motion.div 
                    key={n.id} 
                    layout 
                    initial={{opacity:0, scale: 0.8, y:20}} 
                    animate={{opacity:1, scale: 1, y:0}} 
                    exit={{opacity:0, scale: 0.8, y:-20}}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="flex items-center gap-4"
                  >
                    {/* Node */}
                    <div className="bg-gradient-to-br from-green-400 to-teal-500 text-white rounded-lg shadow-xl p-4 min-w-[180px]">
                      <div className="text-xs font-mono opacity-75 mb-2">{n.address}</div>
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <div className="text-xs opacity-75">Data</div>
                          <div className="text-2xl font-bold">{n.value}</div>
                        </div>
                        <div className="border-l border-white/30 pl-3">
                          <div className="text-xs opacity-75">Next</div>
                          <div className="text-xs font-mono">
                            {idx < nodes.length - 1 ? nodes[idx + 1].address : 'NULL'}
                          </div>
                        </div>
                      </div>
                      
                      {/* Node label */}
                      <div className="mt-2 pt-2 border-t border-white/30 text-xs text-center">
                        {idx === 0 && <span className="bg-white/20 px-2 py-1 rounded">HEAD</span>}
                        {idx === nodes.length - 1 && <span className="bg-white/20 px-2 py-1 rounded ml-1">TAIL</span>}
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    {idx < nodes.length - 1 && (
                      <motion.div 
                        initial={{scale: 0}}
                        animate={{scale: 1}}
                        className="text-gray-400 dark:text-gray-500 text-3xl font-bold"
                      >
                        →
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* NULL pointer */}
              {nodes.length > 0 && (
                <motion.div 
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  className="text-gray-400 dark:text-gray-500 text-xl font-mono"
                >
                  ⊗ NULL
                </motion.div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Info Panel */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-4 rounded-xl">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Nodes</div>
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{nodes.length}</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-4 rounded-xl">
          <div className="text-sm text-gray-600 dark:text-gray-400">Head Value</div>
          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
            {nodes[0]?.value ?? '—'}
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-4 rounded-xl">
          <div className="text-sm text-gray-600 dark:text-gray-400">Tail Value</div>
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {nodes[nodes.length-1]?.value ?? '—'}
          </div>
        </div>
      </div>

      {/* Complexity Info */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Time Complexity</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div>
            <div className="text-gray-600 dark:text-gray-400">Insert at Head</div>
            <div className="font-mono font-bold text-green-600">O(1)</div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400">Insert at Tail</div>
            <div className="font-mono font-bold text-yellow-600">O(n)</div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400">Delete by Value</div>
            <div className="font-mono font-bold text-orange-600">O(n)</div>
          </div>
          <div>
            <div className="text-gray-600 dark:text-gray-400">Reverse</div>
            <div className="font-mono font-bold text-red-600">O(n)</div>
          </div>
        </div>
      </div>
    </div>
  )
}