import { useState, useRef, useCallback } from 'react'

export function useRelativeMousePosition<T extends HTMLElement = HTMLDivElement>() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const ref = useRef<T | null>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMouse({ x, y })
    ref.current.style.setProperty('--mouse-x', `${x}px`)
    ref.current.style.setProperty('--mouse-y', `${y}px`)
  }, [])

  return [ref, mouse, handleMouseMove] as const
}

