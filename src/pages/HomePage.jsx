import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroStage from '../components/site/HeroStage'
import { managementModels, siteModels } from '../data/models'

const cinemaEase = [0.16, 1, 0.3, 1]

const sheetVariants = {
  hidden: {
    opacity: 0.55,
    y: 28,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: cinemaEase,
      when: 'beforeChildren',
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
}

const headItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: cinemaEase },
  },
}

const highlightBand = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: cinemaEase },
  },
}

const carouselItem = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: cinemaEase },
  },
}

function PlatformCarousel({ models }) {
  const trackRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < max - 8)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  const scrollByCard = (direction) => {
    const el = trackRef.current
    if (!el) return
    const cardEl = el.querySelector('.platform-card')
    const step = cardEl ? cardEl.getBoundingClientRect().width + 16 : el.clientWidth * 0.85
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <motion.div className="platform-carousel" variants={carouselItem}>
      <button
        type="button"
        className="platform-carousel-arrow platform-carousel-arrow--prev"
        aria-label="Card anterior"
        disabled={!canPrev}
        onClick={() => scrollByCard(-1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            d="M15 5 8 12l7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="platform-carousel-track" ref={trackRef}>
        {models.map((model, index) => (
          <motion.article
            key={model.slug}
            className={`platform-card tone-${model.tone}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: cinemaEase }}
          >
            <div className="platform-card-body">
              <div className="platform-card-info">
                <h3>{model.title}</h3>
                <p className="platform-card-audience">{model.audience}</p>
                <ul className="platform-card-list">
                  {model.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="platform-card-footer">
                  <Link className="platform-card-btn" to={`/modelos/${model.slug}`}>
                    Ver Modelo
                  </Link>
                </div>
              </div>
              <div className="platform-card-media">
                <img src={model.image} alt="" loading="lazy" decoding="async" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <button
        type="button"
        className="platform-carousel-arrow platform-carousel-arrow--next"
        aria-label="Próximo card"
        disabled={!canNext}
        onClick={() => scrollByCard(1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            d="m9 5 7 7-7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </motion.div>
  )
}

const sitesCarouselVariants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: cinemaEase },
  },
}

function SitesCarousel({ models }) {
  const trackRef = useRef(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  const updateArrows = () => {
    const el = trackRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setCanPrev(el.scrollLeft > 8)
    setCanNext(el.scrollLeft < max - 8)
  }

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [])

  const scrollByCard = (direction) => {
    const el = trackRef.current
    if (!el) return
    const cardEl = el.querySelector('.model-card')
    const step = cardEl ? cardEl.getBoundingClientRect().width + 16 : el.clientWidth * 0.85
    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  return (
    <motion.div className="platform-carousel sites-carousel" variants={sitesCarouselVariants}>
      <button
        type="button"
        className="platform-carousel-arrow platform-carousel-arrow--prev"
        aria-label="Card anterior"
        disabled={!canPrev}
        onClick={() => scrollByCard(-1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            d="M15 5 8 12l7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="platform-carousel-track sites-carousel-track" ref={trackRef}>
        {models.map((model, index) => (
          <motion.article
            key={model.slug}
            className={`model-card tone-${model.tone}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.35, delay: index * 0.04, ease: cinemaEase }}
          >
            <div className="model-card-art">
              <picture>
                {model.image2xWebp || model.imageWebp ? (
                  <source
                    type="image/webp"
                    srcSet={[
                      model.imageWebp && `${model.imageWebp} 2048w`,
                      model.image2xWebp && `${model.image2xWebp} 3072w`,
                    ]
                      .filter(Boolean)
                      .join(', ')}
                    sizes="(max-width: 900px) 86vw, 360px"
                  />
                ) : null}
                <img
                  src={model.image2x || model.image}
                  srcSet={[
                    `${model.image} 2048w`,
                    model.image2x && `${model.image2x} 3072w`,
                  ]
                    .filter(Boolean)
                    .join(', ')}
                  sizes="(max-width: 900px) 86vw, 360px"
                  alt=""
                  width={2048}
                  height={1365}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </div>
            <small>{model.audience}</small>
            <strong>{model.title}</strong>
            <p>{model.summary}</p>
            <a
              className="model-card-btn"
              href={model.demoUrl || '#'}
              onClick={(event) => {
                if (!model.demoUrl || model.demoUrl === '#') event.preventDefault()
              }}
            >
              Ver modelo
            </a>
          </motion.article>
        ))}
      </div>

      <button
        type="button"
        className="platform-carousel-arrow platform-carousel-arrow--next"
        aria-label="Próximo card"
        disabled={!canNext}
        onClick={() => scrollByCard(1)}
      >
        <svg viewBox="0 0 24 24" aria-hidden>
          <path
            d="m9 5 7 7-7 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <>
      <HeroStage />
      <motion.section
        className="vo-sheet"
        id="gestao"
        variants={sheetVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12, margin: '0px 0px -12% 0px' }}
      >
        <div className="vo-container">
          <div className="platform-head">
            <motion.h2 variants={headItem}>Plataformas de Gestão</motion.h2>
            <motion.p className="vo-section-lead" variants={headItem}>
              Sistemas completos de Gestão. Aplicativo para Computador e Celular. Adaptados para cada
              tipo de negócio. Escolha o seu modelo!
            </motion.p>
          </div>
          <PlatformCarousel models={managementModels} />
        </div>
      </motion.section>

      <motion.section
        className="vo-highlight"
        aria-label="Pagamento único sem mensalidade"
        variants={highlightBand}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12, margin: '0px 0px -10% 0px' }}
      >
        <div className="vo-highlight-frame">
          <picture>
            <source
              type="image/webp"
              srcSet="/images/banner-pagamento-unico-3x.webp 3072w"
              sizes="(max-width: 900px) 100vw, min(1180px, calc(100vw - 2.5rem))"
            />
            <img
              src="/images/banner-pagamento-unico-3x.png"
              srcSet="/images/banner-pagamento-unico.png 1024w, /images/banner-pagamento-unico-2x.png 2048w, /images/banner-pagamento-unico-3x.png 3072w"
              sizes="(max-width: 900px) 100vw, min(1180px, calc(100vw - 2.5rem))"
              alt="Não tem mensalidade. Pagamento Único."
              width={3072}
              height={1023}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </picture>
        </div>
      </motion.section>

      <motion.section
        className="vo-sites"
        id="sites"
        variants={sheetVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12, margin: '0px 0px -12% 0px' }}
      >
        <div className="vo-container">
          <div className="sites-head">
            <motion.h2 variants={headItem}>Escolha um modelo para o seu site.</motion.h2>
            <motion.p className="vo-section-lead" variants={headItem}>
              As pessoas podem até te notar no Instagram mas é no seu Site Profissional que os Leads são
              convertidos em clientes!
            </motion.p>
          </div>
          <SitesCarousel models={siteModels} />
        </div>
      </motion.section>
    </>
  )
}
