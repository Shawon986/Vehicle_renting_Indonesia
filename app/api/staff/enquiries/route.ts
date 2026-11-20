import {NextRequest,NextResponse} from "next/server";
import {createAdminClient,getCurrentStaff} from "@/lib/supabase/server";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function GET(request:NextRequest){
 const staff=await getCurrentStaff();
 if(!staff)return NextResponse.json({error:"Unauthorized"},{status:401,headers:{"Cache-Control":"private, no-store"}});
 try{
  const params=request.nextUrl.searchParams,status=params.get("status")||"",rawQuery=(params.get("q")||"").slice(0,80);
  const page=Math.max(1,Math.min(1000,Number(params.get("page")||1)||1)),limit=30,from=(page-1)*limit;
  const admin=createAdminClient();
  let query=admin.from("vehicle_enquiries").select("*",{count:"exact"}).order("received_at",{ascending:false}).range(from,from+limit-1);
  if(["New","Reviewing","Replied","Quote sent","Closed"].includes(status))query=query.eq("status",status);
  const safeQuery=rawQuery.replace(/[,%()_*]/g," ").trim();
  if(safeQuery)query=query.or("customer_name.ilike.%"+safeQuery+"%,customer_email.ilike.%"+safeQuery+"%,lead_id.ilike.%"+safeQuery+"%");
  const [{data,error,count},{data:statusRows,error:statusError}] = await Promise.all([
   query,
   admin.from("vehicle_enquiries").select("status")
  ]);
  if(error||statusError)throw error||statusError;
  const ids=(data||[]).map(row=>row.id);
  const history=ids.length?await admin.from("enquiry_status_history").select("id,enquiry_id,old_status,new_status,note,created_at,actor_id").in("enquiry_id",ids).order("created_at",{ascending:false}):{data:[],error:null};
  if(history.error)throw history.error;
  const summary={total:statusRows?.length||0,New:0,Reviewing:0,Replied:0,"Quote sent":0,Closed:0};
  for(const row of statusRows||[])if(row.status in summary)(summary as Record<string,string|number>)[row.status]=(Number((summary as Record<string,string|number>)[row.status])||0)+1;
  return NextResponse.json({items:data||[],history:history.data||[],summary,page,limit,totalCount:count||0,role:staff.role},{headers:{"Cache-Control":"private, no-store"}});
 }catch(error){
  console.error("Staff enquiry list failed",error instanceof Error?error.message:"unknown");
  return NextResponse.json({error:"Unable to load enquiries"},{status:500,headers:{"Cache-Control":"private, no-store"}});
 }
}
