import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="hero" id="topo">
      <div className="hero-stage" aria-hidden>
        <div className="hero-glow hero-glow--purple" />
        <div className="hero-glow hero-glow--green" />
        <div className="hero-beams" />
        <div className="hero-ring" />
        <div className="hero-ring hero-ring--delayed" />
        <div className="hero-mark">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="118" cy="95" r="62" stroke="url(#g1)" strokeWidth="3" />
            <path d="M48 150 L48 48 L132 99 Z" stroke="url(#g2)" strokeWidth="3" strokeLinejoin="round" />
            <defs>
              <linearGradient id="g1" x1="56" y1="33" x2="180" y2="157">
                <stop stopColor="#a855f7" />
                <stop offset="1" stopColor="#14f195" />
              </linearGradient>
              <linearGradient id="g2" x1="48" y1="150" x2="132" y2="48">
                <stop stopColor="#38bdf8" />
                <stop offset="1" stopColor="#14f195" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      <div className="hero-shell">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            A Agência de Marketing especializada para fazer o seu{' '}
            <span className="gradient-text">curso Online</span> ou o seu{' '}
            <span className="gradient-text">Site Personalizado</span>
          </motion.h1>

          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Gravamos e lançamos cursos online. Criamos sites premium com assistentes
            virtuais para o seu negócio.
          </motion.p>
        </div>

        <motion.div
          className="hero-actions"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
        >
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#cursos">
              Gravação de Cursos
            </a>
            <a className="btn btn-ghost" href="#sites">
              Criação de Sites
            </a>
          </div>

          <a className="hero-scroll" href="#assistentes">
            Conheça o Jhon e o Teo
            <span aria-hidden>↓</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
