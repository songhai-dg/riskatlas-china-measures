# Data dictionary

| Field | Description |
|---|---|
| `id` | Stable event identifier within the released dataset. |
| `noticeNo` | Official notice number or decision title. |
| `officialDate` | Date stated by the official document, when available. |
| `officialUrl` | Official public document link. |
| `regime` | Controlled measure-regime code. |
| `regimeLabel` | Chinese and English display labels. |
| `status` | Structured measure status from official notice-ledger metadata. |
| `subjects` | Official subject items under the event. |
| `includedEntities` | Expressly nested entities/branches under one numbered subject item. |
| `translations.zh` | Canonical Chinese fields; complete by definition. |
| `translations.en` | Structured English translation fields. `isComplete` indicates whether all released event wording has an English rendering. |
| `releaseHash` | SHA-256 hash of the release payload excluding the hash field itself. |

The data grain is an official notice event, not a deduplicated real-world legal entity.
