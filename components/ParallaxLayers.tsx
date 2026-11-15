"use client";
import {useEffect} from "react";

/**
 * Lightweight, scroll-driven image depth for every localized route.
 * Uses a passive scroll listener + one animation frame and leaves layout untouched.
 */
export function ParallaxLayers(){
 useEffect(()=>{
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
  if(reduce.matches)return;
  const selector=[
   ".hero-slide",
   ".journey-image",
   ".subpage-hero",
   ".service-gallery-image",
   ".service-direction-art",
   ".services-hub-card-art",
   ".case-category-art",
   ".detail-photo img"
  ].join(",");
  let nodes:HTMLElement[]=[];
  let frame=0;
  const collect=()=>{nodes=Array.from(document.querySelectorAll<HTMLElement>(selector));};
  const update=()=>{
   frame=0;
   const height=window.innerHeight||1;
   for(const node of nodes){
    const rect=node.getBoundingClientRect();
    if(rect.bottom<-120||rect.top>height+120)continue;
    const distance=(rect.top+rect.height*.5-height*.5);
    const offset=Math.max(-110,Math.min(110,-distance*.18));
    node.style.setProperty("--parallax-y",offset.toFixed(1)+"px");
   }
  };
  const schedule=()=>{if(!frame)frame=window.requestAnimationFrame(update);};
  const resize=()=>{collect();schedule();};
  collect();update();
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",resize,{passive:true});
  const observer=new MutationObserver(()=>{collect();schedule();});
  observer.observe(document.body,{childList:true,subtree:true});
  return()=>{window.removeEventListener("scroll",schedule);window.removeEventListener("resize",resize);observer.disconnect();if(frame)window.cancelAnimationFrame(frame);nodes.forEach(node=>node.style.removeProperty("--parallax-y"));};
 },[]);
 return null;
}
