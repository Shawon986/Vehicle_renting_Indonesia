import type {Metadata} from "next";
import {notFound} from "next/navigation";
import {isLocale,localeAlternates} from "@/lib/site-data";
import {LegalDocumentPage} from "@/components/LegalDocumentPage";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{const {locale}=await params;if(!isLocale(locale))return{};const title=locale==="zh"?"隐私政策":locale==="id"?"Kebijakan Privasi":"Privacy Policy";const description=locale==="zh"?"了解 RentCarOcean 如何收集、使用、保护和处理您提供的个人信息。":locale==="id"?"Pelajari cara RentCarOcean mengumpulkan, menggunakan, melindungi, dan menangani informasi pribadi yang Anda berikan.":"Learn how RentCarOcean collects, uses, protects and handles the personal information you provide.";return{title:title+" | RentCarOcean",description,alternates:localeAlternates(locale,"/legal/privacy"),robots:{index:true,follow:true}}}
export default async function PrivacyPage({params}:{params:Promise<{locale:string}>}){const {locale}=await params;if(!isLocale(locale))notFound();return <LegalDocumentPage locale={locale} type="privacy"/>}
