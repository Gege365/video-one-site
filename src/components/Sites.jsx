import { motion } from 'framer-motion'
import { siteExamples, siteIncludes, sitePlans } from '../data/content'
import DeviceMockup from './DeviceMockup'

export default function Sites({ onOpenAssistant }) {
  return (
    <section className="section" id="sites">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Sites &amp; presença digital</p>
          <h2 className="section-title">
            Criamos o <span className="gradient-text">Site</span> do seu negócio{' '}
            <span className="gradient-text">sem complicações!</span>
          </h2>
          <p className="section-lead">
            Melhore a sua presença digital. Sites Personalizados. Assistente Virtual
            para captação de Leads.
          </p>
        </motion.div>

        <div className="service-layout service-layout--sites">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="service-side-title">O que oferecemos</h3>
            <ul className="include-list">
              {siteIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="plans-block">
              <p className="plans-label">Oferecemos site</p>
              <div className="podium" role="list">
                {sitePlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`podium-step podium-step--${plan.id}${plan.featured ? ' is-featured' : ''}`}
                    role="listitem"
                  >
                    <div className="podium-card">
                      {plan.featured && <span className="podium-badge">{plan.note}</span>}
                      {!plan.featured && <span className="podium-note">{plan.note}</span>}
                      <strong>{plan.name}</strong>
                    </div>
                    <div className="podium-base" aria-hidden>
                      <span>{plan.rank === 1 ? '1º' : plan.rank === 2 ? '2º' : '3º'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="site-cta-panel">
              <div className="course-cta-avatar-wrap">
                <div className="site-cta-aura" aria-hidden />
                <img
                  className="course-cta-avatar"
                  src="/images/teo.png"
                  alt="Teo"
                />
              </div>
              <p className="course-cta-line">
                Para criar seu Site,{' '}
                <span>fale com o Teo</span>
              </p>
              <button className="btn btn-green" onClick={() => onOpenAssistant('teo')}>
                Falar com o Teo
              </button>
            </div>
          </motion.div>

          <motion.div
            className="mockups-grid mockups-grid--cases"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="cases-title">Alguns de nossos Cases</h3>
            {siteExamples.map((site) => (
              <DeviceMockup key={site.id} {...site} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
