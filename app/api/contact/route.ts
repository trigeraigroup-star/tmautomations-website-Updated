import {deliverContact,rateLimited,ContactError} from '../../lib/contact-server.mjs';
const MAX_BODY=16_000;
export async function POST(request:Request){
 const ip=request.headers.get('cf-connecting-ip')??request.headers.get('x-forwarded-for')??'local';
 if(rateLimited(ip)) return Response.json({error:'Too many attempts. Please wait a few minutes or call (850) 775-6906.'},{status:429});
 const raw=await request.text();
 if(raw.length>MAX_BODY) return Response.json({error:'Please shorten your message.'},{status:413});
 let values:Record<string,unknown>;
 try{values=JSON.parse(raw);}catch{return Response.json({error:'Please review the highlighted fields.'},{status:400});}
 if(values.website) return Response.json({ok:true}); // honeypot: bots fill the hidden field; pretend success, send nothing
 try{await deliverContact(values,process.env as Record<string,string|undefined>);return Response.json({ok:true});}
 catch(error){const status=error instanceof ContactError?error.status:502;return Response.json({error:error instanceof Error?error.message:'Unable to send.'},{status});}
}
