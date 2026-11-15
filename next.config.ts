import type {NextConfig} from "next";
const securityPolicy=[
 "default-src 'self'",
 "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://www.googletagmanager.com",
 "style-src 'self' 'unsafe-inline'",
 "img-src 'self' data: blob: https:",
 "font-src 'self' data:",
 "connect-src 'self' https://challenges.cloudflare.com https://www.google-analytics.com https://region1.google-analytics.com",
 "frame-src https://challenges.cloudflare.com",
 "object-src 'none'",
 "base-uri 'self'",
 "form-action 'self'",
 "frame-ancestors 'none'",
 "upgrade-insecure-requests"
].join("; ");
const nextConfig:NextConfig={
 poweredByHeader:false,
 images:{remotePatterns:[{protocol:"https",hostname:"images.unsplash.com"}]},
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
