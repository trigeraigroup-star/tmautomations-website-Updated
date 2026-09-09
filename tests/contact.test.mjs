import assert from 'node:assert/strict';
import test from 'node:test';
import {existsSync} from 'node:fs';
const url=new URL('../app/lib/contact.mjs',import.meta.url);
test('contact validates fields and never claims unconfigured delivery',async()=>{
 assert.ok(existsSync(url),'contact adapter must exist');
 const {validateContact,submitContact}=await import(url);
 const errors=validateContact({name:' ',email:'bad',company:'',message:''});
 assert.equal(errors.email,'Enter a valid email address.');
 for(const field of ['name','phone']) assert.ok(errors[field]);
 const valid={name:' Owner ',email:'owner@example.com',company:'',message:'',phone:'+1 (850) 775-6906'};
 assert.deepEqual(validateContact(valid),{});
 const realFetch=globalThis.fetch;
 globalThis.fetch=async()=>({ok:false,json:async()=>({error:'Email delivery is not connected yet.'})});
 try{await assert.rejects(submitContact(valid),/not connected/);}finally{globalThis.fetch=realFetch;}
});
test('server delivery only succeeds after Resend acknowledges',async()=>{
 const {deliverContact,buildEmail,normalizeContact}=await import(new URL('../app/lib/contact-server.mjs',import.meta.url));
 const values={name:'Owner',email:'owner@example.com',phone:'+1 850 775 6906',company:'Acme',priorities:['Growth','bogus'],message:'Hi'};
 let calls=0;
 await assert.rejects(deliverContact(values,{},async()=>{calls++;return {ok:true};}),/not connected/);
 assert.equal(calls,0,'no key means no network call');
 let sent;
 const out=await deliverContact(values,{RESEND_API_KEY:'k'},async(url,init)=>{sent={url,init};return {ok:true};});
 assert.deepEqual(out,{ok:true});
 assert.equal(sent.url,'https://api.resend.com/emails');
 assert.equal(sent.init.headers.Authorization,'Bearer k');
 const body=JSON.parse(sent.init.body);
 assert.deepEqual(body.to,['michal@tmautomations.io']);
 assert.equal(body.reply_to,'owner@example.com');
 assert.match(body.text,/Biggest difference: Growth$/m);
 assert.doesNotMatch(body.text,/bogus/);
 await assert.rejects(deliverContact(values,{RESEND_API_KEY:'k'},async()=>({ok:false})),/could not send/);
 assert.deepEqual(buildEmail(normalizeContact(values),{CONTACT_TO:'x@y.z, a@b.c'}).to,['x@y.z','a@b.c']);
});
test('build and test receives half the process scroll duration',async()=>{
 const url=new URL('../app/lib/process.mjs',import.meta.url);
 assert.ok(existsSync(url),'process mapping must exist');
 const {stageAtProgress}=await import(url);
 assert.deepEqual([0,.24,.25,.5,.74,.75,1].map(stageAtProgress),[0,0,1,1,1,2,2]);
});
