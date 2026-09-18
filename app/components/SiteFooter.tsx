/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors: static pages, no client routing */
import c from '../content.json';
export default function SiteFooter(){return <footer className="shell"><a className="brand" href="/#top"><span>TM</span>Automations</a><p>{c.footer}</p></footer>;}
