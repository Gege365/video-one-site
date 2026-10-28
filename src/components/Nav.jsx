import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = [
    { href: '#assistentes', label: 'Assistentes' },
    { href: '#cursos', label: 'Criar meu Curso' },
    { href: '#sites', label: 'Criar meu Site' },
    { href: '#contato', label: 'Contato' },
  ]

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#topo" aria-label="Video One">
          <img className="nav-logo" src="/images/logo-video1.png" alt="Video One" />
        </a>

        <button
          className="nav-toggle"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '×' : '☰'}
        </button>

        <ul className="nav-links nav-links--desktop">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
          <li>
            <a
              className="btn btn-primary"
              href="#assistentes"
              style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem' }}
            >
              Começar agora
            </a>
          </li>
        </ul>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.ul
              className="nav-links nav-links--mobile"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
              }}
            >
              {links.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 },
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <a href={link.href} onClick={() => setOpen(false)}>
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  show: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.3 }}
              >
                <a
                  className="btn btn-primary"
                  href="#assistentes"
                  onClick={() => setOpen(false)}
                  style={{ padding: '0.7rem 1.2rem', fontSize: '0.9rem' }}
                >
                  Começar agora
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
