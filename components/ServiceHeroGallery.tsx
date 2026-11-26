"use client";
import {useEffect,useState} from "react";

type ServiceLine="vehicle-rental"|"tours-travel"|"event-design"|"gift-boxes";
const slides:Record<ServiceLine,string[]>={
 "vehicle-rental":[
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1200&q=70"
 ],
 "tours-travel":[
  "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=1200&q=70"
 ],
 "event-design":[
  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=1200&q=70"
 ],
 "gift-boxes":[
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=70",
  "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=1200&q=70"
 ]
};
const caseSlides=[
 "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=70",
 "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=70",
 "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=70",
 "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=70"
];
const hubSlides={
 en:[
  {image:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1280&q=70",label:"01 / VEHICLE RENTAL",title:"The right vehicle",emphasis:"for every journey.",body:"Thoughtful vehicle arrangements for city travel, airport transfers and journeys across Indonesia."},
  {image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1280&q=70",label:"02 / TOURS & TRAVEL",title:"Indonesia, closer",emphasis:"to the way you explore.",body:"Private and group journeys shaped around the places, interests and pace that matter to you."},
  {image:"https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1280&q=70",label:"03 / EVENT DESIGN",title:"Moments made",emphasis:"to mean more.",body:"Creative direction, atmosphere and event production, considered down to the detail."},
  {image:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1280&q=70",label:"04 / FRUIT & FLOWER GIFTS",title:"A thoughtful",emphasis:"way to give.",body:"Considered fruit and floral gifts for personal gestures, celebrations and business relationships."}
 ],
 id:[
  {image:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1280&q=70",label:"01 / SEWA KENDARAAN",title:"Kendaraan tepat",emphasis:"untuk setiap perjalanan.",body:"Pilihan kendaraan untuk perjalanan kota, transfer bandara, dan perjalanan menjelajahi Indonesia."},
  {image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1280&q=70",label:"02 / TUR & PERJALANAN",title:"Jelajahi Indonesia",emphasis:"dengan cara Anda.",body:"Perjalanan pribadi dan grup yang dirancang sesuai tempat, minat, dan ritme Anda."},
  {image:"https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1280&q=70",label:"03 / DESAIN ACARA",title:"Momen yang dirancang",emphasis:"untuk lebih bermakna.",body:"Konsep kreatif, suasana, dan produksi acara dengan perhatian pada setiap detail."},
  {image:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1280&q=70",label:"04 / HADIAH BUAH & BUNGA",title:"Hadiah penuh perhatian",emphasis:"untuk setiap momen.",body:"Rangkaian buah dan bunga untuk perhatian personal, perayaan, dan hubungan bisnis."}
 ],
 zh:[
  {image:"https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1280&q=70",label:"01 / 车辆租赁",title:"为每段旅程",emphasis:"找到合适的车辆。",body:"为城市出行、机场接送及印度尼西亚多日旅程提供周到的车辆安排。"},
  {image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1280&q=70",label:"02 / 旅游与行程",title:"以您喜欢的方式",emphasis:"探索印度尼西亚。",body:"围绕目的地、兴趣与节奏，为私人旅程及团体出行提供周到安排。"},
  {image:"https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1280&q=70",label:"03 / 活动策划",title:"让每个重要时刻",emphasis:"更有意义。",body:"从创意概念、现场氛围到活动执行，关注每一个细节。"},
  {image:"https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1280&q=70",label:"04 / 水果与鲜花礼盒",title:"用一份心意",emphasis:"传递美好祝福。",body:"为日常问候、重要庆祝及商务往来准备精致的水果与鲜花礼赠。"}
 ]
} as const;
export function ServiceHeroGallery({serviceLine,hub=false,cases=false,locale}:{serviceLine?:ServiceLine;hub?:boolean;cases?:boolean;locale:"id"|"en"|"zh"}){
 const images=cases?caseSlides:serviceLine?slides[serviceLine]:hubSlides[locale].map(slide=>slide.image);
 const [active,setActive]=useState(0),[previous,setPrevious]=useState<number|null>(null);
 const goTo=(next:number)=>{setPrevious(active);setActive(next);window.setTimeout(()=>setPrevious(null),1400);};
 useEffect(()=>{
  const reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const transitionDuration=reducedMotion?500:1400;
  const timer=window.setInterval(()=>setActive(value=>{setPrevious(value);window.setTimeout(()=>setPrevious(null),transitionDuration);return(value+1)%images.length;}),4800);
  return()=>window.clearInterval(timer);
 },[images.length]);
 useEffect(()=>{const next=(active+1)%images.length;const preload=new window.Image();preload.decoding="async";preload.src=images[next];},[active,images]);
 const label=locale==="zh"?"精选视觉":locale==="id"?"PILIHAN VISUAL":"VISUAL STORIES";
 const activeHubSlide=hub?hubSlides[locale][active]:null;
 return <div className={"service-hero-gallery"+(hub?" service-hub-gallery":"")+(cases?" cases-hero-gallery":"")} aria-label={label}>
  <div className="service-gallery-frame">
   {images.map((src,index)=><img key={src} className={"service-gallery-image"+(index===active?" is-active":index===previous?" is-previous":"")} src={src} alt="" aria-hidden="true" loading={index===0?"eager":"lazy"} decoding="async" fetchPriority={index===0?"high":"auto"}/>)}
   {hub&&activeHubSlide&&<div className="services-hub-copy" aria-live="off">
    <p className="eyebrow light-eyebrow"><span>00</span><span className="typing-copy">{locale==="zh"?"MOBILITY INDONESIA · 服务项目":locale==="id"?"MOBILITY INDONESIA · LAYANAN":"MOBILITY INDONESIA · OUR SERVICES"}</span></p>
    <div className="services-hub-slide-copy" key={active}>
     <span className="services-hub-slide-label">{activeHubSlide.label}</span>
     <h1>{activeHubSlide.title}<br/><em>{activeHubSlide.emphasis}</em></h1>
     <p>{activeHubSlide.body}</p>
    </div>
   </div>}
   <span className="service-gallery-label">{hub?label:label}</span>
   <span className="service-gallery-count">{String(active+1).padStart(2,"0")} <i>/</i> {String(images.length).padStart(2,"0")}</span>
   <span className="service-gallery-caption">{cases?"SELECTED PROJECT STORIES":hub?"MOBILITY INDONESIA":serviceLine?.replace("-"," ").toUpperCase()}</span>
  </div>
  <div className="service-gallery-controls" aria-label={locale==="zh"?"切换图片":locale==="id"?"Pilih gambar":"Choose image"}>
   {images.map((src,index)=><button key={src} type="button" className={index===active?"is-active":""} onClick={()=>goTo(index)} aria-label={(locale==="zh"?"图片 ":locale==="id"?"Gambar ":"Image ")+(index+1)} aria-pressed={index===active}/>)}
  </div>
 </div>;
}
