'use client';
import {useEffect,useRef,useState,useSyncExternalStore,type FormEvent} from 'react';
import raw from '../intake-content.json';
import BrandLogo from './BrandLogo';
import {validateIntake,submitIntake} from '../lib/intake.mjs';
type Lang='en'|'he';
type L=Record<Lang,string>;
type Opt={v:string}&L;
type Tool=Opt&{services?:string[]};
type Q={id:string;type:'text'|'textarea'|'single'|'multi'|'tools'|'rank';label:L;hint?:L;options?:Opt[];tools?:Tool[];max?:number;optional?:boolean;followup?:{when:string;label:L};from?:string;textLabel?:L};
type Section={id:string;title:L;intro:L;questions:Q[]};
type Answers=Record<string,string|string[]>;
const content=raw as unknown as {ui:typeof raw.ui;sections:Section[]};
const {ui,sections}=content;
const byId=Object.fromEntries(sections.flatMap(s=>s.questions).map(q=>[q.id,q]));
const KEY='tma-intake-draft';
const SHOW_HE=false; // ponytail: Hebrew copy stays in the JSON but is hidden until Michal revises it; flip to true to bring the toggle back
const subscribe=()=>()=>{};
function loadDraft():{lang:Lang;a:Answers}{
 try{const d=JSON.parse(localStorage.getItem(KEY)||'null');if(d&&d.a&&typeof d.a==='object')return {lang:SHOW_HE&&d.lang==='he'?'he':'en',a:d.a};}catch{/* private mode or bad JSON: start fresh */}
 return {lang:'en',a:{}};
}
export default function Intake(){
 // Render the form only in the browser, so the saved draft can seed the first render.
 const ready=useSyncExternalStore(subscribe,()=>true,()=>false);
 return <main id="main" className="intake"><div className="intake-logo"><BrandLogo/></div>{ready?<Form/>:<noscript><p>Please turn on JavaScript to answer, or reply to my email with your answers.</p></noscript>}</main>;
}
function Form(){
 const [draft]=useState(loadDraft);
 const [lang,setLang]=useState<Lang>(draft.lang);
 const [a,setA]=useState<Answers>(draft.a);
 const [errors,setErrors]=useState<Record<string,string>>({});
 const [status,setStatus]=useState(''),[pending,setPending]=useState(false),[sent,setSent]=useState(false);
 const trap=useRef<HTMLInputElement>(null);
 useEffect(()=>{if(sent)return;try{localStorage.setItem(KEY,JSON.stringify({lang,a}));}catch{/* storage unavailable: the form still works */}},[lang,a,sent]);
 const str=(k:string)=>typeof a[k]==='string'?a[k] as string:'';
 const arr=(k:string)=>Array.isArray(a[k])?a[k] as string[]:[];
 const set=(k:string,v:string|string[])=>setA(p=>({...p,[k]:v}));
 const toggle=(k:string,v:string,max?:number)=>setA(p=>{const cur=Array.isArray(p[k])?p[k] as string[]:[];return {...p,[k]:cur.includes(v)?cur.filter(x=>x!==v):max&&cur.length>=max?cur:[...cur,v]};});
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(pending)return;
  const issues=validateIntake(a);
  setErrors(Object.fromEntries(Object.entries(issues).map(([k,v])=>[k,v==='email'?ui.errEmail[lang]:ui.errRequired[lang]])));setStatus('');
  if(Object.keys(issues).length){document.getElementById(Object.keys(issues)[0])?.focus();return;}
  setPending(true);
  try{await submitIntake({...a,lang,website:trap.current?.value??''});setSent(true);try{localStorage.removeItem(KEY);}catch{/* nothing to clear */}window.scrollTo(0,0);}
  catch{setStatus(ui.errSend[lang]);}
  finally{setPending(false);}
 }
 const text=(id:string,label:string,opts:{type?:string;required?:boolean;autoComplete?:string;placeholder?:string;hideLabel?:boolean}={})=><div className="intake-field">
  <label htmlFor={id} className={opts.hideLabel?'sr-only':undefined}>{label}{opts.required&&<span aria-hidden="true"> *</span>}</label>
  <input id={id} type={opts.type??'text'} value={str(id)} onChange={e=>set(id,e.target.value)} maxLength={200} required={opts.required} autoComplete={opts.autoComplete} placeholder={opts.placeholder} aria-invalid={!!errors[id]} aria-describedby={errors[id]?`${id}-error`:undefined}/>
  {errors[id]&&<span className="intake-error" id={`${id}-error`}>{errors[id]}</span>}</div>;
 const area=(id:string,label:string,hideLabel=false)=><div className="intake-field"><label htmlFor={id} className={hideLabel?'sr-only':undefined}>{label}</label><textarea id={id} rows={3} maxLength={3000} value={str(id)} onChange={e=>set(id,e.target.value)}/></div>;
 const pills=(id:string,options:Opt[],multi:boolean,max?:number)=><div className="intake-pills">{options.map(o=>{
  const on=multi?arr(id).includes(o.v):str(id)===o.v;
  return <label className="intake-pill" key={o.v}><input type={multi?'checkbox':'radio'} name={id} checked={on} onChange={()=>multi?toggle(id,o.v,max):set(id,o.v)} onClick={()=>{if(!multi&&on)set(id,'');}}/><span>{o[lang]}</span></label>;})}</div>;
 function question(q:Q,n:number){
  const picked=q.type==='multi'?arr(q.id):[str(q.id)];
  const hint=q.hint?.[lang]??(q.type==='multi'||q.type==='tools'?(q.max?ui.pickMax[lang]:ui.pickAll[lang]):'');
  let body;
  if(q.type==='textarea') body=area(q.id,q.label[lang],true);
  else if(q.type==='text') body=text(q.id,q.label[lang],{hideLabel:true});
  else if(q.type==='single'||q.type==='multi') body=<>{pills(q.id,q.options!,q.type==='multi',q.max)}
   {picked.includes('other')&&text(`${q.id}_other`,ui.typeIt[lang],{hideLabel:true,placeholder:ui.typeIt[lang]})}
   {q.followup&&str(q.id)===q.followup.when&&area(`${q.id}_text`,q.followup.label[lang])}</>;
  else if(q.type==='tools') body=<div className="intake-tools">{q.tools!.map(t=>{
   const on=arr(q.id).includes(t.v),k=`${q.id}_${t.v}`;
   return <div className="intake-tool" key={t.v}><label className="intake-pill"><input type="checkbox" checked={on} onChange={()=>toggle(q.id,t.v)}/><span>{t[lang]}</span></label>
    {on&&(t.services||t.v==='other')&&<div className="intake-services" role="group" aria-label={`${t[lang]}: ${ui.whichService[lang]}`}>
     {t.services&&<><small>{ui.whichService[lang]}</small><div className="intake-pills small">{t.services.map(s=><label className="intake-pill" key={s}><input type="checkbox" checked={arr(k).includes(s)} onChange={()=>toggle(k,s)}/><span dir="ltr">{s}</span></label>)}</div></>}
     {text(`${k}_other`,t.services?ui.otherService[lang]:ui.typeIt[lang],{hideLabel:true,placeholder:t.services?ui.otherService[lang]:ui.typeIt[lang]})}</div>}</div>;})}</div>;
  else{ // rank: three picks from what was ticked in the source question (all of its options if nothing was ticked)
   const from=byId[q.from!],chosen=arr(from.id);
   const options=from.options!.filter(o=>chosen.length?chosen.includes(o.v):o.v!=='other');
   const slots=[0,1,2].map(i=>arr(q.id)[i]??'');
   body=<><div className="intake-rank">{slots.map((v,i)=><label key={i}><span>{ui.rank[lang][i]}</span><select value={options.some(o=>o.v===v)?v:''} onChange={e=>set(q.id,slots.map((s,j)=>j===i?e.target.value:s))}>
    <option value="">{ui.choose[lang]}</option>{options.map(o=><option key={o.v} value={o.v} disabled={slots.some((s,j)=>j!==i&&s===o.v)}>{o.v==='other'&&str(`${from.id}_other`)?str(`${from.id}_other`):o[lang]}</option>)}</select></label>)}</div>
    {area(`${q.id}_text`,q.textLabel![lang])}</>;
  }
  return <fieldset className="intake-q" key={q.id}><legend><b>{n}</b>{q.label[lang]}{q.optional&&<small> ({ui.optional[lang]})</small>}</legend>{hint&&<p className="intake-hint">{hint}</p>}{body}</fieldset>;
 }
 let n=0;
 return <div className="intake-body" dir={lang==='he'?'rtl':'ltr'} lang={lang}>
  {SHOW_HE&&<div className="intake-lang" role="group" aria-label="Language">{(['en','he'] as const).map(l=><button type="button" key={l} aria-pressed={lang===l} onClick={()=>setLang(l)}>{l==='en'?'English':'עברית'}</button>)}</div>}
  {sent?<div className="intake-card intake-thanks" role="status" aria-live="polite"><h1>{ui.thanks[lang][0]}</h1>{ui.thanks[lang].slice(1).map(line=><p key={line}>{line}</p>)}<p className="intake-sign">{ui.sign[lang]}</p></div>
  :<form onSubmit={submit} noValidate>
   <header className="intake-open"><h1>{ui.opening[lang][0]}</h1>{ui.opening[lang].slice(1).map(line=><p key={line}>{line}</p>)}<p className="intake-sign">{ui.sign[lang]}</p></header>
   <input ref={trap} className="trap" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"/>
   <div className="intake-flow">
    <section className="intake-card"><div className="intake-grid">{text('name',ui.name[lang],{required:true,autoComplete:'name'})}{text('business',ui.business[lang],{autoComplete:'organization'})}{text('email',ui.email[lang],{type:'email',required:true,autoComplete:'email'})}
     <fieldset className="intake-field intake-role"><legend>{ui.role[lang]}</legend>{pills('role',ui.roles,false)}</fieldset></div></section>
    {sections.map(s=><section className="intake-card" key={s.id}><h2>{s.title[lang]}</h2><p className="intake-intro">{s.intro[lang]}</p>{s.questions.map(q=>question(q,++n))}</section>)}
    <div className="intake-send"><p className="intake-closing">{ui.closing[lang]}</p><button className="button" type="submit" disabled={pending}>{pending?ui.pending[lang]:ui.submit[lang]}</button><p role="status" className="intake-error">{status}</p></div>
   </div>
  </form>}
 </div>;
}
