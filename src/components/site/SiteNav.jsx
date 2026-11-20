import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { WHATSAPP_NUMBER } from '../../data/assistants'

const links = [
  { to: '/#topo', label: 'Início', hint: 'Voltar ao topo' },
  { to: '/#gestao', label: 'Aplicativos de Gestão', hint: 'Sistemas prontos para implantar' },
  { to: '/#sites', label: 'Sites Profissionais', hint: 'Presença digital que converte' },
  { to: '/#contato', label: 'Contato', hint: 'Fale com a equipe Video One' },
]

const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Quero falar com a equipe Video One.')}`

const panelEase = [0.22, 1, 0.36, 1]

export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const menu =
    mounted &&
    createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="site-nav-mobile"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: panelEase }}
          >
            <div className="site-nav-mobile-glow" aria-hidden />
            <div className="site-nav-mobile-inner">
              <motion.p
                className="site-nav-mobile-kicker"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: panelEase }}
              >
                Navegação
              </motion.p>
              <nav className="site-nav-mobile-links">
                {links.map((link, index) => (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08 + index * 0.06, ease: panelEase }}
                  >
                    <Link to={link.to} className="site-nav-mobile-link" onClick={() => setOpen(false)}>
                      <span className="site-nav-mobile-index">0{index + 1}</span>
                      <span className="site-nav-mobile-copy">
                        <strong>{link.label}</strong>
                        <small>{link.hint}</small>
                      </span>
                      <span className="site-nav-mobile-chevron" aria-hidden>
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <motion.div
                className="site-nav-mobile-cta"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.36, ease: panelEase }}
              >
                <a className="vo-btn vo-btn--wa site-nav-mobile-wa" href={waHref} target="_blank" rel="noopener noreferrer">
                  Falar no WhatsApp
                </a>
                <p>Atendimento rápido para projetos de gestão e sites.</p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
    )

  return (
    <>
      <header className={`site-nav ${open ? 'is-open' : ''}`}>
        <div className="site-nav-inner">
          <Link to="/" className="site-brand" aria-label="Video One">
            <img src="/images/logo-video1.png" alt="Video One" />
          </Link>

          <nav className="site-nav-desktop" aria-label="Principal">
            {links.map((link) => (
              <Link key={link.to} to={link.to}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="site-nav-tools">
            <a className="vo-btn vo-btn--wa site-nav-wa" href={waHref} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp
            </a>
            <button
              type="button"
              className={`site-nav-toggle ${open ? 'is-active' : ''}`}
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      {menu}
    </>
  )
}
