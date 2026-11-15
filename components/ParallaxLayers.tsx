"use client";
import {useEffect} from "react";

/**
 * Homepage-only parallax for the hero and vehicle collection photographs.
 * Route changes are observed so inner pages never receive parallax styling.
 */
export function ParallaxLayers(){
 useEffect(()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;

  const selector=".hero-slide, .fleet-section .vehicle-image-wrap img";
  const visible=new Set<HTMLElement>();
  let nodes:HTMLElement[]=[];
  let frame=0;

  const update=()=>{
   frame=0;
   const midpoint=(window.innerHeight||1)*.5;
   const mobile=window.matchMedia("(max-width:680px)").matches;
   visible.forEach(node=>{
    const rect=node.getBoundingClientRect();
    const distance=rect.top+rect.height*.5-midpoint;
    const rawOffset=Math.max(-48,Math.min(48,-distance*.075));
    const isFleetImage=node.matches(".fleet-section .vehicle-image-wrap img");
    const scale=isFleetImage ? (mobile ? 0.38 : 0.55) : (mobile ? 0.24 : 0.38);
    node.style.setProperty("--parallax-y",(rawOffset*scale).toFixed(1)+"px");
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
   const current=document.querySelector<HTMLElement>("main");
   const home=current?.querySelector(":scope > .hero")?current:null;
   const found=home?Array.from(home.querySelectorAll<HTMLElement>(selector)):[];
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
  window.addEventListener("resize",()=>{collect();schedule();},{passive:true});
  const resizeHandler=()=>{collect();schedule();};
  window.removeEventListener("resize",resizeHandler);
  window.addEventListener("resize",resizeHandler,{passive:true});
  const mutations=new MutationObserver(()=>{collect();schedule();});
  mutations.observe(document.body,{childList:true,subtree:true});

  return()=>{
   window.removeEventListener("scroll",schedule);
   window.removeEventListener("resize",resizeHandler);
   mutations.disconnect();
   observer.disconnect();
   if(frame)window.cancelAnimationFrame(frame);
   nodes.forEach(node=>node.style.removeProperty("--parallax-y"));
  };
 },[]);
 return null;
}
