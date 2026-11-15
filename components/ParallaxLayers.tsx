"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";

/**
 * Scroll-linked depth is applied to post-hero photography only.
 * Homepage hero remains still; supporting pages receive the same photo motion.
 */
export function ParallaxLayers(){
 const pathname=usePathname();
 useEffect(()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;

  const isHome=/^\/(id|en|zh)\/?$/.test(pathname);
  const selector=isHome
   ? ".vehicle-image-wrap img, .journey-section .journey-image"
   : ".service-direction-art, .services-hub-card-art, .case-category-art, .detail-photo img";
  const photos=Array.from(document.querySelectorAll<HTMLElement>(selector));
  const contact=isHome?document.querySelector<HTMLElement>("main .contact-section"):null;
  if(!photos.length&&!contact)return;

  let frame=0;
  const update=()=>{
   frame=0;
   const mobile=window.matchMedia("(max-width:680px)").matches;
   const travel=mobile?0.105:0.145;
   const limit=mobile?30:52;
   photos.forEach(photo=>{
    const rect=photo.getBoundingClientRect();
    const distance=rect.top+rect.height*.5-window.innerHeight*.5;
    const offset=Math.max(-limit,Math.min(limit,-distance*travel));
    photo.style.setProperty("--photo-parallax-y",offset.toFixed(1)+"px");
   });
   if(contact){
    const rect=contact.getBoundingClientRect();
    const distance=rect.top+rect.height*.5-window.innerHeight*.5;
    const offset=Math.max(-42,Math.min(42,-distance*.13));
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
   photos.forEach(photo=>photo.style.removeProperty("--photo-parallax-y"));
   contact?.style.removeProperty("--contact-parallax-y");
  };
 },[pathname]);
 return null;
}
