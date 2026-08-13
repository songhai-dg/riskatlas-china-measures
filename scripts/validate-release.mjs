#!/usr/bin/env node
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'

const releasePath = process.argv[2] || 'data/china-measures.v1.json'
let data
try {
  data = JSON.parse(await readFile(new URL(`../${releasePath}`, import.meta.url), 'utf8'))
} catch (error) {
  if (!process.argv[2] && error.code === 'ENOENT') {
    console.log(JSON.stringify({ ok: true, mode: 'code-only', note: 'Release data is intentionally not committed to the public repository.' }))
    process.exit(0)
  }
  throw error
}
const required = ['apiVersion', 'datasetVersion', 'generatedAt', 'summary', 'methodology', 'sources', 'events', 'releaseHash']
for (const key of required) if (!(key in data)) throw new Error(`Missing root field: ${key}`)
if (data.apiVersion !== 'v1') throw new Error('Expected apiVersion v1')
if (!Array.isArray(data.events) || !data.events.length) throw new Error('Expected non-empty events')
const ids = new Set()
for (const event of data.events) {
  for (const key of ['id', 'noticeNo', 'regime', 'sourceList', 'authority', 'status', 'subjects', 'translations']) {
    if (!(key in event)) throw new Error(`Event ${event.id || '<unknown>'} missing ${key}`)
  }
  if (ids.has(event.id)) throw new Error(`Duplicate event id: ${event.id}`)
  ids.add(event.id)
  for (const locale of ['zh', 'en']) {
    if (!event.translations[locale] || typeof event.translations[locale].isComplete !== 'boolean') {
      throw new Error(`Event ${event.id} missing ${locale} translation metadata`)
    }
  }
}
const { releaseHash, ...withoutHash } = data
const expected = createHash('sha256').update(JSON.stringify(withoutHash)).digest('hex')
if (expected !== releaseHash) throw new Error('releaseHash mismatch')
console.log(JSON.stringify({ ok: true, events: data.events.length, records: data.summary.records, englishCompleteEvents: data.languageCoverage.englishCompleteEvents }))
