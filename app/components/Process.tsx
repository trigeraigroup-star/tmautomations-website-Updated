'use client';
import {Fragment,useEffect,useRef,useState} from 'react';
import c from '../content.json';
import './Process.css';
const slugs=c.process.steps.map(s=>s.details.slug);
export default function Process(){
 const [selected,setSelected]=useState(0);
 const [hovered,setHovered]=useState<number|null>(null);
 const [open,setOpen]=useState<number|null>(null);
 const closeRef=useRef<HTMLButtonElement>(null);
 const openerRef=useRef<HTMLElement|null>(null);
 const active=hovered??selected;
 // Deep link: #process/discover opens that stage sheet.
 useEffect(()=>{const sync=()=>{const m=location.hash.match(/^#process\/([a-z]+)$/);const i=m?slugs.indexOf(m[1]):-1;if(i>=0){setSelected(i);setOpen(i);const top=document.getElementById('process')?.getBoundingClientRect().top??0;window.scrollTo({top:scrollY+top-72,behavior:'instant'});}};sync();addEventListener('hashchange',sync);return()=>removeEventListener('hashchange',sync);},[]);
 useEffect(()=>{if(open===null)return;closeRef.current?.focus();const key=(e:KeyboardEvent)=>{if(e.key==='Escape')close();};addEventListener('keydown',key);document.body.style.overflow='hidden';return()=>{removeEventListener('keydown',key);document.body.style.overflow='';};},[open]);
 function show(i:number,el:HTMLElement){openerRef.current=el;setSelected(i);setOpen(i);history.replaceState(null,'','#process/'+slugs[i]);}
 function close(){setOpen(null);history.replaceState(null,'','#process');openerRef.current?.focus();}
 const step=open===null?null:c.process.steps[open];
 // Spatial animation is disabled by prefers-reduced-motion in Process.css.
 return <section id="process" className="text-process" data-motion aria-labelledby="process-title">
 <div className="text-process-content"><h2 id="process-title">{c.process.title}</h2><div className="process-stage-stack" onMouseLeave={()=>setHovered(null)}>
 {c.process.steps.map((item,index)=><Fragment key={item.title}>
 <article className={`process-stage-card ${active===index?'current':''}`} onMouseEnter={()=>setHovered(index)} onFocus={()=>setHovered(index)} onBlur={()=>setHovered(null)}>
 <span className="process-stage-number">{String(index+1).padStart(2,'0')}</span>
 <h3>{item.title}</h3>
 <p className="process-stage-body">{item.body}</p><p className="process-stage-result">{item.note}</p>
 <button type="button" className="stage-more" aria-haspopup="dialog" aria-expanded={open===index} aria-label={`${c.process.detailLabels.open}: ${item.title}`} onClick={e=>show(index,e.currentTarget)}>{c.process.detailLabels.open}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6"/></svg></button></article>
 {index<2&&<div className="process-stage-thread" aria-hidden="true"><svg viewBox="0 0 20 42"><path className="process-thread-base" d="M10 0V42"/><path className="process-thread-ink" d="M10 0V42"/></svg></div>}
 </Fragment>)}</div></div>
 {step&&<div className="stage-sheet-backdrop" onClick={close}><div className="stage-sheet" role="dialog" aria-modal="true" aria-labelledby="stage-sheet-title" onClick={e=>e.stopPropagation()}>
 <button ref={closeRef} type="button" className="stage-sheet-close" onClick={close} aria-label={c.process.detailLabels.close}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19"/></svg></button>
 <span className="process-stage-number">{String((open as number)+1).padStart(2,'0')}</span>
 <h3 id="stage-sheet-title">{step.title}</h3>
 <h4>{c.process.detailLabels.happens}</h4><ul>{step.details.happens.map(t=><li key={t}>{t}</li>)}</ul>
 <h4>{c.process.detailLabels.you}</h4><p>{step.details.you}</p>
 <h4>{c.process.detailLabels.get}</h4><p className="stage-get">{step.details.get}</p>
 </div></div>}
 </section>;
}
