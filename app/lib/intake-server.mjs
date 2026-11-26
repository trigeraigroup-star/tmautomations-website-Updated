/** Server-side delivery of the pre-call interview. Answers are checked against intake-content.json: unknown choices are dropped, text is trimmed and capped. */
import {ContactError} from './contact-server.mjs';
import {validateIntake} from './intake.mjs';
const clip=(v,n)=>(typeof v==='string'?v:'').trim().slice(0,n);
const list=v=>(Array.isArray(v)?v:[]).map(String);
const SHORT=200,LONG=3000;
function choice(q,key,values){
 const opt=(q.options??[]).find(o=>o.v===key);
 if(!opt) return '';
 const other=opt.v==='other'?clip(values[`${q.id}_other`],SHORT):'';
 return other?`${opt.en}: ${other}`:opt.en;
}
function answer(q,values,byId){
 const v=values[q.id];
 if(q.type==='text') return clip(v,SHORT);
 if(q.type==='textarea') return clip(v,LONG);
 if(q.type==='single'){
  let out=choice(q,String(v??''),values);
  const more=q.followup&&v===q.followup.when?clip(values[`${q.id}_text`],LONG):'';
  if(out&&more) out+=`\n   ${q.followup.label.en} ${more}`;
  return out;
 }
 if(q.type==='multi') return [...new Set(list(v))].map(k=>choice(q,k,values)).filter(Boolean).slice(0,q.max??99).join('; ');
 if(q.type==='tools'){
  const picked=list(v);
  return q.tools.filter(t=>picked.includes(t.v)).map(t=>{
   const services=list(values[`${q.id}_${t.v}`]).filter(s=>(t.services??[]).includes(s));
   const other=clip(values[`${q.id}_${t.v}_other`],SHORT);
   const detail=[...services,other].filter(Boolean).join(', ');
   return `\n   - ${t.en}${detail?`: ${detail}`:''}`;
  }).join('');
 }
 if(q.type==='rank'){
  const from=byId[q.from];
  const picks=[...new Set(list(v))].map(k=>choice(from,k,values)).filter(Boolean).slice(0,3).map((s,i)=>`\n   ${i+1}. ${s}`).join('');
  const saving=clip(values[`${q.id}_text`],LONG);
  return picks+(saving?`\n   ${q.textLabel.en} ${saving}`:'');
 }
 return '';
}
export function buildIntakeEmail(values,env,content){
 const to=String(env.CONTACT_TO||'michal@tmautomations.io').split(',').map(s=>s.trim()).filter(Boolean);
 const from=env.CONTACT_FROM||'TMAutomations <hello@tmautomations.io>';
 const name=clip(values.name,SHORT),business=clip(values.business,SHORT),email=clip(values.email,SHORT);
 const role=content.ui.roles.find(r=>r.v===values.role)?.en??'';
 const byId=Object.fromEntries(content.sections.flatMap(s=>s.questions).map(q=>[q.id,q]));
 const head=[['Name',name],['Business',business],['Email',email],['Role',role],['Answered in',values.lang==='he'?'Hebrew':'English']].filter(([,v])=>v).map(([k,v])=>`${k}: ${v}`);
 let n=0;
 const body=content.sections.map(s=>{
  const lines=s.questions.map(q=>{n++;const a=answer(q,values,byId);return `${n}. ${q.label.en}\n   ${a?a.replace(/^\n\s*/,''):'(skipped)'}`;});
  return `${s.title.en.replace(/\.$/,'').toUpperCase()}\n${lines.join('\n')}`;
 });
 return {from,to,reply_to:email,subject:`${values.website?'[possible bot] ':''}Pre-call interview: ${business||name}`.replace(/\s+/g,' ') /* honeypot hit is tagged, never dropped: autofill can fill the hidden field for a real client */,text:[head.join('\n'),...body].join('\n\n')};
}
export async function deliverIntake(rawValues,env,content,fetchImpl=fetch){
 const values=rawValues&&typeof rawValues==='object'?rawValues:{};
 if(Object.keys(validateIntake(values)).length) throw new ContactError(400,'Please add your name and a valid email address.');
 if(!env.RESEND_API_KEY) throw new ContactError(503,'Email delivery is not connected yet. Your answers have not been sent.');
 const res=await fetchImpl('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify(buildIntakeEmail(values,env,content))});
 if(!res.ok){const detail=typeof res.text==='function'?await res.text().catch(()=>''):'';console.error('[intake] Resend rejected the email',res.status,detail.slice(0,300));throw new ContactError(502,'We could not send your answers right now.');}
 return {ok:true};
}
