"use client";

import {useEffect,useState} from "react";

const slides=[
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2400&q=85",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=2400&q=85"
];

export function HomeHeroSlideshow(){
  const [active,setActive]=useState(0);

  useEffect(()=>{
    const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if(reduceMotion)return;
    const timer=window.setInterval(()=>setActive(current=>(current+1)%slides.length),6000);
    return()=>window.clearInterval(timer);
  },[]);

  return <>
    <div className="hero-image" aria-hidden="true">
      {slides.map((src,index)=><div key={src} className={index===active?"hero-slide hero-slide-active":"hero-slide"} style={{backgroundImage:`linear-gradient(90deg,rgba(10,22,18,.84),rgba(10,22,18,.58) 39%,rgba(10,22,18,.1)),linear-gradient(0deg,rgba(8,18,14,.52),transparent 40%),url("${src}")`}}/>)}
    </div>
    <div className="hero-index" aria-live="off">{String(active+1).padStart(2,"0")} <span>/</span> {String(slides.length).padStart(2,"0")}</div>
  </>;
}
