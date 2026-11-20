import Link from "next/link";
import type {Locale} from "@/lib/site-data";
import {ReviewCarousel} from "@/components/ReviewCarousel";

export function TrustPrinciples({locale,sectionNumber="04"}:{locale:Locale;sectionNumber?:string}){
 const copy={
  en:{eyebrow:"THE WAY WE WORK",title:"A clear process, across every service.",items:[["One connected service brand","Vehicle rental, tours and travel, event design, and fruit and flower gifts under PT Ocean Zenith Group."],["A person confirms the details","Our team reviews each enquiry and discusses dates, service scope and availability directly with you."],["Clarity before you agree","The relevant service details and quotation are explained directly. This website does not take online bookings or payments."]],link:"Meet the company"},
  id:{eyebrow:"CARA KAMI BEKERJA",title:"Proses yang jelas untuk setiap layanan.",items:[["Satu brand dengan beragam layanan","Sewa kendaraan, tur dan perjalanan, desain acara, serta hadiah buah dan bunga di bawah PT Ocean Zenith Group."],["Detail dikonfirmasi oleh tim","Tim kami meninjau setiap pertanyaan dan membahas tanggal, cakupan layanan, serta ketersediaan secara langsung."],["Kejelasan sebelum Anda menyetujui","Detail layanan dan penawaran dijelaskan langsung. Situs ini tidak menerima pemesanan atau pembayaran online."]],link:"Kenali perusahaan"},
  zh:{eyebrow:"我们的服务方式",title:"清晰沟通，贯穿每一项服务。",items:[["一个品牌，连接多种服务","PT Ocean Zenith Group 旗下涵盖车辆租赁、旅游与行程、活动策划，以及水果与鲜花礼盒。"],["由工作人员直接确认","团队会审核每一项咨询，并与您直接沟通日期、服务范围及可用情况。"],["确认前，先了解清楚","相关服务内容与报价由团队直接说明。本网站不提供在线预订或付款。"]],link:"了解公司"}
 }[locale];
 return <section className="trust-principles" aria-labelledby="trust-principles-title"><div className="trust-principles-heading"><p className="eyebrow dark-eyebrow"><span>{sectionNumber}</span> {copy.eyebrow}</p><h2 id="trust-principles-title">{copy.title}</h2></div><div className="trust-principles-grid">{copy.items.map(([title,body],i)=><article className="trust-principle" key={title}><span className="trust-principle-number">0{i+1}</span><h3>{title}</h3><p>{body}</p></article>)}</div><Link className="text-link dark-link" href={"/"+locale+"/about"}>{copy.link}<span className="arrow-up" aria-hidden="true"/></Link></section>;
}

export function PickupGuide({locale,sectionNumber="05"}:{locale:Locale;sectionNumber?:string}){
 const copy={
  en:{eyebrow:"PICKUP & ROUTE PLANNING",title:"Start with the places that matter.",intro:"Tell us exactly where your journey begins and ends. Share an airport and terminal, a hotel name, or a street address; our team will confirm whether the requested route is covered and explain the arrangements.",cards:[["01","Airport pickup","Include the airport name, terminal and preferred meeting point."],["02","Hotel pickup","Share the hotel name, area and destination."],["03","A location of your choice","Provide the full pickup address and drop-off point."]],note:"Coverage and any applicable additional-zone arrangements are confirmed by our team. A location option is a way to describe your request, not a live service or availability guarantee.",cta:"Share your pickup details"},
  id:{eyebrow:"PENJEMPUTAN & RUTE",title:"Mulai dari lokasi yang penting bagi Anda.",intro:"Beri tahu kami lokasi awal dan tujuan perjalanan secara spesifik. Cantumkan nama bandara dan terminal, nama hotel, atau alamat jalan; tim kami akan mengonfirmasi apakah rute tersebut termasuk cakupan layanan dan menjelaskan pengaturannya.",cards:[["01","Penjemputan bandara","Cantumkan nama bandara, terminal, dan titik temu yang diinginkan."],["02","Penjemputan hotel","Bagikan nama hotel, area, dan tujuan perjalanan."],["03","Lokasi pilihan Anda","Berikan alamat penjemputan lengkap dan lokasi pengantaran."]],note:"Cakupan layanan dan pengaturan zona tambahan, jika berlaku, akan dikonfirmasi oleh tim. Pilihan lokasi hanya membantu menjelaskan permintaan, bukan jaminan layanan atau ketersediaan.",cta:"Bagikan detail penjemputan"},
  zh:{eyebrow:"上车地点与路线安排",title:"从您关心的地点开始规划。",intro:"请具体告知行程的起点与终点。您可以填写机场及航站楼、酒店名称或街道地址；团队会确认该路线是否属于服务范围，并说明相关安排。",cards:[["01","机场接送","请提供机场名称、航站楼及期望的会合地点。"],["02","酒店接送","请提供酒店名称、所在区域及目的地。"],["03","指定地点接送","请填写完整的上车地址及下车地点。"]],note:"服务范围及可能涉及的额外区域安排均由团队确认。地点选项仅用于描述您的需求，并不代表服务或车辆实时可用的保证。",cta:"提交上车地点"}
 }[locale];
 const cardImages=[
  "https://baliluxetravel.com/__l5e/assets-v1/730fef00-09ea-40ff-9780-c881ecce2152/hero-bali-welcome.png",
  "https://cdn.blastness.biz/media/1169/new-top2024/thumbs/full/1920-ingresso2.jpg",
  "https://www.leighday.co.uk/media/0rrfwvd1/mini-cab-fare.jpg?height=480&width=800"
 ];
 return <section className="pickup-guide" aria-labelledby="pickup-guide-title"><div className="pickup-guide-heading"><p className="eyebrow dark-eyebrow"><span>{sectionNumber}</span> {copy.eyebrow}</p><h2 id="pickup-guide-title">{copy.title}</h2><p>{copy.intro}</p></div><div className="pickup-guide-grid">{copy.cards.map(([number,title,body],i)=><article className="pickup-guide-card" key={number}><div className="pickup-guide-card-image"><img src={cardImages[i]} alt={title} loading="lazy" decoding="async"/><span>{number}</span></div><div className="pickup-guide-card-copy"><h3>{title}</h3><p>{body}</p></div></article>)}</div><div className="pickup-guide-bottom"><p>{copy.note}</p><Link className="button button-dark" href={"/"+locale+"/services/vehicle-rental#enquire"}>{copy.cta}<span className="arrow-up" aria-hidden="true"/></Link></div></section>;
}

type ServiceKey="vehicle-rental"|"tours-travel"|"event-design"|"gift-boxes";
const services:Record<Locale,{key:ServiceKey;title:string;body:string}[]> = {
 en:[{key:"vehicle-rental",title:"Vehicle rental",body:"Vehicle options and journey arrangements."},{key:"tours-travel",title:"Tours & travel",body:"Private and group journeys shaped around your plans."},{key:"event-design",title:"Event design",body:"Creative direction, styling and event coordination."},{key:"gift-boxes",title:"Fruit & flower gifts",body:"Thoughtful gifting for personal and business occasions."}],
 id:[{key:"vehicle-rental",title:"Sewa kendaraan",body:"Pilihan kendaraan dan pengaturan perjalanan."},{key:"tours-travel",title:"Tur & perjalanan",body:"Perjalanan pribadi dan grup sesuai rencana Anda."},{key:"event-design",title:"Desain acara",body:"Konsep kreatif, styling, dan koordinasi acara."},{key:"gift-boxes",title:"Hadiah buah & bunga",body:"Hadiah penuh perhatian untuk momen personal dan bisnis."}],
 zh:[{key:"vehicle-rental",title:"车辆租赁",body:"车辆选择与出行安排咨询。"},{key:"tours-travel",title:"旅游与行程",body:"根据您的计划了解私人及团体旅程。"},{key:"event-design",title:"活动策划",body:"创意概念、场景设计与活动协调。"},{key:"gift-boxes",title:"水果与鲜花礼盒",body:"适用于个人及商务场合的用心礼赠。"}]
};
export function ServiceCrossLinks({locale,current,sectionNumber="06"}:{locale:Locale;current?:ServiceKey;sectionNumber?:string}){
 const title=locale==="zh"?"探索其他服务":locale==="id"?"Jelajahi layanan lainnya":"Explore the other services";
 const items=services[locale].filter(item=>item.key!==current);
 return <section className="service-crosslinks" aria-labelledby="service-crosslinks-title"><div className="service-crosslinks-heading"><p className="eyebrow dark-eyebrow"><span>{sectionNumber}</span> {locale==="zh"?"服务组合":locale==="id"?"PORTOFOLIO LAYANAN":"THE SERVICE PORTFOLIO"}</p><h2 id="service-crosslinks-title">{title}</h2></div><div className="service-crosslinks-grid">{items.map((item,i)=><Link className="service-crosslink-card" href={"/"+locale+"/services/"+item.key} key={item.key}><span>0{i+1} / RENTCAROCEAN</span><h3>{item.title}</h3><p>{item.body}</p><i className="ui-arrow" aria-hidden="true"/></Link>)}</div></section>;
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
  eyebrow:"GUEST EXPERIENCES",title:"The journey, through their eyes.",intro:"Thoughtful journeys, comfortable vehicles and service details that make travelling easier.",
  items:[
   ["Dewi P.","Family holiday","Toyota Innova","The Innova gave our family generous room for everyone and all of our luggage, so we did not feel cramped after a long flight. The cabin felt comfortable throughout the airport journey, and having enough space for our bags made the transfer feel organised and relaxed from the very beginning.","Family comfort"],
   ["Budi Santoso","Business trip","Toyota Zenix","The cabin felt refined, quiet and comfortable, which made moving between several meetings around the city much easier. There was enough room to settle in between appointments, and the overall ride suited a day when we needed a practical vehicle that still felt polished.","Business travel"],
   ["Rizky Pratama","Trip with friends","Toyota Hiace Premio","We travelled with a group of friends and everyone could stay together in one vehicle rather than arranging separate cars. There was useful room for our bags, and coordinating meeting points and stops became much simpler. It made the whole day feel more connected and less complicated.","Group journey"],
   ["Siti Rahmawati","Airport transfer","Toyota Avanza","For our small family, the Avanza felt like a practical choice for a short airport transfer. It was easy to manage around the city, had enough room for our everyday luggage and gave us a comfortable place to settle in after arriving. The journey was straightforward and convenient.","Airport transfer"],
   ["Agus Setiawan","Family journey","Toyota Fortuner","We appreciated the elevated seating position and the roomy feel inside the Fortuner. It made the longer stretches outside the city comfortable, while the cabin had enough space for everyone to settle in. For a full day trip with several stops, it felt like a reassuring and convenient option.","Day trip"],
   ["Nadia Putri","City travel","BYD M6","The quiet cabin made our city journey feel calm, especially when moving between several places during the day. We also appreciated the generous passenger space and the room for our bags, which meant the interior stayed comfortable without feeling crowded. It was a pleasant way to get around.","Electric mobility"],
   ["Fajar Hidayat","Group journey","Toyota Hiace Commuter","Our group could travel together instead of splitting into several cars, which made meeting up and keeping to the day's plan much easier. The passenger space was useful for everyone, and travelling as one group helped the journey feel more coordinated from pickup through to the final stop.","Group transport"],
   ["Maya Lestari","Family occasion","Toyota Alphard Gen 3","We wanted a vehicle that felt comfortable and elegant for a special family occasion, and the spacious interior was a real advantage. Everyone had room to settle in, the cabin felt refined, and the journey between locations was part of the occasion rather than just a transfer.","Special occasion"],
   ["Andi Wijaya","Intercity journey","Toyota Innova Reborn","The seating and cabin space worked well for our longer intercity drive, particularly with family members and luggage on board. There was room to relax during the journey, and the practical interior made it a sensible choice for travelling between destinations without feeling squeezed.","Intercity journey"],
   ["Putri Amelia","Weekend getaway","Toyota Avanza","The compact size made getting around town and stopping at several places in one day convenient. It felt manageable on busy city roads, while the cabin still gave our passengers a comfortable space for the journey. It was a practical choice for a flexible weekend itinerary.","Weekend travel"],
   ["Michael Tan","Indonesia visit","Toyota Hiace Premio","We were travelling with friends and had several suitcases, so having everyone together in one vehicle made the transfer much more straightforward. It was easier to coordinate our arrival, keep our belongings together and continue the journey as a group without arranging multiple pickups.","Visitor experience"],
   ["Sarah Williams","Private sightseeing","Toyota Fortuner","For a full day of exploring, we appreciated having a comfortable cabin and enough room for the things we wanted to bring along. The seating position and overall space suited a day with several stops, making it easier to enjoy the itinerary without constantly rearranging our bags.","Private journey"]
  ]
 },
 id: {
  eyebrow:"PENGALAMAN TAMU",title:"Cerita perjalanan dari sudut pandang mereka.",intro:"Perjalanan yang nyaman, pilihan kendaraan yang tepat, dan layanan yang memudahkan perjalanan Anda.",
  items:[
   ["Dewi P.","Liburan keluarga","Toyota Innova","Innova memberi ruang yang lega untuk seluruh keluarga dan barang bawaan kami, sehingga perjalanan setelah penerbangan panjang tidak terasa sempit. Kabinnya nyaman selama perjalanan dari bandara, dan ruang bagasi yang memadai membuat proses antar jemput terasa lebih rapi, tenang, dan praktis sejak awal.","Kenyamanan keluarga"],
   ["Budi Santoso","Perjalanan bisnis","Toyota Zenix","Kabin terasa nyaman, tenang, dan berkelas, sehingga perjalanan dari satu pertemuan ke pertemuan lain di dalam kota terasa lebih mudah. Ruangnya cukup untuk beristirahat sejenak di antara agenda, dan pengalaman berkendaranya cocok untuk hari yang padat namun tetap membutuhkan kenyamanan.","Perjalanan bisnis"],
   ["Rizky Pratama","Wisata bersama teman","Toyota Hiace Premio","Kami bepergian bersama teman-teman dan semua orang bisa tetap berada dalam satu kendaraan tanpa perlu mengatur beberapa mobil. Ruang untuk penumpang dan tas cukup membantu, sementara koordinasi titik jemput serta beberapa tempat tujuan menjadi lebih sederhana. Perjalanan terasa lebih praktis sebagai satu rombongan.","Perjalanan grup"],
   ["Siti Rahmawati","Antar jemput bandara","Toyota Avanza","Untuk keluarga kecil kami, Avanza terasa praktis untuk perjalanan singkat dari bandara. Ukurannya mudah digunakan di dalam kota, ruangnya cukup untuk barang bawaan, dan kabinnya nyaman setelah perjalanan panjang. Perjalanan menuju tujuan terasa sederhana dan tidak merepotkan.","Antar jemput bandara"],
   ["Agus Setiawan","Perjalanan keluarga","Toyota Fortuner","Kami menyukai posisi duduk yang lebih tinggi dan kabin Fortuner yang terasa lega. Hal itu membuat perjalanan ke luar kota lebih nyaman, sementara ruang di dalam kendaraan cukup untuk semua penumpang. Untuk perjalanan sehari dengan beberapa tempat singgah, kendaraan ini terasa meyakinkan dan praktis.","Wisata sehari"],
   ["Nadia Putri","Perjalanan dalam kota","BYD M6","Kabin yang senyap membuat perjalanan di dalam kota terasa tenang, terutama saat berpindah ke beberapa lokasi sepanjang hari. Kami juga menghargai ruang penumpang dan tempat untuk tas, sehingga bagian dalam kendaraan tetap terasa nyaman tanpa sesak. Pengalaman berkendaranya menyenangkan untuk aktivitas harian.","Mobilitas listrik"],
   ["Fajar Hidayat","Perjalanan rombongan","Toyota Hiace Commuter","Seluruh rombongan kami dapat bepergian bersama tanpa harus dibagi ke beberapa mobil. Hal ini memudahkan koordinasi titik pertemuan dan menjaga jadwal perjalanan tetap teratur. Ruang penumpangnya membantu semua orang merasa nyaman, dan perjalanan bersama terasa lebih praktis dari penjemputan hingga tujuan terakhir.","Transportasi grup"],
   ["Maya Lestari","Acara keluarga","Toyota Alphard Gen 3","Kami membutuhkan kendaraan yang nyaman dan elegan untuk acara keluarga istimewa, dan interior yang luas menjadi nilai tambah. Setiap penumpang memiliki ruang untuk duduk dengan nyaman, kabinnya terasa berkelas, dan perjalanan antar lokasi menjadi bagian yang menyenangkan dari acara tersebut.","Acara istimewa"],
   ["Andi Wijaya","Perjalanan antarkota","Toyota Innova Reborn","Kursi dan ruang kabinnya cocok untuk perjalanan antarkota yang lebih panjang, terutama saat bepergian bersama keluarga dan membawa barang. Penumpang memiliki ruang untuk bersantai selama perjalanan, sementara tata ruang interiornya tetap praktis dan tidak terasa sempit.","Perjalanan antarkota"],
   ["Putri Amelia","Liburan akhir pekan","Toyota Avanza","Ukurannya yang ringkas memudahkan kami berkeliling kota dan berhenti di beberapa tempat dalam satu hari. Kendaraan terasa mudah digunakan di jalan yang ramai, sementara kabinnya tetap menyediakan ruang yang nyaman bagi penumpang. Pilihan yang praktis untuk agenda akhir pekan yang fleksibel.","Liburan akhir pekan"],
   ["Michael Tan","Kunjungan ke Indonesia","Toyota Hiace Premio","Kami bepergian bersama teman dan membawa beberapa koper, sehingga berada dalam satu kendaraan membuat perjalanan jauh lebih praktis. Koordinasi saat tiba menjadi lebih mudah, barang bawaan tetap bersama, dan kami dapat melanjutkan perjalanan sebagai satu kelompok tanpa mengatur beberapa penjemputan.","Pengalaman wisatawan"],
   ["Sarah Williams","Wisata privat","Toyota Fortuner","Untuk menjelajahi berbagai tempat sepanjang hari, kami menghargai kabin yang nyaman dan ruang yang cukup untuk perlengkapan yang dibawa. Posisi duduk dan ruang interiornya sesuai untuk perjalanan dengan beberapa pemberhentian, sehingga kami dapat menikmati rencana perjalanan tanpa terus menata ulang barang.","Perjalanan privat"]
  ]
 },
 zh: {
  eyebrow:"宾客体验",title:"从旅客的视角，感受每一段旅程。",intro:"舒适的车辆、周到的安排，让每一段旅程更加轻松。",
  items:[
   ["Dewi P.","家庭假期","Toyota Innova","Innova 为全家和行李提供了宽敞空间，长途飞行后乘坐也不会觉得拥挤。机场接送途中，车厢始终舒适，充足的行李空间也让上下车和整理物品更加从容，让旅程从一开始就显得轻松有序。","家庭舒适"],
   ["Budi Santoso","商务出行","Toyota Zenix","车厢安静、舒适且富有质感，让我们在城市中往返多个会议地点时更加轻松。行程间隙也有足够空间稍作休息，整体乘坐体验很适合安排紧凑、同时重视舒适度的一天。","商务出行"],
   ["Rizky Pratama","朋友结伴旅行","Toyota Hiace Premio","我们和朋友结伴出行，所有人都能乘坐同一辆车，不必另外安排多辆车。车内有足够的乘客及行李空间，协调集合地点和多个停靠点也简单了许多，让整段团体行程更加连贯、轻松。","团体旅程"],
   ["Siti Rahmawati","机场接送","Toyota Avanza","对于我们这样的小家庭来说，Avanza 是短途机场接送的实用选择。车辆尺寸适合城市道路，行李也有足够空间，长途飞行后坐进车厢能够舒适地休息，整个接送过程简单又方便。","机场接送"],
   ["Agus Setiawan","家庭出行","Toyota Fortuner","我们很喜欢 Fortuner 较高的座椅视野和宽敞的车厢感受。即使当天需要前往城外并经过多个地点，乘坐过程依然舒适，车内空间也足够让每位乘客自在安坐，是实用而安心的出行选择。","一日游"],
   ["Nadia Putri","城市出行","BYD M6","安静的车厢让城市出行更加平和，尤其适合一天内往返多个地点的安排。乘客空间宽敞，随身行李也有合适的位置，车内不会显得拥挤，让我们能够更轻松地享受整段城市旅程。","电动出行"],
   ["Fajar Hidayat","团体出行","Toyota Hiace Commuter","团队可以一起出行，不必分乘几辆车，整个行程安排简单了许多。","团体交通"],
   ["Maya Lestari","家庭活动","Toyota Alphard Gen 3","我们希望为特别的家庭活动选择一辆舒适又优雅的车，宽敞的内饰确实带来了很大帮助。每位乘客都有足够空间，车厢氛围精致，往返活动地点的路程也成为这次特别体验的一部分。","特别场合"],
   ["Andi Wijaya","城际旅程","Toyota Innova Reborn","座椅和车厢空间很适合较长时间的城际驾驶，尤其是全家同行并携带行李时。乘客可以在途中舒适休息，内部空间布局也兼顾实用性，让家庭旅程不会显得局促。","城际出行"],
   ["Putri Amelia","周末假期","Toyota Avanza","车辆尺寸紧凑，在城市道路中穿行以及一天内前往多个地点都很方便。乘客仍然拥有舒适的乘坐空间，行程安排也更灵活，是周末城市出行的实用选择。","周末出行"],
   ["Michael Tan","印尼之旅","Toyota Hiace Premio","我们和朋友一起出行，还带了几件行李。所有人乘坐同一辆车，让抵达后的接送和后续安排简单许多，行李也能集中放置，不必协调多辆车或分开接送。","游客体验"],
   ["Sarah Williams","私人观光","Toyota Fortuner","对于全天探索多个地点的行程来说，舒适的车厢和充足的储物空间非常实用。座椅视野和内部空间都适合长时间出行，也能妥善放置随身物品，让我们更自在地享受当天的安排。","私人行程"]
  ]
 }
} as const;

export function GuestExperiences({locale}:{locale:Locale}){
 const copy=guestReviews[locale];
 return <section className="guest-experiences" aria-labelledby="guest-experiences-title">
  <div className="guest-experiences-heading">
   <div><p className="eyebrow dark-eyebrow"><span>03</span> {copy.eyebrow}</p><h2 id="guest-experiences-title">{copy.title}</h2><p className="guest-experiences-intro">{copy.intro}</p></div>
   <span className="guest-experiences-count">{locale==="zh"?"体验示例 · 12":locale==="id"?"12 / CONTOH PENGALAMAN":"12 / EXPERIENCE EXAMPLES"}</span>
  </div>
  <ReviewCarousel className="guest-review-carousel">
   {copy.items.map(([name,trip,vehicle,review,tag],index)=><article className="guest-review-card" key={name}>
    <div className="guest-review-author-row">
     <span className="guest-review-avatar" aria-hidden="true">{name.split(" ").map(part=>part[0]).join("").slice(0,2).toUpperCase()}</span>
     <div className="guest-review-identity"><strong>{name}</strong><span className="guest-review-rating">5.0 / 5.0</span></div>
    </div>
    <div className="guest-review-meta"><span>{trip}</span><i/> <span>{vehicle}</span></div>
    <blockquote>{review}</blockquote>
    <div className="guest-review-card-footer"><span>{tag}</span><span>{locale==="zh"?"示例内容":locale==="id"?"Contoh":"Illustrative example"}</span></div>
   </article>)}
  </ReviewCarousel>
  <p className="guest-review-disclaimer">{locale==="zh"?"展示内容为版式示例，并非经核实的客户评价。":locale==="id"?"Konten ini merupakan contoh tampilan, bukan ulasan pelanggan yang telah diverifikasi.":"These are illustrative examples for layout purposes, not verified customer reviews."}</p>
 </section>;
}

export function VehicleGuestReviews({locale,vehicleSlug}:{locale:Locale;vehicleSlug:string}){
 const vehicleNames:Record<string,string>={
  "new-avanza":"Toyota Avanza",
  "innova-reborn":"Toyota Innova Reborn",
  "zenix":"Toyota Zenix",
  "byd-m6":"BYD M6",
  "hiace-commuter":"Toyota Hiace Commuter",
  "hiace-premio":"Toyota Hiace Premio",
  "fortuner":"Toyota Fortuner",
  "alphard-gen-3":"Toyota Alphard Gen 3"
 };
 const vehicleName=vehicleNames[vehicleSlug];
 if(!vehicleName)return null;

 // Vehicle pages use the exact same localized review records as the homepage.
 // Filtering the shared source keeps names, journey labels, copy and tags in sync.
 const items=guestReviews[locale].items.filter(([, , vehicle])=>vehicle===vehicleName);
 if(!items.length)return null;

 const copy={
  en:{title:"A closer look at the experience",intro:"Comfort, space and thoughtful details for different kinds of journeys.",experience:"Vehicle experience",illustrative:"Illustrative example",count:"EXPERIENCE EXAMPLES",disclaimer:"These are illustrative examples for layout purposes, not verified customer reviews."},
  id:{title:"Melihat pengalaman lebih dekat",intro:"Kenyamanan, ruang, dan detail yang sesuai untuk berbagai kebutuhan perjalanan.",experience:"Pengalaman kendaraan",illustrative:"Contoh ilustratif",count:"CONTOH PENGALAMAN",disclaimer:"Konten ini merupakan contoh tampilan, bukan ulasan pelanggan yang telah diverifikasi."},
  zh:{title:"深入了解出行体验",intro:"舒适空间与贴心细节，满足不同类型的出行需求。",experience:"车型体验",illustrative:"示例内容",count:"体验示例",disclaimer:"展示内容为版式示例，并非经核实的客户评价。"}
 }[locale];

 return <section className="guest-experiences vehicle-guest-reviews" aria-labelledby="vehicle-guest-reviews-title">
  <div className="guest-experiences-heading">
   <div>
    <p className="eyebrow dark-eyebrow"><span>01</span> {locale==="zh"?"宾客体验":locale==="id"?"PENGALAMAN TAMU":"GUEST EXPERIENCES"}</p>
    <h2 id="vehicle-guest-reviews-title">{copy.title}</h2>
    <p className="guest-experiences-intro">{copy.intro}</p>
   </div>
   <span className="guest-experiences-count">{String(items.length).padStart(2,"0")} / {copy.count}</span>
  </div>
  <ReviewCarousel className="guest-review-carousel">
   {items.map(([name,trip,vehicle,review,tag])=><article className="guest-review-card" key={name}>
    <div className="guest-review-author-row">
     <span className="guest-review-avatar" aria-hidden="true">{name.split(" ").map(part=>part[0]).join("").slice(0,2).toUpperCase()}</span>
     <div className="guest-review-identity"><strong>{name}</strong><span className="guest-review-rating">5.0 / 5.0</span></div>
    </div>
    <div className="guest-review-meta"><span>{trip}</span><i/> <span>{vehicle}</span></div>
    <blockquote>{review}</blockquote>
    <div className="guest-review-card-footer"><span>{tag}</span><span>{locale==="zh"?"示例内容":locale==="id"?"Contoh":"Illustrative example"}</span></div>
   </article>)}
  </ReviewCarousel>
  <p className="guest-review-disclaimer">{copy.disclaimer}</p>
 </section>;
}