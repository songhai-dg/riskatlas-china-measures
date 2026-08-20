#!/usr/bin/env node
import { createServer } from 'node:http'

const port = Number(process.env.PORT || 8787)
const upstream = process.env.RISKATLAS_API_URL || 'https://atlas.scholarforce.ai'
const maxPerMinute = Number(process.env.RATE_LIMIT_PER_MINUTE || 60)
const requests = new Map()

function send(res, status, value) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
  res.end(`${JSON.stringify(value, null, 2)}\n`)
}

createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  if (url.pathname !== '/api/v1/china-measures') return send(res, 404, { error: 'Not found' })
  if (!upstream) return send(res, 503, { error: 'Upstream API is not configured', code: 'UPSTREAM_NOT_CONFIGURED' })

  const now = Date.now()
  const ip = req.socket.remoteAddress || 'unknown'
  const recent = (requests.get(ip) || []).filter(timestamp => now - timestamp < 60_000)
  if (recent.length >= maxPerMinute) return send(res, 429, { error: 'Rate limit exceeded', code: 'RATE_LIMITED' })
  recent.push(now)
  requests.set(ip, recent)

  const target = new URL('/api/open/v1/china-measures', upstream)
  for (const [key, value] of url.searchParams) target.searchParams.append(key, value)
  fetch(target, { headers: { Accept: 'application/json' } }).then(async response => {
    const body = await response.text()
    res.writeHead(response.status, { 'Content-Type': response.headers.get('content-type') || 'application/json; charset=utf-8', 'Cache-Control': 'no-store' })
    res.end(body)
  }).catch(() => send(res, 502, { error: 'Upstream API unavailable', code: 'UPSTREAM_UNAVAILABLE' }))
}).listen(port, '127.0.0.1', () => console.log(`China Measures API proxy ready at http://127.0.0.1:${port}/api/v1/china-measures`))
