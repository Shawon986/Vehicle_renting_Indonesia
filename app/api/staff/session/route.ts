import {NextResponse} from "next/server";
import {getCurrentStaff} from "@/lib/supabase/server";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(){
 const staff=await getCurrentStaff();
 if(!staff)return NextResponse.json({error:"Staff access is required"},{status:401,headers:{"Cache-Control":"private, no-store"}});
 return NextResponse.json({staff},{headers:{"Cache-Control":"private, no-store"}});
}
