import { useCallback, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Assistants from './components/Assistants'
import Courses from './components/Courses'
import Sites from './components/Sites'
import CtaBand from './components/CtaBand'
import Footer from './components/Footer'
import AssistantChat from './components/AssistantChat'

export default function App() {
  const [activeAssistant, setActiveAssistant] = useState(null)

  const openAssistant = useCallback((id) => {
    setActiveAssistant(id)
  }, [])

  const closeAssistant = useCallback(() => {
    setActiveAssistant(null)
  }, [])

  return (
    <>
      <div className="page-bg" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Assistants onOpenAssistant={openAssistant} />
        <Courses onOpenAssistant={openAssistant} />
        <Sites onOpenAssistant={openAssistant} />
        <CtaBand onOpenAssistant={openAssistant} />
      </main>
      <Footer />
      {activeAssistant && (
        <AssistantChat assistantId={activeAssistant} onClose={closeAssistant} />
      )}
    </>
  )
}
