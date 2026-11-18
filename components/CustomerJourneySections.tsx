import Link from "next/link";
import type {Locale} from "@/lib/site-data";

export function TrustPrinciples({locale}:{locale:Locale}){
 const copy={
  en:{eyebrow:"THE WAY WE WORK",title:"A clear process, across every service.",items:[["One connected service brand","Vehicle rental, tours and travel, event design, and fruit and flower gifts under PT Ocean Zenith Group."],["A person confirms the details","Our team reviews each enquiry and discusses dates, service scope and availability directly with you."],["Clarity before you agree","The relevant service details and quotation are explained directly. This website does not take online bookings or payments."]],link:"Meet the company"},
  id:{eyebrow:"CARA KAMI BEKERJA",title:"Proses yang jelas untuk setiap layanan.",items:[["Satu brand dengan beragam layanan","Sewa kendaraan, tur dan perjalanan, desain acara, serta hadiah buah dan bunga di bawah PT Ocean Zenith Group."],["Detail dikonfirmasi oleh tim","Tim kami meninjau setiap pertanyaan dan membahas tanggal, cakupan layanan, serta ketersediaan secara langsung."],["Kejelasan sebelum Anda menyetujui","Detail layanan dan penawaran dijelaskan langsung. Situs ini tidak menerima pemesanan atau pembayaran online."]],link:"Kenali perusahaan"},
  zh:{eyebrow:"我们的服务方式",title:"清晰沟通，贯穿每一项服务。",items:[["一个品牌，连接多种服务","PT Ocean Zenith Group 旗下涵盖车辆租赁、旅游与行程、活动策划，以及水果与鲜花礼盒。"],["由工作人员直接确认","团队会审核每一项咨询，并与您直接沟通日期、服务范围及可用情况。"],["确认前，先了解清楚","相关服务内容与报价由团队直接说明。本网站不提供在线预订或付款。"]],link:"了解公司"}
 }[locale];
 return <section className="trust-principles" aria-labelledby="trust-principles-title"><div className="trust-principles-heading"><p className="eyebrow dark-eyebrow"><span>05</span> {copy.eyebrow}</p><h2 id="trust-principles-title">{copy.title}</h2></div><div className="trust-principles-grid">{copy.items.map(([title,body],i)=><article className="trust-principle" key={title}><span className="trust-principle-number">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><Link className="text-link dark-link" href={"/"+locale+"/about"}>{copy.link}<span className="arrow-up" aria-hidden="true"/></Link></section>;
}

export function PickupGuide({locale}:{locale:Locale}){
 const copy={
  en:{eyebrow:"PICKUP & ROUTE PLANNING",title:"Start with the places that matter.",intro:"Tell us exactly where your journey begins and ends. Share an airport and terminal, a hotel name, or a street address; our team will confirm whether the requested route is covered and explain the arrangements.",cards:[["01","Airport pickup","Include the airport name, terminal and preferred meeting point."],["02","Hotel pickup","Share the hotel name, area and destination."],["03","A location of your choice","Provide the full pickup address and drop-off point."]],note:"Coverage and any applicable additional-zone arrangements are confirmed by our team. A location option is a way to describe your request, not a live service or availability guarantee.",cta:"Share your pickup details"},
  id:{eyebrow:"PENJEMPUTAN & RUTE",title:"Mulai dari lokasi yang penting bagi Anda.",intro:"Beri tahu kami lokasi awal dan tujuan perjalanan secara spesifik. Cantumkan nama bandara dan terminal, nama hotel, atau alamat jalan; tim kami akan mengonfirmasi apakah rute tersebut termasuk cakupan layanan dan menjelaskan pengaturannya.",cards:[["01","Penjemputan bandara","Cantumkan nama bandara, terminal, dan titik temu yang diinginkan."],["02","Penjemputan hotel","Bagikan nama hotel, area, dan tujuan perjalanan."],["03","Lokasi pilihan Anda","Berikan alamat penjemputan lengkap dan lokasi pengantaran."]],note:"Cakupan layanan dan pengaturan zona tambahan, jika berlaku, akan dikonfirmasi oleh tim. Pilihan lokasi hanya membantu menjelaskan permintaan, bukan jaminan layanan atau ketersediaan.",cta:"Bagikan detail penjemputan"},
  zh:{eyebrow:"上车地点与路线安排",title:"从您关心的地点开始规划。",intro:"请具体告知行程的起点与终点。您可以填写机场及航站楼、酒店名称或街道地址；团队会确认该路线是否属于服务范围，并说明相关安排。",cards:[["01","机场接送","请提供机场名称、航站楼及期望的会合地点。"],["02","酒店接送","请提供酒店名称、所在区域及目的地。"],["03","指定地点接送","请填写完整的上车地址及下车地点。"]],note:"服务范围及可能涉及的额外区域安排均由团队确认。地点选项仅用于描述您的需求，并不代表服务或车辆实时可用的保证。",cta:"提交上车地点"}
 }[locale];
 return <section className="pickup-guide" aria-labelledby="pickup-guide-title"><div className="pickup-guide-heading"><p className="eyebrow dark-eyebrow"><span>02</span> {copy.eyebrow}</p><h2 id="pickup-guide-title">{copy.title}</h2><p>{copy.intro}</p></div><div className="pickup-guide-grid">{copy.cards.map(([number,title,body])=><article className="pickup-guide-card" key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div><div className="pickup-guide-bottom"><p>{copy.note}</p><Link className="button button-dark" href={"/"+locale+"/services/vehicle-rental#enquire"}>{copy.cta}<span className="arrow-up" aria-hidden="true"/></Link></div></section>;
}

type ServiceKey="vehicle-rental"|"tours-travel"|"event-design"|"gift-boxes";
const services:Record<Locale,{key:ServiceKey;title:string;body:string}[]> = {
 en:[{key:"vehicle-rental",title:"Vehicle rental",body:"Vehicle options and journey arrangements."},{key:"tours-travel",title:"Tours & travel",body:"Private and group journeys shaped around your plans."},{key:"event-design",title:"Event design",body:"Creative direction, styling and event coordination."},{key:"gift-boxes",title:"Fruit & flower gifts",body:"Thoughtful gifting for personal and business occasions."}],
 id:[{key:"vehicle-rental",title:"Sewa kendaraan",body:"Pilihan kendaraan dan pengaturan perjalanan."},{key:"tours-travel",title:"Tur & perjalanan",body:"Perjalanan pribadi dan grup sesuai rencana Anda."},{key:"event-design",title:"Desain acara",body:"Konsep kreatif, styling, dan koordinasi acara."},{key:"gift-boxes",title:"Hadiah buah & bunga",body:"Hadiah penuh perhatian untuk momen personal dan bisnis."}],
 zh:[{key:"vehicle-rental",title:"车辆租赁",body:"车辆选择与出行安排咨询。"},{key:"tours-travel",title:"旅游与行程",body:"根据您的计划了解私人及团体旅程。"},{key:"event-design",title:"活动策划",body:"创意概念、场景设计与活动协调。"},{key:"gift-boxes",title:"水果与鲜花礼盒",body:"适用于个人及商务场合的用心礼赠。"}]
};
export function ServiceCrossLinks({locale,current}:{locale:Locale;current?:ServiceKey}){
 const title=locale==="zh"?"探索其他服务":locale==="id"?"Jelajahi layanan lainnya":"Explore the other services";
 const items=services[locale].filter(item=>item.key!==current);
 return <section className="service-crosslinks" aria-labelledby="service-crosslinks-title"><div className="service-crosslinks-heading"><p className="eyebrow dark-eyebrow"><span>04</span> {locale==="zh"?"服务组合":locale==="id"?"PORTOFOLIO LAYANAN":"THE SERVICE PORTFOLIO"}</p><h2 id="service-crosslinks-title">{title}</h2></div><div className="service-crosslinks-grid">{items.map((item,i)=><Link className="service-crosslink-card" href={"/"+locale+"/services/"+item.key} key={item.key}><span>0{i+1} / RENTCAROCEAN</span><h3>{item.title}</h3><p>{item.body}</p><i className="ui-arrow" aria-hidden="true"/></Link>)}</div></section>;
}

export function HowItWorksPreview({locale}:{locale:Locale}){
 const copy={
  en:{eyebrow:"FROM ENQUIRY TO CONFIRMATION",title:"Four steps. No guesswork.",intro:"A real person reviews your request and confirms the details with you directly.",steps:[["01","Share your plan","Send your dates, pickup and drop-off points, group size and preferences."],["02","We review the request","Our team checks the requested service, route and relevant arrangements."],["03","Receive a clear response","Availability, service inclusions and the quotation are discussed and confirmed in writing."],["04","Proceed with confidence","You decide after reviewing the details. This website does not create a booking or take payment."]],cta:"See the full process"},
  id:{eyebrow:"DARI PERTANYAAN HINGGA KONFIRMASI",title:"Empat langkah. Tanpa menebak.",intro:"Permintaan Anda ditinjau oleh tim dan detailnya dikonfirmasi secara langsung.",steps:[["01","Bagikan rencana Anda","Kirim tanggal, lokasi penjemputan dan tujuan, jumlah peserta, serta preferensi."],["02","Tim meninjau kebutuhan","Tim kami memeriksa layanan, rute, dan pengaturan yang relevan."],["03","Terima penjelasan yang jelas","Ketersediaan, cakupan layanan, dan penawaran dibahas serta dikonfirmasi secara tertulis."],["04","Lanjutkan setelah sepakat","Anda memutuskan setelah meninjau detailnya. Situs ini tidak membuat pemesanan atau menerima pembayaran."]],cta:"Lihat proses lengkap"},
  zh:{eyebrow:"从咨询到确认",title:"四个步骤，清晰明了。",intro:"您的需求将由工作人员审核，并与您直接确认相关细节。",steps:[["01","分享您的计划","提供日期、上车与下车地点、同行人数及偏好。"],["02","团队审核需求","团队会了解所需服务、路线及相关安排。"],["03","收到清晰回复","车辆可用情况、服务包含项目及报价均会通过书面方式沟通确认。"],["04","确认后再继续","了解细节后由您决定是否继续。本网站不会自动生成预订，也不收取在线付款。"]],cta:"查看完整流程"}
 }[locale];
 return <div className="home-process-preview"><section className="how-intro editorial-content"><div><p className="eyebrow dark-eyebrow"><span>03</span> {copy.eyebrow}</p><h2>{copy.title}</h2></div><p>{copy.intro}</p></section><section className="how-steps editorial-content"><div className="how-step-grid">{copy.steps.map(([number,title,body])=><article className="how-step-card" key={number}><span className="how-step-number">{number}</span><span className="how-step-rule"/><h2>{title}</h2><p>{body}</p></article>)}</div><Link className="text-link dark-link" href={"/"+locale+"/how-it-works"}>{copy.cta}<span className="arrow-up" aria-hidden="true"/></Link></section></div>;
}


const guestReviews = {
 en: {
  eyebrow: "GUEST EXPERIENCES",
  title: "The journey, through their eyes.",
  intro: "Thoughtful journeys, comfortable vehicles and service details that make travelling easier.",
  label: "SAMPLE REVIEW",
  items: [
   ["Alex M.","Family journey","Toyota Innova","A comfortable, practical choice for travelling together. The spacious cabin makes longer days on the road feel easier.","Comfort & space"],
   ["Sophie L.","Group travel","Toyota Hiace","When everyone travels together, space matters. The Hiace is a useful option for keeping a group in one vehicle.","Group comfort"],
   ["Daniel R.","City travel","Toyota Avanza","A sensible vehicle for getting around the city and moving between stops during a busy day.","Everyday convenience"],
   ["Maya K.","Modern mobility","BYD M6","A contemporary electric vehicle option for travellers who appreciate a modern cabin and a quieter ride.","Modern experience"],
   ["Oliver T.","Family holiday","Toyota Innova","Room for the family and the essentials made this feel like a good fit for a relaxed holiday itinerary.","Family-friendly"],
   ["Isabella C.","Private group","Toyota Hiace Premio","A spacious people-mover is ideal when the trip includes several passengers and luggage.","Space for everyone"],
   ["Ethan W.","Flexible itinerary","Vehicle with driver","Having the journey arranged around our planned stops is exactly the kind of convenience travellers look for.","Personalised planning"],
   ["Grace N.","Indonesia visit","Private transport","A clear enquiry process and a vehicle suited to the trip make planning transport feel more straightforward.","Easy planning"]
  ]
 },
 id: {
  eyebrow: "PENGALAMAN TAMU",
  title: "Cerita perjalanan dari sudut pandang mereka.",
  intro: "Perjalanan yang nyaman, pilihan kendaraan yang tepat, dan layanan yang memudahkan perjalanan Anda.",
  label: "ULASAN CONTOH",
  items: [
   ["Alex M.","Perjalanan keluarga","Toyota Innova","Pilihan yang nyaman dan praktis untuk bepergian bersama keluarga. Kabin yang lega membuat perjalanan jauh terasa lebih santai.","Kenyamanan & ruang"],
   ["Sophie L.","Perjalanan grup","Toyota Hiace","Saat bepergian bersama rombongan, ruang menjadi penting. Hiace cocok untuk membawa grup dalam satu kendaraan.","Kenyamanan grup"],
   ["Daniel R.","Perjalanan kota","Toyota Avanza","Kendaraan yang praktis untuk berkeliling kota dan berpindah lokasi selama hari yang padat.","Praktis sehari-hari"],
   ["Maya K.","Mobilitas modern","BYD M6","Pilihan kendaraan listrik modern bagi wisatawan yang menyukai kabin kontemporer dan perjalanan lebih senyap.","Pengalaman modern"],
   ["Oliver T.","Liburan keluarga","Toyota Innova","Ruang untuk keluarga dan barang bawaan menjadikannya pilihan yang sesuai untuk rencana liburan santai.","Ramah keluarga"],
   ["Isabella C.","Perjalanan privat","Toyota Hiace Premio","Kendaraan penumpang yang lega ideal untuk perjalanan dengan beberapa penumpang dan bagasi.","Ruang untuk semua"],
   ["Ethan W.","Rencana fleksibel","Kendaraan dengan pengemudi","Pengaturan perjalanan yang mengikuti titik pemberhentian kami adalah kemudahan yang dicari wisatawan.","Rencana personal"],
   ["Grace N.","Kunjungan ke Indonesia","Transportasi privat","Proses pertanyaan yang jelas dan kendaraan yang sesuai membuat perencanaan transportasi terasa lebih mudah.","Perencanaan mudah"]
  ]
 },
 zh: {
  eyebrow: "宾客体验",
  title: "从旅客的视角，感受每一段旅程。",
  intro: "舒适的车辆、周到的安排，让每一段旅程更加轻松。",
  label: "示例评价",
  items: [
   ["Alex M.","家庭出行","Toyota Innova","适合全家同行的舒适实用之选。宽敞的车厢让较长时间的旅途更加轻松。","舒适与空间"],
   ["Sophie L.","团队出行","Toyota Hiace","多人同行时，空间非常重要。Hiace 适合让团队乘坐同一辆车出行。","团队舒适度"],
   ["Daniel R.","城市出行","Toyota Avanza","适合城市内出行，也方便在忙碌的一天中往返多个地点。","日常便利"],
   ["Maya K.","现代出行","BYD M6","适合喜欢现代化内饰和更安静驾乘体验的旅客的电动车选择。","现代体验"],
   ["Oliver T.","家庭假期","Toyota Innova","充足的乘坐与行李空间，让它成为轻松家庭行程的合适选择。","适合家庭"],
   ["Isabella C.","私人团体","Toyota Hiace Premio","如果同行人数较多且携带行李，宽敞的多人座车辆会更加合适。","宽敞空间"],
   ["Ethan W.","灵活行程","带司机车辆","根据计划中的停靠地点安排旅程，是旅行者期待的便利体验。","个性化安排"],
   ["Grace N.","印尼之旅","私人交通","清晰的咨询流程，加上适合行程的车辆，让交通规划更加简单。","轻松规划"]
  ]
 }
} as const;

export function GuestExperiences({locale}:{locale:Locale}){
 const copy=guestReviews[locale];
 return <section className="guest-experiences" aria-labelledby="guest-experiences-title">
  <div className="guest-experiences-heading">
   <div><p className="eyebrow dark-eyebrow"><span>04</span> {copy.eyebrow}</p><h2 id="guest-experiences-title">{copy.title}</h2><p className="guest-experiences-intro">{copy.intro}</p></div>
   <span className="guest-experiences-count">08 / EXPERIENCES</span>
  </div>
  <div className="guest-review-track" aria-label={copy.eyebrow}>
   {copy.items.map(([name,trip,vehicle,review,tag],index)=><article className="guest-review-card" key={name}>
    <div className="guest-review-top"><span className="guest-review-index">0{index+1}</span><span className="guest-review-sample">{copy.label}</span></div>
    <div className="guest-review-stars" aria-label="Illustrative five-star rating">★★★★★</div>
    <blockquote>“{review}”</blockquote>
    <div className="guest-review-bottom"><div><strong>{name}</strong><span>{trip} · {vehicle}</span></div><small>{tag}</small></div>
   </article>)}
  </div>
 </section>;
}

const vehicleReviewCopy = {
 en: {
  title: "A closer look at the experience",
  intro: "Sample feedback themes for this vehicle. Replace these with genuine customer submissions before presenting them as actual reviews.",
  label: "SAMPLE REVIEW",
  items: {
   "new-avanza": [["Jordan P.","City and airport journeys","A practical size for getting around town, with a cabin that works well for everyday trips."],["Amelia R.","Short family break","A straightforward option when we wanted comfortable transport without choosing a larger vehicle."]],
   "innova-reborn": [["Noah K.","Family travel","The spacious cabin and flexible seating make this a strong option for a family itinerary."],["Chloe D.","Intercity journey","A comfortable MPV choice for spending more time on the road between destinations."]],
   "zenix": [["Lucas M.","Premium family travel","The modern cabin and smooth hybrid driving character make the Zenix feel refined for longer journeys."],["Ella S.","Business and leisure","A smart-looking vehicle with useful space for passengers and everyday luggage."]],
   "byd-m6": [["Ryan T.","Electric mobility","A modern electric MPV option for travellers who value a quiet cabin and contemporary design."],["Mia W.","Family city travel","The spacious interior makes it an interesting choice for a family moving around the city."]],
   "hiace-commuter": [["Benjamin C.","Group excursion","Having room for a larger group in one vehicle makes coordinating a shared journey simpler."],["Lily H.","Team transportation","A practical people-mover for group plans where passenger capacity matters most."]],
   "hiace-premio": [["Samuel J.","Private group trip","The generous cabin space is well suited to group travel and longer days on the road."],["Ava B.","Family and friends","A useful option when everyone wants to travel together with luggage."]],
   "fortuner": [["William F.","Executive travel","The SUV format and elevated seating position suit travellers looking for a confident, premium ride."],["Isla G.","Private day trip","A distinctive choice for a private journey with family or colleagues."]],
   "alphard-gen-3": [["Henry L.","Executive occasion","A premium people-mover designed around passenger comfort and a more considered arrival."],["Sophia N.","Special family journey","A spacious, refined option for occasions when comfort is the priority."]]
  }
 },
 id: {
  title: "Melihat pengalaman lebih dekat",
  intro: "Tema ulasan contoh untuk kendaraan ini. Ganti dengan kiriman pelanggan asli sebelum ditampilkan sebagai ulasan nyata.",
  label: "ULASAN CONTOH",
  items: {
   "new-avanza": [["Jordan P.","Perjalanan kota dan bandara","Ukuran yang praktis untuk berkeliling kota, dengan kabin yang cocok untuk perjalanan sehari-hari."],["Amelia R.","Liburan keluarga singkat","Pilihan sederhana untuk transportasi nyaman tanpa perlu kendaraan berukuran besar."]],
   "innova-reborn": [["Noah K.","Perjalanan keluarga","Kabin yang lega dan tempat duduk fleksibel menjadikannya pilihan tepat untuk perjalanan keluarga."],["Chloe D.","Perjalanan antarkota","MPV yang nyaman untuk menghabiskan lebih banyak waktu di jalan antar destinasi."]],
   "zenix": [["Lucas M.","Perjalanan keluarga premium","Kabin modern dan karakter hybrid yang halus memberi kesan nyaman untuk perjalanan lebih jauh."],["Ella S.","Bisnis dan liburan","Kendaraan berpenampilan elegan dengan ruang yang berguna untuk penumpang dan bagasi harian."]],
   "byd-m6": [["Ryan T.","Mobilitas listrik","Pilihan MPV listrik modern bagi wisatawan yang menyukai kabin senyap dan desain kontemporer."],["Mia W.","Perjalanan keluarga di kota","Interior yang luas menjadikannya pilihan menarik untuk keluarga yang beraktivitas di kota."]],
   "hiace-commuter": [["Benjamin C.","Wisata rombongan","Kapasitas untuk membawa rombongan dalam satu kendaraan memudahkan koordinasi perjalanan bersama."],["Lily H.","Transportasi tim","Kendaraan penumpang yang praktis untuk perjalanan grup dengan kebutuhan kapasitas besar."]],
   "hiace-premio": [["Samuel J.","Perjalanan grup privat","Kabin yang lapang cocok untuk perjalanan rombongan dan perjalanan panjang."],["Ava B.","Keluarga dan teman","Pilihan yang berguna saat semua orang ingin bepergian bersama dengan barang bawaan."]],
   "fortuner": [["William F.","Perjalanan eksekutif","Format SUV dan posisi duduk yang tinggi cocok bagi wisatawan yang menginginkan perjalanan premium."],["Isla G.","Perjalanan pribadi sehari","Pilihan yang khas untuk perjalanan privat bersama keluarga atau rekan kerja."]],
   "alphard-gen-3": [["Henry L.","Acara eksekutif","MPV premium yang dirancang untuk kenyamanan penumpang dan pengalaman kedatangan yang lebih berkelas."],["Sophia N.","Perjalanan keluarga istimewa","Pilihan yang luas dan elegan untuk momen ketika kenyamanan menjadi prioritas."]]
  }
 },
 zh: {
  title: "深入了解出行体验",
  intro: "以下为该车型的示例评价主题。正式作为客户评价展示前，请替换为真实客户反馈。",
  label: "示例评价",
  items: {
   "new-avanza": [["Jordan P.","城市与机场出行","车身尺寸实用，适合城市穿行，车厢也能满足日常出行需求。"],["Amelia R.","短途家庭旅行","如果希望乘坐舒适又不需要大型车辆，这是一个简单实用的选择。"]],
   "innova-reborn": [["Noah K.","家庭出行","宽敞的车厢与灵活的座椅布局，很适合家庭行程。"],["Chloe D.","城际旅程","适合在不同目的地之间长时间乘坐的舒适 MPV。"]],
   "zenix": [["Lucas M.","高品质家庭出行","现代化座舱与平顺的混合动力体验，让长途出行更加舒适。"],["Ella S.","商务与休闲","外观时尚，乘客与日常行李也有充足空间。"]],
   "byd-m6": [["Ryan T.","电动出行","适合喜欢安静座舱与现代设计的旅客的纯电 MPV 选择。"],["Mia W.","家庭城市出行","宽敞的内部空间，让它成为家庭城市出行的有趣选择。"]],
   "hiace-commuter": [["Benjamin C.","团体游览","多人乘坐同一辆车，有助于简化团体行程的协调安排。"],["Lily H.","团队交通","适合对乘坐人数有较高需求的团体出行。"]],
   "hiace-premio": [["Samuel J.","私人团体旅行","宽敞的车厢适合团体出行及较长时间的旅程。"],["Ava B.","家人与朋友","适合希望与亲友同行并携带行李的旅客。"]],
   "fortuner": [["William F.","商务出行","SUV 车型与较高的驾驶视野，适合追求稳健高品质体验的旅客。"],["Isla G.","私人一日游","适合与家人或同事一起进行私人行程。"]],
   "alphard-gen-3": [["Henry L.","商务场合","高端 MPV 注重乘客舒适度，也让抵达体验更加从容。"],["Sophia N.","特别的家庭旅程","宽敞而精致，适合将舒适度放在首位的特别行程。"]]
  }
 }
} as const;

export function VehicleGuestReviews({locale,vehicleSlug}:{locale:Locale;vehicleSlug:string}){
 const copy=vehicleReviewCopy[locale];
 const items=copy.items[vehicleSlug as keyof typeof copy.items] ?? [];
 if(!items.length)return null;
 return <section className="vehicle-guest-reviews" aria-labelledby="vehicle-guest-reviews-title">
  <div className="vehicle-guest-reviews-heading">
   <div><p className="eyebrow dark-eyebrow"><span>03</span> {locale==="zh"?"宾客体验":locale==="id"?"PENGALAMAN TAMU":"GUEST EXPERIENCES"}</p><h2 id="vehicle-guest-reviews-title">{copy.title}</h2><p>{copy.intro}</p></div>
   <span className="guest-experiences-count">02 / EXPERIENCES</span>
  </div>
  <div className="vehicle-guest-review-grid">
   {items.map(([name,trip,review],index)=><article className="guest-review-card vehicle-guest-review-card" key={name}>
    <div className="guest-review-top"><span className="guest-review-index">0{index+1}</span><span className="guest-review-sample">{copy.label}</span></div>
    <div className="guest-review-stars" aria-hidden="true">★★★★★</div>
    <blockquote>“{review}”</blockquote>
    <div className="guest-review-bottom"><div><strong>{name}</strong><span>{trip}</span></div><small>{locale==="zh"?"车型体验":locale==="id"?"Pengalaman kendaraan":"Vehicle experience"}</small></div>
   </article>)}
  </div>
 </section>;
}
