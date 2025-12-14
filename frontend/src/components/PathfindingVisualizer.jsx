import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Play, RotateCcw, Map, Zap } from 'lucide-react'

const GRID_ROWS = 20
const GRID_COLS = 40

const CELL_TYPES = {
  EMPTY: 0,
  WALL: 1,
  START: 2,
  END: 3,
  VISITED: 4,
  PATH: 5
}

export default function PathfindingVisualizer() {
  const [grid, setGrid] = useState(() => createEmptyGrid())
  const [start, setStart] = useState({ row: 5, col: 5 })
  const [end, setEnd] = useState({ row: 15, col: 35 })
  const [algorithm, setAlgorithm] = useState('bfs')
  const [isDrawing, setIsDrawing] = useState(false)
  const [running, setRunning] = useState(false)
  const [message, setMessage] = useState('')
  const timerRef = useRef(null)

  function createEmptyGrid() {
    const grid = []
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow = []
      for (let col = 0; col < GRID_COLS; col++) {
        currentRow.push(CELL_TYPES.EMPTY)
      }
      grid.push(currentRow)
    }
    return grid
  }

  function handleMouseDown(row, col) {
    if (running) return
    setIsDrawing(true)
    toggleWall(row, col)
  }

  function handleMouseEnter(row, col) {
    if (!isDrawing || running) return
    toggleWall(row, col)
  }

  function handleMouseUp() {
    setIsDrawing(false)
  }

  function toggleWall(row, col) {
    if ((row === start.row && col === start.col) || (row === end.row && col === end.col)) return
    
    const newGrid = grid.map(r => [...r])
    newGrid[row][col] = grid[row][col] === CELL_TYPES.WALL ? CELL_TYPES.EMPTY : CELL_TYPES.WALL
    setGrid(newGrid)
  }

  function getNeighbors(row, col) {
    const neighbors = []
    const directions = [
      [-1, 0], [1, 0], [0, -1], [0, 1] // up, down, left, right
    ]
    
    for (const [dr, dc] of directions) {
      const newRow = row + dr
      const newCol = col + dc
      if (newRow >= 0 && newRow < GRID_ROWS && newCol >= 0 && newCol < GRID_COLS) {
        neighbors.push({ row: newRow, col: newCol })
      }
    }
    return neighbors
  }

  async function runBFS() {
    const queue = [{ ...start, parent: null }]
    const visited = new Set([`${start.row},${start.col}`])
    const newGrid = grid.map(r => [...r])

    while (queue.length > 0) {
      const current = queue.shift()
      const key = `${current.row},${current.col}`

      if (current.row === end.row && current.col === end.col) {
        reconstructPath(current, newGrid)
        return
      }

      for (const neighbor of getNeighbors(current.row, current.col)) {
        const nKey = `${neighbor.row},${neighbor.col}`
        if (!visited.has(nKey) && newGrid[neighbor.row][neighbor.col] !== CELL_TYPES.WALL) {
          visited.add(nKey)
          neighbor.parent = current
          queue.push(neighbor)
          
          if (!(neighbor.row === end.row && neighbor.col === end.col)) {
            newGrid[neighbor.row][neighbor.col] = CELL_TYPES.VISITED
            setGrid([...newGrid])
            await sleep(10)
          }
        }
      }
    }

    setMessage('No path found!')
    setRunning(false)
  }

  async function runDFS() {
    const stack = [{ ...start, parent: null }]
    const visited = new Set()
    const newGrid = grid.map(r => [...r])

    while (stack.length > 0) {
      const current = stack.pop()
      const key = `${current.row},${current.col}`

      if (visited.has(key)) continue
      visited.add(key)

      if (current.row === end.row && current.col === end.col) {
        reconstructPath(current, newGrid)
        return
      }

      if (newGrid[current.row][current.col] !== CELL_TYPES.START && 
          newGrid[current.row][current.col] !== CELL_TYPES.END) {
        newGrid[current.row][current.col] = CELL_TYPES.VISITED
        setGrid([...newGrid])
        await sleep(10)
      }

      for (const neighbor of getNeighbors(current.row, current.col)) {
        const nKey = `${neighbor.row},${neighbor.col}`
        if (!visited.has(nKey) && newGrid[neighbor.row][neighbor.col] !== CELL_TYPES.WALL) {
          neighbor.parent = current
          stack.push(neighbor)
        }
      }
    }

    setMessage('No path found!')
    setRunning(false)
  }

  function reconstructPath(endNode, newGrid) {
    let current = endNode.parent
    while (current && !(current.row === start.row && current.col === start.col)) {
      newGrid[current.row][current.col] = CELL_TYPES.PATH
      current = current.parent
    }
    setGrid([...newGrid])
    setMessage('Path found!')
    setRunning(false)
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  function runAlgorithm() {
    setRunning(true)
    setMessage('')
    
    if (algorithm === 'bfs') {
      runBFS()
    } else if (algorithm === 'dfs') {
      runDFS()
    }
  }

  function reset() {
    clearTimeout(timerRef.current)
    setRunning(false)
    const newGrid = grid.map(row =>
      row.map(cell => (cell === CELL_TYPES.VISITED || cell === CELL_TYPES.PATH ? CELL_TYPES.EMPTY : cell))
    )
    setGrid(newGrid)
    setMessage('')
  }

  function clearAll() {
    setGrid(createEmptyGrid())
    setRunning(false)
    setMessage('')
  }

  function getCellColor(cellType, row, col) {
    if (row === start.row && col === start.col) return 'bg-green-500'
    if (row === end.row && col === end.col) return 'bg-red-500'
    if (cellType === CELL_TYPES.WALL) return 'bg-gray-800 dark:bg-gray-600'
    if (cellType === CELL_TYPES.VISITED) return 'bg-blue-300 dark:bg-blue-700'
    if (cellType === CELL_TYPES.PATH) return 'bg-yellow-400 dark:bg-yellow-600'
    return 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Map size={32} />
          <h1 className="text-2xl font-bold">Pathfinding Visualizer</h1>
        </div>
        <p className="text-white/90 text-sm">Visualize BFS, DFS, and other pathfinding algorithms</p>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Algorithm:</label>
            <select
              value={algorithm}
              onChange={e => setAlgorithm(e.target.value)}
              className="border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg"
              disabled={running}
            >
              <option value="bfs">Breadth-First Search (BFS)</option>
              <option value="dfs">Depth-First Search (DFS)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={runAlgorithm}
              disabled={running}
              className="flex items-center gap-2 px-5 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg shadow-lg transition font-medium"
            >
              <Play size={18} /> Start
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-lg transition font-medium"
            >
              <RotateCcw size={18} /> Reset
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-5 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg transition font-medium"
            >
              Clear All
            </button>
          </div>
        </div>

        {message && (
          <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">{message}</p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded"></div>
            <span>Start</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded"></div>
            <span>End</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-800 dark:bg-gray-600 rounded"></div>
            <span>Wall (Click & Drag)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-300 dark:bg-blue-700 rounded"></div>
            <span>Visited</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-400 rounded"></div>
            <span>Path</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg overflow-auto">
        <div className="inline-block">
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((cell, colIdx) => (
                <motion.div
                  key={`${rowIdx}-${colIdx}`}
                  className={`w-6 h-6 ${getCellColor(cell, rowIdx, colIdx)} cursor-pointer`}
                  onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                  onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                  onMouseUp={handleMouseUp}
                  whileHover={{ scale: 1.1 }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">Instructions</h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Click and drag on the grid to draw walls</li>
          <li>• Green cell is the start, red cell is the end</li>
          <li>• Select an algorithm and click Start to visualize</li>
          <li>• BFS finds the shortest path, DFS explores depth-first</li>
        </ul>
      </div>
    </div>
  )
}