import {NextRequest,NextResponse} from "next/server";
import {randomUUID} from "node:crypto";
import {vehicles} from "@/lib/site-data";
export const runtime="nodejs";
const escapeHtml=(value:string)=>value.replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]??char));
const validDate=(value:string)=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const date=new Date(value+"T00:00:00Z");return Number.isFinite(date.getTime())&&date.toISOString().slice(0,10)===value};
const localeText={id:{subject:"Pertanyaan sewa kendaraan",ack:"Kami telah menerima pertanyaan sewa kendaraan Anda. Tim kami akan meninjau detail perjalanan dan menghubungi Anda untuk membahas opsi yang sesuai. Tanggal dan ketersediaan hanya dikonfirmasi secara langsung. Pesan ini bukan konfirmasi pemesanan.",received:"Pertanyaan Anda telah diterima"},en:{subject:"Vehicle rental enquiry",ack:"We have received your vehicle rental enquiry. Our team will review your journey details and contact you to discuss suitable options. Dates and availability are confirmed directly by our team. This message is not a booking confirmation.",received:"We received your enquiry"},zh:{subject:"车辆租赁咨询",ack:"我们已收到您的车辆租赁咨询。团队将审核您的行程信息并联系您讨论合适方案。日期与车辆安排仅由工作人员直接确认。本邮件不代表预订成功。",received:"已收到您的咨询"}};
export async function POST(request:NextRequest){
 const origin=request.headers.get("origin"),host=request.headers.get("host");
 if(origin&&host){try{if(new URL(origin).host!==host)return NextResponse.json({error:"Invalid origin"},{status:403})}catch{return NextResponse.json({error:"Invalid origin"},{status:403})}}
 const required=["RESEND_API_KEY","INQUIRY_TO_EMAIL","INQUIRY_FROM_EMAIL","TURNSTILE_SECRET_KEY","UPSTASH_REDIS_REST_URL","UPSTASH_REDIS_REST_TOKEN"];
 if(required.some(key=>!process.env[key]))return NextResponse.json({error:"Inquiry service is not configured"},{status:503});
 let body:Record<string,unknown>;try{const parsed=await request.json();if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))throw new Error();body=parsed as Record<string,unknown>}catch{return NextResponse.json({error:"Invalid request"},{status:400})}
 const value=(key:string,max=2000)=>typeof body[key]==="string"?(body[key] as string).trim().slice(0,max):"";
 const leadId=randomUUID();
 if(value("website",200))return NextResponse.json({ok:true,leadId});
 const locale=value("locale",4);if(!["id","en","zh"].includes(locale))return NextResponse.json({error:"Invalid locale"},{status:400});
 const name=value("name",100),email=value("email",160),phone=value("phone",40),pickupDate=value("pickupDate",10),returnDate=value("returnDate",10),pickupTime=value("pickupTime",5),returnTime=value("returnTime",5),pickupLocation=value("pickupLocation",180),passengers=Number(value("passengers",3));
 if(!name||!email||!phone||!pickupDate||!returnDate||!pickupTime||!returnTime||!pickupLocation||!value("consent",10))return NextResponse.json({error:"Missing required fields"},{status:400});
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return NextResponse.json({error:"Invalid email"},{status:400});
 if(phone.length<6||!Number.isInteger(passengers)||passengers<1||passengers>100)return NextResponse.json({error:"Invalid contact or passenger count"},{status:400});
 if(value("consent",10)!=="yes"||!validDate(pickupDate)||!validDate(returnDate)||returnDate<pickupDate||!/^\d{2}:\d{2}$/.test(pickupTime)||!/^\d{2}:\d{2}$/.test(returnTime)||(returnDate===pickupDate&&returnTime<pickupTime))return NextResponse.json({error:"Invalid trip details or consent"},{status:400});
 if(!["whatsapp","wechat","email","phone"].includes(value("preferredChannel",30)))return NextResponse.json({error:"Invalid contact preference"},{status:400});
 const vehicle=value("vehicle",80);if(vehicle&&!vehicles.some(item=>item.slug===vehicle))return NextResponse.json({error:"Unknown vehicle selection"},{status:400});
 const travelStyle=value("travelStyle",40);if(travelStyle&&!["self-drive","with-driver"].includes(travelStyle))return NextResponse.json({error:"Invalid travel arrangement"},{status:400});
 const addOnValues=Array.isArray(body.addOns)?body.addOns.filter((item):item is string=>typeof item==="string"&&["child-seat","cooler-box","wifi"].includes(item)):typeof body.addOns==="string"&&["child-seat","cooler-box","wifi"].includes(body.addOns)?[body.addOns]:[];
 const ip=request.headers.get("x-real-ip")||request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim()||request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
 try{
  const rate=await fetch(process.env.UPSTASH_REDIS_REST_URL!,{method:"POST",headers:{authorization:"Bearer "+process.env.UPSTASH_REDIS_REST_TOKEN,"content-type":"application/json"},body:JSON.stringify(["EVAL","local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],3600) end; return n","1","inquiry:"+ip]),signal:AbortSignal.timeout(5000)});
  if(!rate.ok)return NextResponse.json({error:"Rate limit unavailable"},{status:503});
  const rateData=await rate.json() as {result:number};if(Number(rateData.result)>5)return NextResponse.json({error:"Too many requests"},{status:429});
  const token=value("turnstileToken",4096);if(!token)return NextResponse.json({error:"Security verification required"},{status:400});
  const verify=await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify",{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:new URLSearchParams({secret:process.env.TURNSTILE_SECRET_KEY!,response:token,remoteip:ip}),signal:AbortSignal.timeout(8000)});
  if(!verify.ok)return NextResponse.json({error:"Security verification failed"},{status:400});
  const verdict=await verify.json() as {success:boolean};if(!verdict.success)return NextResponse.json({error:"Security verification failed"},{status:400});
 }catch{return NextResponse.json({error:"Security verification is temporarily unavailable"},{status:503})}
 const record={leadId,serviceLine:"vehicle-rental",locale,name,email,phone,company:value("company",160),wechatId:locale==="zh"?value("wechatId",100):"",preferredChannel:value("preferredChannel",30),pickupDate,pickupTime,returnDate,returnTime,pickupLocation,passengers,luggage:value("luggage",30),vehicle,travelStyle,addOns:addOnValues,message:value("message",2000),marketingConsent:value("marketingConsent",10)==="yes",consentAt:new Date().toISOString(),sourcePath:value("pagePath",300),receivedAt:new Date().toISOString()};
 if(process.env.INQUIRY_SHEETS_WEBHOOK_URL){try{const sheet=await fetch(process.env.INQUIRY_SHEETS_WEBHOOK_URL,{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(record),signal:AbortSignal.timeout(8000)});if(!sheet.ok)return NextResponse.json({error:"Enquiry could not be saved. Please try again."},{status:502})}catch{return NextResponse.json({error:"Enquiry could not be saved. Please try again."},{status:502})}}
 const rows:Record<string,string>={ "Lead reference":leadId,"Service line":"Vehicle rental","Locale":locale,Name:name,Email:email,Phone:phone,Company:record.company,"WeChat ID":record.wechatId,"Preferred channel":record.preferredChannel,"Pickup date":pickupDate,"Pickup time":pickupTime,"Return date":returnDate,"Return time":returnTime,"Pickup location":pickupLocation,Passengers:String(passengers),Luggage:record.luggage,Vehicle:vehicle,Travel arrangement:travelStyle,"Add-ons":addOnValues.join(", "),Message:record.message,"Marketing consent":record.marketingConsent?"yes":"no","Consent timestamp":record.consentAt,"Source page":record.sourcePath};
 const html=Object.entries(rows).map(([key,val])=>"<p><strong>"+escapeHtml(key)+":</strong> "+escapeHtml(val||"—")+"</p>").join("");
 const safeName=name.replace(/[\r\n]/g," ").slice(0,100),mailTo=process.env.INQUIRY_TO_EMAIL_VEHICLE_RENTAL||process.env.INQUIRY_TO_EMAIL!,copy=localeText[locale as keyof typeof localeText];
 try{const sent=await fetch("https://api.resend.com/emails",{method:"POST",headers:{authorization:"Bearer "+process.env.RESEND_API_KEY,"content-type":"application/json"},body:JSON.stringify({from:process.env.INQUIRY_FROM_EMAIL,to:[mailTo],reply_to:email,subject:copy.subject+" — "+safeName,html}),signal:AbortSignal.timeout(10000)});if(!sent.ok)return NextResponse.json({error:"Email delivery failed"},{status:502})}catch{return NextResponse.json({error:"Email delivery failed"},{status:502})}
 await fetch("https://api.resend.com/emails",{method:"POST",headers:{authorization:"Bearer "+process.env.RESEND_API_KEY,"content-type":"application/json"},body:JSON.stringify({from:process.env.INQUIRY_FROM_EMAIL,to:[email],subject:copy.received,text:copy.ack}),signal:AbortSignal.timeout(8000)}).catch(()=>null);
 return NextResponse.json({ok:true,leadId});
}
