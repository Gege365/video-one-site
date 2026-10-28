import { useState } from 'react'
import { motion } from 'framer-motion'
import { courseExamples, courseIncludes, coursePremium } from '../data/content'

function CourseVideo({ item }) {
  const [playing, setPlaying] = useState(false)
  const canPlay = Boolean(item.youtubeId)

  return (
    <article className="portfolio-item">
      <div className="video-wrap">
        {playing && canPlay ? (
          <iframe
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className={`video-placeholder${canPlay ? ' has-thumb' : ''}`}
            onClick={() => {
              if (canPlay) setPlaying(true)
            }}
            aria-label={canPlay ? `Reproduzir ${item.title}` : `${item.title} — em breve`}
          >
            {canPlay && (
              <img
                className="video-thumb"
                src={
                  item.cover ||
                  `https://i.ytimg.com/vi/${item.youtubeId}/hqdefault.jpg`
                }
                alt=""
              />
            )}
            <span className="play-btn" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#050508">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <div className="portfolio-meta">
        <p className="tag">{item.niche}</p>
        <h4>{item.title}</h4>
        {item.author && <p className="portfolio-author">{item.author}</p>}
        <p>{item.description}</p>
      </div>
    </article>
  )
}

export default function Courses({ onOpenAssistant }) {
  return (
    <section className="section" id="cursos">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <p className="section-label">Criação do seu Curso Online</p>
          <h2 className="section-title">
            Existem <span className="gradient-text">milhares de pessoas</span> querendo aprender o que{' '}
            <span className="gradient-text">você sabe ensinar!</span>
          </h2>
          <p className="section-lead">
            Especialistas nos procuram com conhecimento — a gente transforma isso
            em curso digital pronto pra vender, com posicionamento e lançamento.
          </p>
        </motion.div>

        <div className="service-layout">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="service-side-title">O que está incluso</h3>
            <ul className="include-list">
              {courseIncludes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="premium-block">
              <h4 className="premium-title">Premium</h4>
              <ul className="include-list include-list--premium">
                {coursePremium.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="course-cta-panel">
              <div className="course-cta-avatar-wrap">
                <div className="course-cta-aura" aria-hidden />
                <img
                  className="course-cta-avatar"
                  src="/images/jhon.png"
                  alt="Jhon"
                />
              </div>
              <p className="course-cta-line">
                Para criar seu Curso,{' '}
                <span>fale com o Jhon</span>
              </p>
              <button className="btn btn-purple" onClick={() => onOpenAssistant('john')}>
                Falar com o Jhon
              </button>
            </div>
          </motion.div>

          <motion.div
            className="portfolio-grid"
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="cases-title">Alguns de nossos Cases</h3>
            {courseExamples.map((item) => (
              <CourseVideo key={item.id} item={item} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
