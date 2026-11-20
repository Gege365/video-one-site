export default function SimplePage({ kicker, title, children }) {
  return (
    <main className="vo-page">
      <div className="vo-container">
        <p className="vo-kicker">{kicker}</p>
        <h1>{title}</h1>
        <div className="vo-page-body">{children}</div>
      </div>
    </main>
  )
}
