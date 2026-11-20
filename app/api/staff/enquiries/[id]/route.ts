import {NextRequest,NextResponse} from "next/server";
import {createAdminClient,getCurrentStaff} from "@/lib/supabase/server";
export const runtime="nodejs";
export const dynamic="force-dynamic";
const statuses=["New","Reviewing","Replied","Quote sent","Closed"];
export async function PATCH(request:NextRequest,{params}:{params:Promise<{id:string}>}){
 const origin=request.headers.get("origin"),host=request.headers.get("host");if(!origin||!host||new URL(origin).host!==host)return NextResponse.json({error:"Origin verification required"},{status:403});
 const staff=await getCurrentStaff();if(!staff)return NextResponse.json({error:"Unauthorized"},{status:401});
 const {id}=await params;if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id))return NextResponse.json({error:"Invalid enquiry reference"},{status:400});
 if(Number(request.headers.get("content-length")||0)>8192)return NextResponse.json({error:"Request too large"},{status:413});
 let body:Record<string,unknown>;try{const parsed=await request.json();if(!parsed||typeof parsed!=="object"||Array.isArray(parsed))throw new Error();body=parsed as Record<string,unknown>}catch{return NextResponse.json({error:"Invalid request"},{status:400})}
 const status=typeof body.status==="string"?body.status:"",note=typeof body.note==="string"?body.note.trim().slice(0,4000):"",hasAssignedTo=Object.prototype.hasOwnProperty.call(body,"assignedTo"),assignedTo=typeof body.assignedTo==="string"?body.assignedTo:"";
 if(status&&!statuses.includes(status))return NextResponse.json({error:"Invalid status"},{status:400});
 if(hasAssignedTo&&staff.role==="agent")return NextResponse.json({error:"Only managers and admins can assign enquiries"},{status:403});
 if(!status&&!note&&!hasAssignedTo)return NextResponse.json({error:"No changes supplied"},{status:400});
 try{
  const admin=createAdminClient(),{data:current,error:readError}=await admin.from("vehicle_enquiries").select("id,status,assigned_to,staff_notes").eq("id",id).single();
  if(readError||!current)return NextResponse.json({error:"Enquiry not found"},{status:404});
  if(hasAssignedTo&&assignedTo){const member=await admin.from("staff_members").select("user_id").eq("user_id",assignedTo).eq("is_active",true).maybeSingle();if(member.error||!member.data)return NextResponse.json({error:"Assigned staff member is not active"},{status:400})}
  const patch:Record<string,unknown>={updated_at:new Date().toISOString()};
  if(status)patch.status=status;if(hasAssignedTo)patch.assigned_to=assignedTo||null;if(note)patch.staff_notes=note;
  const {error:updateError}=await admin.from("vehicle_enquiries").update(patch).eq("id",id);if(updateError)throw updateError;
  if((status&&status!==current.status)||note){const {error:historyError}=await admin.from("enquiry_status_history").insert({enquiry_id:id,actor_id:staff.id,old_status:current.status,new_status:status||current.status,note});if(historyError)throw historyError}
  return NextResponse.json({ok:true},{headers:{"Cache-Control":"private, no-store"}});
 }catch(error){console.error("Staff enquiry update failed",error instanceof Error?error.message:"unknown");return NextResponse.json({error:"Unable to update enquiry"},{status:500})}
}
