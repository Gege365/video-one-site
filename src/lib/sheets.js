/**
 * Envia o lead para a planilha.
 * - Em produção: usa /api/lead (proxy Vercel → Apps Script)
 * - Em local: tenta /api/lead e, se falhar, usa o webhook direto do .env
 */
export async function sendLeadToSheets(payload) {
  const directUrl = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK
  const token = import.meta.env.VITE_SHEETS_TOKEN || ''

  // 1) Preferir proxy same-origin (funciona no site Vercel)
  try {
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      const data = await res.json().catch(() => ({ ok: true }))
      if (import.meta.env.DEV) {
        console.info('[Video One] Lead enviado via /api/lead:', data)
      }
      return { ok: true, via: 'api', data }
    }

    if (import.meta.env.DEV) {
      console.warn('[Video One] /api/lead falhou:', res.status)
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.warn('[Video One] /api/lead indisponível (normal no Vite local):', error?.message)
    }
  }

  // 2) Fallback direto ao Apps Script (local / .env)
  if (!directUrl) {
    if (import.meta.env.DEV) {
      console.warn('[Video One] VITE_GOOGLE_SHEETS_WEBHOOK não configurado')
    }
    return { ok: false, reason: 'missing_webhook' }
  }

  try {
    await fetch(directUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        ...payload,
        token,
      }),
    })
    if (import.meta.env.DEV) {
      console.info('[Video One] Lead enviado via webhook direto')
    }
    return { ok: true, via: 'direct' }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[Video One] Falha ao enviar lead para Sheets:', error)
    }
    return { ok: false, reason: error?.message || 'fetch_failed' }
  }
}
