import { useEffect, useRef } from 'react'
import { initNeuralBackground } from '../utils/neural'

export default function NeuralBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cleanup = initNeuralBackground(canvas)
    return cleanup
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="bgCanvas"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}