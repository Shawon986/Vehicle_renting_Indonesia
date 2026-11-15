"use client";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect,useRef} from "react";
import {Locale} from "@/lib/site-data";
import {trackEvent} from "@/lib/analytics";

export function ContactChannels({locale,itemTitle,serviceLine="vehicle-rental"}:{locale:Locale;itemTitle?:string;serviceLine?:string}){
 const path=usePathname();
 const wechatRef=useRef<HTMLDivElement>(null);
 const number=(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||"").replace(/[^0-9]/g,"");
 const phone=(process.env.NEXT_PUBLIC_PHONE||"").replace(/[^+0-9]/g,"");
 const email=process.env.NEXT_PUBLIC_CONTACT_EMAIL||"";
 const wechatId=process.env.NEXT_PUBLIC_WECHAT_ID||"";
 const qr=process.env.NEXT_PUBLIC_WECHAT_QR_URL||"";
 const labels={
  id:{wa:"Tanya melalui WhatsApp",wechat:"Hubungi melalui WeChat",copy:"Salin ID WeChat",phone:"Telepon tim kami",email:"Kirim email",missing:"Saluran kontak resmi akan ditampilkan setelah diverifikasi.",instruction:"Simpan kode QR atau salin ID WeChat untuk menghubungi tim kami.",form:"Isi formulir pertanyaan",qr:"Buka kode QR WeChat"},
  en:{wa:"Enquire on WhatsApp",wechat:"Contact us on WeChat",copy:"Copy WeChat ID",phone:"Call our team",email:"Email our team",missing:"Official contact channels will appear here once verified.",instruction:"Save the QR code or copy the WeChat ID to contact our team.",form:"Use the enquiry form",qr:"Open WeChat QR code"},
  zh:{wa:"通过 WhatsApp 咨询",wechat:"通过微信联系",copy:"复制微信号",phone:"致电服务团队",email:"发送电子邮件",missing:"官方联系方式将在核实后显示。",instruction:"长按保存二维码，或复制微信号联系服务团队。",form:"填写咨询表单",qr:"打开微信二维码"}
 }[locale];
 const serviceName=serviceLine==="tours-travel"?(locale==="zh"?"旅游与行程":locale==="id"?"Tur & perjalanan":"Tours & travel"):serviceLine==="event-design"?(locale==="zh"?"活动策划":locale==="id"?"Desain acara":"Event design"):serviceLine==="gift-boxes"?(locale==="zh"?"水果与鲜花礼盒":locale==="id"?"Kotak buah & bunga":"Fruit & flower gifts"):(locale==="zh"?"车辆租赁":locale==="id"?"Sewa kendaraan":"Vehicle rental");const message=locale==="zh"?[serviceName,itemTitle||"服务咨询","上车日期和时间：[请填写]","还车日期和时间：[请填写]","乘客人数：[请填写]","上车地点：[请填写]","目的地 / 下车地点：[请填写]","来源页面："+path].join("；"):locale==="id"?[serviceName,itemTitle||"Pertanyaan layanan","Tanggal dan waktu penjemputan: [silakan isi]","Tanggal dan waktu pengembalian: [silakan isi]","Jumlah penumpang: [silakan isi]","Lokasi penjemputan: [silakan isi]","Tujuan / lokasi pengantaran: [silakan isi]","Halaman sumber: "+path].join(" — "):[serviceName,itemTitle||"Service enquiry","Pickup date and time: [please add]","Return date and time: [please add]","Passenger count: [please add]","Pickup point: [please add]","Destination / drop-off: [please add]","Source page: "+path].join(" — ");
 useEffect(()=>{if(locale!=="zh"||!wechatRef.current)return;const node=wechatRef.current;if(!("IntersectionObserver" in window)){trackEvent("wechat_contact_view",{page:path,item_ref:itemTitle||serviceLine});return}let sent=false;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting&&!sent){sent=true;trackEvent("wechat_contact_view",{page:path,item_ref:itemTitle||"vehicle-rental"});observer.disconnect()}},{threshold:.45});observer.observe(node);return()=>observer.disconnect()},[locale,path,itemTitle]);
 const wechatInstruction=wechatId&&qr?labels.instruction:qr?(locale==="zh"?"长按保存二维码以添加服务团队。":locale==="id"?"Simpan kode QR untuk menghubungi tim kami.":"Save the QR code to add our team."):wechatId?(locale==="zh"?"复制微信号联系服务团队。":locale==="id"?"Salin ID WeChat untuk menghubungi tim kami.":"Copy the WeChat ID to contact our team."):labels.missing;
 const waUrl=number?"https://wa.me/"+number+"?text="+encodeURIComponent(message):"";
 async function copy(value:string,eventName="wechat_id_copied"){try{if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(value);else{const field=document.createElement("textarea");field.value=value;field.style.position="fixed";field.style.opacity="0";document.body.appendChild(field);field.select();document.execCommand("copy");field.remove()}trackEvent(eventName,{locale,page:path,item_ref:itemTitle||"vehicle-rental"})}catch{/* Clipboard permissions can be unavailable in embedded browsers. */}}
 const form=<Link className="contact-channel-link" href={"/"+locale+"/contact"} onClick={()=>trackEvent("cta_click",{id:"enquiry-form",page:path,locale})}>{labels.form} ↗</Link>;
 const whatsapp=waUrl?<a className="contact-channel-button contact-whatsapp" href={waUrl} target="_blank" rel="noreferrer" onClick={()=>trackEvent("whatsapp_click",{service_line:serviceLine,item_ref:itemTitle||"fleet",page:path})}><span>WHATSAPP</span><strong>{labels.wa} ↗</strong></a>:null;
 const phoneLink=phone?<a className="contact-channel-link" href={"tel:"+phone} onClick={()=>trackEvent("phone_click",{page:path,locale})}>{labels.phone} ↗</a>:null;
 const emailLink=email?<a className="contact-channel-link" href={"mailto:"+email} onClick={()=>trackEvent("email_click",{page:path,locale})}>{labels.email} ↗</a>:null;
 const wechat=<div ref={wechatRef} className="wechat-contact"><div className="contact-channel-copy"><span className="eyebrow dark-eyebrow">WECHAT · 微信</span><h3>{labels.wechat}</h3><p>{wechatInstruction}</p>{wechatId?<div className="wechat-id-row"><strong>{wechatId}</strong><button type="button" onClick={()=>copy(wechatId)}>{labels.copy}</button><button type="button" onClick={()=>copy(message,"wechat_message_copied")}>{locale==="zh"?"复制咨询内容":locale==="id"?"Salin pesan pertanyaan":"Copy enquiry message"}</button></div>:<p className="contact-config-note">{labels.missing}</p>}</div>{qr?<a className="wechat-qr" href={qr} target="_blank" rel="noreferrer" onClick={()=>trackEvent("wechat_qr_saved",{page:path,item_ref:itemTitle||"vehicle-rental"})} aria-label={labels.qr}><Image src={qr} alt={labels.qr} width={144} height={144} unoptimized/></a>:null}</div>;
 return <div className={"contact-channels contact-channels-"+locale}>
  {locale==="zh"?<>{wechat}{form}{phoneLink}{whatsapp}{emailLink}</>:locale==="id"?<>{whatsapp}{phoneLink}{form}{emailLink}</>:<>{whatsapp}{form}{emailLink}{phoneLink}</>}
 </div>;
}
