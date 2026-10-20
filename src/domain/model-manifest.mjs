import {createHash} from 'node:crypto';

const precisions = new Set(['fp32', 'fp16', 'int8']);
export function validateManifest(input) {
  if (!input || typeof input !== 'object') throw new TypeError('model manifest required');
  const manifest = structuredClone(input);
  for (const field of ['id','name','version','task','target','precision']) if (!manifest[field]) throw new TypeError(`manifest ${field} required`);
  if (manifest.task !== 'classification') throw new Error('only classification task is implemented');
  if (!precisions.has(manifest.precision)) throw new Error('unsupported precision');
  if (!Array.isArray(manifest.features) || manifest.features.length < 1 || manifest.features.length > 1024) throw new RangeError('features must contain 1..1024 items');
  if (!Array.isArray(manifest.labels) || manifest.labels.length < 2 || manifest.labels.length > 1000) throw new RangeError('labels must contain 2..1000 items');
  if (new Set(manifest.features).size !== manifest.features.length || new Set(manifest.labels).size !== manifest.labels.length) throw new Error('features and labels must be unique');
  manifest.artifactHash ??= 'not-provided';
  manifest.dataset ??= {name:'unspecified',version:'unspecified',license:'unspecified'};
  manifest.intendedUse ??= 'evaluation only';
  manifest.limitations ??= [];
  return Object.freeze(manifest);
}
export function hashManifest(manifest) { return createHash('sha256').update(JSON.stringify(manifest)).digest('hex'); }
