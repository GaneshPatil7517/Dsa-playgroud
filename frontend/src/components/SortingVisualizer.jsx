import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Pause, RotateCcw, Shuffle, Gauge, BarChart3, SkipForward, SkipBack, Edit3, Code, Maximize, TrendingUp, Zap } from 'lucide-react'
import ComplexityCard from './ComplexityCard'
import { getBubbleSortSteps } from '../algorithms/sorting/bubbleSort'
import { getSelectionSortSteps } from '../algorithms/sorting/selectionSort'
import { getInsertionSortSteps } from '../algorithms/sorting/insertionSort'
import { getMergeSortSteps } from '../algorithms/sorting/mergeSort'
import { getQuickSortSteps } from '../algorithms/sorting/quickSort'

function randomArray(n, max = 100) {
  return Array.from({ length: n }, () => Math.floor(Math.random() * max) + 5)
}

const ALGORITHMS = {
  bubble: { 
    name: 'Bubble Sort', 
    time: 'O(n²)', 
    space: 'O(1)', 
    color: 'from-pink-500 to-rose-500',
    code: `for i in 0..n-1:
  for j in 0..n-i-2:
    if arr[j] > arr[j+1]:
      swap(arr[j], arr[j+1])`
  },
  selection: { 
    name: 'Selection Sort', 
    time: 'O(n²)', 
    space: 'O(1)', 
    color: 'from-purple-500 to-indigo-500',
    code: `for i in 0..n-1:
  minIdx = i
  for j in i+1..n:
    if arr[j] < arr[minIdx]:
      minIdx = j
  swap(arr[i], arr[minIdx])`
  },
  insertion: { 
    name: 'Insertion Sort', 
    time: 'O(n²)', 
    space: 'O(1)', 
    color: 'from-blue-500 to-cyan-500',
    code: `for i in 1..n:
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key:
    arr[j+1] = arr[j]
    j = j - 1
  arr[j+1] = key`
  },
  merge: { 
    name: 'Merge Sort', 
    time: 'O(n log n)', 
    space: 'O(n)', 
    color: 'from-green-500 to-emerald-500',
    code: `mergeSort(arr, left, right):
  if left < right:
    mid = (left + right) / 2
    mergeSort(arr, left, mid)
    mergeSort(arr, mid+1, right)
    merge(arr, left, mid, right)`
  },
  quick: { 
    name: 'Quick Sort', 
    time: 'O(n log n)', 
    space: 'O(log n)', 
    color: 'from-orange-500 to-amber-500',
    code: `quickSort(arr, low, high):
  if low < high:
    pivot = partition(arr, low, high)
    quickSort(arr, low, pivot-1)
    quickSort(arr, pivot+1, high)`
  }
}

const ARRAY_PRESETS = {
  random: { name: 'Random', icon: Shuffle },
  sorted: { name: 'Sorted', icon: TrendingUp },
  reverse: { name: 'Reverse', icon: SkipBack },
  nearly: { name: 'Nearly Sorted', icon: BarChart3 }
}

const SPEED_PRESETS = {
  slow: { name: 'Slow', value: 5, icon: Gauge },
  normal: { name: 'Normal', value: 30, icon: Play },
  fast: { name: 'Fast', value: 80, icon: Zap },
  instant: { name: 'Instant', value: 150, icon: SkipForward }
}

export default function SortingVisualizer() {
  const [array, setArray] = useState(() => randomArray(20))
  const [originalArray, setOriginalArray] = useState(() => randomArray(20))
  const [size, setSize] = useState(20)
  const [speed, setSpeed] = useState(30)
  const [running, setRunning] = useState(false)
  const [steps, setSteps] = useState([])
  const [stepIndex, setStepIndex] = useState(0)
  const [compares, setCompares] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [algorithm, setAlgorithm] = useState('bubble')
  const timerRef = useRef(null)
  const [highlight, setHighlight] = useState({})
  const [sortedIndices, setSortedIndices] = useState([])
  const [pivotIndex, setPivotIndex] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(null)
  const [minIndex, setMinIndex] = useState(null)
  const [customInput, setCustomInput] = useState('')
  const [showCodePanel, setShowCodePanel] = useState(false)
  const [stepMode, setStepMode] = useState(false)
  const [currentExplanation, setCurrentExplanation] = useState('')

  useEffect(() => {
    if (!customInput) {
      const newArr = randomArray(size)
      setArray(newArr)
      setOriginalArray(newArr)
    }
  }, [size, customInput])

  useEffect(() => {
    if (running && !stepMode) runSteps()
    return () => clearInterval(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, steps, stepIndex, speed, stepMode])

  function prepare(alg = algorithm){
    clearInterval(timerRef.current)
    setRunning(false)
    setCompares(0)
    setSwaps(0)
    setStepIndex(0)
    setHighlight({})
    setSortedIndices([])
    setPivotIndex(null)
    setCurrentIndex(null)
    setMinIndex(null)
    
    let s = []
    if (alg === 'bubble') s = getBubbleSortSteps(array)
    else if (alg === 'selection') s = getSelectionSortSteps(array)
    else if (alg === 'insertion') s = getInsertionSortSteps(array)
    else if (alg === 'merge') s = getMergeSortSteps(array)
    else if (alg === 'quick') s = getQuickSortSteps(array)
    
    setSteps(s)
  }

  function getStepExplanation(st) {
    if (!st) return ''
    if (st.type === 'compare') return `Comparing elements at index ${st.indices[0]} and ${st.indices[1]}`
    if (st.type === 'swap') return `Swapping elements at index ${st.indices[0]} and ${st.indices[1]}`
    if (st.type === 'markSorted') return `Element at index ${st.index} is now in sorted position`
    if (st.type === 'setPivot') return `Setting pivot at index ${st.index}`
    if (st.type === 'setCurrent') return `Current element at index ${st.index}`
    if (st.type === 'setMin') return `New minimum found at index ${st.index}`
    if (st.type === 'overwrite') return `Writing value ${st.value} at index ${st.index}`
    return 'Processing...'
  }

  function runSteps(){
    if (!steps || stepIndex >= steps.length) { 
      setRunning(false)
      setHighlight({})
      setPivotIndex(null)
      setCurrentIndex(null)
      setMinIndex(null)
      setCurrentExplanation('Sorting complete!')
      return 
    }
    const delay = Math.max(10, 500 - speed * 3)
    timerRef.current = setTimeout(() => {
      executeStep(stepIndex)
      setStepIndex(i => i + 1)
    }, delay)
  }

  function executeStep(idx) {
    const st = steps[idx]
    if (!st) return
    
    setCurrentExplanation(getStepExplanation(st))
    
    if (st.type === 'compare'){
      setCompares(c => c + 1)
      setHighlight({ [st.indices[0]]: 'compare', [st.indices[1]]: 'compare' })
    } else if (st.type === 'swap'){
      setSwaps(s => s + 1)
      setArray(prev => {
        const copy = prev.slice()
        const [i,j] = st.indices
        const t = copy[i]
        copy[i] = copy[j]
        copy[j] = t
        return copy
      })
      setHighlight({ [st.indices[0]]: 'swap', [st.indices[1]]: 'swap' })
    } else if (st.type === 'markSorted'){
      setSortedIndices(prev => [...prev, st.index])
      setHighlight({})
    } else if (st.type === 'setPivot'){
      setPivotIndex(st.index)
    } else if (st.type === 'setCurrent'){
      setCurrentIndex(st.index)
    } else if (st.type === 'setMin'){
      setMinIndex(st.index)
    } else if (st.type === 'overwrite'){
      setArray(prev => {
        const copy = prev.slice()
        copy[st.index] = st.value
        return copy
      })
      setHighlight({ [st.index]: 'overwrite' })
    } else if (st.type === 'divide' || st.type === 'merge'){
      setHighlight({})
    }
  }

  function nextStep() {
    if (stepIndex < steps.length) {
      executeStep(stepIndex)
      setStepIndex(i => i + 1)
    }
  }

  function prevStep() {
    if (stepIndex > 0) {
      setStepIndex(i => i - 1)
      setArray(originalArray)
      setCompares(0)
      setSwaps(0)
      setHighlight({})
      setSortedIndices([])
      setPivotIndex(null)
      setCurrentIndex(null)
      setMinIndex(null)
      // Re-execute all steps up to stepIndex - 1
      for (let i = 0; i < stepIndex - 1; i++) {
        executeStep(i)
      }
    }
  }

  function start(){
    if (steps.length === 0) prepare(algorithm)
    setRunning(true)
  }
  
  function pause(){
    clearTimeout(timerRef.current)
    setRunning(false)
  }
  
  function reset(){
    clearTimeout(timerRef.current)
    setRunning(false)
    setArray(originalArray)
    setSteps([])
    setStepIndex(0)
    setCompares(0)
    setSwaps(0)
    setHighlight({})
    setSortedIndices([])
    setPivotIndex(null)
    setCurrentIndex(null)
    setMinIndex(null)
  }
  
  function handleCustomArray() {
    const values = customInput.split(',').map(v => parseInt(v.trim())).filter(v => !isNaN(v))
    if (values.length > 0) {
      setArray(values)
      setOriginalArray(values)
      setSize(values.length)
      setSteps([])
      setStepIndex(0)
      setCompares(0)
      setSwaps(0)
      setSortedIndices([])
      setHighlight({})
      setCurrentExplanation('')
    }
  }

  function applyPreset(preset) {
    let newArr = []
    const s = size
    
    if (preset === 'random') {
      newArr = randomArray(s)
    } else if (preset === 'sorted') {
      newArr = Array.from({ length: s }, (_, i) => (i + 1) * 5)
    } else if (preset === 'reverse') {
      newArr = Array.from({ length: s }, (_, i) => (s - i) * 5)
    } else if (preset === 'nearly') {
      newArr = Array.from({ length: s }, (_, i) => (i + 1) * 5)
      // Swap a few random elements
      for (let i = 0; i < Math.max(2, Math.floor(s / 10)); i++) {
        const idx1 = Math.floor(Math.random() * s)
        const idx2 = Math.floor(Math.random() * s)
        const tmp = newArr[idx1]
        newArr[idx1] = newArr[idx2]
        newArr[idx2] = tmp
      }
    }
    
    setArray(newArr)
    setOriginalArray(newArr)
    setCustomInput('')
    setSteps([])
    setStepIndex(0)
    setCompares(0)
    setSwaps(0)
    setSortedIndices([])
    setHighlight({})
    setCurrentExplanation('')
  }
  
  function handleAlgorithmChange(newAlg){
    setAlgorithm(newAlg)
    reset()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`bg-gradient-to-r ${ALGORITHMS[algorithm].color} text-white p-6 rounded-xl shadow-lg`}>
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 size={32} />
          <h1 className="text-2xl font-bold">{ALGORITHMS[algorithm].name}</h1>
        </div>
        <p className="text-white/90 text-sm">Watch the sorting algorithm visualize step-by-step</p>
      </div>

      {/* Algorithm Selector */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <label className="block text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Select Algorithm</label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {Object.entries(ALGORITHMS).map(([key, alg]) => (
            <button
              key={key}
              onClick={() => handleAlgorithmChange(key)}
              className={`p-3 rounded-lg font-medium transition-all ${
                algorithm === key
                  ? `bg-gradient-to-r ${alg.color} text-white shadow-lg scale-105`
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:scale-102'
              }`}
            >
              {alg.name}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Array Input & Presets */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <label className="flex items-center gap-2 text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            <Edit3 size={16} /> Custom Array Input
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={e => setCustomInput(e.target.value)}
              placeholder="e.g., 5,2,8,1,9,3"
              className="flex-1 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 rounded-lg text-sm"
            />
            <button
              onClick={handleCustomArray}
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Array Presets</label>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(ARRAY_PRESETS).map(([key, preset]) => {
              const Icon = preset.icon
              return (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className="flex flex-col items-center gap-1 p-2 bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900 rounded-lg transition"
                >
                  <Icon size={18} />
                  <span className="text-xs">{preset.name}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Speed Presets & Step Mode */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Speed Presets</label>
          <div className="grid grid-cols-4 gap-2">
            {Object.entries(SPEED_PRESETS).map(([key, preset]) => {
              const Icon = preset.icon
              return (
                <button
                  key={key}
                  onClick={() => setSpeed(preset.value)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition ${
                    speed === preset.value
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-indigo-100 dark:hover:bg-indigo-900'
                  }`}
                >
                  <Icon size={18} />
                  <span className="text-xs">{preset.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">View Options</label>
          <div className="flex gap-2">
            <button
              onClick={() => setStepMode(!stepMode)}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition ${
                stepMode
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900'
              }`}
            >
              {stepMode ? '✓ Step Mode' : 'Auto Mode'}
            </button>
            <button
              onClick={() => setShowCodePanel(!showCodePanel)}
              className={`flex-1 py-2 px-3 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                showCodePanel
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900'
              }`}
            >
              <Code size={16} /> {showCodePanel ? 'Hide Code' : 'Show Code'}
            </button>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            {!stepMode ? (
              <>
                <button 
                  onClick={start} 
                  disabled={running}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-lg shadow transition"
                >
                  <Play size={18} /> Start
                </button>
                <button 
                  onClick={pause} 
                  disabled={!running}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-400 text-white rounded-lg shadow transition"
                >
                  <Pause size={18} /> Pause
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={prevStep}
                  disabled={stepIndex === 0}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg shadow transition"
                >
                  <SkipBack size={18} /> Prev Step
                </button>
                <button 
                  onClick={nextStep}
                  disabled={stepIndex >= steps.length}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-lg shadow transition"
                >
                  <SkipForward size={18} /> Next Step
                </button>
              </>
            )}
            <button 
              onClick={reset} 
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
            >
              <RotateCcw size={18} /> Reset
            </button>
          </div>

          {!stepMode && (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Gauge size={18} className="text-gray-600 dark:text-gray-400" />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Speed</label>
                <input 
                  type="range" 
                  min="5" 
                  max="190" 
                  value={speed} 
                  onChange={e => setSpeed(Number(e.target.value))} 
                  className="w-24"
                />
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 size={18} className="text-gray-600 dark:text-gray-400" />
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Size</label>
                <input 
                  type="range" 
                  min="5" 
                  max="60" 
                  value={size} 
                  onChange={e => setSize(Number(e.target.value))} 
                  className="w-24"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400 w-8">{size}</span>
              </div>
            </div>
          )}
        </div>

        {/* Step Explanation */}
        {currentExplanation && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200 font-medium">{currentExplanation}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Visualization Area */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="w-full h-80 flex items-end gap-1 overflow-hidden">
              {array.map((v, idx) => {
                const height = (v / Math.max(...array)) * 100
                const status = highlight[idx]
                const isSorted = sortedIndices.includes(idx)
                const isPivot = pivotIndex === idx
                const isCurrent = currentIndex === idx
                const isMin = minIndex === idx
                
                let bg = 'bg-indigo-400'
                if (isSorted) bg = 'bg-green-500'
                else if (isPivot) bg = 'bg-purple-600'
                else if (isCurrent) bg = 'bg-blue-500'
                else if (isMin) bg = 'bg-orange-500'
                else if (status === 'compare') bg = 'bg-yellow-400'
                else if (status === 'swap') bg = 'bg-red-500'
                else if (status === 'overwrite') bg = 'bg-pink-500'
                
                return (
                  <motion.div 
                    key={idx} 
                    layout 
                    style={{ height: `${height}%`, width: `${100/array.length}%` }} 
                    className={`${bg} rounded-t transition-colors duration-200 flex flex-col items-center justify-start`}
                    initial={{opacity:0.8, scaleY: 0.9}} 
                    animate={{opacity:1, scaleY: 1}}
                    transition={{ duration: 0.2 }}
                  >
                    {array.length <= 30 && (
                      <div className="text-[10px] sm:text-xs text-white font-bold mt-1">{v}</div>
                    )}
                  </motion.div>
                )
              })}
            </div>
            
            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-indigo-400 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Unsorted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-400 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Swapping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Sorted</span>
              </div>
              {algorithm === 'quick' && (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-purple-600 rounded"></div>
                  <span className="text-gray-600 dark:text-gray-400">Pivot</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="space-y-4">
          <ComplexityCard time={ALGORITHMS[algorithm].time} space={ALGORITHMS[algorithm].space} />
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Statistics</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Comparisons:</span>
                <strong className="text-indigo-600 dark:text-indigo-400">{compares}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Swaps:</span>
                <strong className="text-red-600 dark:text-red-400">{swaps}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Array Size:</span>
                <strong className="text-green-600 dark:text-green-400">{array.length}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Progress:</span>
                <strong className="text-purple-600 dark:text-purple-400">
                  {steps.length ? `${stepIndex}/${steps.length}` : '—'}
                </strong>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl shadow">
            <h4 className="font-semibold mb-2 text-gray-900 dark:text-white text-sm">Algorithm Info</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
              {algorithm === 'bubble' && 'Repeatedly compares adjacent elements and swaps them if they are in wrong order.'}
              {algorithm === 'selection' && 'Finds the minimum element and places it at the beginning in each iteration.'}
              {algorithm === 'insertion' && 'Builds the sorted array one item at a time by inserting elements in correct position.'}
              {algorithm === 'merge' && 'Divides array into halves, sorts them and merges back together.'}
              {algorithm === 'quick' && 'Picks a pivot and partitions array around it recursively.'}
            </p>
          </div>

          {/* Code Panel */}
          {showCodePanel && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-gray-900 text-green-400 p-4 rounded-xl shadow-lg font-mono text-xs"
            >
              <div className="flex items-center gap-2 mb-3 text-white">
                <Code size={16} />
                <h4 className="font-semibold">Pseudocode</h4>
              </div>
              <pre className="overflow-auto whitespace-pre-wrap leading-relaxed">
                {ALGORITHMS[algorithm].code}
              </pre>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}