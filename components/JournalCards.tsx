import Link from "next/link";
import type {Locale} from "@/lib/site-data";
import {journalArticles} from "@/lib/journal-data";
export function JournalCards({locale,limit=3}:{locale:Locale;limit?:number}){
 return <div className="journal-card-grid">{journalArticles.slice(0,limit).map((article,index)=><article className="journal-card" key={article.slug}><Link href={"/"+locale+"/journal/"+article.slug}><div className="journal-card-top"><span>0{index+1} / {article.category[locale]}</span><span>{article.readingMinutes} {locale==="zh"?"分钟":locale==="id"?"menit":"min read"}</span></div><h3>{article.title[locale]}</h3><p>{article.description[locale]}</p><span className="journal-card-link">{locale==="zh"?"阅读全文":locale==="id"?"Baca artikel":"Read article"} <i className="ui-arrow" aria-hidden="true"/></span></Link></article>)}</div>;
}
