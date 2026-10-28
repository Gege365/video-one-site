export default function DeviceMockup({
  title,
  segment,
  accent = '#a855f7',
  url,
  desktopImage,
  mobileImage,
  description,
}) {
  return (
    <article className="device-showcase">
      <div className="device-stage">
        <div className="monitor">
          <div className="monitor-bezel">
            <div className="monitor-screen" style={{ '--accent': accent }}>
              {desktopImage ? (
                <img
                  className="device-shot device-shot--desktop"
                  src={desktopImage}
                  alt={`${title} — versão desktop`}
                />
              ) : (
                <div className="mini-site" />
              )}
            </div>
          </div>
          <div className="monitor-stand" />
          <div className="monitor-base" />
        </div>

        <div className="phone">
          <div className="phone-notch" />
          <div className="phone-screen" style={{ '--accent': accent }}>
            {mobileImage ? (
              <img
                className="device-shot device-shot--mobile"
                src={mobileImage}
                alt={`${title} — versão mobile`}
              />
            ) : (
              <div className="mini-site mini-site--mobile" />
            )}
          </div>
        </div>
      </div>

      <div className="device-meta">
        <p className="tag">{segment}</p>
        <h4>{title}</h4>
        {description && <p className="device-desc">{description}</p>}
        {url && (
          <a
            className="device-link"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver site →
          </a>
        )}
      </div>
    </article>
  )
}
