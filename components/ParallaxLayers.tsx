"use client";
import {useEffect} from "react";

/**
 * Homepage-only image depth. The selector intentionally excludes every
 * inner-page hero and card so those layouts remain completely static.
 */
export function ParallaxLayers(){
 useEffect(()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const selector=".hero-slide, .journey-image";
  const visible=new Set<HTMLElement>();
  let nodes:HTMLElement[]=[];
  let frame=0;
  const update=()=>{
   frame=0;
   const midpoint=(window.innerHeight||1)*.5;
   visible.forEach(node=>{
    const rect=node.getBoundingClientRect();
    const distance=rect.top+rect.height*.5-midpoint;
    const offset=Math.max(-54,Math.min(54,-distance*.09));
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
  },{rootMargin:"100px 0px"});
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
