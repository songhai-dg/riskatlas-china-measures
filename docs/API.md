# API v1

Open public endpoint (no API key required):

```text
GET https://atlas.scholarforce.ai/api/open/v1/china-measures
```

Supported query parameters:

| Parameter | Values | Meaning |
|---|---|---|
| `q` | text (`>= 2` chars) | Matches official and translation fields, subject names and aliases. |
| `regime` | `export_control`, `export_control_watch_list`, `unreliable_entity_list`, `mofcom_countermeasures`, `foreign_ministry_countermeasures`, `destination_export_control`, `trade_security_investigation`, `certification_control` | Filters the measure regime. |
| `status` | `in_force`, `investigation_open`, `suspended`, `stopped`, `mixed`, `unknown` | Filters event status. |
| `locale` | `zh`, `en` | Additive language preference metadata. The complete bilingual event structure remains available. |
| `page` | `1`–`200` | Page number; defaults to `1`. |
| `limit` | `1`–`25` | Page size; defaults to `20`. |

Examples:

```bash
curl 'https://atlas.scholarforce.ai/api/open/v1/china-measures?regime=export_control&page=1&limit=20'
curl 'https://atlas.scholarforce.ai/api/open/v1/china-measures?status=in_force&q=DNA'
```

Envelope:

```json
{
  "data": { "events": [], "filters": {}, "matchedEvents": 0 },
  "meta": { "apiVersion": "v1", "contractVersion": "1.13.0", "recordGrain": "official_notice_event" },
  "pagination": { "page": 1, "limit": 20, "total": 0, "totalPages": 0 },
  "warnings": []
}
```

The repository does not contain a data snapshot. The public endpoint does not require an API key; it uses server-side IP rate limiting and pagination. It is not a bulk-download endpoint. Multi-jurisdiction, monitoring and institutional integrations remain separate RiskAtlas services.

This is intentionally compatible with the RiskAtlas v1 China Measures endpoint. Future application-based endpoints may extend to multi-jurisdiction data while retaining v1 envelope conventions.
