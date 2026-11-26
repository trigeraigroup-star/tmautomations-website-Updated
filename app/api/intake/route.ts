import {rateLimited,ContactError} from '../../lib/contact-server.mjs';
import {deliverIntake} from '../../lib/intake-server.mjs';
import content from '../../intake-content.json';
const MAX_BODY=40_000;
export async function POST(request:Request){
 const ip=request.headers.get('cf-connecting-ip')??request.headers.get('x-forwarded-for')??'local';
 if(rateLimited(`intake:${ip}`)) return Response.json({error:'Too many attempts. Please wait a few minutes.'},{status:429});
 const raw=await request.text();
 if(raw.length>MAX_BODY) return Response.json({error:'Please shorten your answers.'},{status:413});
 let values:Record<string,unknown>;
 try{values=JSON.parse(raw);}catch{return Response.json({error:'Unable to read your answers.'},{status:400});}
 try{await deliverIntake(values,process.env as Record<string,string|undefined>,content);return Response.json({ok:true});}
 catch(error){const status=error instanceof ContactError?error.status:502;return Response.json({error:error instanceof Error?error.message:'Unable to send.'},{status});}
}
