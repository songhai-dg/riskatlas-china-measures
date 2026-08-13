#!/usr/bin/env node
import { createHash } from 'node:crypto'
import { readFile, writeFile } from 'node:fs/promises'

const [inputPath, outputPath] = process.argv.slice(2)
if (!inputPath || !outputPath) {
  throw new Error('Usage: node scripts/build-release.mjs <RiskAtlas v1 response> <output json>')
}

const source = JSON.parse(await readFile(inputPath, 'utf8'))
const dataset = source.data || source
if (!Array.isArray(dataset.events) || !dataset.summary || !dataset.methodology) {
  throw new Error('Input is not a RiskAtlas China Measures v1 response')
}

const REGIME_LABELS = {
  export_control: { zh: '出口管制管控名单', en: 'Export Control List' },
  export_control_watch_list: { zh: '出口管制关注名单', en: 'Export Control Watch List' },
  unreliable_entity_list: { zh: '不可靠实体清单', en: 'Unreliable Entity List' },
  foreign_ministry_countermeasures: { zh: '外交部反制措施', en: 'Ministry of Foreign Affairs Countermeasures' },
  mofcom_countermeasures: { zh: '商务部反制措施', en: 'MOFCOM Countermeasures' },
  trade_security_investigation: { zh: '贸易安全调查', en: 'Trade Security Investigation' },
  destination_export_control: { zh: '特定目的地出口管制', en: 'Destination Export Control' },
  certification_control: { zh: '认证与合规控制', en: 'Certification and Compliance Control' },
}

const STATUS_LABELS = {
  in_force: { zh: '现行有效', en: 'In force' },
  suspended: { zh: '已暂停', en: 'Suspended' },
  stopped: { zh: '已停止', en: 'Stopped' },
  mixed: { zh: '状态混合', en: 'Mixed status' },
  unknown: { zh: '状态待核验', en: 'Status not verified' },
}

const zhTranslation = event => ({
  noticeNo: event.noticeNo,
  title: event.title,
  legalBasis: event.legalBasis || [],
  measures: event.measures || [],
  statusNote: event.statusNote || null,
  isComplete: true,
})

const events = dataset.events.map(event => ({
  ...event,
  regimeLabel: REGIME_LABELS[event.regime] || { zh: event.regime, en: event.regime },
  statusLabel: STATUS_LABELS[event.status] || { zh: event.status, en: event.status },
  translations: {
    zh: zhTranslation(event),
    en: event.translations?.en || {
      noticeNo: event.noticeNo,
      title: event.title,
      legalBasis: event.legalBasis || [],
      measures: event.measures || [],
      statusNote: event.statusNote || null,
      isComplete: false,
    },
  },
}))

const englishCompleteEvents = events.filter(event => event.translations.en.isComplete).length
const payload = {
  apiVersion: 'v1',
  datasetVersion: `cn-measures-${String(dataset.generatedAt || new Date().toISOString()).slice(0, 10)}`,
  generatedAt: dataset.generatedAt || new Date().toISOString(),
  license: 'CC-BY-4.0',
  attribution: 'RiskAtlas China Measures Open Data',
  summary: dataset.summary,
  methodology: dataset.methodology,
  languageCoverage: {
    canonicalLanguage: 'zh',
    supportedLocales: ['zh', 'en'],
    englishCompleteEvents,
    totalEvents: events.length,
    note: 'Chinese official text is canonical. English fields are structured translations; isComplete=false means the Chinese official wording remains authoritative for that field.',
  },
  sources: dataset.sources || [],
  events,
}
payload.releaseHash = createHash('sha256').update(JSON.stringify(payload)).digest('hex')
await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`)
