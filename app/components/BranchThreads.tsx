'use client';
import {useEffect,useRef} from 'react';
import {Route} from './Artwork';
/* The two Opportunity branches must leave from the last seal of the workflow and pass through the tile rows.
   Those positions depend on the viewport, so the paths are measured at runtime (and on resize). */
export default function BranchThreads(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=ref.current;if(!el)return;const art=el.parentElement as HTMLElement;
  const q=(s:string)=>art.querySelector<HTMLElement>(s);
  const seal=q('.opportunity-input .action-4 .node-seal'),r1=q('.operations .benefit .tile-wrap'),r2=q('.growth .benefit .tile-wrap'),e1=[...art.querySelectorAll<HTMLElement>('.operations .benefit .tile-wrap')].pop(),e2=[...art.querySelectorAll<HTMLElement>('.growth .benefit .tile-wrap')].pop();
  if(!seal||!r1||!r2||!e1||!e2)return;
  const place=()=>{
   const b=el.getBoundingClientRect();const vx=(x:number)=>(x-b.x)/b.width*1000,vy=(y:number)=>(y-b.y)/b.height*600;
   const c=(n:Element)=>{const r=n.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2];};
   const [sx,sy]=c(seal),[,y1]=c(r1),[,y2]=c(r2);const fx=vx(sx),fy=vy(sy),ty=vy(y1),by=vy(y2),ex1=vx(e1.getBoundingClientRect().right),ex2=vx(e2.getBoundingClientRect().right);
   const run=70;
   el.querySelectorAll('.branch-top path').forEach(p=>p.setAttribute('d',`M${fx.toFixed(1)} ${fy.toFixed(1)} H${(fx+run).toFixed(1)} C${(fx+run+65).toFixed(1)} ${fy.toFixed(1)} ${(fx+run+45).toFixed(1)} ${ty.toFixed(1)} ${(fx+run+125).toFixed(1)} ${ty.toFixed(1)} H${ex1.toFixed(1)}`));
   el.querySelectorAll('.branch-bottom path').forEach(p=>p.setAttribute('d',`M${fx.toFixed(1)} ${fy.toFixed(1)} H${(fx+run).toFixed(1)} C${(fx+run+50).toFixed(1)} ${fy.toFixed(1)} ${(fx+run+25).toFixed(1)} ${by.toFixed(1)} ${(fx+run+85).toFixed(1)} ${by.toFixed(1)} H${ex2.toFixed(1)}`));
   el.style.setProperty('--fork',`${(100-fx/10).toFixed(1)}%`);
  };
  place();const ro=new ResizeObserver(place);ro.observe(art);return()=>ro.disconnect();
 },[]);
 return <div ref={ref} className="branch-threads"><Route className="branch-top" d="M392 399 H462 C527 399 507 189 587 189 H984"/><Route className="branch-bottom" d="M392 399 H462 C512 399 487 453 547 453 H984"/></div>;
}
