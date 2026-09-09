'use client';
import {useEffect} from 'react';
/* On phones the contact section is a popup opened by any #contact link (CTA, nav, deep link). Desktop is untouched. */
export default function ContactPopup(){
 useEffect(()=>{
  const mobile=matchMedia('(max-width: 800px)');const section=document.getElementById('contact');if(!section)return;
  let opener:HTMLElement|null=null;
  const open=()=>{section.classList.add('open');document.body.style.overflow='hidden';section.querySelector<HTMLElement>('.contact-close')?.focus();};
  const close=()=>{section.classList.remove('open');document.body.style.overflow='';if(location.hash==='#contact')history.replaceState(null,'','#');opener?.focus();};
  const onClick=(e:MouseEvent)=>{if(!mobile.matches)return;const a=(e.target as HTMLElement).closest('a[href="#contact"]');if(!a)return;e.preventDefault();opener=a as HTMLElement;history.replaceState(null,'','#contact');open();};
  const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'&&section.classList.contains('open'))close();};
  const onClose=(e:Event)=>{if((e.target as HTMLElement).closest('.contact-close'))close();};
  document.addEventListener('click',onClick);document.addEventListener('keydown',onKey);section.addEventListener('click',onClose);
  if(mobile.matches&&location.hash==='#contact')open();
  const onChange=()=>{if(!mobile.matches)close();};mobile.addEventListener('change',onChange);
  return()=>{document.removeEventListener('click',onClick);document.removeEventListener('keydown',onKey);section.removeEventListener('click',onClose);mobile.removeEventListener('change',onChange);};
 },[]);
 return null;
}
