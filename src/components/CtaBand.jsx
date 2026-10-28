import { motion } from 'framer-motion'

export default function CtaBand({ onOpenAssistant }) {
  return (
    <section className="cta-section" id="proximo-nivel">
      <div className="cta-fade" aria-hidden />
      <div className="container">
        <motion.div
          className="cta-band"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Se você quiser avançar para o próximo nível com a Video One</h2>

          <div className="cta-split">
            <div className="cta-col">
              <p>
                Escolha nosso especialista em Criação e Lançamento de Cursos Online.
              </p>
              <button className="btn btn-purple" onClick={() => onOpenAssistant('john')}>
                Falar com o Jhon
              </button>
            </div>

            <div className="cta-col">
              <p>
                Escolha nosso Especialista em Criação de Sites Personalizados para o seu negócio.
              </p>
              <button className="btn btn-green" onClick={() => onOpenAssistant('teo')}>
                Falar com o Teo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
