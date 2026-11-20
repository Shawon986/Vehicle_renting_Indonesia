import {NextRequest,NextResponse} from "next/server";
import {createAdminClient,getCurrentStaff} from "@/lib/supabase/server";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(){
 const staff=await getCurrentStaff();
 if(!staff||!["admin","manager"].includes(staff.role))return NextResponse.json({error:"Forbidden"},{status:403});
 try{const admin=createAdminClient();const {data,error}=await admin.from("staff_members").select("user_id,full_name,role,is_active,created_at").order("created_at",{ascending:true});if(error)throw error;return NextResponse.json({members:data||[]},{headers:{"Cache-Control":"private, no-store"}})}catch{return NextResponse.json({error:"Unable to load staff members"},{status:500})}
}
export async function POST(request:NextRequest){
 const origin=request.headers.get("origin"),host=request.headers.get("host");if(!origin||!host||new URL(origin).host!==host)return NextResponse.json({error:"Origin verification required"},{status:403});
 const staff=await getCurrentStaff();
 if(!staff||staff.role!=="admin")return NextResponse.json({error:"Only admins can invite staff"},{status:403});
 const length=Number(request.headers.get("content-length")||0);if(length>2048)return NextResponse.json({error:"Request too large"},{status:413});
 let body:Record<string,unknown>;try{body=await request.json() as Record<string,unknown>}catch{return NextResponse.json({error:"Invalid request"},{status:400})}
 const email=typeof body.email==="string"?body.email.trim().toLowerCase():"",fullName=typeof body.fullName==="string"?body.fullName.trim().slice(0,100):"",role=typeof body.role==="string"?body.role:"agent";
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||!fullName||!["manager","agent"].includes(role))return NextResponse.json({error:"Enter a valid email, name and role"},{status:400});
 try{
  const admin=createAdminClient(),{data,error}=await admin.auth.admin.inviteUserByEmail(email,{data:{full_name:fullName},redirectTo:request.nextUrl.origin+"/staff/login"});
  if(error||!data.user)throw error||new Error("Invite could not be created");
  const {error:insertError}=await admin.from("staff_members").upsert({user_id:data.user.id,full_name:fullName,role,is_active:true},{onConflict:"user_id"});
  if(insertError)throw insertError;
  return NextResponse.json({ok:true},{status:201});
 }catch(error){console.error("Staff invite failed",error instanceof Error?error.message:"unknown");return NextResponse.json({error:"Unable to invite this staff member. Check the email provider configuration."},{status:500})}
}
