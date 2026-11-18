"use client";

import {Children, useEffect, useState, type ReactNode} from "react";

type ReviewCarouselProps = {
  children: ReactNode;
  className?: string;
  previousLabel: string;
  nextLabel: string;
};

export function ReviewCarousel({children,className="",previousLabel,nextLabel}:ReviewCarouselProps) {
  const slides=Children.toArray(children);
  const [active,setActive]=useState(0);
  const [paused,setPaused]=useState(false);

  useEffect(()=>{
    if(slides.length<2 || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer=window.setInterval(()=>setActive(current=>(current+1)%slides.length),4800);
    return ()=>window.clearInterval(timer);
  },[slides.length,paused]);

  const goTo=(index:number)=>setActive((index+slides.length)%slides.length);

  return <div className={`review-carousel ${className}`} onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={()=>setPaused(false)}>
    <div className="review-carousel-stage" aria-live="polite" aria-atomic="true">{slides[active]}</div>
    {slides.length>1?<div className="review-carousel-controls">
      <span className="review-carousel-position">{String(active+1).padStart(2,"0")} <i/> {String(slides.length).padStart(2,"0")}</span>
      <div className="review-carousel-dots" role="group" aria-label="Choose a review">
        {slides.map((_,index)=><button key={index} type="button" className={index===active?"is-active":""} aria-label={`Review ${index+1}`} aria-current={index===active?"true":undefined} onClick={()=>goTo(index)}/>)}
      </div>
      <div className="review-carousel-arrows">
        <button type="button" aria-label={previousLabel} onClick={()=>goTo(active-1)}>←</button>
        <button type="button" aria-label={nextLabel} onClick={()=>goTo(active+1)}>→</button>
      </div>
    </div>:null}
  </div>;
}
