"use client";
import {useEffect} from "react";
import {Locale} from "@/lib/site-data";
import {trackEvent} from "@/lib/analytics";
export function PriceSlot({locale,record}:{locale:Locale;record:string}){useEffect(()=>{trackEvent("price_slot_view",{record})},[record]);const text=locale==="zh"?"价格：请询价":locale==="id"?"Harga: hubungi kami":"Price on request";return <div className="price-slot" aria-label={text}><span>{locale==="zh"?"服务费用":locale==="id"?"BIAYA LAYANAN":"SERVICE RATE"}</span><strong>{text}</strong></div>}
