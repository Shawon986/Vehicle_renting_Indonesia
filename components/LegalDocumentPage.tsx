"use client";
import Link from "next/link";
import type {Locale} from "@/lib/site-data";
import {privacyPolicy,cookiePolicy} from "@/lib/legal-data";
export function LegalDocumentPage({locale,type}:{locale:Locale;type:"privacy"|"cookies"}){
 const document=type==="privacy"?privacyPolicy:cookiePolicy;
 const labels=locale==="zh"?{back:"返回首页",privacy:"隐私政策",cookies:"Cookie 政策"}:locale==="id"?{back:"Kembali ke beranda",privacy:"Kebijakan Privasi",cookies:"Kebijakan Cookie"}:{back:"Back to home",privacy:"Privacy Policy",cookies:"Cookie Policy"};
 return <main className="legal-document-page"><header className="legal-document-hero"><p className="eyebrow dark-eyebrow"><span>01</span>{document.eyebrow[locale]}</p><h1>{document.title[locale]}</h1><p className="legal-document-intro">{document.intro[locale]}</p><div className="legal-document-meta"><span>{document.updated[locale]}</span><span>PT OCEAN ZENITH GROUP</span></div></header><article className="legal-document-content">{document.sections[locale].map((section,index)=><section key={section.heading}><span className="legal-document-index">{String(index+1).padStart(2,"0")}</span><h2>{section.heading}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}{section.bullets?<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>:null}</section>)}</article><nav className="legal-document-bottom" aria-label={locale==="zh"?"法律页面":"Legal pages"}><Link href={"/"+locale}>{labels.back}<span className="ui-arrow" aria-hidden="true"/></Link><div><Link href={"/"+locale+"/legal/privacy"}>{labels.privacy}</Link><Link href={"/"+locale+"/legal/cookies"}>{labels.cookies}</Link></div></nav></main>
}
