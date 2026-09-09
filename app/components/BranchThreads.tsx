'use client';
import {useEffect,useRef} from 'react';
import {Route} from './Artwork';
/* The two Opportunity branches leave from the last seal of the workflow and pass through the tile rows.
   Positions depend on the viewport, so paths are measured at runtime (and on resize).
   Desktop: rows to the right, horizontal wipe with static keyframes. Phone: columns below, vertical wipe with
   keyframes generated from the measured tile positions. */
const STOPS_TOP=[23,46,69],STOPS_BOTTOM=[23,46,69,92];
export default function BranchThreads(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const el=ref.current;if(!el)return;const art=el.parentElement as HTMLElement;
  const all=(s:string)=>[...art.querySelectorAll<HTMLElement>(s)];
  const seal=art.querySelector<HTMLElement>('.opportunity-input .action-4 .node-seal');
  const ops=all('.operations .benefit>.illustrated-node .tile-wrap'),gro=all('.growth .benefit>.illustrated-node .tile-wrap');
  if(!seal||!ops.length||!gro.length)return;
  const style=document.createElement('style');el.appendChild(style);
  const mobile=matchMedia('(max-width: 800px)');
  const place=()=>{
   const b=el.getBoundingClientRect();const vx=(x:number)=>(x-b.x)/b.width*1000,vy=(y:number)=>(y-b.y)/b.height*600;
   const c=(n:Element)=>{const r=n.getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2];};
   const [sx,sy]=c(seal);const fx=vx(sx),fy=vy(sy);
   const f=(n:number)=>n.toFixed(1);
   const set=(sel:string,d:string)=>el.querySelectorAll(sel).forEach(p=>p.setAttribute('d',d));
   if(mobile.matches){
    const col=(tiles:HTMLElement[])=>{const xs=tiles.map(t=>vx(c(t)[0]));const ys=tiles.map(t=>vy(c(t)[1]));const x=xs.reduce((a,v)=>a+v,0)/xs.length;const end=vy(tiles[tiles.length-1].getBoundingClientRect().bottom);return {x,ys,end};};
    const a=col(ops),g=col(gro);const run=fy+18;
    set('.branch-top path',`M${f(fx)} ${f(fy)} V${f(run)} C${f(fx)} ${f(run+45)} ${f(a.x)} ${f(a.ys[0]-70)} ${f(a.x)} ${f(a.ys[0])} V${f(a.end)}`);
    set('.branch-bottom path',`M${f(fx)} ${f(fy)} V${f(run)} C${f(fx)} ${f(run+45)} ${f(g.x)} ${f(g.ys[0]-70)} ${f(g.x)} ${f(g.ys[0])} V${f(g.end)}`);
    const kf=(name:string,ys:number[],stops:number[],endAt:number)=>{const start=`inset(0 0 ${(100-fy/6).toFixed(1)}% 0)`;const frames=ys.map((y,i)=>`${stops[i]}%{clip-path:inset(0 0 ${(100-y/6).toFixed(1)}% 0)}`).join('');return `@keyframes ${name}{0%{clip-path:${start}}${frames}${endAt}%,100%{clip-path:inset(0 0 0 0)}}`;};
    style.textContent=kf('branch-top-m',a.ys,STOPS_TOP,77)+kf('branch-bottom-m',g.ys,STOPS_BOTTOM,100);
   }else{
    const row=(tiles:HTMLElement[])=>({y:vy(c(tiles[0])[1]),end:vx(tiles[tiles.length-1].getBoundingClientRect().right)});
    const t=row(ops),g=row(gro);const run=70;
    set('.branch-top path',`M${f(fx)} ${f(fy)} H${f(fx+run)} C${f(fx+run+65)} ${f(fy)} ${f(fx+run+45)} ${f(t.y)} ${f(fx+run+125)} ${f(t.y)} H${f(t.end)}`);
    set('.branch-bottom path',`M${f(fx)} ${f(fy)} H${f(fx+run)} C${f(fx+run+50)} ${f(fy)} ${f(fx+run+25)} ${f(g.y)} ${f(fx+run+85)} ${f(g.y)} H${f(g.end)}`);
    style.textContent='';
   }
  };
  place();const ro=new ResizeObserver(place);ro.observe(art);return()=>{ro.disconnect();style.remove();};
 },[]);
 return <div ref={ref} className="branch-threads"><Route className="branch-top" d="M392 399 H462 C527 399 507 189 587 189 H984"/><Route className="branch-bottom" d="M392 399 H462 C512 399 487 453 547 453 H984"/></div>;
}
