import c from '../content.json';
type T={quote:string;name:string;role?:string;company?:string};
/* Horizontal stripe of torn-paper notes. Renders nothing until real testimonials exist in content.json (no fake proof). */
export default function Testimonials(){
 const items=c.testimonials as T[];
 if(!items.length) return null;
 const loop=[...items,...items]; // two copies for a seamless loop
 return <section className="proof-strip" aria-labelledby="proof-title"><h3 id="proof-title">{c.work.proofTitle}</h3>
 <div className="proof-track-wrap"><ul className="proof-track" style={{'--n':items.length} as React.CSSProperties}>{loop.map((t,i)=><li className={`proof-note tilt-${i%3}`} key={i} aria-hidden={i>=items.length||undefined}><blockquote><p>“{t.quote}”</p><footer><strong>{t.name}</strong>{(t.role||t.company)&&<span>{[t.role,t.company].filter(Boolean).join(' · ')}</span>}</footer></blockquote></li>)}</ul></div>
 </section>;
}
