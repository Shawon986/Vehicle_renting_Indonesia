"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";

/**
 * Lightweight scroll-linked depth for homepage-only photography.
 * Inner pages retain their reveal and hover animations, without parallax drift.
 */
export function ParallaxLayers(){
 const pathname=usePathname();
 useEffect(()=>{
  const localeHome=/^\/(id|en|zh)\/?$/.test(pathname);
  if(!localeHome||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;

  const main=document.querySelector<HTMLElement>("main");
  const hero=main?.querySelector<HTMLElement>(":scope > .hero");
  if(!main||!hero)return;

  const selector=".hero-slide, .fleet-section .vehicle-image-wrap img";
  const visible=new Set<HTMLElement>();
  const nodes=Array.from(main.querySelectorAll<HTMLElement>(selector));
  let frame=0;

  const update=()=>{
   frame=0;
   const mobile=window.matchMedia("(max-width:680px)").matches;
   const midpoint=window.innerHeight*.5;
   visible.forEach(node=>{
    const rect=node.getBoundingClientRect();
    const distance=rect.top+rect.height*.5-midpoint;
    const travel=mobile?0.12:0.18;
    const limit=mobile?52:84;
    const offset=Math.max(-limit,Math.min(limit,-distance*travel));
    node.style.setProperty("--parallax-y",offset.toFixed(1)+"px");
   });
  };
  const schedule=()=>{if(!frame)frame=window.requestAnimationFrame(update);};
  const observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    const node=entry.target as HTMLElement;
    if(entry.isIntersecting)visible.add(node);
    else visible.delete(node);
   });
   schedule();
  },{rootMargin:"140px 0px"});

  nodes.forEach(node=>observer.observe(node));
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",schedule,{passive:true});
  schedule();

  return()=>{
   window.removeEventListener("scroll",schedule);
   window.removeEventListener("resize",schedule);
   observer.disconnect();
   if(frame)window.cancelAnimationFrame(frame);
   nodes.forEach(node=>node.style.removeProperty("--parallax-y"));
  };
 },[pathname]);
 return null;
}
