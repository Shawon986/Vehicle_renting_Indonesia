"use client";
import {useEffect} from "react";

/**
 * Scroll-linked image depth shared by the localized pages.
 * Only visible image layers are measured, and updates are coalesced to one
 * animation frame so the effect stays light while scrolling.
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
  const visible=new Set<HTMLElement>();
  let nodes:HTMLElement[]=[];
  let frame=0;
  const update=()=>{
   frame=0;
   const height=window.innerHeight||1;
   visible.forEach(node=>{
    const rect=node.getBoundingClientRect();
    const distance=rect.top+rect.height*.5-height*.5;
    const offset=Math.max(-72,Math.min(72,-distance*.12));
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
  },{rootMargin:"120px 0px"});
  const collect=()=>{
   const found=Array.from(document.querySelectorAll<HTMLElement>(selector));
   found.forEach(node=>{if(!nodes.includes(node)){nodes.push(node);observer.observe(node);}});
   nodes=nodes.filter(node=>{
    if(node.isConnected)return true;
    observer.unobserve(node);visible.delete(node);node.style.removeProperty("--parallax-y");return false;
   });
  };
  const resize=()=>{collect();schedule();};
  collect();schedule();
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",resize,{passive:true});
  const mutations=new MutationObserver(()=>{collect();schedule();});
  mutations.observe(document.body,{childList:true,subtree:true});
  return()=>{
   window.removeEventListener("scroll",schedule);
   window.removeEventListener("resize",resize);
   mutations.disconnect();observer.disconnect();
   if(frame)window.cancelAnimationFrame(frame);
   nodes.forEach(node=>node.style.removeProperty("--parallax-y"));
  };
 },[]);
 return null;
}
