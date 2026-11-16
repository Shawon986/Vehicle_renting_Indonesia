"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {trackEvent} from "@/lib/analytics";
export function ScrollDepth(){const path=usePathname();useEffect(()=>{const sent=new Set<number>();const measure=()=>{if(!window.gtag)return;const height=document.documentElement.scrollHeight-window.innerHeight;if(height<=0)return;const depth=Math.min(100,Math.round(window.scrollY/height*100));for(const threshold of [25,50,75,100])if(depth>=threshold&&!sent.has(threshold)){sent.add(threshold);trackEvent("scroll_depth",{depth:threshold,page:path})}};window.addEventListener("scroll",measure,{passive:true});measure();return()=>window.removeEventListener("scroll",measure)},[path]);return null}
