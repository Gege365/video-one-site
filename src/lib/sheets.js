/**
 * Envia o lead para o webhook do Google Apps Script.
 * Usa text/plain + no-cors para evitar bloqueio de CORS no navegador.
 */
export async function sendLeadToSheets(payload) {
  const url = import.meta.env.VITE_GOOGLE_SHEETS_WEBHOOK
  const token = import.meta.env.VITE_SHEETS_TOKEN || ''

  if (!url) {
    if (import.meta.env.DEV) {
      console.warn('[Video One] VITE_GOOGLE_SHEETS_WEBHOOK não configurado')
    }
    return { ok: false, reason: 'missing_webhook' }
  }

  try {
    await fetch(url, {
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
    return { ok: true }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[Video One] Falha ao enviar lead para Sheets:', error)
    }
    return { ok: false, reason: error?.message || 'fetch_failed' }
  }
}
