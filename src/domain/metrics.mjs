export function confusion(labels, results) {
  const matrix = Object.fromEntries(labels.map(actual=>[actual,Object.fromEntries(labels.map(predicted=>[predicted,0]))]));
  for (const result of results) matrix[result.actual][result.predicted]++;
  return matrix;
}
export function classificationMetrics(labels, results) {
  const matrix=confusion(labels,results);let correct=0;const perClass={};
  for(const label of labels){const tp=matrix[label][label];correct+=tp;const fp=labels.reduce((sum,a)=>sum+(a===label?0:matrix[a][label]),0);const fn=labels.reduce((sum,p)=>sum+(p===label?0:matrix[label][p]),0);const precision=ratio(tp,tp+fp);const recall=ratio(tp,tp+fn);perClass[label]={support:results.filter(r=>r.actual===label).length,precision,recall,f1:ratio(2*precision*recall,precision+recall)}}
  return {accuracy:ratio(correct,results.length),macroF1:average(Object.values(perClass).map(x=>x.f1)),perClass,confusionMatrix:matrix};
}
export function expectedCalibrationError(results,bins=10){let total=0;for(let b=0;b<bins;b++){const low=b/bins,high=(b+1)/bins;const bucket=results.filter(r=>r.confidence>=low&&(b===bins-1?r.confidence<=high:r.confidence<high));if(!bucket.length)continue;const accuracy=bucket.filter(r=>r.actual===r.predicted).length/bucket.length;const confidence=average(bucket.map(r=>r.confidence));total+=(bucket.length/results.length)*Math.abs(accuracy-confidence)}return total}
export function percentile(values,p){if(!values.length)return 0;const sorted=[...values].sort((a,b)=>a-b);return sorted[Math.min(sorted.length-1,Math.ceil(p*sorted.length)-1)]}
export function groupMetrics(results){const groups={};for(const group of new Set(results.map(r=>r.group)))groups[group]=classificationMetrics([...new Set(results.map(r=>r.actual))],results.filter(r=>r.group===group)).accuracy;const values=Object.values(groups);return {groups,accuracyGap:values.length?Math.max(...values)-Math.min(...values):0}}
const ratio=(a,b)=>b?a/b:0;const average=v=>v.length?v.reduce((a,b)=>a+b,0)/v.length:0;
