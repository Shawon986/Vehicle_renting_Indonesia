import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {isLocale,localeAlternates} from "@/lib/site-data";
import {LegalDocumentPage} from "@/components/LegalDocumentPage";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return{};const title=locale==="zh"?"Cookie 政策":locale==="id"?"Kebijakan Cookie":"Cookie Policy";const description=locale==="zh"?"了解 RentCarOcean 网站使用的 Cookie、浏览器存储和可选分析功能。":locale==="id"?"Pelajari cookie, penyimpanan browser, dan analitik opsional yang digunakan situs RentCarOcean.":"Learn about cookies, browser storage and optional analytics used by the RentCarOcean website.";return{title:title+" | RentCarOcean",description,alternates:localeAlternates(locale,"/legal/cookies"),robots:{index:true,follow:true}}}
export default async function CookiePage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <LegalDocumentPage locale={locale} type="cookies"/>}
