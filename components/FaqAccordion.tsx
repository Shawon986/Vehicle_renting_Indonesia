"use client";
import {trackEvent} from "@/lib/analytics";
export function FaqAccordion({items}:{items:[string,string][]}){return <div className="faq-list">{items.map(([question,answer])=><details key={question} onToggle={event=>{if(event.currentTarget.open)trackEvent("faq_expand",{id:question})}}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>}
