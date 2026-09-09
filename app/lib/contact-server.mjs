/** Server-side contact delivery through Resend. Success is reported only after Resend acknowledges the email. */
import {validateContact} from './contact.mjs';
const FIELD_LABELS={name:'Name',email:'Email',phone:'Phone',company:'Company',businessType:'Business type',employees:'Employees',priorities:'Biggest difference',message:'Message'};
const RATE_LIMIT={max:5,windowMs:10*60*1000};
const hits=new Map(); // ponytail: per-isolate memory; move to a Cloudflare Rate Limiting binding if abuse ever shows up.
export function rateLimited(ip,now=Date.now()){
 const recent=(hits.get(ip)??[]).filter(t=>now-t<RATE_LIMIT.windowMs);
 recent.push(now);hits.set(ip,recent);
 return recent.length>RATE_LIMIT.max;
}
export function normalizeContact(values){
 const out={};
 for(const key of ['name','email','phone','company','businessType','employees','message']) out[key]=String(values?.[key]??'').trim();
 const p=values?.priorities;out.priorities=(Array.isArray(p)?p:p?[p]:[]).map(String).filter(v=>['Organization','Growth'].includes(v));
 return out;
}
export function buildEmail(values,env){
 const to=String(env.CONTACT_TO||'michal@tmautomations.io').split(',').map(s=>s.trim()).filter(Boolean); // comma-separated list allowed
 const from=env.CONTACT_FROM||'TMAutomations <hello@tmautomations.io>';
 const lines=Object.entries(FIELD_LABELS).map(([k,label])=>{const v=Array.isArray(values[k])?values[k].join(', '):values[k];return v?`${label}: ${v}`:null;}).filter(Boolean);
 return {from,to,reply_to:values.email,subject:`New enquiry from ${values.name}${values.company?` (${values.company})`:''}`,text:lines.join('\n')};
}
export class ContactError extends Error{constructor(status,message){super(message);this.status=status;}}
export async function deliverContact(rawValues,env,fetchImpl=fetch){
 const values=normalizeContact(rawValues);
 const issues=validateContact(values);
 if(Object.keys(issues).length) throw new ContactError(400,'Please review the highlighted fields.');
 if(!env.RESEND_API_KEY) throw new ContactError(503,'Email delivery is not connected yet. Your details have not been sent. Please call (850) 775-6906.');
 const res=await fetchImpl('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(buildEmail(values,env))});
 if(!res.ok){const detail=typeof res.text==='function'?await res.text().catch(()=>''):'';console.error('[contact] Resend rejected the email',res.status,detail.slice(0,300));throw new ContactError(502,'We could not send your message right now. Please try again or call (850) 775-6906.');}
 return {ok:true};
}
