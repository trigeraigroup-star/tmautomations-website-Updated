import type {Metadata} from 'next';
import {services} from '../data';
import ServicePage from '../../components/ServicePage';
const s=services.find(x=>x.slug==='seo-aeo-lead-generation')!;
export const metadata:Metadata={title:`${s.title} | TMAutomations`,description:s.short};
export default function Page(){return <ServicePage s={s}/>;}
