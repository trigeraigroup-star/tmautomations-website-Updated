'use client';
import {Fragment,useState} from 'react';
import c from '../content.json';
import './Process.css';
export default function Process(){
 const [selected,setSelected]=useState(0);
 const [hovered,setHovered]=useState<number|null>(null);
 const active=hovered??selected;
 // Spatial animation is disabled by prefers-reduced-motion in Process.css.
 return <section id="process" className="text-process" data-motion aria-labelledby="process-title">
 <div className="text-process-content"><h2 id="process-title">{c.process.title}</h2><div className="process-stage-stack" onMouseLeave={()=>setHovered(null)}>
 {c.process.steps.map((item,index)=><Fragment key={item.title}>
 <article className={`process-stage-card ${active===index?'current':''}`} onMouseEnter={()=>setHovered(index)} onFocus={()=>setHovered(index)} onBlur={()=>setHovered(null)}>
 <span className="process-stage-number">{String(index+1).padStart(2,'0')}</span>
 <h3><button type="button" aria-pressed={selected===index} onClick={()=>setSelected(index)}>{item.title}</button></h3>
 <p className="process-stage-body">{item.body}</p><p className="process-stage-result">{item.note}</p></article>
 {index<2&&<div className="process-stage-thread" aria-hidden="true"><svg viewBox="0 0 20 42"><path className="process-thread-base" d="M10 0V42"/><path className="process-thread-ink" d="M10 0V42"/></svg></div>}
 </Fragment>)}</div></div></section>;
}
