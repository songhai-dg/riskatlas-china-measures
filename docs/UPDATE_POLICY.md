# Update and correction policy

1. A release is generated from the public China Measures API response after source-level validation.
2. Each release preserves `generatedAt`, `datasetVersion` and `releaseHash`.
3. New official notices, amendments, suspensions and stoppages produce a new data commit. Historical events are retained.
4. Absence from a subsequent notice is never treated as a removal or termination by itself.
5. Corrections must identify the affected official notice and retain a Git-visible history.
6. The default update target is daily monitoring. Material legal changes should be released as soon as the underlying official document has been structured and validated.

## Translation policy

Chinese official wording is the canonical text. English translations are released as structured aid for retrieval and integration. Consumers must check `translations.en.isComplete`; a `false` value means that the Chinese wording remains the only complete public wording in this dataset.
