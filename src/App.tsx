import { useEffect, useState } from 'react'
import { useScrollSpy } from './hooks/useScrollSpy'
import Nav from './components/layout/Nav'
import HeroSection from './components/hero/HeroSection'
import AboutSection from './components/about/AboutSection'
import TimelineSection from './components/timeline/TimelineSection'
import ProjectsSection from './components/projects/ProjectsSection'
import MarketingSection from './components/marketing/MarketingSection'
import AISection from './components/ai/AISection'
import SkillsSection from './components/skills/SkillsSection'
import CurrentlySection from './components/currently/CurrentlySection'
import ContactSection from './components/contact/ContactSection'
import Footer from './components/layout/Footer'

function App() {
  const activeSection = useScrollSpy()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    const trackPointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--pointer-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--pointer-y', `${event.clientY}px`)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('pointermove', trackPointer, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('pointermove', trackPointer)
    }
  }, [])

  return (
    <div className="relative overflow-clip">
      <div className="site-noise" aria-hidden="true" />
      <div className="pointer-glow" aria-hidden="true" />
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <Nav activeSection={activeSection} />
      
      <main>
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <ProjectsSection />
        <MarketingSection />
        <AISection />
        <SkillsSection />
        <CurrentlySection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
