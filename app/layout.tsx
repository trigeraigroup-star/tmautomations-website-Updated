import type {Metadata,Viewport} from 'next';
import './globals.css';
export const metadata:Metadata={title:'TMAutomations | Work that keeps moving',description:'AI workflows built around your small business. Recover time, reduce manual errors, and create room to grow - with a partner who stays accountable.',icons:{icon:[{url:'/favicon.ico',sizes:'32x32'},{url:'/favicon.svg',type:'image/svg+xml'},{url:'/icon-192.png',sizes:'192x192',type:'image/png'}],apple:'/apple-touch-icon.png'}};
export const viewport:Viewport={themeColor:'#f4e6ce'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>;}
