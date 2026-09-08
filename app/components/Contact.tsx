'use client';
import {useRef,useState,useSyncExternalStore,type FormEvent} from 'react';
import c from '../content.json';
import Icon from './Icon';
import {validateContact,submitContact} from '../lib/contact.mjs';
const subscribe=()=>()=>{};
export default function Contact(){
 const ready=useSyncExternalStore(subscribe,()=>true,()=>false);
 const [errors,setErrors]=useState<Record<string,string>>({});
 const [status,setStatus]=useState(''),[pending,setPending]=useState(false),[sent,setSent]=useState(false);
 const sending=useRef(false);
 async function submit(event:FormEvent<HTMLFormElement>){
 event.preventDefault();if(sending.current)return;
 const form=event.currentTarget,data=new FormData(form);
 const values={...Object.fromEntries(data),priorities:data.getAll('priorities')};
 const issues=validateContact(values);setErrors(issues);setStatus('');
 if(Object.keys(issues).length){(form.elements.namedItem(Object.keys(issues)[0]) as HTMLElement)?.focus();return;}
 sending.current=true;setPending(true);
 try{await submitContact(values);setSent(true);}catch(error){setStatus(error instanceof Error?error.message:'Unable to send. Please try again.');}finally{sending.current=false;setPending(false);}
 }
 function field(f:typeof c.contact.fields[number]){
 return <div className={`field ${f.type==='textarea'?'full':''}`} key={f.name}><label htmlFor={f.name}>{f.label}{f.required&&<span aria-hidden="true"> *</span>}</label>
 {f.type==='textarea'?<textarea id={f.name} name={f.name} rows={3} maxLength={5000} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name]?`${f.name}-error`:undefined}/>:<input id={f.name} name={f.name} type={f.type} required={f.required} autoComplete={f.autoComplete} min={f.type==='number'?0:undefined} step={f.type==='number'?1:undefined} maxLength={200} aria-invalid={!!errors[f.name]} aria-describedby={errors[f.name]?`${f.name}-error`:undefined}/>}
 {errors[f.name]&&<span className="field-error" id={`${f.name}-error`}>{errors[f.name]}</span>}</div>;
 }
 return <div className="contact-intake">{sent?<p role="status">{c.contact.success}</p>:<form onSubmit={submit} noValidate><fieldset disabled={!ready}><div className="form-fields">
 {c.contact.fields.filter(f=>f.name!=='message').map(field)}
 <fieldset className="priority-field"><legend>Where could we make the biggest difference?</legend><div>{['Organization','Growth'].map(choice=><label key={choice}><input type="checkbox" name="priorities" value={choice}/>{choice}</label>)}</div></fieldset>
 {c.contact.fields.filter(f=>f.name==='message').map(field)}
 </div><button className="button" disabled={pending} type="submit">{pending?c.contact.pending:c.contact.submit}<Icon/></button><p role="status" className="form-status">{status}</p></fieldset></form>}
 <noscript><p>Please email or call us using the contact details alongside.</p></noscript></div>;
}
