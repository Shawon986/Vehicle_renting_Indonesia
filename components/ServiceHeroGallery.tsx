"use client";
import {useEffect,useState} from "react";

type ServiceLine="tours-travel"|"event-design"|"gift-boxes";
const slides:Record<ServiceLine,string[]>={
 "tours-travel":[
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1500&q=85"
 ],
 "event-design":[
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1500&q=85"
 ],
 "gift-boxes":[
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1500&q=85",
  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1500&q=85"
 ]
};
const caseSlides=[
 "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1500&q=85",
 "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1500&q=85",
 "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1500&q=85",
 "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1500&q=85"
];
const hubSlides=[
 "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1500&q=85",
 "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1500&q=85",
 "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1500&q=85"
];
export function ServiceHeroGallery({serviceLine,hub=false,cases=false,locale}:{serviceLine?:ServiceLine;hub?:boolean;cases?:boolean;locale:"id"|"en"|"zh"}){
 const images=cases?caseSlides:serviceLine?slides[serviceLine]:hubSlides;
 const [active,setActive]=useState(0);
 useEffect(()=>{
  if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  const timer=window.setInterval(()=>setActive(value=>(value+1)%images.length),6500);
  return()=>window.clearInterval(timer);
 },[images.length]);
 const label=locale==="zh"?"精选视觉":locale==="id"?"PILIHAN VISUAL":"VISUAL STORIES";
 return <div className={"service-hero-gallery"+(hub?" service-hub-gallery":"")+(cases?" cases-hero-gallery":"")} aria-label={label}>
  <div className="service-gallery-frame">
   {images.map((src,index)=><div key={src} className={"service-gallery-image"+(index===active?" is-active":"")} style={{backgroundImage:'linear-gradient(180deg,rgba(12,24,18,.02),rgba(12,24,18,.2)),url("'+src+'")'}} aria-hidden="true"/>)}
   <span className="service-gallery-label">{label}</span>
   <span className="service-gallery-count">{String(active+1).padStart(2,"0")} <i>/</i> {String(images.length).padStart(2,"0")}</span>
   <span className="service-gallery-caption">{cases?"SELECTED PROJECT STORIES":hub?"MOBILITY INDONESIA":serviceLine?.replace("-"," ").toUpperCase()}</span>
  </div>
  <div className="service-gallery-controls" aria-label={locale==="zh"?"切换图片":locale==="id"?"Pilih gambar":"Choose image"}>
   {images.map((src,index)=><button key={src} type="button" className={index===active?"is-active":""} onClick={()=>setActive(index)} aria-label={(locale==="zh"?"图片 ":locale==="id"?"Gambar ":"Image ")+(index+1)} aria-pressed={index===active}/>)}
  </div>
 </div>;
}
