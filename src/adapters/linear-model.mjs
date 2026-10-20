export class LinearClassifier {
  constructor({weights,bias,labels}){if(!Array.isArray(weights)||weights.length!==labels.length)throw new Error('weights/labels mismatch');this.weights=weights;this.bias=bias??labels.map(()=>0);this.labels=labels}
  async infer(features){const started=process.hrtime.bigint();const logits=this.weights.map((row,index)=>row.reduce((sum,w,i)=>sum+w*features[i],this.bias[index]??0));const probabilities=softmax(logits);const winner=probabilities.indexOf(Math.max(...probabilities));const latencyMs=Number(process.hrtime.bigint()-started)/1e6;return {label:this.labels[winner],confidence:probabilities[winner],probabilities:Object.fromEntries(this.labels.map((label,index)=>[label,probabilities[index]])),latencyMs,memoryBytes:this.weights.flat().length*8+this.bias.length*8}}
}
function softmax(values){const max=Math.max(...values);const exp=values.map(v=>Math.exp(v-max));const sum=exp.reduce((a,b)=>a+b,0);return exp.map(v=>v/sum)}
