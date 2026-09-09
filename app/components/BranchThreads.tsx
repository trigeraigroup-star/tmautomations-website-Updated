'use client';
import {useEffect,useRef} from 'react';
import {Route} from './Artwork';
/* Opportunity threads. Desktop: from the last seal, a short run, then two branches through the rows (horizontal wipe,
   static keyframes). Phone: one continuous serpentine — seal → down-left into row 1 → across → down-left into row 2 →
   across — drawn as four pieces with keyframes generated from the measured tile positions. */
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
    const row=(tiles:HTMLElement[])=>({xs:tiles.map(t=>vx(c(t)[0])),y:vy(c(tiles[0])[1])});
    const r1=row(ops),r2=row(gro);
    const x1a=r1.xs[0],x1z=r1.xs[r1.xs.length-1],x2a=r2.xs[0],x2z=r2.xs[r2.xs.length-1];
    set('.mconn-a path',`M${f(fx)} ${f(fy)} C${f(fx)} ${f(fy+(r1.y-fy)*.55)} ${f(x1a)} ${f(fy+(r1.y-fy)*.45)} ${f(x1a)} ${f(r1.y)}`);
    set('.mrow-1 path',`M${f(x1a)} ${f(r1.y)} H${f(x1z)}`);
    set('.mconn-b path',`M${f(x1z)} ${f(r1.y)} C${f(x1z)} ${f(r1.y+(r2.y-r1.y)*.55)} ${f(x2a)} ${f(r1.y+(r2.y-r1.y)*.45)} ${f(x2a)} ${f(r2.y)}`);
    set('.mrow-2 path',`M${f(x2a)} ${f(r2.y)} H${f(x2z)}`);
    const vert=(name:string,y0:number,y1:number)=>`@keyframes ${name}{from{clip-path:inset(0 0 ${(100-y0/6).toFixed(1)}% 0)}to{clip-path:inset(0 0 ${(100-y1/6-1).toFixed(1)}% 0)}}`;
    const horiz=(name:string,xs:number[],stops:number[])=>{const at=(x:number)=>`clip-path:inset(0 ${(100-x/10).toFixed(1)}% 0 0)`;return `@keyframes ${name}{0%{${at(xs[0])}}${xs.map((x,i)=>`${stops[i]}%{${at(x+2)}}`).join('')}100%{${at(xs[xs.length-1]+3)}}}`;};
    style.textContent=vert('mconn-a-k',fy,r1.y)+horiz('mrow-1-k',r1.xs,[17,58,100])+vert('mconn-b-k',r1.y,r2.y)+horiz('mrow-2-k',r2.xs,[12,41,71,100]);
   }else{
    const rowD=(tiles:HTMLElement[])=>({y:vy(c(tiles[0])[1]),end:vx(tiles[tiles.length-1].getBoundingClientRect().right)});
    const t=rowD(ops),g=rowD(gro);const run=70;
    set('.branch-top path',`M${f(fx)} ${f(fy)} H${f(fx+run)} C${f(fx+run+65)} ${f(fy)} ${f(fx+run+45)} ${f(t.y)} ${f(fx+run+125)} ${f(t.y)} H${f(t.end)}`);
    set('.branch-bottom path',`M${f(fx)} ${f(fy)} H${f(fx+run)} C${f(fx+run+50)} ${f(fy)} ${f(fx+run+25)} ${f(g.y)} ${f(fx+run+85)} ${f(g.y)} H${f(g.end)}`);
    style.textContent='';
   }
  };
  place();const ro=new ResizeObserver(place);ro.observe(art);return()=>{ro.disconnect();style.remove();};
 },[]);
 return <div ref={ref} className="branch-threads"><Route className="branch-top desk-only" d="M392 399 H462 C527 399 507 189 587 189 H984"/><Route className="branch-bottom desk-only" d="M392 399 H462 C512 399 487 453 547 453 H984"/><Route className="mconn-a mob-only" d="M0 0"/><Route className="mrow-1 mob-only" d="M0 0"/><Route className="mconn-b mob-only" d="M0 0"/><Route className="mrow-2 mob-only" d="M0 0"/></div>;
}
