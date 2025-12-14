import React, { useState, useEffect } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import SortingVisualizer from './components/SortingVisualizer'
import LinkedListVisualizer from './components/LinkedListVisualizer'
import StackSimulator from './components/StackSimulator'
import QueueSimulator from './components/QueueSimulator'
import BinaryTreeVisualizer from './components/BinaryTreeVisualizer'
import PathfindingVisualizer from './components/PathfindingVisualizer'

export default function App() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar dark={dark} setDark={setDark} />
      <main className="flex-1 p-4 max-w-7xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sorting" element={<SortingVisualizer />} />
          <Route path="/linked-list" element={<LinkedListVisualizer />} />
          <Route path="/stack" element={<StackSimulator />} />
          <Route path="/queue" element={<QueueSimulator />} />
          <Route path="/binary-tree" element={<BinaryTreeVisualizer />} />
          <Route path="/pathfinding" element={<PathfindingVisualizer />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}