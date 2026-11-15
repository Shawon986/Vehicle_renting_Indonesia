"use client";
import {useEffect} from "react";

/**
 * Homepage-only parallax for the hero and vehicle collection photographs.
 * The homepage hero is the scope guard: inner pages are never observed.
 */
export function ParallaxLayers(){
 useEffect(()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const home=document.querySelector("main");
  if(!home?.querySelector(":scope > .hero"))return;

  const selector=".hero-slide, .fleet-section .vehicle-image-wrap img";
  const visible=new Set<HTMLElement>();
  let nodes:HTMLElement[]=[];
  let frame=0;

  const update=()=>{
   frame=0;
   const midpoint=(window.innerHeight||1)*.5;
   visible.forEach(node=>{
    const rect=node.getBoundingClientRect();
    const distance=rect.top+rect.height*.5-midpoint;
    const offset=Math.max(-48,Math.min(48,-distance*.075));
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
   const found=Array.from(home.querySelectorAll<HTMLElement>(selector));
   found.forEach(node=>{
    if(!nodes.includes(node)){nodes.push(node);observer.observe(node);}
   });
   nodes=nodes.filter(node=>{
    if(node.isConnected)return true;
    observer.unobserve(node);
    visible.delete(node);
    node.style.removeProperty("--parallax-y");
    return false;
   });
  };

  collect();
  schedule();
  window.addEventListener("scroll",schedule,{passive:true});
  window.addEventListener("resize",schedule,{passive:true});
  const mutations=new MutationObserver(()=>{collect();schedule();});
  mutations.observe(home,{childList:true,subtree:true});

  return()=>{
   window.removeEventListener("scroll",schedule);
   window.removeEventListener("resize",schedule);
   mutations.disconnect();
   observer.disconnect();
   if(frame)window.cancelAnimationFrame(frame);
   nodes.forEach(node=>node.style.removeProperty("--parallax-y"));
  };
 },[]);
 return null;
}
