import type {ReactNode} from 'react';
import '../desktop-approved.css';
import '../mobile.css';
import '../services.css';
import SiteHeader from '../components/SiteHeader';
import SiteFooter from '../components/SiteFooter';
export default function ServicesLayout({children}:{children:ReactNode}){return <><a className="skip-link" href="#main">Skip to content</a><SiteHeader/>{children}<SiteFooter/></>;}
