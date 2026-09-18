/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors: static pages, no client routing */
import type {Metadata} from 'next';
import {services} from './data';
import Icon from '../components/Icon';
export const metadata:Metadata={title:'Services | TMAutomations',description:'Workflow automation, AI assistants, AI marketing and SEO & AEO for small and mid-size businesses. Practical systems built around how you already work.'};
export default function Services(){
 return <main id="main" className="service shell"><h1>Services</h1><p className="service-lead">Five ways we take repetitive work off your desk. Every one starts with how your business already runs.</p>
 <ul className="service-grid">{services.map(s=><li key={s.slug}><a href={`/services/${s.slug}`}><h2>{s.title}</h2><p>{s.short}</p><span className="service-more">Read more<Icon/></span></a></li>)}</ul></main>;
}
