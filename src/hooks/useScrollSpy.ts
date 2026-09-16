import { useState, useEffect } from 'react'
import { navigationItems as navItems } from '../data/navigation'

export function useScrollSpy() {
  const [activeSection, setActiveSection] = useState(navItems[0]?.id || '')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    navItems.forEach(item => {
      const element = document.getElementById(item.id)
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setActiveSection(item.id)
            }
          })
        },
        { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => observers.forEach(obs => obs.disconnect())
  }, [])

  return activeSection
}
