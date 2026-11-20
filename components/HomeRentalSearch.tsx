"use client";

import type {FormEvent} from "react";
import type {Locale} from "@/lib/site-data";

export function HomeRentalSearch({locale}:{locale:Locale}){
 const copy=locale==="zh"?{
  eyebrow:"车辆租赁咨询",title:"从您的行程开始。",location:"上车地点 / 城市",destination:"目的地（选填）",pickup:"取车日期",pickupTime:"取车时间",returnDate:"还车日期",returnTime:"还车时间",oneWay:"单程行程",age:"驾驶员年龄",license:"驾照签发国家 / 地区",choose:"请选择",search:"提交租车咨询",note:"提交后，我们的团队将直接确认车辆可用情况、服务范围及报价。",locationPlaceholder:"机场、城市、酒店或地址",agePlaceholder:"例如 30",invalid:"请检查地点和日期。"
 } : locale==="id"?{
  eyebrow:"PERTANYAAN SEWA KENDARAAN",title:"Mulai dari perjalanan Anda.",location:"Lokasi / kota penjemputan",destination:"Tujuan (opsional)",pickup:"Tanggal penjemputan",pickupTime:"Waktu penjemputan",returnDate:"Tanggal pengembalian",returnTime:"Waktu pengembalian",oneWay:"Perjalanan satu arah",age:"Usia pengemudi",license:"Negara / wilayah penerbit SIM",choose:"Pilih negara atau wilayah",search:"Kirim pertanyaan sewa",note:"Tim kami akan mengonfirmasi ketersediaan kendaraan, cakupan layanan, dan penawaran secara langsung. Ini adalah pertanyaan, bukan pemesanan instan.",locationPlaceholder:"Bandara, kota, hotel, atau alamat",agePlaceholder:"mis. 30",invalid:"Periksa lokasi penjemputan dan tanggal."
 }:{
  eyebrow:"VEHICLE RENTAL ENQUIRY",title:"Start with your journey.",location:"Pickup location / city",destination:"Destination (optional)",pickup:"Pickup date",pickupTime:"Pickup time",returnDate:"Return date",returnTime:"Return time",oneWay:"One-way journey",age:"Driver age",license:"Driving licence country / region",choose:"Select country or region",search:"Send rental enquiry",note:"Our team will confirm vehicle availability, service coverage and a quotation directly. This is an enquiry, not an instant booking.",locationPlaceholder:"Airport, city, hotel or address",agePlaceholder:"e.g. 30",invalid:"Please check the pickup location and dates."
 };
 const countryOptions=["Indonesia","China","Hong Kong","Macau","Taiwan","Japan","Singapore","Malaysia","Thailand","South Korea","United Kingdom","United States","Australia","Other"];
 function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();
  const form=event.currentTarget;
  const data=new FormData(form);
  const pickup=String(data.get("pickupDate")||"");
  const returning=String(data.get("returnDate")||"");
  const oneWay=data.get("oneWay")==="on";
  if(!data.get("pickupLocation")||!pickup||(!oneWay&&(!returning||returning<pickup))){
   const returnInput=form.elements.namedItem("returnDate") as HTMLInputElement|null;
   if(returnInput&&!oneWay&&returning<pickup)returnInput.setCustomValidity(copy.invalid);
   form.reportValidity();
   return;
  }
  const fields=[
   "Vehicle rental enquiry",
   "Pickup: "+data.get("pickupLocation"),
   "Destination: "+(data.get("destination")||"Not specified"),
   "Pickup date/time: "+pickup+" "+(data.get("pickupTime")||"Not specified"),
   "Return: "+(oneWay?"One-way":returning+" "+(data.get("returnTime")||"Not specified")),
   "Driver age: "+(data.get("driverAge")||"Not specified"),
   "Driving licence country/region: "+(data.get("licenceCountry")||"Not specified")
  ];
  const raw=process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||"087811887555";
  let phone=raw.replace(/[^0-9]/g,"");
  if(phone.startsWith("0"))phone="62"+phone.slice(1);
  window.location.assign("https://wa.me/"+phone+"?text="+encodeURIComponent(fields.join("\n")));
 }
 return <section className="home-rental-search" aria-labelledby="home-rental-search-title">
  <div className="home-rental-search-backdrop" aria-hidden="true"/>
  <div className="home-rental-search-inner">
   <div className="home-rental-search-heading"><p className="eyebrow">{copy.eyebrow}</p><h2 id="home-rental-search-title">{copy.title}</h2></div>
   <form className="home-rental-search-form" onSubmit={submit}>
    <div className="home-rental-search-main">
     <label className="rental-search-field rental-search-location"><span>{copy.location}</span><input name="pickupLocation" placeholder={copy.locationPlaceholder} required maxLength={180}/></label>
     <label className="rental-search-field"><span>{copy.destination}</span><input name="destination" placeholder={copy.locationPlaceholder} maxLength={180}/></label>
     <label className="rental-search-field"><span>{copy.pickup}</span><input name="pickupDate" type="date" required/></label>
     <label className="rental-search-field"><span>{copy.pickupTime}</span><input name="pickupTime" type="time" defaultValue="10:00" required/></label>
     <label className="rental-search-field rental-return-field"><span>{copy.returnDate}</span><input name="returnDate" type="date" required/></label>
     <label className="rental-search-field rental-return-field"><span>{copy.returnTime}</span><input name="returnTime" type="time" defaultValue="10:00" required/></label>
     <button className="rental-search-submit" type="submit"><span aria-hidden="true">⌕</span>{copy.search}</button>
    </div>
    <div className="home-rental-search-options">
     <label className="rental-search-checkbox"><input type="checkbox" name="oneWay" onChange={event=>{const oneWay=event.currentTarget.checked;const form=event.currentTarget.form;const fields=form?.querySelectorAll<HTMLInputElement>(".rental-return-field input");fields?.forEach(field=>{field.disabled=oneWay;field.required=!oneWay;field.setCustomValidity("");});}}/><span>{copy.oneWay}</span></label>
     <label className="rental-search-compact"><span>{copy.age}</span><input name="driverAge" type="number" min="18" max="100" placeholder={copy.agePlaceholder}/></label>
     <label className="rental-search-compact"><span>{copy.license}</span><select name="licenceCountry" defaultValue=""><option value="">{copy.choose}</option>{countryOptions.map(country=><option key={country} value={country}>{country}</option>)}</select></label>
    </div>
    <p className="home-rental-search-note">{copy.note}</p>
   </form>
  </div>
 </section>;
}
