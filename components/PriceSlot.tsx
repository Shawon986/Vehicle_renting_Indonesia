"use client";
import {useEffect} from "react";
import type {Locale} from "@/lib/site-data";
import {trackEvent} from "@/lib/analytics";

export function PriceSlot({locale,record}:{locale:Locale;record:string}){
 useEffect(()=>{trackEvent("price_slot_view",{record})},[record]);
 const copy=locale==="zh"?{heading:"每日租车价格",value:"请联系团队询价"}:locale==="id"?{heading:"TARIF SEWA HARIAN",value:"Hubungi tim untuk penawaran"}:{heading:"DAILY RENTAL RATES",value:"Price on request"};
 return <div className="price-slot" aria-label={copy.heading}><span>{copy.heading}</span><strong>{copy.value}</strong></div>;
}
