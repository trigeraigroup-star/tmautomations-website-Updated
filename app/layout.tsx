import type {Metadata,Viewport} from 'next';
import './globals.css';
export const metadata:Metadata={title:'TMAutomations | Work that keeps moving',description:'AI workflows built around your small business. Recover time, reduce manual errors, and create room to grow - with a partner who stays accountable.',icons:{icon:'/favicon.svg'}};
export const viewport:Viewport={themeColor:'#f4e6ce'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
