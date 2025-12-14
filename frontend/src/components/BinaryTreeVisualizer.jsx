import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, Search, GitBranch, RotateCcw } from 'lucide-react'

class TreeNode {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
    this.x = 0
    this.y = 0
  }
}

export default function BinaryTreeVisualizer() {
  const [root, setRoot] = useState(null)
  const [value, setValue] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')
  const [highlightedNodes, setHighlightedNodes] = useState(new Set())
  const [traversalResult, setTraversalResult] = useState([])

  function showMessage(msg, type = 'info') {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => setMessage(''), 3000)
  }

  function insert(value) {
    const v = Number(value)
    if (Number.isNaN(v) || value === '') {
      showMessage('Please enter a valid number', 'error')
      return
    }

    function insertNode(node, val) {
      if (!node) return new TreeNode(val)
      
      if (val < node.value) {
        node.left = insertNode(node.left, val)
      } else if (val > node.value) {
        node.right = insertNode(node.right, val)
      } else {
        showMessage(`Value ${val} already exists`, 'error')
        return node
      }
      return node
    }

    const newRoot = insertNode(root, v)
    setRoot(newRoot)
    calculatePositions(newRoot)
    showMessage(`Inserted ${v}`, 'success')
    setValue('')
  }

  function deleteNode(value) {
    const v = Number(value)
    if (Number.isNaN(v) || value === '') {
      showMessage('Please enter a valid number', 'error')
      return
    }

    function findMin(node) {
      while (node.left) node = node.left
      return node
    }

    function deleteRecursive(node, val) {
      if (!node) {
        showMessage(`Value ${val} not found`, 'error')
        return null
      }

      if (val < node.value) {
        node.left = deleteRecursive(node.left, val)
      } else if (val > node.value) {
        node.right = deleteRecursive(node.right, val)
      } else {
        // Node found
        if (!node.left && !node.right) return null
        if (!node.left) return node.right
        if (!node.right) return node.left

        const minRight = findMin(node.right)
        node.value = minRight.value
        node.right = deleteRecursive(node.right, minRight.value)
      }
      return node
    }

    const newRoot = deleteRecursive(root, v)
    setRoot(newRoot)
    if (newRoot) calculatePositions(newRoot)
    showMessage(`Deleted ${v}`, 'success')
    setValue('')
  }

  function search(value) {
    const v = Number(value)
    if (Number.isNaN(v) || value === '') {
      showMessage('Please enter a valid number', 'error')
      return
    }

    const path = []
    function searchRecursive(node, val) {
      if (!node) return false
      path.push(node.value)
      if (val === node.value) return true
      if (val < node.value) return searchRecursive(node.left, val)
      return searchRecursive(node.right, val)
    }

    if (searchRecursive(root, v)) {
      setHighlightedNodes(new Set(path))
      showMessage(`Found ${v}! Path: ${path.join(' → ')}`, 'success')
    } else {
      setHighlightedNodes(new Set())
      showMessage(`${v} not found`, 'error')
    }
  }

  function inorderTraversal() {
    const result = []
    function traverse(node) {
      if (!node) return
      traverse(node.left)
      result.push(node.value)
      traverse(node.right)
    }
    traverse(root)
    setTraversalResult(result)
    showMessage(`Inorder: ${result.join(', ')}`, 'info')
  }

  function preorderTraversal() {
    const result = []
    function traverse(node) {
      if (!node) return
      result.push(node.value)
      traverse(node.left)
      traverse(node.right)
    }
    traverse(root)
    setTraversalResult(result)
    showMessage(`Preorder: ${result.join(', ')}`, 'info')
  }

  function postorderTraversal() {
    const result = []
    function traverse(node) {
      if (!node) return
      traverse(node.left)
      traverse(node.right)
      result.push(node.value)
    }
    traverse(root)
    setTraversalResult(result)
    showMessage(`Postorder: ${result.join(', ')}`, 'info')
  }

  function calculatePositions(node, x = 400, y = 50, xOffset = 150) {
    if (!node) return
    node.x = x
    node.y = y
    if (node.left) calculatePositions(node.left, x - xOffset, y + 80, xOffset / 1.5)
    if (node.right) calculatePositions(node.right, x + xOffset, y + 80, xOffset / 1.5)
  }

  function renderTree(node) {
    if (!node) return null

    const isHighlighted = highlightedNodes.has(node.value)

    return (
      <g key={`${node.value}-${node.x}-${node.y}`}>
        {/* Lines to children */}
        {node.left && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.left.x}
            y2={node.left.y}
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400 dark:text-gray-600"
          />
        )}
        {node.right && (
          <line
            x1={node.x}
            y1={node.y}
            x2={node.right.x}
            y2={node.right.y}
            stroke="currentColor"
            strokeWidth="2"
            className="text-gray-400 dark:text-gray-600"
          />
        )}

        {/* Node circle */}
        <motion.circle
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          cx={node.x}
          cy={node.y}
          r="25"
          className={`${
            isHighlighted
              ? 'fill-yellow-400 stroke-yellow-600'
              : 'fill-indigo-500 stroke-indigo-700'
          } stroke-2`}
        />

        {/* Node value */}
        <text
          x={node.x}
          y={node.y + 5}
          textAnchor="middle"
          className="fill-white font-bold text-sm pointer-events-none"
        >
          {node.value}
        </text>

        {/* Recursively render children */}
        {node.left && renderTree(node.left)}
        {node.right && renderTree(node.right)}
      </g>
    )
  }

  function clearTree() {
    setRoot(null)
    setHighlightedNodes(new Set())
    setTraversalResult([])
    showMessage('Tree cleared', 'info')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <GitBranch size={32} />
          <h1 className="text-2xl font-bold">Binary Search Tree Visualizer</h1>
        </div>
        <p className="text-white/90 text-sm">Insert, delete, search, and traverse a BST</p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Node Value
            </label>
            <input
              type="number"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="Enter number"
              className="w-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg"
              onKeyPress={e => e.key === 'Enter' && insert(value)}
            />
          </div>

          <button
            onClick={() => insert(value)}
            className="flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <Plus size={18} /> Insert
          </button>

          <button
            onClick={() => deleteNode(value)}
            className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <Trash2 size={18} /> Delete
          </button>

          <button
            onClick={() => search(value)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <Search size={18} /> Search
          </button>

          <button
            onClick={clearTree}
            className="flex items-center gap-2 px-5 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg shadow-lg transition font-medium"
          >
            <RotateCcw size={18} /> Clear
          </button>
        </div>

        {/* Message */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-4 p-3 rounded-lg text-sm font-medium ${
                messageType === 'error'
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  : messageType === 'success'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
              }`}
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Traversal Buttons */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
          Tree Traversals
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={inorderTraversal}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium"
          >
            Inorder
          </button>
          <button
            onClick={preorderTraversal}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium"
          >
            Preorder
          </button>
          <button
            onClick={postorderTraversal}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
          >
            Postorder
          </button>
        </div>
        {traversalResult.length > 0 && (
          <div className="mt-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Result: <strong>{traversalResult.join(', ')}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Tree Visualization */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tree Structure</h3>
        {!root ? (
          <div className="text-center py-12 text-gray-400">
            <GitBranch size={48} className="mx-auto mb-3 opacity-50" />
            <p>Tree is empty. Insert nodes to get started!</p>
          </div>
        ) : (
          <svg width="800" height="500" className="mx-auto">
            {renderTree(root)}
          </svg>
        )}
      </div>

      {/* Info Panel */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">BST Properties</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Left subtree contains nodes with values less than parent</li>
          <li>• Right subtree contains nodes with values greater than parent</li>
          <li>• Inorder traversal gives sorted sequence</li>
          <li>• Average search/insert/delete: O(log n)</li>
        </ul>
      </div>
    </div>
  )
}