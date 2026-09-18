/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors: static pages, no client routing */
import type {Service} from '../services/data';
import Icon from './Icon';
export default function ServicePage({s}:{s:Service}){
 const faq={'@context':'https://schema.org','@type':'FAQPage',mainEntity:s.faq.map(f=>({'@type':'Question',name:f.q,acceptedAnswer:{'@type':'Answer',text:f.a}}))};
 return <main id="main" className="service shell"><p className="service-crumb"><a href="/services">Services</a></p><h1>{s.title}</h1><p className="service-lead">{s.lead}</p>
 <section aria-labelledby="for-who"><h2 id="for-who">Who it’s for</h2><ul>{s.forWho.map(t=><li key={t}>{t}</li>)}</ul></section>
 <section aria-labelledby="we-do"><h2 id="we-do">What we do</h2><ul>{s.weDo.map(t=><li key={t}>{t}</li>)}</ul></section>
 <section aria-labelledby="you-get"><h2 id="you-get">What you get</h2><p className="service-get">{s.youGet}</p></section>
 <section aria-labelledby="faq"><h2 id="faq">Questions owners ask</h2>{s.faq.map(f=><details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>)}</section>
 <div className="service-cta"><a className="button" href="/#health-check">Start with a free Health Check<Icon/></a><a className="service-alt" href="/#contact">or just say hello</a></div>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faq)}}/>
 </main>;
}
