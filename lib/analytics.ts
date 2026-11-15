"use client";
type AnalyticsValue=string|number|boolean|undefined;
type AnalyticsParams=Record<string,AnalyticsValue>;
declare global { interface Window { gtag?: (...args:unknown[])=>void; dataLayer?:unknown[] } }
export function trackEvent(name:string,params:AnalyticsParams={}){if(typeof window==="undefined"||!window.gtag)return;window.gtag("event",name,params);}
