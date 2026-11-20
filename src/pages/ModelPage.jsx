import { Link, useParams } from 'react-router-dom'
import { findModel } from '../data/models'
import ProductStage from '../components/site/ProductStage'

export default function ModelPage() {
  const { slug } = useParams()
  const model = findModel(slug)

  if (!model) {
    return (
      <main className="vo-page">
        <div className="vo-container">
          <h1>Modelo não encontrado.</h1>
          <Link to="/">Voltar ao início</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="vo-page model-page">
      <div className="vo-container model-layout">
        <div>
          <Link className="model-back" to={model.family === 'Sites' ? '/#sites' : '/#gestao'}>
            ← {model.family}
          </Link>
          <p className="vo-kicker">{model.audience}</p>
          <h1>{model.title}</h1>
          <p className="model-lead">{model.summary}</p>
          <ul className="model-includes">
            {model.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="model-price">
            <small>A partir de</small>
            <strong>R$ {model.price}</strong>
            <ul>
              <li>Pagamento único</li>
              <li>Sem mensalidade</li>
              <li>Projeto na sua conta</li>
              <li>Entrega segura, com a sua marca</li>
            </ul>
          </div>
          <a className="vo-btn vo-btn--dark" href="#visualizar">
            Visualizar
          </a>
        </div>
        <div id="visualizar">
          <ProductStage compact />
        </div>
      </div>
    </main>
  )
}
