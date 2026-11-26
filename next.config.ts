import type {NextConfig} from "next";
const scriptSources=["'self'","'unsafe-inline'",...(process.env.NODE_ENV==="development"?["'unsafe-eval'"]:[]),"https://challenges.cloudflare.com","https://www.googletagmanager.com"].join(" ");
const securityPolicy=[
 "default-src 'self'",
 "script-src "+scriptSources,
 "style-src 'self' 'unsafe-inline'",
 "img-src 'self' data: blob: https://lebliss.co.id https://static-assets-prod.fnp.ae https://content2.flowwow-images.com https://basketeer.com https://images.unsplash.com https://commons.wikimedia.org https://upload.wikimedia.org https://img.autofun.co.id https://astradigitaldigiroomprd.blob.core.windows.net https://astradigitaldigiroomuat.blob.core.windows.net https://karyapratamatravelindo.com https://www.toyotaintercom.com https://photo.znews.vn https://www.static-src.com https://media.auto5.vn https://www.kliktoyotabekasi.com https://www.toyota.co.kr https://www.toyota.co.th https://melalibalitransport.com https://cdn.qmhtech.com https://www.luxurylifestyleconnections.com https://www.bluebirdgroup.com https://baliluxetravel.com https://cdn.prod.website-files https://cdn.blastness.biz https://www.leighday.co.uk",
 "font-src 'self' data:",
 "connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://region1.google-analytics.com",
 "frame-src https://challenges.cloudflare.com",
 "object-src 'none'",
 "base-uri 'self'",
 "form-action 'self'",
 "frame-ancestors 'none'",
 ...(process.env.VERCEL_ENV==="production"?["upgrade-insecure-requests"]:[])
].join("; ");
const nextConfig:NextConfig={
 allowedDevOrigins: process.env.NODE_ENV === "development" ? ["192.168.0.19"] : [],
 poweredByHeader:false,
 images:{remotePatterns:[{protocol:"https",hostname:"images.unsplash.com"},{protocol:"https",hostname:"commons.wikimedia.org"},{protocol:"https",hostname:"upload.wikimedia.org"},{protocol:"https",hostname:"img.autofun.co.id"},{protocol:"https",hostname:"astradigitaldigiroomprd.blob.core.windows.net"},{protocol:"https",hostname:"astradigitaldigiroomuat.blob.core.windows.net"},{protocol:"https",hostname:"karyapratamatravelindo.com"},{protocol:"https",hostname:"www.toyotaintercom.com"},{protocol:"https",hostname:"photo.znews.vn"},{protocol:"https",hostname:"www.static-src.com"},{protocol:"https",hostname:"media.auto5.vn"},{protocol:"https",hostname:"www.kliktoyotabekasi.com"},{protocol:"https",hostname:"www.toyota.co.kr"},{protocol:"https",hostname:"www.toyota.co.th"},{protocol:"https",hostname:"melalibalitransport.com"}]},
 async headers(){
  const headers=[
   {key:"X-Content-Type-Options",value:"nosniff"},
   {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
   {key:"X-Frame-Options",value:"DENY"},
   {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},
   {key:"Content-Security-Policy",value:securityPolicy},
   {key:"Cross-Origin-Opener-Policy",value:"same-origin"},
   {key:"X-Permitted-Cross-Domain-Policies",value:"none"}
  ];
  if(process.env.VERCEL_ENV==="production")headers.push({key:"Strict-Transport-Security",value:"max-age=63072000; includeSubDomains"});
  return[{source:"/:path*",headers}];
 }
};
export default nextConfig;
