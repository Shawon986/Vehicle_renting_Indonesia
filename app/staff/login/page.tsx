"use client";
import {useState,type FormEvent} from "react";
import {useRouter} from "next/navigation";
import {createBrowserClient} from "@supabase/ssr";
export default function StaffLoginPage(){
 const router=useRouter(),[email,setEmail]=useState(""),[password,setPassword]=useState(""),[busy,setBusy]=useState(false),[error,setError]=useState("");
 const configured=Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
 async function submit(event:FormEvent<HTMLFormElement>){
  event.preventDefault();if(!configured)return;
  setBusy(true);setError("");
  try{
   const supabase=createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!);
   const {error:loginError}=await supabase.auth.signInWithPassword({email:email.trim(),password});
   if(loginError)throw loginError;
   const check=await fetch("/api/staff/session",{cache:"no-store"});
   if(!check.ok){await supabase.auth.signOut();throw new Error("This account is not an active RentCarOcean staff account. Contact an administrator.");}
   router.replace("/staff");router.refresh();
  }catch(err){setError(err instanceof Error?err.message:"Unable to sign in. Please try again.");}
  finally{setBusy(false)}
 }
 return <main className="staff-login-shell"><section className="staff-login-card"><a className="staff-brand" href="/en">RENTCAROCEAN <span>STAFF WORKSPACE</span></a><p className="staff-eyebrow">PRIVATE ACCESS · PT OCEAN ZENITH GROUP</p><h1>Welcome back.</h1><p className="staff-login-intro">Sign in with your staff account to review and manage vehicle enquiries.</p>{!configured?<div className="staff-alert" role="alert">The staff portal is not connected yet. Supabase environment settings are required before sign-in can be enabled.</div>:null}<form onSubmit={submit}><label>Email address<input type="email" autoComplete="username" required value={email} onChange={event=>setEmail(event.target.value)} disabled={!configured||busy}/></label><label>Password<input type="password" autoComplete="current-password" required value={password} onChange={event=>setPassword(event.target.value)} disabled={!configured||busy}/></label>{error?<p className="staff-error" role="alert">{error}</p>:null}<button type="submit" disabled={!configured||busy}>{busy?"Signing in…":"Sign in securely"}</button></form><p className="staff-login-foot">Authorised staff only. Enquiry information is confidential.</p><a className="staff-back-link" href="/en">← Return to public website</a></section></main>;
}
