export function validateDataset(input, manifest) {
  if (!input || !Array.isArray(input.samples) || input.samples.length < 1 || input.samples.length > 100_000) throw new RangeError('dataset requires 1..100000 samples');
  const ids = new Set();
  const samples = input.samples.map((sample,index)=>{
    const id = sample.id ?? `sample-${index}`;
    if (ids.has(id)) throw new Error(`duplicate sample id ${id}`); ids.add(id);
    if (!manifest.labels.includes(sample.label)) throw new Error(`unknown label ${sample.label}`);
    if (!Array.isArray(sample.features) || sample.features.length !== manifest.features.length || sample.features.some(value=>typeof value!=='number'||!Number.isFinite(value))) throw new Error(`invalid features for ${id}`);
    return Object.freeze({id,label:sample.label,features:[...sample.features],group:sample.group??'default',ood:Boolean(sample.ood)});
  });
  return Object.freeze({name:input.name??'dataset',version:input.version??'0',samples});
}
