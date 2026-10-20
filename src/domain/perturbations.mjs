export function applyPerturbation(features, perturbation, random) {
  switch(perturbation.type){
    case 'gaussian-noise':return features.map(v=>v+normal(random)*Number(perturbation.sigma??0.1));
    case 'bias':return features.map(v=>v+Number(perturbation.value??0));
    case 'drop-feature':{const out=[...features];out[Number(perturbation.index??0)]=0;return out}
    case 'scale':return features.map(v=>v*Number(perturbation.value??1));
    default:throw new Error(`unsupported perturbation ${perturbation.type}`);
  }
}
function normal(random){const u=Math.max(Number.EPSILON,random.next()),v=Math.max(Number.EPSILON,random.next());return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)}
