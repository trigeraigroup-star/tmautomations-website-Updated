/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors: static pages, no client routing */
import c from '../content.json';
import Icon from './Icon';
import BrandLogo from './BrandLogo';
import {services} from '../services/data';
/* Shared header: Services (with a hover list on desktop) first, then the story anchors, then the Health Check pill. */
export default function SiteHeader(){
 return <header className="site-header"><a className="brand" href="/#top" aria-label="TMAutomations home"><BrandLogo/></a><nav aria-label="Primary navigation"><div className="nav-services"><a href="/services">Services</a><ul className="services-menu">{services.map(s=><li key={s.slug}><a href={`/services/${s.slug}`}>{s.title}</a></li>)}</ul></div>{c.nav.map(item=><a key={item.id} href={`/#${item.id}`}>{item.label}</a>)}<a className="button nav-cta" href="/#health-check">{c.healthCheck.heroCta}<Icon/></a></nav></header>;
}
