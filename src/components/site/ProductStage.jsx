function DesktopApp() {
  return (
    <div className="app-desk" aria-hidden>
      <aside>
        <div className="app-logo">
          <i />
          Video One
        </div>
        <p>Visão geral</p>
        <span className="is-on">Dashboard</span>
        <span>Agenda</span>
        <span>Pacientes</span>
        <p>Operação</p>
        <span>Financeiro</span>
        <span>Estoque</span>
        <span>Relatórios</span>
      </aside>
      <div className="app-body">
        <header>
          <div>
            <strong>Dashboard</strong>
            <small>Resumo do mês em comparação com o mês anterior</small>
          </div>
          <em>Mês atual</em>
        </header>
        <div className="app-stats">
          <article>
            <small>Pacientes ativos</small>
            <b>128</b>
            <span>+12 no mês</span>
          </article>
          <article>
            <small>Consultas hoje</small>
            <b>18</b>
            <span>4 confirmadas agora</span>
          </article>
          <article>
            <small>Faturamento</small>
            <b>R$ 48.900</b>
            <span>+8% vs. mês anterior</span>
          </article>
          <article>
            <small>Retornos</small>
            <b>26</b>
            <span>agenda da semana</span>
          </article>
        </div>
        <div className="app-panels">
          <section className="app-chart">
            <div>
              <strong>Faturamento</strong>
              <small>Jan — Jun</small>
            </div>
            <svg viewBox="0 0 320 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="voFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c5cff" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#7c5cff" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 78 C40 74 50 50 80 52 C120 54 130 30 170 34 C210 38 220 18 260 22 C290 25 300 16 320 12 V110 H0 Z" fill="url(#voFill)" />
              <path d="M0 78 C40 74 50 50 80 52 C120 54 130 30 170 34 C210 38 220 18 260 22 C290 25 300 16 320 12" fill="none" stroke="#6d5efc" strokeWidth="3" />
            </svg>
          </section>
          <section className="app-donut">
            <strong>Serviços por status</strong>
            <div className="donut">
              <span>86</span>
            </div>
            <ul>
              <li><i className="c1" /> Em andamento</li>
              <li><i className="c2" /> Concluídos</li>
              <li><i className="c3" /> Agendados</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

function PhoneApp() {
  return (
    <div className="app-phone" aria-hidden>
      <div className="app-phone-bar">
        <b>9:41</b>
        <s />
      </div>
      <div className="app-phone-brand">
        <i />
        <strong>Video One</strong>
        <small>Gestão</small>
      </div>
      <label>
        E-mail
        <span>admin@clinica.com</span>
      </label>
      <label>
        Senha
        <span>••••••••</span>
      </label>
      <button type="button">Entrar</button>
      <p>Seu negócio no painel, também no celular.</p>
    </div>
  )
}

export default function ProductStage({ compact = false }) {
  return (
    <div className={`product-stage ${compact ? 'is-compact' : ''}`}>
      <div className="monitor">
        <div className="monitor-bezel">
          <div className="monitor-screen">
            <DesktopApp />
          </div>
        </div>
        <div className="monitor-chin" />
        <div className="monitor-neck" />
        <div className="monitor-foot" />
      </div>
      <div className="handset">
        <div className="handset-screen">
          <PhoneApp />
        </div>
      </div>
      <div className="product-shadow" />
    </div>
  )
}
