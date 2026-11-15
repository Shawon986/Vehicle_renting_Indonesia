"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";

/**
 * Scroll-linked depth is reserved for the homepage hero, fleet photography,
 * and the 04 "Your Journey, Your Way" image. Supporting pages never receive
 * scroll-driven image offsets.
 */
export function ParallaxLayers(){
 const pathname=usePathname();
 useEffect(()=>{
  const isHome=/^\/(id|en|zh)\/?$/.test(pathname);
  if(!isHome||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;

  const main=document.querySelector<HTMLElement>("main");
  if(!main?.querySelector<HTMLElement>(":scope > .hero"))return;

  const selector=".hero-slide, .fleet-section .vehicle-image-wrap img, .journey-section .journey-image";
  const nodes=Array.from(main.querySelectorAll<HTMLElement>(selector));
  const visible=new Set<HTMLElement>();
  if(!nodes.length)return;
  let frame=0;

  const update=()=>{
   frame=0;
   const mobile=window.matchMedia("(max-width:680px)").matches;
   const midpoint=window.innerHeight*.5;
   visible.forEach(node=>{
    const rect=node.getBoundingClientRect();
    const distance=rect.top+rect.height*.5-midpoint;
    const isJourney=node.classList.contains("journey-image");
    const travel=isJourney?(mobile?0.1:0.14):(mobile?0.12:0.18);
    const limit=isJourney?(mobile?34:58):(mobile?52:84);
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
  },{rootMargin:"160px 0px"});

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
