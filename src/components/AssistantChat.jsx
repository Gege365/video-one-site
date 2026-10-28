import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  assistants,
  buildWhatsAppSummary,
  openWhatsApp,
} from '../data/assistants'

const TYPING_MS = 2800

function interpolate(text, answers) {
  return text.replace(/\{(\w+)\}/g, (_, key) => answers[key] || '')
}

/**
 * Salva o lead localmente e deixa um gancho pronto para Google Sheets.
 * Cada assistente usa uma chave distinta (planilha futura por assistente).
 */
function persistLead(assistant, answers) {
  const payload = {
    assistant: assistant.id,
    sheetKey: assistant.sheetKey,
    answers,
    createdAt: new Date().toISOString(),
  }

  try {
    const key = `videoone_leads_${assistant.id}`
    const prev = JSON.parse(localStorage.getItem(key) || '[]')
    prev.push(payload)
    localStorage.setItem(key, JSON.stringify(prev))
  } catch {
    /* ignore storage errors */
  }

  // Hook futuro: enviar para Google Sheets / Apps Script
  // await fetch(SHEETS_ENDPOINT[assistant.id], { method: 'POST', body: JSON.stringify(payload) })
  if (import.meta.env.DEV) {
    console.info('[Video One] Lead capturado (Sheets depois):', payload)
  }

  return payload
}

export default function AssistantChat({ assistantId, onClose }) {
  const assistant = assistants[assistantId]
  const [messages, setMessages] = useState([])
  const [typing, setTyping] = useState(false)
  const [step, setStep] = useState(-1) // -1 greeting, 0..n-1 questions, n closing
  const [answers, setAnswers] = useState({})
  const [input, setInput] = useState('')
  const [awaitingUser, setAwaitingUser] = useState(false)
  const [done, setDone] = useState(false)
  const listRef = useRef(null)
  const timers = useRef([])

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const pushBot = (text) => {
    setMessages((m) => [...m, { role: 'bot', text }])
  }

  const schedule = (fn, ms) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }

  useEffect(() => {
    if (!assistant) return undefined
    clearTimers()
    setMessages([])
    setAnswers({})
    setStep(-1)
    setDone(false)
    setAwaitingUser(false)
    setInput('')

    setTyping(true)
    schedule(() => {
      setTyping(false)
      pushBot(assistant.greeting)
      schedule(() => askQuestion(0, {}), 900)
    }, TYPING_MS)

    return clearTimers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assistantId])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages, typing])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!assistant) return null

  function askQuestion(index, currentAnswers) {
    const q = assistant.questions[index]
    if (!q) {
      finish(currentAnswers)
      return
    }

    setStep(index)
    setAwaitingUser(false)
    setTyping(true)

    schedule(() => {
      setTyping(false)
      pushBot(interpolate(q.text, currentAnswers))
      setAwaitingUser(true)
    }, TYPING_MS)
  }

  function finish(currentAnswers) {
    setAwaitingUser(false)
    setTyping(true)
    schedule(() => {
      setTyping(false)
      pushBot(interpolate(assistant.closing, currentAnswers))
      persistLead(assistant, currentAnswers)
      const summary = buildWhatsAppSummary(assistant, currentAnswers)
      schedule(() => {
        openWhatsApp(summary)
        setDone(true)
      }, 1200)
    }, TYPING_MS)
  }

  function submitAnswer(raw) {
    const value = String(raw || '').trim()
    if (!value || !awaitingUser || done) return

    const q = assistant.questions[step]
    if (!q) return

    const nextAnswers = { ...answers, [q.field]: value }
    setAnswers(nextAnswers)
    setMessages((m) => [...m, { role: 'user', text: value }])
    setInput('')
    setAwaitingUser(false)

    const nextStep = step + 1
    schedule(() => askQuestion(nextStep, nextAnswers), 600)
  }

  const currentQ = step >= 0 && step < assistant.questions.length
    ? assistant.questions[step]
    : null

  const isGreen = assistant.accent === 'green'

  return createPortal(
    <div className="chat-overlay" role="dialog" aria-modal="true" aria-label={`Chat com ${assistant.name}`}>
      <div className="chat-window">
        <header className="chat-header">
          <div className={`chat-avatar-wrap ${isGreen ? 'chat-avatar-wrap--green' : ''}`}>
            <img src={assistant.avatar} alt="" />
          </div>
          <div className="chat-header-info">
            <strong>{assistant.name}</strong>
            <span>● online · Video One</span>
          </div>
          <button type="button" className="chat-close" onClick={onClose} aria-label="Fechar chat">
            ×
          </button>
        </header>

        <div className="chat-messages" ref={listRef}>
          {messages.map((msg, i) => (
            <div
              key={`${msg.role}-${i}`}
              className={`bubble bubble--${msg.role} ${msg.role === 'user' && isGreen ? 'green' : ''}`}
            >
              {msg.text}
            </div>
          ))}
          {typing && (
            <div className="typing" aria-label="Digitando">
              <span /><span /><span />
            </div>
          )}
        </div>

        <div className="chat-input-area">
          {done ? (
            <p className="chat-done">
              Resumo enviado ao WhatsApp da equipe. Eles te chamam em breve.
            </p>
          ) : awaitingUser && currentQ?.type === 'choice' ? (
            <div className="chat-choices">
              {currentQ.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  className={`chat-choice ${isGreen ? 'green' : ''}`}
                  onClick={() => submitAnswer(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : awaitingUser && currentQ ? (
            <form
              className="chat-form"
              onSubmit={(e) => {
                e.preventDefault()
                submitAnswer(input)
              }}
            >
              <input
                autoFocus
                type={currentQ.type === 'tel' ? 'tel' : 'text'}
                inputMode={currentQ.type === 'tel' ? 'tel' : 'text'}
                placeholder={currentQ.placeholder || 'Digite sua resposta'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit">Enviar</button>
            </form>
          ) : (
            <p className="chat-done">{typing ? `${assistant.name} está digitando…` : ' '}</p>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}
