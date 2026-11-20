import "server-only";
import {createServerClient} from "@supabase/ssr";
import {createClient,type SupabaseClient} from "@supabase/supabase-js";
import {cookies} from "next/headers";
import type {StaffIdentity,StaffRole} from "@/lib/staff-types";
export type {StaffIdentity,StaffRole} from "@/lib/staff-types";
export function isStaffPortalConfigured(){return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL&&process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY&&process.env.SUPABASE_SERVICE_ROLE_KEY)}
export async function createAuthClient(){
 const url=process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
 if(!url||!key)throw new Error("Staff authentication is not configured");
 const cookieStore=await cookies();
 return createServerClient(url,key,{cookies:{getAll(){return cookieStore.getAll()},setAll(values){try{values.forEach(({name,value,options})=>cookieStore.set(name,value,options))}catch{/* Proxy refreshes cookies for server-rendered routes. */}}}});
}
export function createAdminClient():SupabaseClient{
 const url=process.env.SUPABASE_URL||process.env.NEXT_PUBLIC_SUPABASE_URL,key=process.env.SUPABASE_SERVICE_ROLE_KEY;
 if(!url||!key)throw new Error("Private Supabase service credentials are not configured");
 return createClient(url,key,{auth:{autoRefreshToken:false,persistSession:false,detectSessionInUrl:false}});
}
export async function getCurrentStaff():Promise<StaffIdentity|null>{
 if(!isStaffPortalConfigured())return null;
 try{
  const auth=await createAuthClient(),{data:{user},error}=await auth.auth.getUser();
  if(error||!user)return null;
  const admin=createAdminClient();
  let {data:member,error:memberError}=await admin.from("staff_members").select("user_id,full_name,role,is_active").eq("user_id",user.id).maybeSingle();
  if(memberError)return null;
  const bootstrapEmail=process.env.STAFF_ADMIN_EMAIL?.trim().toLowerCase();
  if(!member&&bootstrapEmail&&user.email?.toLowerCase()===bootstrapEmail){
   const created=await admin.from("staff_members").upsert({user_id:user.id,full_name:String(user.user_metadata?.full_name||user.email),role:"admin",is_active:true},{onConflict:"user_id"}).select("user_id,full_name,role,is_active").single();
   if(created.error)return null;member=created.data;
  }
  if(!member||member.is_active!==true||!["admin","manager","agent"].includes(member.role))return null;
  return {id:user.id,email:user.email||"",fullName:member.full_name||user.email||"Staff member",role:member.role as StaffRole};
 }catch{return null}
}
