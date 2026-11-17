"use client";
import {useEffect} from "react";
import {Locale,vehicles} from "@/lib/site-data";
import {trackEvent} from "@/lib/analytics";
export function PriceSlot({locale,record}:{locale:Locale;record:string}){
 useEffect(()=>{trackEvent("price_slot_view",{record})},[record]);
 const vehicle=vehicles.find(item=>item.slug===record);
 const labels=locale==="zh"?{heading:"每日租车价格",self:"仅租车",driver:"含司机",all:"全包价",unit:"印尼盾 / 天"}:locale==="id"?{heading:"TARIF SEWA HARIAN",self:"Mobil saja",driver:"Dengan driver",all:"ALL IN",unit:"Rp / hari"}:{heading:"DAILY RENTAL RATES",self:"Car only",driver:"With driver",all:"ALL IN",unit:"IDR / day"};
 if(!vehicle?.pricing)return <div className="price-slot"><span>{labels.heading}</span><strong>{locale==="zh"?"请联系团队询价":locale==="id"?"Hubungi tim untuk harga":"Contact our team for rates"}</strong></div>;
 const entries=[vehicle.pricing.selfDrive?{label:labels.self,value:vehicle.pricing.selfDrive}:null,vehicle.pricing.withDriver?{label:labels.driver,value:vehicle.pricing.withDriver}:null,vehicle.pricing.allIn?{label:labels.all,value:vehicle.pricing.allIn}:null].filter((entry):entry is {label:string;value:number}=>Boolean(entry));
 return <div className="price-slot price-slot-list" aria-label={labels.heading}><div className="price-slot-heading"><span>{labels.heading}</span><small>{labels.unit}</small></div>{entries.map(entry=><div className="price-slot-row" key={entry.label}><span>{entry.label}</span><strong>Rp {new Intl.NumberFormat("id-ID").format(entry.value)}</strong></div>)}</div>;
}
