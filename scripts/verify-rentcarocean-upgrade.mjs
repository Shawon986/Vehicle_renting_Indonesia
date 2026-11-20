import {readFileSync,existsSync} from "node:fs";
const required=(path,needles)=>{
 if(!existsSync(path))throw new Error("Missing required upgrade file: "+path);
 const source=readFileSync(path,"utf8");
 for(const needle of needles)if(!source.includes(needle))throw new Error(path+" is missing required safeguard or feature: "+needle);
};
required("components/HomeRentalSearch.tsx",['name="routeStop"','name="tripPurpose"','name="specialRequests"','<VehicleInquiryForm','createPortal']);
required("components/VehicleCollection.tsx",['vehicle-compare-panel','setCompareSlugs','query.trim()']);
required("components/VehicleGallery.tsx",["onTouchEnd","previousOverflow","aria-modal"]);
required("app/api/inquiries/route.ts",['oneWay=value("oneWay",4)==="yes"',"forwardToFormspree"]);
const packageJson=JSON.parse(readFileSync("package.json","utf8"));
if(packageJson.dependencies?.["@supabase/ssr"]||packageJson.dependencies?.["@supabase/supabase-js"])throw new Error("Staff dashboard dependencies must not be included.");
for(const path of ["app/staff","app/api/staff","components/StaffDashboard.tsx","lib/supabase/server.ts","lib/staff-types.ts","proxy.ts","supabase/migrations/20261120000100_staff_dashboard.sql"]){
 if(existsSync(path))throw new Error("Removed dashboard feature is still present: "+path);
}
console.log("RentCarOcean public enquiry upgrade checks passed.");
