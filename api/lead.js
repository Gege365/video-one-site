/**
 * Proxy server-side para o Google Apps Script.
 * Evita depender de VITE_* no browser em produção.
 *
 * Variáveis na Vercel:
 *   GOOGLE_SHEETS_WEBHOOK
 *   SHEETS_TOKEN
 */

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'method_not_allowed' })
  }

  const webhook = process.env.GOOGLE_SHEETS_WEBHOOK || process.env.VITE_GOOGLE_SHEETS_WEBHOOK
  const token = process.env.SHEETS_TOKEN || process.env.VITE_SHEETS_TOKEN || ''

  if (!webhook) {
    return res.status(500).json({ ok: false, error: 'missing_webhook' })
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}

    const response = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        ...payload,
        token,
      }),
      redirect: 'follow',
    })

    const text = await response.text()
    let data
    try {
      data = JSON.parse(text)
    } catch {
      data = { ok: response.ok, raw: text.slice(0, 300) }
    }

    return res.status(response.ok ? 200 : 502).json(data)
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error?.message || 'proxy_failed',
    })
  }
}
