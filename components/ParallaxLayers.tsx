"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";

/**
 * Scroll-linked parallax is reserved exclusively for the homepage contact section.
 * No hero, post-hero image, card, or supporting-page element receives scroll motion.
 */
export function ParallaxLayers(){
 const pathname=usePathname();
 useEffect(()=>{
  const isHome=/^\/(id|en|zh)\/?$/.test(pathname);
  if(!isHome||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;

  const contact=document.querySelector<HTMLElement>("main .contact-section");
  if(!contact)return;

  let frame=0;
  const update=()=>{
   frame=0;
   const mobile=window.matchMedia("(max-width:680px)").matches;
   if(contact){
    const rect=contact.getBoundingClientRect();
    const distance=rect.top+rect.height*.5-window.innerHeight*.5;
    const offset=Math.max(mobile?-34:-52,Math.min(mobile?34:52,-distance*(mobile?0.11:0.15)));
    contact.style.setProperty("--contact-parallax-y",offset.toFixed(1)+"px");
   }
  };
  const schedule=()=>{if(!frame)frame=window.requestAnimationFrame(update);};
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",schedule,{passive:true});
  schedule();

  return()=>{
   window.removeEventListener("scroll",schedule);
   window.removeEventListener("resize",schedule);
   if(frame)window.cancelAnimationFrame(frame);
   contact?.style.removeProperty("--contact-parallax-y");
  };
 },[pathname]);
 return null;
}
