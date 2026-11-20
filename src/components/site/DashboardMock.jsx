export default function DashboardMock({ variant = 'desktop' }) {
  const mobile = variant === 'mobile'

  return (
    <div className={`dash ${mobile ? 'dash--mobile' : 'dash--desktop'}`} aria-hidden>
      <aside className="dash-side">
        <div className="dash-brand">
          <span className="dash-mark" />
          Video One
        </div>
        <nav>
          <span className="is-active">Início</span>
          <span>Agenda</span>
          <span>Pacientes</span>
          {!mobile && <span>Financeiro</span>}
          {!mobile && <span>Relatórios</span>}
        </nav>
      </aside>

      <div className="dash-main">
        <header className="dash-top">
          <div>
            <strong>{mobile ? 'Agenda de hoje' : 'Olá, Administrador'}</strong>
            <small>Gestão Clínica</small>
          </div>
          <span className="dash-avatar">AD</span>
        </header>

        <div className="dash-kpis">
          <article>
            <small>Pacientes</small>
            <strong>124</strong>
          </article>
          <article>
            <small>Hoje</small>
            <strong>{mobile ? '18' : 'R$ 12.450'}</strong>
          </article>
          {!mobile && (
            <article>
              <small>Consultas</small>
              <strong>32</strong>
            </article>
          )}
          {!mobile && (
            <article>
              <small>Retornos</small>
              <strong>8</strong>
            </article>
          )}
        </div>

        {mobile ? (
          <ul className="dash-agenda">
            <li>
              <b>09:00</b>
              <span>Ana Souza · Avaliação</span>
            </li>
            <li>
              <b>10:30</b>
              <span>Carlos Lima · Retorno</span>
            </li>
            <li>
              <b>14:00</b>
              <span>Marina Dias · Procedimento</span>
            </li>
            <li>
              <b>16:15</b>
              <span>Paulo Henrique · Consulta</span>
            </li>
          </ul>
        ) : (
          <div className="dash-split">
            <section className="dash-chart">
              <div className="dash-chart-head">
                <strong>Faturamento</strong>
                <span>últimos 6 meses</span>
              </div>
              <div className="dash-bars">
                <i style={{ '--h': '46%' }} />
                <i style={{ '--h': '62%' }} />
                <i style={{ '--h': '54%' }} />
                <i style={{ '--h': '78%' }} />
                <i style={{ '--h': '70%' }} />
                <i style={{ '--h': '92%' }} />
              </div>
            </section>
            <section className="dash-list">
              <strong>Agenda de hoje</strong>
              <ul>
                <li>
                  <b>09:00</b> Ana Souza
                </li>
                <li>
                  <b>10:30</b> Carlos Lima
                </li>
                <li>
                  <b>14:00</b> Marina Dias
                </li>
                <li>
                  <b>16:15</b> Paulo Henrique
                </li>
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
