import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  assistants,
  buildWhatsAppSummary,
  createAttendanceId,
  getWhatsAppUrl,
} from '../data/assistants'
import { sendLeadToSheets } from '../lib/sheets'

const TYPING_MS = 2800
const FINISH_LOADING_MS = 6000

function interpolate(text, answers) {
  return text.replace(/\{(\w+)\}/g, (_, key) => answers[key] || '')
}

/**
 * Salva o lead localmente e envia para a planilha (aba Jhon ou Teo).
 */
function persistLead(assistant, answers, attendanceId) {
  const payload = {
    assistant: assistant.id,
    sheetKey: assistant.sheetKey,
    attendanceId,
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

  sendLeadToSheets(payload)

  if (import.meta.env.DEV) {
    console.info('[Video One] Lead capturado:', payload)
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
  const [phase, setPhase] = useState('chat') // chat | loading | complete
  const [waUrl, setWaUrl] = useState('')
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
    setPhase('chat')
    setWaUrl('')
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
      const attendanceId = createAttendanceId(assistant)
      persistLead(assistant, currentAnswers, attendanceId)
      const summary = buildWhatsAppSummary(assistant, currentAnswers, attendanceId)
      setWaUrl(getWhatsAppUrl(summary))
      schedule(() => {
        setPhase('loading')
        schedule(() => setPhase('complete'), FINISH_LOADING_MS)
      }, 1400)
    }, TYPING_MS)
  }

  function submitAnswer(raw) {
    const value = String(raw || '').trim()
    if (!value || !awaitingUser || phase !== 'chat') return

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
  const clientName = (answers.nome || '').trim()

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

        {phase === 'loading' ? (
          <div className="chat-finish chat-finish--loading" aria-live="polite">
            <div className={`chat-finish-avatar ${isGreen ? 'chat-finish-avatar--green' : ''}`}>
              <img src={assistant.avatar} alt="" />
            </div>
            <p className="chat-finish-loading-title">Finalizando seu atendimento…</p>
            <div className="chat-finish-spinner" aria-hidden>
              <span />
            </div>
            <p className="chat-finish-loading-hint">Preparando o próximo passo com a equipe</p>
          </div>
        ) : phase === 'complete' ? (
          <div className="chat-finish chat-finish--complete">
            <div className={`chat-finish-avatar ${isGreen ? 'chat-finish-avatar--green' : ''}`}>
              <img src={assistant.avatar} alt={assistant.name} />
            </div>
            <h3 className="chat-finish-title">
              Atendimento concluído com sucesso
              {clientName ? ` ${clientName}` : ''}!
            </h3>
            <p className="chat-finish-text">
              Clique no botão abaixo para conversar com o nosso time e te passaremos
              todos os detalhes: planejamento, orçamento com valores, agendamento de
              reunião, tirar suas dúvidas e mais…
            </p>
            <a
              className="btn btn-whatsapp chat-finish-cta"
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Falar com a Equipe Video One
            </a>
          </div>
        ) : (
          <>
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
              {awaitingUser && currentQ?.type === 'choice' ? (
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
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
