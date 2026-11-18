"use client";

import {Children, useEffect, useState, type ReactNode} from "react";

type ReviewCarouselProps = {
  children: ReactNode;
  className?: string;
};

export function ReviewCarousel({children,className=""}:ReviewCarouselProps) {
  const slides=Children.toArray(children);
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);

  useEffect(()=>{
    if(slides.length<2 || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer=window.setInterval(()=>setActive(current=>(current+1)%slides.length),4800);
    return ()=>window.clearInterval(timer);
  },[slides.length,paused]);

  return <div className={`review-carousel ${className}`} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
    <div className="review-carousel-viewport" aria-live="polite" aria-atomic="true">
      <div className="review-carousel-track" style={{transform:`translate3d(-${active*100}%,0,0)`}}>
        {slides.map((slide,index)=><div className="review-carousel-slide" key={index} aria-hidden={index!==active}>{slide}</div>)}
      </div>
    </div>
    {slides.length>1?<div className="review-carousel-controls" aria-hidden="true">
      <span className="review-carousel-position">{String(active+1).padStart(2,"0")} <i/> {String(slides.length).padStart(2,"0")}</span>
      <div className="review-carousel-progress"><span style={{width:`${((active+1)/slides.length)*100}%`}}/></div>
    </div>:null}
  </div>;
}
