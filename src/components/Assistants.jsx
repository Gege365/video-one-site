import { motion } from 'framer-motion'
import { assistants } from '../data/assistants'

const sectionVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.06 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Assistants({ onOpenAssistant }) {
  const list = [assistants.john, assistants.teo]

  return (
    <section className="section assistants" id="assistentes">
      <motion.div
        className="container assistants-row"
        variants={sectionVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {list.map((a) => (
          <motion.article
            key={a.id}
            className={`assistant-slot ${a.accent === 'green' ? 'assistant-slot--green' : ''}`}
            variants={itemVariants}
          >
            <h3 className="assistant-headline">
              {a.taglineBefore}
              <span className="assistant-highlight">{a.taglineHighlight}</span>
              {a.taglineAfter}
            </h3>

            <div className="assistant-figure-wrap">
              <div className="assistant-aura" aria-hidden />
              <img className="assistant-figure" src={a.avatar} alt={a.name} />
            </div>

            <button
              className={`btn ${a.accent === 'green' ? 'btn-green' : 'btn-purple'} assistant-cta`}
              onClick={() => onOpenAssistant(a.id)}
            >
              {a.cta}
            </button>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}
