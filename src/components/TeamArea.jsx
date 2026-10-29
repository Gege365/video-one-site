import { useEffect, useState } from 'react'
import { buildContractHtml, buildDeliveryHtml, openPrintDocument } from '../lib/teamDocs'

const TEAM_PASSWORD = '#Gl963558'
const SESSION_KEY = 'videoone-team-auth'

const emptyContract = {
  nome: '',
  cpfCnpj: '',
  email: '',
  telefone: '',
  endereco: '',
  marca: '',
  cidadeUf: '',
  paginas: 'Home, Sobre, Serviços, Contato',
  rodadasAjustes: '2',
  entSite: true,
  entPaginas: true,
  entWhatsapp: true,
  entFormulario: true,
  entPublicacao: true,
  entContas: true,
  entTransferencia: true,
  entAjustes: true,
  entPdf: true,
  valorSite: '',
  valorDominio: '',
  valorOutros: '',
  valorTotal: '',
  outrosDesc: '',
  chavePix: '',
  pagamentoTipo: 'entrada',
  entradaPct: '50',
  restantePct: '50',
  outraPagamento: '',
  prazoDias: '14',
  localData: '',
}

const emptyDelivery = {
  cliente: '',
  dataEntrega: '',
  marca: '',
  responsavel: 'Video One',
  urlSite: '',
  pacoteResumo: 'Site institucional responsivo + WhatsApp + publicação + contas',
  vercelEmail: '',
  vercelSenha: '',
  vercelProjeto: '',
  githubLogin: '',
  githubSenha: '',
  githubRepo: '',
  dominio: '',
  dominioSituacao: 'Contratado nesta entrega',
  registroEmail: '',
  registroSenha: '',
  localData: '',
}

function Field({ label, children }) {
  return (
    <label className="team-field">
      <span>{label}</span>
      {children}
    </label>
  )
}

export default function TeamArea({ open, onClose }) {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [view, setView] = useState('hub')
  const [contract, setContract] = useState(emptyContract)
  const [delivery, setDelivery] = useState(emptyDelivery)

  useEffect(() => {
    if (!open) return
    const ok = sessionStorage.getItem(SESSION_KEY) === '1'
    setAuthed(ok)
    setPassword('')
    setError('')
    setView('hub')
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const logoUrl = `${window.location.origin}/images/logo-video1-dark.png`

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === TEAM_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, '1')
      setAuthed(true)
      setError('')
      setPassword('')
      return
    }
    setError('Senha incorreta.')
  }

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAuthed(false)
    setView('hub')
  }

  const setC = (key, value) => setContract((prev) => ({ ...prev, [key]: value }))
  const setD = (key, value) => setDelivery((prev) => ({ ...prev, [key]: value }))

  const printContract = () => {
    openPrintDocument(buildContractHtml(contract, logoUrl))
  }

  const printDelivery = () => {
    openPrintDocument(buildDeliveryHtml(delivery, logoUrl))
  }

  const fillDeliveryFromContract = () => {
    setDelivery((prev) => ({
      ...prev,
      cliente: contract.nome || prev.cliente,
      marca: contract.marca || prev.marca,
      localData: contract.localData || prev.localData,
    }))
    setView('delivery')
  }

  return (
    <div className="team-overlay" role="dialog" aria-modal="true" aria-label="Área da Equipe">
      <div className="team-panel">
        <div className="team-panel-head">
          <div>
            <p className="team-kicker">Video One</p>
            <h2>Área da Equipe</h2>
          </div>
          <button type="button" className="team-close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </div>

        {!authed ? (
          <form className="team-gate" onSubmit={handleLogin}>
            <p>Digite a senha da equipe para emitir contratos e PDFs de entrega.</p>
            <Field label="Senha">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                autoComplete="current-password"
                placeholder="Senha"
              />
            </Field>
            {error && <p className="team-error">{error}</p>}
            <button type="submit" className="btn btn-primary">
              Entrar
            </button>
          </form>
        ) : (
          <>
            <div className="team-toolbar">
              {view !== 'hub' && (
                <button type="button" className="btn btn-ghost team-btn-ghost" onClick={() => setView('hub')}>
                  ← Voltar
                </button>
              )}
              <button type="button" className="btn btn-ghost team-btn-ghost" onClick={logout}>
                Sair
              </button>
            </div>

            {view === 'hub' && (
              <div className="team-hub">
                <p className="team-hub-lead">
                  Preencha os dados do cliente e gere o PDF (imprimir ou salvar como PDF no navegador).
                </p>
                <div className="team-cards">
                  <button type="button" className="team-card" onClick={() => setView('contract')}>
                    <span className="team-card-tag">Documento</span>
                    <strong>Contrato de Prestação de Serviços</strong>
                    <span>Nome, CPF, valores, prazo e entregáveis — com download/impressão em PDF.</span>
                  </button>
                  <button type="button" className="team-card" onClick={() => setView('delivery')}>
                    <span className="team-card-tag">Documento</span>
                    <strong>PDF de Entrega</strong>
                    <span>URL do site, logins e senhas (Vercel, GitHub, Registro.br).</span>
                  </button>
                </div>
              </div>
            )}

            {view === 'contract' && (
              <div className="team-form-wrap">
                <h3>Contrato</h3>
                <div className="team-form-grid">
                  <Field label="Nome / Razão social">
                    <input value={contract.nome} onChange={(e) => setC('nome', e.target.value)} />
                  </Field>
                  <Field label="CPF / CNPJ">
                    <input value={contract.cpfCnpj} onChange={(e) => setC('cpfCnpj', e.target.value)} />
                  </Field>
                  <Field label="E-mail">
                    <input type="email" value={contract.email} onChange={(e) => setC('email', e.target.value)} />
                  </Field>
                  <Field label="Telefone / WhatsApp">
                    <input value={contract.telefone} onChange={(e) => setC('telefone', e.target.value)} />
                  </Field>
                  <Field label="Endereço">
                    <input value={contract.endereco} onChange={(e) => setC('endereco', e.target.value)} />
                  </Field>
                  <Field label="Cidade / UF">
                    <input value={contract.cidadeUf} onChange={(e) => setC('cidadeUf', e.target.value)} />
                  </Field>
                  <Field label="Marca / negócio no site">
                    <input value={contract.marca} onChange={(e) => setC('marca', e.target.value)} />
                  </Field>
                  <Field label="Páginas / seções">
                    <input value={contract.paginas} onChange={(e) => setC('paginas', e.target.value)} />
                  </Field>
                  <Field label="Rodadas de ajuste">
                    <input value={contract.rodadasAjustes} onChange={(e) => setC('rodadasAjustes', e.target.value)} />
                  </Field>
                  <Field label="Prazo (dias úteis)">
                    <input value={contract.prazoDias} onChange={(e) => setC('prazoDias', e.target.value)} />
                  </Field>
                  <Field label="Valor do site (R$)">
                    <input value={contract.valorSite} onChange={(e) => setC('valorSite', e.target.value)} />
                  </Field>
                  <Field label="Valor domínio (R$)">
                    <input value={contract.valorDominio} onChange={(e) => setC('valorDominio', e.target.value)} />
                  </Field>
                  <Field label="Outros — descrição">
                    <input value={contract.outrosDesc} onChange={(e) => setC('outrosDesc', e.target.value)} />
                  </Field>
                  <Field label="Outros — valor (R$)">
                    <input value={contract.valorOutros} onChange={(e) => setC('valorOutros', e.target.value)} />
                  </Field>
                  <Field label="Valor total (R$)">
                    <input value={contract.valorTotal} onChange={(e) => setC('valorTotal', e.target.value)} />
                  </Field>
                  <Field label="Chave Pix / dados pagamento">
                    <input value={contract.chavePix} onChange={(e) => setC('chavePix', e.target.value)} />
                  </Field>
                  <Field label="Local e data">
                    <input
                      value={contract.localData}
                      onChange={(e) => setC('localData', e.target.value)}
                      placeholder="Uberlândia/MG, 29/10/2026"
                    />
                  </Field>
                  <Field label="Condição de pagamento">
                    <select
                      value={contract.pagamentoTipo}
                      onChange={(e) => setC('pagamentoTipo', e.target.value)}
                    >
                      <option value="integral">100% na assinatura</option>
                      <option value="entrada">Entrada + restante na entrega</option>
                      <option value="outra">Outra</option>
                    </select>
                  </Field>
                  {contract.pagamentoTipo === 'entrada' && (
                    <>
                      <Field label="% entrada">
                        <input value={contract.entradaPct} onChange={(e) => setC('entradaPct', e.target.value)} />
                      </Field>
                      <Field label="% restante">
                        <input value={contract.restantePct} onChange={(e) => setC('restantePct', e.target.value)} />
                      </Field>
                    </>
                  )}
                  {contract.pagamentoTipo === 'outra' && (
                    <Field label="Descreva a condição">
                      <input
                        value={contract.outraPagamento}
                        onChange={(e) => setC('outraPagamento', e.target.value)}
                      />
                    </Field>
                  )}
                </div>

                <fieldset className="team-checks">
                  <legend>Entregáveis inclusos</legend>
                  {[
                    ['entSite', 'Site responsivo'],
                    ['entPaginas', 'Páginas / seções'],
                    ['entWhatsapp', 'WhatsApp'],
                    ['entFormulario', 'Formulário / contato'],
                    ['entPublicacao', 'Publicação online'],
                    ['entContas', 'Contas GitHub / Vercel / Registro.br'],
                    ['entTransferencia', 'Transferência de acessos'],
                    ['entAjustes', 'Rodadas de ajuste'],
                    ['entPdf', 'PDF de entrega'],
                  ].map(([key, label]) => (
                    <label key={key} className="team-check">
                      <input
                        type="checkbox"
                        checked={Boolean(contract[key])}
                        onChange={(e) => setC(key, e.target.checked)}
                      />
                      {label}
                    </label>
                  ))}
                </fieldset>

                <div className="team-actions">
                  <button type="button" className="btn btn-primary" onClick={printContract}>
                    Imprimir / Salvar PDF
                  </button>
                  <button type="button" className="btn btn-ghost team-btn-ghost" onClick={fillDeliveryFromContract}>
                    Usar dados na Entrega →
                  </button>
                </div>
                <p className="team-hint">Na janela de impressão, escolha “Salvar como PDF”.</p>
              </div>
            )}

            {view === 'delivery' && (
              <div className="team-form-wrap">
                <h3>PDF de Entrega</h3>
                <div className="team-form-grid">
                  <Field label="Cliente / empresa">
                    <input value={delivery.cliente} onChange={(e) => setD('cliente', e.target.value)} />
                  </Field>
                  <Field label="Data da entrega">
                    <input value={delivery.dataEntrega} onChange={(e) => setD('dataEntrega', e.target.value)} />
                  </Field>
                  <Field label="Marca / nome do site">
                    <input value={delivery.marca} onChange={(e) => setD('marca', e.target.value)} />
                  </Field>
                  <Field label="Responsável Video One">
                    <input value={delivery.responsavel} onChange={(e) => setD('responsavel', e.target.value)} />
                  </Field>
                  <Field label="URL do site">
                    <input value={delivery.urlSite} onChange={(e) => setD('urlSite', e.target.value)} />
                  </Field>
                  <Field label="Pacote / resumo">
                    <input value={delivery.pacoteResumo} onChange={(e) => setD('pacoteResumo', e.target.value)} />
                  </Field>
                  <Field label="Vercel — e-mail">
                    <input value={delivery.vercelEmail} onChange={(e) => setD('vercelEmail', e.target.value)} />
                  </Field>
                  <Field label="Vercel — senha">
                    <input value={delivery.vercelSenha} onChange={(e) => setD('vercelSenha', e.target.value)} />
                  </Field>
                  <Field label="Vercel — nome do projeto">
                    <input value={delivery.vercelProjeto} onChange={(e) => setD('vercelProjeto', e.target.value)} />
                  </Field>
                  <Field label="GitHub — login">
                    <input value={delivery.githubLogin} onChange={(e) => setD('githubLogin', e.target.value)} />
                  </Field>
                  <Field label="GitHub — senha">
                    <input value={delivery.githubSenha} onChange={(e) => setD('githubSenha', e.target.value)} />
                  </Field>
                  <Field label="GitHub — link do repositório">
                    <input value={delivery.githubRepo} onChange={(e) => setD('githubRepo', e.target.value)} />
                  </Field>
                  <Field label="Domínio">
                    <input value={delivery.dominio} onChange={(e) => setD('dominio', e.target.value)} />
                  </Field>
                  <Field label="Situação do domínio">
                    <select
                      value={delivery.dominioSituacao}
                      onChange={(e) => setD('dominioSituacao', e.target.value)}
                    >
                      <option>Contratado nesta entrega</option>
                      <option>Já possuía</option>
                      <option>Não contratado</option>
                    </select>
                  </Field>
                  <Field label="Registro.br — e-mail / ID">
                    <input value={delivery.registroEmail} onChange={(e) => setD('registroEmail', e.target.value)} />
                  </Field>
                  <Field label="Registro.br — senha">
                    <input value={delivery.registroSenha} onChange={(e) => setD('registroSenha', e.target.value)} />
                  </Field>
                  <Field label="Local e data">
                    <input
                      value={delivery.localData}
                      onChange={(e) => setD('localData', e.target.value)}
                      placeholder="Uberlândia/MG, 29/10/2026"
                    />
                  </Field>
                </div>
                <div className="team-actions">
                  <button type="button" className="btn btn-primary" onClick={printDelivery}>
                    Imprimir / Salvar PDF
                  </button>
                </div>
                <p className="team-hint">Na janela de impressão, escolha “Salvar como PDF”.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
