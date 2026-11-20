"use client";

import {Children, useRef, type ReactNode} from "react";

type ReviewCarouselProps = {children:ReactNode;className?:string};

export function ReviewCarousel({children,className=""}:ReviewCarouselProps){
 const viewport=useRef<HTMLDivElement>(null);
 const slides=Children.toArray(children);
 function move(direction:-1|1){
  const node=viewport.current;
  if(!node)return;
  const card=node.querySelector<HTMLElement>(".guest-review-card");
  const gap=16;
  const amount=card?card.getBoundingClientRect().width+gap:node.clientWidth;
  node.scrollBy({left:amount*direction,behavior:"smooth"});
 }
 return <div className={`review-carousel ${className}`}>
  <div className="review-carousel-viewport" ref={viewport} tabIndex={0} aria-label="Guest experience examples">
   <div className="review-carousel-track">{slides.map((slide,index)=><div className="review-carousel-slide" key={index}>{slide}</div>)}</div>
  </div>
  <div className="review-carousel-controls">
   <span className="review-carousel-position">{String(slides.length).padStart(2,"0")} <i/> {slides.length} {className.includes("guest-review")?"EXAMPLES":"REVIEWS"}</span>
   <div className="review-carousel-arrows">
    <button type="button" onClick={()=>move(-1)} aria-label="Previous reviews">‹</button>
    <button type="button" onClick={()=>move(1)} aria-label="Next reviews">›</button>
   </div>
  </div>
 </div>;
}
