import {redirect} from "next/navigation";
import {getCurrentStaff} from "@/lib/supabase/server";
import {StaffDashboard} from "@/components/StaffDashboard";
export const dynamic="force-dynamic";
export const metadata={title:"Staff workspace | RentCarOcean",robots:{index:false,follow:false}};
export default async function StaffPage(){
 const staff=await getCurrentStaff();
 if(!staff)redirect("/staff/login");
 return <StaffDashboard staff={staff}/>;
}
