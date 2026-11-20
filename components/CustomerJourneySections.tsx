import Link from "next/link";
import type {Locale} from "@/lib/site-data";
import {ReviewCarousel} from "@/components/ReviewCarousel";

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
 const cardImages=[
  "https://baliluxetravel.com/__l5e/assets-v1/730fef00-09ea-40ff-9780-c881ecce2152/hero-bali-welcome.png",
  "https://cdn.blastness.biz/media/1169/new-top2024/thumbs/full/1920-ingresso2.jpg",
  "https://www.leighday.co.uk/media/0rrfwvd1/mini-cab-fare.jpg?height=480&width=800"
 ];
 return <section className="pickup-guide" aria-labelledby="pickup-guide-title"><div className="pickup-guide-heading"><p className="eyebrow dark-eyebrow"><span>04</span> {copy.eyebrow}</p><h2 id="pickup-guide-title">{copy.title}</h2><p>{copy.intro}</p></div><div className="pickup-guide-grid">{copy.cards.map(([number,title,body],i)=><article className="pickup-guide-card" key={number}><div className="pickup-guide-card-image"><img src={cardImages[i]} alt={title} loading="lazy" decoding="async"/><span>{number}</span></div><div className="pickup-guide-card-copy"><h3>{title}</h3><p>{body}</p></div></article>)}</div><div className="pickup-guide-bottom"><p>{copy.note}</p><Link className="button button-dark" href={"/"+locale+"/services/vehicle-rental#enquire"}>{copy.cta}<span className="arrow-up" aria-hidden="true"/></Link></div></section>;
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
  eyebrow:"GUEST EXPERIENCES",title:"The journey, through their eyes.",intro:"Thoughtful journeys, comfortable vehicles and service details that make travelling easier.",
  items:[
   ["Dewi P.","Family holiday","Toyota Innova","The Innova gave our family plenty of room for everyone and our luggage. The journey from the airport felt relaxed from the start.","Family comfort"],
   ["Budi Santoso","Business trip","Toyota Zenix","The cabin felt refined and comfortable. A good option for moving between meetings around the city.","Business travel"],
   ["Rizky Pratama","Trip with friends","Toyota Hiace Premio","We travelled as a group and could all stay together in one vehicle. It made coordinating our stops much easier.","Group journey"],
   ["Siti Rahmawati","Airport transfer","Toyota Avanza","A practical choice for a short airport transfer. The car was a comfortable size for our small family.","Airport transfer"],
   ["Agus Setiawan","Family journey","Toyota Fortuner","We liked the elevated seating and roomy feel. It suited our day trip outside the city very well.","Day trip"],
   ["Nadia Putri","City travel","BYD M6","The quiet cabin made the city ride pleasant. There was enough space for our bags too.","Electric mobility"],
   ["Fajar Hidayat","Group journey","Toyota Hiace Commuter","Our group could travel together without splitting into several cars. That made the whole plan simpler.","Group transport"],
   ["Maya Lestari","Family occasion","Toyota Alphard Gen 3","A comfortable and elegant choice for a special family occasion. The spacious interior was a real plus.","Special occasion"],
   ["Andi Wijaya","Intercity journey","Toyota Innova Reborn","The seats and cabin space worked well for a longer drive. A sensible option for travelling with family.","Intercity journey"],
   ["Putri Amelia","Weekend getaway","Toyota Avanza","Compact enough for getting around town and convenient for visiting several places in one day.","Weekend travel"],
   ["Michael Tan","Indonesia visit","Toyota Hiace Premio","We had several suitcases and travelled with friends. Having everyone together made the transfer straightforward.","Visitor experience"],
   ["Sarah Williams","Private sightseeing","Toyota Fortuner","A comfortable vehicle for a full day of exploring. The space made it easy to bring everything we needed.","Private journey"]
  ]
 },
 id: {
  eyebrow:"PENGALAMAN TAMU",title:"Cerita perjalanan dari sudut pandang mereka.",intro:"Perjalanan yang nyaman, pilihan kendaraan yang tepat, dan layanan yang memudahkan perjalanan Anda.",
  items:[
   ["Dewi P.","Liburan keluarga","Toyota Innova","Innova memberi ruang yang cukup untuk keluarga dan barang bawaan kami. Perjalanan dari bandara terasa santai sejak awal.","Kenyamanan keluarga"],
   ["Budi Santoso","Perjalanan bisnis","Toyota Zenix","Kabin terasa nyaman dan berkelas. Cocok untuk berpindah dari satu pertemuan ke pertemuan lain di dalam kota.","Perjalanan bisnis"],
   ["Rizky Pratama","Wisata bersama teman","Toyota Hiace Premio","Kami bepergian bersama rombongan dan bisa tetap berada dalam satu kendaraan. Mengatur beberapa tempat tujuan jadi lebih mudah.","Perjalanan grup"],
   ["Siti Rahmawati","Antar jemput bandara","Toyota Avanza","Pilihan praktis untuk perjalanan singkat dari bandara. Ukuran mobilnya nyaman untuk keluarga kecil kami.","Antar jemput bandara"],
   ["Agus Setiawan","Perjalanan keluarga","Toyota Fortuner","Kami menyukai posisi duduk yang lebih tinggi dan kabin yang lega. Sangat cocok untuk perjalanan sehari ke luar kota.","Wisata sehari"],
   ["Nadia Putri","Perjalanan dalam kota","BYD M6","Kabin yang senyap membuat perjalanan di dalam kota terasa menyenangkan. Ruang untuk tas kami juga cukup.","Mobilitas listrik"],
   ["Fajar Hidayat","Perjalanan rombongan","Toyota Hiace Commuter","Rombongan kami bisa bepergian bersama tanpa harus membagi menjadi beberapa mobil. Rencana perjalanan jadi lebih sederhana.","Transportasi grup"],
   ["Maya Lestari","Acara keluarga","Toyota Alphard Gen 3","Pilihan yang nyaman dan elegan untuk acara keluarga istimewa. Interiornya yang luas menjadi nilai tambah.","Acara istimewa"],
   ["Andi Wijaya","Perjalanan antarkota","Toyota Innova Reborn","Kursi dan ruang kabinnya cocok untuk perjalanan jauh. Pilihan yang masuk akal untuk bepergian bersama keluarga.","Perjalanan antarkota"],
   ["Putri Amelia","Liburan akhir pekan","Toyota Avanza","Cukup ringkas untuk berkeliling kota dan praktis saat mengunjungi beberapa tempat dalam satu hari.","Liburan akhir pekan"],
   ["Michael Tan","Kunjungan ke Indonesia","Toyota Hiace Premio","Kami membawa beberapa koper dan bepergian bersama teman. Berada dalam satu kendaraan membuat perjalanan lebih praktis.","Pengalaman wisatawan"],
   ["Sarah Williams","Wisata privat","Toyota Fortuner","Kendaraan yang nyaman untuk menjelajahi berbagai tempat sepanjang hari. Ruangnya cukup untuk semua perlengkapan kami.","Perjalanan privat"]
  ]
 },
 zh: {
  eyebrow:"宾客体验",title:"从旅客的视角，感受每一段旅程。",intro:"舒适的车辆、周到的安排，让每一段旅程更加轻松。",
  items:[
   ["Dewi P.","家庭假期","Toyota Innova","Innova 为全家和行李提供了充足空间。从机场出发的旅程一开始就很轻松。","家庭舒适"],
   ["Budi Santoso","商务出行","Toyota Zenix","车厢舒适且精致，适合在城市中往返不同会议地点。","商务出行"],
   ["Rizky Pratama","朋友结伴旅行","Toyota Hiace Premio","我们一行人可以乘坐同一辆车，协调多个停靠地点也容易得多。","团体旅程"],
   ["Siti Rahmawati","机场接送","Toyota Avanza","短途机场接送的实用选择。对于我们的小家庭来说，车辆尺寸很合适。","机场接送"],
   ["Agus Setiawan","家庭出行","Toyota Fortuner","我们喜欢较高的座椅视野和宽敞感，非常适合当天的城外行程。","一日游"],
   ["Nadia Putri","城市出行","BYD M6","安静的车厢让城市旅程更加愉快，也有足够空间放置行李。","电动出行"],
   ["Fajar Hidayat","团体出行","Toyota Hiace Commuter","团队可以一起出行，不必分乘几辆车，整个行程安排简单了许多。","团体交通"],
   ["Maya Lestari","家庭活动","Toyota Alphard Gen 3","适合特别家庭场合的舒适优雅之选。宽敞的内饰是一大优点。","特别场合"],
   ["Andi Wijaya","城际旅程","Toyota Innova Reborn","座椅和车厢空间很适合长途驾驶，是家庭出行的实用选择。","城际出行"],
   ["Putri Amelia","周末假期","Toyota Avanza","在城市中穿行很方便，一天内前往多个地点也很实用。","周末出行"],
   ["Michael Tan","印尼之旅","Toyota Hiace Premio","我们和朋友同行并带了几件行李，所有人乘坐同一辆车让接送更加简单。","游客体验"],
   ["Sarah Williams","私人观光","Toyota Fortuner","适合全天探索行程的舒适车辆，空间足以放置所需物品。","私人行程"]
  ]
 }
} as const;

export function GuestExperiences({locale}:{locale:Locale}){
 const copy=guestReviews[locale];
 return <section className="guest-experiences" aria-labelledby="guest-experiences-title">
  <div className="guest-experiences-heading">
   <div><p className="eyebrow dark-eyebrow"><span>04</span> {copy.eyebrow}</p><h2 id="guest-experiences-title">{copy.title}</h2><p className="guest-experiences-intro">{copy.intro}</p></div>
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

const vehicleReviewCopy = {
 en:{title:"A closer look at the experience",intro:"Comfort, space and thoughtful details for different kinds of journeys.",items:{
  "new-avanza":[["Siti Nurhaliza","City and airport trips","Compact for city trips and convenient for multiple stops, with a cabin that feels comfortable for a small family."]],
  "innova-reborn":[["Andi Pratama","Family travel","The cabin felt spacious for our family. The ride was comfortable on an intercity journey, even with our luggage."],["Rina Kartika","Airport transfer","The luggage and passenger space suited our family's needs. A practical MPV choice."],["David Lim","Holiday with family","We had enough room for our bags and appreciated the comfortable seating on the longer drive."]],
  "zenix":[["Agus Saputra","Business and leisure","The interior feels modern and the ride is smooth. It works well for business plans as well as family outings."],["Maya Anggraini","Family weekend","The cabin is comfortable and the styling is elegant. It felt like a great fit for our weekend trip."],["Kevin Tan","City travel","A quiet, comfortable ride for moving between meetings and dinner plans around town."]],
  "byd-m6":[["Putri Maharani","City family travel","The quiet cabin and generous space made our city trip comfortable, including for the children."],["Fajar Ramadhan","Electric mobility","The driving experience felt modern and quiet. The passenger space was another advantage."],["Olivia Chen","Exploring the city","The quiet cabin was a nice touch, and there was plenty of room for our day bags."]],
  "hiace-commuter":[["Hendra Gunawan","Group excursion","Our whole group could travel together without splitting into separate vehicles. It was practical for our sightseeing trip."],["Dian Puspita","Family gathering","The passenger capacity made it easy for our extended family to travel together."],["Rudi Hartono","Team transportation","There was plenty of passenger room, making it suitable for our company's out-of-town plans."],["Emma Wilson","Group holiday","Keeping our group together in one vehicle made the day's itinerary much easier."]],
  "hiace-premio":[["Yusuf Maulana","Private group trip","The cabin was spacious and comfortable for travelling with friends, and our luggage was easy to organize."],["Nabila Zahra","Family and friends","We could all travel together instead of splitting up. It was a good fit for our family occasion."]],
  "fortuner":[["Taufik Hidayat","Private day trip","The elevated seating position and solid-feeling cabin suited a full day out with the family."],["Clara Wijaya","Weekend escape","It was comfortable for an out-of-town journey, and the cabin space suited our needs."],["James Carter","Private sightseeing","A comfortable choice for a full day on the road, with a reassuring driving position."]],
  "alphard-gen-3":[["Sri Wulandari","Special family occasion","The interior is spacious and elegant, making it a lovely choice for taking the family to a special occasion."],["Bambang Setiawan","Executive travel","Passenger comfort is the main highlight. It is well suited to business travel and formal occasions."],["Michelle Lee","Airport and event transfer","The spacious cabin and refined feel worked well for a special occasion and airport transfer."],["Rizal Firmansyah","Family celebration","We chose it for a family celebration. The space and comfort made the journey feel more special."]]
 }},
 id:{title:"Melihat pengalaman lebih dekat",intro:"Kenyamanan, ruang, dan detail yang sesuai untuk berbagai kebutuhan perjalanan.",items:{
  "new-avanza":[["Siti Nurhaliza","Perjalanan kota dan bandara","Ringkas untuk perjalanan dalam kota, mudah untuk naik turun di beberapa tempat, dan kabinnya cukup nyaman untuk keluarga kecil."]],
  "innova-reborn":[["Andi Pratama","Perjalanan keluarga","Ruang kabin terasa lega untuk keluarga kami. Perjalanan antarkota juga nyaman, termasuk saat membawa barang."],["Rina Kartika","Antar jemput bandara","Bagasi dan ruang penumpangnya pas untuk kebutuhan keluarga. Pilihan MPV yang praktis."],["David Lim","Liburan keluarga","Kami punya cukup ruang untuk koper dan menikmati kursi yang nyaman selama perjalanan jauh."]],
  "zenix":[["Agus Saputra","Bisnis dan liburan","Interiornya modern dan perjalanan terasa halus. Cocok untuk agenda bisnis sekaligus jalan bersama keluarga."],["Maya Anggraini","Akhir pekan keluarga","Kabin nyaman dan tampilannya elegan. Kami merasa cocok menggunakannya untuk perjalanan akhir pekan."],["Kevin Tan","Perjalanan kota","Perjalanan yang tenang dan nyaman untuk berpindah dari rapat ke agenda makan malam di kota."]],
  "byd-m6":[["Putri Maharani","Perjalanan keluarga di kota","Kabin senyap dan ruangnya lega. Anak-anak juga nyaman selama perjalanan di dalam kota."],["Fajar Ramadhan","Mobilitas listrik","Pengalaman berkendara terasa modern dan tenang. Ruang penumpangnya juga menjadi kelebihan."],["Olivia Chen","Menjelajahi kota","Kabin yang senyap terasa menyenangkan dan tersedia banyak ruang untuk tas harian kami."]],
  "hiace-commuter":[["Hendra Gunawan","Wisata rombongan","Kami berangkat bersama satu rombongan tanpa perlu membagi kendaraan. Praktis untuk perjalanan wisata."],["Dian Puspita","Acara keluarga","Kapasitas penumpangnya membantu keluarga besar kami bepergian bersama."],["Rudi Hartono","Transportasi tim","Ruang penumpang cukup lega dan cocok untuk agenda kantor di luar kota."],["Emma Wilson","Liburan grup","Menjaga seluruh rombongan tetap dalam satu kendaraan membuat rencana perjalanan lebih mudah."]],
  "hiace-premio":[["Yusuf Maulana","Perjalanan grup privat","Kabin lega dan nyaman untuk perjalanan bersama teman-teman. Barang bawaan juga bisa tertata."],["Nabila Zahra","Keluarga dan teman","Kami bisa bepergian bersama tanpa harus terpisah. Cocok untuk acara keluarga."]],
  "fortuner":[["Taufik Hidayat","Wisata privat sehari","Posisi duduk tinggi dan kabin terasa mantap. Cocok untuk perjalanan seharian bersama keluarga."],["Clara Wijaya","Liburan akhir pekan","Nyaman untuk perjalanan luar kota dan ruang kabinnya terasa pas untuk kebutuhan kami."],["James Carter","Wisata privat","Pilihan nyaman untuk perjalanan seharian, dengan posisi berkendara yang terasa meyakinkan."]],
  "alphard-gen-3":[["Sri Wulandari","Acara keluarga istimewa","Interiornya luas dan terasa elegan. Sangat sesuai untuk mengantar keluarga di acara istimewa."],["Bambang Setiawan","Perjalanan eksekutif","Kenyamanan penumpang menjadi nilai utama. Cocok untuk perjalanan bisnis dan acara formal."],["Michelle Lee","Antar jemput bandara dan acara","Kabin yang luas dan kesan elegan cocok untuk acara khusus maupun perjalanan ke bandara."],["Rizal Firmansyah","Perayaan keluarga","Kami memilihnya untuk acara keluarga. Ruang dan kenyamanannya membuat perjalanan terasa lebih istimewa."]]
 }},
 zh:{title:"深入了解出行体验",intro:"舒适空间与贴心细节，满足不同旅程需求。",items:{
  "new-avanza":[["Siti Nurhaliza","城市与机场出行","车身紧凑，适合城市出行和多地点停靠，车厢也能满足小家庭的舒适需求。"]],
  "innova-reborn":[["Andi Pratama","家庭出行","车厢空间对我们一家来说很宽敞，长途出行时放置行李也很方便。"],["Rina Kartika","机场接送","行李空间和乘坐空间都符合家庭需求，是实用的 MPV 选择。"],["David Lim","家庭假期","行李有足够空间，长途驾驶时座椅也很舒适。"]],
  "zenix":[["Agus Saputra","商务与休闲","内饰现代，行驶平顺，适合商务安排和家庭出游。"],["Maya Anggraini","家庭周末","车厢舒适，外观优雅，很适合我们的周末行程。"],["Kevin Tan","城市出行","在城市中往返会议和晚餐地点，乘坐体验安静舒适。"]],
  "byd-m6":[["Putri Maharani","家庭城市出行","车厢安静且空间宽敞，孩子们在城市旅程中也很舒适。"],["Fajar Ramadhan","电动出行","驾驶体验现代而安静，乘客空间也是一大优点。"],["Olivia Chen","城市探索","安静的车厢体验很好，也有充足空间放置日常随身包。"]],
  "hiace-commuter":[["Hendra Gunawan","团体游览","我们整个团队可以一起出发，不必分乘多辆车，非常适合观光行程。"],["Dian Puspita","家庭聚会","乘坐人数充足，让大家庭能够一起出行。"],["Rudi Hartono","团队交通","乘客空间宽敞，适合公司安排的城外行程。"],["Emma Wilson","团体假期","让团队成员乘坐同一辆车，使当天的行程安排容易得多。"]],
  "hiace-premio":[["Yusuf Maulana","私人团体旅行","车厢宽敞舒适，适合和朋友一起出行，行李也能妥善放置。"],["Nabila Zahra","家人与朋友","我们可以一起出行，不必分开乘车，很适合家庭活动。"]],
  "fortuner":[["Taufik Hidayat","私人一日游","较高的座椅视野和稳健的车厢感受，很适合全家一日出行。"],["Clara Wijaya","周末短途旅行","城际旅程乘坐舒适，车厢空间也符合我们的需求。"],["James Carter","私人观光","适合全天行程的舒适选择，驾驶视野让人感觉安心。"]],
  "alphard-gen-3":[["Sri Wulandari","特别家庭活动","内饰宽敞优雅，非常适合特别场合的家庭接送。"],["Bambang Setiawan","商务出行","乘客舒适度是主要亮点，适合商务旅程和正式活动。"],["Michelle Lee","机场及活动接送","宽敞的车厢和精致感很适合特别活动及机场接送。"],["Rizal Firmansyah","家庭庆祝活动","我们为家庭活动选择了这款车，空间和舒适度让旅程更加特别。"]]
 }}
} as const;

export function VehicleGuestReviews({locale,vehicleSlug}:{locale:Locale;vehicleSlug:string}){
 const copy=vehicleReviewCopy[locale];
 const items=copy.items[vehicleSlug as keyof typeof copy.items] ?? [];
 if(!items.length)return null;
 return <section className="vehicle-guest-reviews" aria-labelledby="vehicle-guest-reviews-title">
  <div className="vehicle-guest-reviews-heading">
   <div><p className="eyebrow dark-eyebrow"><span>01</span> {locale==="zh"?"宾客体验":locale==="id"?"PENGALAMAN TAMU":"GUEST EXPERIENCES"}</p><h2 id="vehicle-guest-reviews-title">{copy.title}</h2><p>{copy.intro}</p></div>
   <span className="guest-experiences-count">VARIED / EXPERIENCES</span>
  </div>
  <ReviewCarousel className="vehicle-review-carousel">
   {items.map(([name,trip,review],index)=><article className="guest-review-card vehicle-guest-review-card" key={name}>
    <div className="guest-review-top"><span className="guest-review-index">VEHICLE EXPERIENCE · 0{index+1}</span></div>
    <div className="guest-review-stars" aria-hidden="true">★★★★★</div>
    <blockquote>“{review}”</blockquote>
    <div className="guest-review-bottom"><div className="guest-review-author"><span className="guest-review-avatar" aria-hidden="true">{name.split(" ").map(part=>part[0]).join("").replace(/[^A-Z]/g,"").slice(0,2)}</span><div><strong>{name}</strong><span>{trip}</span></div></div><small>{locale==="zh"?"车型体验":locale==="id"?"Pengalaman kendaraan":"Vehicle experience"}</small></div>
   </article>)}
  </ReviewCarousel>
 </section>;
}
