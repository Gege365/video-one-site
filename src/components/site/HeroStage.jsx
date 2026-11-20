import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

function HeroPicture({ variant = 'desktop' }) {
  const isMobile = variant === 'mobile'
  const webp = isMobile ? '/images/hero-mobile-1920.webp' : '/images/hero-desk-1920.webp'
  const jpg = isMobile ? '/images/hero-mobile-1920.jpg' : '/images/hero-desk-1920.jpg'

  return (
    <picture className={isMobile ? 'vo-hero-pic-mobile' : 'vo-hero-pic-desktop'}>
      <source srcSet={webp} type="image/webp" />
      <img
        src={jpg}
        alt=""
        width={2560}
        height={1323}
        decoding="async"
        fetchPriority="high"
      />
    </picture>
  )
}

export default function HeroStage() {
  return (
    <section className="vo-hero" id="topo">
      <div className="vo-hero-bg" aria-hidden>
        <HeroPicture variant="desktop" />
        <HeroPicture variant="mobile" />
        <span className="vo-hero-shade" />
      </div>

      <div className="vo-hero-inner">
        <div className="vo-hero-copy">
          <motion.p
            className="vo-eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            Video One — Tecnologia que Simplifica seu Trabalho!
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.04, ease }}
          >
            Tecnologia
            <br className="vo-hero-br" />
            {' '}
            pronta para
            <br className="vo-hero-br" />
            {' '}
            Implantar no
            <br className="vo-hero-br" />
            {' '}
            seu negócio.
          </motion.h1>
          <motion.p
            className="vo-hero-lead"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08, ease }}
          >
            A Video One entrega aplicativos de gestão e sites profissionais, personalizados com a sua marca,{' '}
            <strong>SEM MENSALIDADES!</strong>
          </motion.p>
          <motion.div
            className="vo-hero-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.12, ease }}
          >
            <a className="vo-btn vo-btn--light" href="#gestao">
              Aplicativos de Gestão
            </a>
            <a className="vo-btn vo-btn--ghost" href="#sites">
              Sites Profissionais
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
