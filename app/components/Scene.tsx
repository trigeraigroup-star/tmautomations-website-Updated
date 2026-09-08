import type {CSSProperties, ReactNode} from 'react';
export default function Scene({id,name,titleId,children,length=220,next}:{id:string;name:string;titleId:string;children:ReactNode;length?:number;next?:string}){
 return <section id={id} className={`scene ${name}`} data-motion aria-labelledby={titleId} style={{'--scene-length':`${length}svh`} as CSSProperties}><div className="scene-stage"><div className="scene-composition">{children}</div>{next&&<a href={`#${next}`} className="scroll-cue"><span>Scroll to continue</span><i aria-hidden="true"/></a>}</div></section>;
}
