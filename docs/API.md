# API v1

Reference endpoint (the local proxy forwards to the controlled RiskAtlas service):

```text
GET /api/v1/china-measures
```

Supported query parameters:

| Parameter | Values | Meaning |
|---|---|---|
| `q` | text | Matches official and translation fields, subject names and aliases. |
| `regime` | published regime code | Filters the measure regime. |
| `status` | `in_force`, `suspended`, `stopped`, `mixed`, `unknown` | Filters event status. |
| `locale` | `zh`, `en` | Additive language preference metadata. The complete bilingual event structure remains available. |

Examples:

```bash
curl 'http://127.0.0.1:8787/api/v1/china-measures?regime=export_control&locale=en'
curl 'http://127.0.0.1:8787/api/v1/china-measures?status=in_force&q=DNA'
```

Envelope:

```json
{
  "data": { "events": [], "filters": {}, "matchedEvents": 0 },
  "meta": { "apiVersion": "v1", "recordGrain": "official_notice_event" },
  "warnings": []
}
```

The repository does not contain a data snapshot. Without `RISKATLAS_API_URL`, the reference proxy returns `503 UPSTREAM_NOT_CONFIGURED`. Production access should use an API key issued by RiskAtlas; do not put the key in source code, browser bundles or public issues.

This is intentionally compatible with the RiskAtlas v1 China Measures endpoint. Future application-based endpoints may extend to multi-jurisdiction data while retaining v1 envelope conventions.
