"use client";

import {useEffect,useRef,useState,type FormEvent} from "react";
import type {Locale} from "@/lib/site-data";
import {createPortal} from "react-dom";
import {VehicleInquiryForm} from "@/components/site";

type EnquiryValues=Record<string,string>;

export function HomeRentalSearch({locale,enabled=false}:{locale:Locale;enabled?:boolean}){
 const copy=locale==="zh"?{
  eyebrow:"RENTCAROCEAN · 行程咨询",title:"从您的旅程开始。",location:"上车地点",destination:"目的地",pickup:"上车日期",returnDate:"返程日期",category:"车辆类别",passengers:"乘客人数",oneWay:"单程行程",more:"更多行程选项",less:"收起选项",pickupTime:"上车时间",returnTime:"返程时间",age:"驾驶员年龄",license:"驾照签发国家 / 地区",choose:"请选择",search:"继续填写咨询",note:"提交后，我们的团队将确认车辆安排、可用情况及报价。",locationPlaceholder:"机场、城市、酒店或地址",invalid:"请检查地点及行程日期。",close:"关闭咨询表单",modal:"完成您的车辆咨询",summary:"行程概览",stops:"沿途停靠点",addStop:"添加停靠点",removeStop:"移除停靠点",purpose:"行程目的",purposeOptions:["机场接送","商务出行","家庭旅行","观光游览","其他"],luggage:"行李数量",specialRequests:"特殊要求"
 } : locale==="id"?{
  eyebrow:"RENTCAROCEAN · PERTANYAAN PERJALANAN",title:"Mulai dari perjalanan Anda.",location:"Lokasi penjemputan",destination:"Tujuan",pickup:"Tanggal penjemputan",returnDate:"Tanggal kembali",category:"Kategori kendaraan",passengers:"Jumlah penumpang",oneWay:"Perjalanan satu arah",more:"Detail perjalanan lainnya",less:"Sembunyikan detail",pickupTime:"Waktu penjemputan",returnTime:"Waktu kembali",age:"Usia pengemudi",license:"Negara penerbit SIM",choose:"Pilih negara atau wilayah",search:"Lanjutkan ke formulir pertanyaan",note:"Tim kami akan mengonfirmasi pengaturan kendaraan, ketersediaan, dan penawaran secara langsung.",locationPlaceholder:"Bandara, kota, hotel, atau alamat",invalid:"Periksa lokasi dan tanggal perjalanan.",close:"Tutup formulir pertanyaan",modal:"Lengkapi pertanyaan kendaraan Anda",summary:"Ringkasan perjalanan",stops:"Tempat singgah",addStop:"Tambah tempat singgah",removeStop:"Hapus tempat singgah",purpose:"Tujuan perjalanan",purposeOptions:["Transfer bandara","Perjalanan bisnis","Liburan keluarga","Wisata","Lainnya"],luggage:"Perkiraan bagasi",specialRequests:"Permintaan khusus"
 }:{
  eyebrow:"RENTCAROCEAN · JOURNEY ENQUIRY",title:"Start with your journey.",location:"Pickup location",destination:"Destination",pickup:"Pickup date",returnDate:"Return date",category:"Vehicle category",passengers:"Passengers",oneWay:"One-way journey",more:"More journey details",less:"Hide extra details",pickupTime:"Pickup time",returnTime:"Return time",age:"Driver age",license:"Driving licence country / region",choose:"Select country or region",search:"Continue to enquiry",note:"Our team will confirm vehicle arrangements, availability and a quotation directly. This is an enquiry, not a booking.",locationPlaceholder:"Airport, city, hotel or address",invalid:"Please check the locations and journey dates.",close:"Close enquiry form",modal:"Complete your vehicle enquiry",stops:"Additional stops",addStop:"Add a stop",removeStop:"Remove stop",purpose:"Journey purpose",purposeOptions:["Airport transfer","Business travel","Family trip","Sightseeing","Other"],luggage:"Luggage estimate",specialRequests:"Special requests",summary:"Journey summary"
 };
 const categories=[["Car",locale==="zh"?"轿车":locale==="id"?"Mobil":"Car"],["MPV","MPV"],["SUV","SUV"]];
 const countryOptions=["Indonesia","China","Hong Kong","Macau","Taiwan","Japan","Singapore","Malaysia","Thailand","South Korea","United Kingdom","United States","Australia","Other"];
 const [more,setMore]=useState(false),[showEnquiry,setShowEnquiry]=useState(false),[initialValues,setInitialValues]=useState<EnquiryValues>({}),[stops,setStops]=useState<string[]>([]);
 const dialogRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!showEnquiry)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow="hidden";
  const onKey=(event:KeyboardEvent)=>{if(event.key==="Escape"){setShowEnquiry(false);return}if(event.key==="Tab"){const controls=Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')??[]).filter(element=>element.offsetParent!==null);if(controls.length){const first=controls[0],last=controls[controls.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}}}};
  window.addEventListener("keydown",onKey);
  dialogRef.current?.querySelector<HTMLButtonElement>(".home-enquiry-close")?.focus();
  return()=>{document.body.style.overflow=previous;window.removeEventListener("keydown",onKey)};
 },[showEnquiry]);
 function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  const form=event.currentTarget,data=new FormData(form);
  const pickup=String(data.get("pickupDate")||""),returning=String(data.get("returnDate")||"");
  const pickupTime=String(data.get("pickupTime")||"10:00"),returnTime=String(data.get("returnTime")||"10:00");
  const oneWay=data.get("oneWay")==="yes";
  if(!data.get("pickupLocation")||!pickup||(!oneWay&&(!returning||returning<pickup||(returning===pickup&&returnTime<pickupTime)))){
   const returnInput=form.querySelector<HTMLInputElement>('[name="returnDate"]');
   if(returnInput&&!oneWay&&returning<pickup)returnInput.setCustomValidity(copy.invalid);
   form.reportValidity();
   return;
  }
  const notes:string[]=[];
  if(data.get("driverAge"))notes.push("Driver age: "+data.get("driverAge"));
  if(data.get("licenceCountry"))notes.push("Driving licence country/region: "+data.get("licenceCountry"));
  const routeStops=data.getAll("routeStop").map(value=>String(value).trim()).filter(Boolean).slice(0,5);
  if(routeStops.length)notes.push((locale==="zh"?"沿途停靠点":locale==="id"?"Tempat singgah":"Additional stops")+": "+routeStops.join(" → "));
  if(data.get("tripPurpose"))notes.push((locale==="zh"?"行程目的":locale==="id"?"Tujuan perjalanan":"Journey purpose")+": "+data.get("tripPurpose"));
  if(data.get("specialRequests"))notes.push((locale==="zh"?"特殊要求":locale==="id"?"Permintaan khusus":"Special requests")+": "+String(data.get("specialRequests")).slice(0,1000));
  setInitialValues({
   pickupLocation:String(data.get("pickupLocation")||""),
   dropoffLocation:String(data.get("destination")||""),
   pickupDate:pickup,
   pickupTime,
   returnDate:oneWay?"":returning,
   returnTime:oneWay?"":returnTime,
   passengers:String(data.get("passengers")||""),
   vehicleCategory:String(data.get("vehicleCategory")||""),
   luggage:String(data.get("luggage")||""),
   routeStops:routeStops.join(" → "),
   tripPurpose:String(data.get("tripPurpose")||""),
   specialRequests:String(data.get("specialRequests")||""),
   oneWay:oneWay?"yes":"",
   message:notes.join("\n")
  });
  setShowEnquiry(true);
 }
 return <>
  <section className="home-rental-search home-rental-search--hero" aria-labelledby="home-rental-search-title">
   <div className="home-rental-search-backdrop" aria-hidden="true"/>
   <div className="home-rental-search-inner">
    <div className="home-rental-search-heading"><p className="eyebrow">{copy.eyebrow}</p><h2 id="home-rental-search-title">{copy.title}</h2></div>
    <form className="home-rental-search-form" onSubmit={submit}>
     <div className="home-rental-search-main">
      <label className="rental-search-field rental-search-location"><span>{copy.location}</span><input name="pickupLocation" placeholder={copy.locationPlaceholder} required maxLength={180}/></label>
      <label className="rental-search-field"><span>{copy.destination}</span><input name="destination" placeholder={copy.locationPlaceholder} maxLength={180}/></label>
      <label className="rental-search-field"><span>{copy.pickup}</span><input name="pickupDate" type="date" required/></label>
      <label className="rental-search-field rental-return-field"><span>{copy.returnDate}</span><input name="returnDate" type="date" required/></label>
      <label className="rental-search-field"><span>{copy.category}</span><select name="vehicleCategory" defaultValue=""><option value="">{copy.choose}</option>{categories.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
      <label className="rental-search-field"><span>{copy.passengers}</span><input name="passengers" type="number" min="1" max="100" defaultValue="2" required/></label>
      <button className="rental-search-submit" type="submit"><span aria-hidden="true">⌕</span>{copy.search}</button>
     </div>
     <div className="home-rental-search-options">
      <label className="rental-search-checkbox"><input type="checkbox" name="oneWay" value="yes" onChange={event=>{const oneWay=event.currentTarget.checked;const input=event.currentTarget.form?.querySelector<HTMLInputElement>('[name="returnDate"]');if(input){input.disabled=oneWay;input.required=!oneWay;input.setCustomValidity("")}}}/><span>{copy.oneWay}</span></label>
      <button className="rental-search-more" type="button" aria-expanded={more} onClick={()=>setMore(value=>!value)}>{more?copy.less:copy.more}<span aria-hidden="true">{more?"−":"+"}</span></button>
      {more?<div className="rental-search-extra">
       <label className="rental-search-compact"><span>{copy.pickupTime}</span><input name="pickupTime" type="time" defaultValue="10:00"/></label>
       <label className="rental-search-compact rental-return-extra"><span>{copy.returnTime}</span><input name="returnTime" type="time" defaultValue="10:00"/></label>
       <label className="rental-search-compact"><span>{copy.age}</span><input name="driverAge" type="number" min="18" max="100" placeholder="30"/></label>
       <label className="rental-search-compact"><span>{copy.license}</span><select name="licenceCountry" defaultValue=""><option value="">{copy.choose}</option>{countryOptions.map(country=><option key={country} value={country}>{country}</option>)}</select></label>
       <label className="rental-search-compact"><span>{copy.purpose}</span><select name="tripPurpose" defaultValue=""><option value="">{copy.choose}</option>{copy.purposeOptions.map((purpose:string)=><option key={purpose} value={purpose}>{purpose}</option>)}</select></label>
       <label className="rental-search-compact"><span>{copy.luggage}</span><select name="luggage" defaultValue=""><option value="">{copy.choose}</option><option value="light">{locale==="zh"?"少量":locale==="id"?"Ringan":"Light"}</option><option value="medium">{locale==="zh"?"中等":locale==="id"?"Sedang":"Medium"}</option><option value="large">{locale==="zh"?"大量":locale==="id"?"Banyak":"Large"}</option></select></label>
       <div className="rental-search-stops"><span>{copy.stops}</span>{stops.map((stop,index)=><div className="rental-search-stop" key={index}><input name="routeStop" value={stop} onChange={event=>{const value=event.currentTarget.value;setStops(current=>current.map((item,i)=>i===index?value:item))}} maxLength={180} placeholder={locale==="zh"?"停靠地点":locale==="id"?"Lokasi singgah":"Stop location"}/><button type="button" onClick={()=>setStops(current=>current.filter((_,i)=>i!==index))} aria-label={copy.removeStop}>×</button></div>)}{stops.length<5?<button type="button" className="rental-search-add-stop" onClick={()=>setStops(current=>[...current,""])}>+ {copy.addStop}</button>:null}</div>
       <label className="rental-search-special"><span>{copy.specialRequests}</span><textarea name="specialRequests" rows={2} maxLength={1000}/></label>
      </div>:null}
     </div>
     <p className="home-rental-search-note">{copy.note}</p>
    </form>
   </div>
  </section>
  {showEnquiry?createPortal(<div className="home-enquiry-modal" role="presentation" onMouseDown={event=>{if(event.target===event.currentTarget)setShowEnquiry(false)}}>
   <div className="home-enquiry-dialog" role="dialog" aria-modal="true" aria-labelledby="home-enquiry-modal-title" ref={dialogRef}>
    <div className="home-enquiry-dialog-heading"><div><p className="eyebrow">{copy.eyebrow}</p><h2 id="home-enquiry-modal-title">{copy.modal}</h2></div><button className="home-enquiry-close" type="button" onClick={()=>setShowEnquiry(false)} aria-label={copy.close}>×</button></div>
    {initialValues.pickupLocation?<div className="journey-summary"><p className="eyebrow">{copy.summary}</p><strong>{initialValues.pickupLocation}{initialValues.dropoffLocation?" → "+initialValues.dropoffLocation:""}</strong><span>{initialValues.pickupDate}{initialValues.oneWay==="yes"?" · "+copy.oneWay:" → "+initialValues.returnDate}</span>{initialValues.routeStops?<small>{copy.stops}: {initialValues.routeStops}</small>:null}</div>:null}<VehicleInquiryForm locale={locale} enabled={enabled} initialValues={initialValues}/>
   </div>
  </div>,document.body):null}
 </>;
}
