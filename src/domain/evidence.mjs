import {createHash,createSign,createVerify} from 'node:crypto';
export function createEvidence(report){const body={schemaVersion:'1.0',generatedAt:new Date().toISOString(),report};return {...body,integrity:{algorithm:'sha256',digest:digest(body)}}}
export function verifyEvidence(evidence){const {integrity,...body}=evidence;return integrity?.algorithm==='sha256'&&integrity.digest===digest(body)}
export function signEvidence(evidence,privateKey){const signature=createSign('SHA256').update(JSON.stringify(evidence)).end().sign(privateKey,'base64');return {...evidence,signature:{algorithm:'RSA-SHA256',value:signature}}}
export function verifySignedEvidence(signed,publicKey){const {signature,...evidence}=signed;if(!signature||!verifyEvidence(evidence))return false;return createVerify('SHA256').update(JSON.stringify(evidence)).end().verify(publicKey,signature.value,'base64')}
const digest=value=>createHash('sha256').update(JSON.stringify(value)).digest('hex');
