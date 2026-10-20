# Threat model

| Threat | Current control | Production work |
|---|---|---|
| Malformed or oversized data | type/shape/range checks and hard limits | JSON Schema, fuzzing, streaming datasets |
| Model substitution | manifest and artifact-hash field | cryptographic artifact verification and trusted registry |
| Dataset poisoning | explicit dataset lineage metadata | signed provenance, immutable dataset catalogue, review |
| Metric manipulation | deterministic engine and evidence hash | independent implementation checks and signed build |
| Evidence tampering | SHA-256 and optional RSA signature | HSM/secure timestamp/immutable repository |
| Unauthorized API | loopback default and optional bearer token | OIDC, roles, tenant isolation, audit log |
| Resource exhaustion | body/sample/feature/label/run bounds | rate limiting and isolated workers |
| Unsafe deployment | human-review-only decision wording | safety lifecycle, target evidence, independent approval |
| Private-key leakage | no persistence or API signing endpoint | HSM/KMS signing service |

Do not upload client models, datasets, credentials, private keys or vehicle data to this public repository.
