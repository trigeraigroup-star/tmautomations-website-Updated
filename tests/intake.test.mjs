import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync} from 'node:fs';
const content=JSON.parse(readFileSync(new URL('../app/intake-content.json',import.meta.url),'utf8'));
const {validateIntake}=await import(new URL('../app/lib/intake.mjs',import.meta.url));
const {deliverIntake,buildIntakeEmail}=await import(new URL('../app/lib/intake-server.mjs',import.meta.url));
const values={lang:'he',name:'Dana',business:'Acme',email:'dana@example.com',role:'owner',q1:'We make doors',q2:'other',q2_other:'Doors',q6:['email','paper','bogus'],q6_email:['Gmail / Google Workspace','Hotmail'],q6_email_other:'Proton',q8:'didnt',q8_text:'Zapier broke',q9:['late','other'],q9_other:'Payroll',q10:['other','late','followup','retype'],q10_text:'10 hours',q14:['time','calm','costs'],q12:['bogus']};
test('every question has both languages and unique ids',()=>{
 const qs=content.sections.flatMap(s=>s.questions);
 assert.equal(qs.length,18);
 assert.equal(new Set(qs.map(q=>q.id)).size,18);
 for(const item of [...content.sections.flatMap(s=>[s.title,s.intro]),...qs.flatMap(q=>[q.label,...(q.options??[]),...(q.tools??[])])]) assert.ok(item.en&&item.he,JSON.stringify(item));
});
test('name and a valid email are required, nothing else',()=>{
 assert.deepEqual(validateIntake({}),{name:'required',email:'required'});
 assert.deepEqual(validateIntake({name:'A',email:'bad'}),{email:'email'});
 assert.deepEqual(validateIntake({name:'A',email:'a@b.co'}),{});
});
test('email shows English labels, drops unknown choices, keeps write-ins',()=>{
 const mail=buildIntakeEmail(values,{},content);
 assert.equal(mail.subject,'Pre-call interview: Acme');
 assert.equal(mail.reply_to,'dana@example.com');
 assert.match(mail.text,/Answered in: Hebrew/);
 assert.match(mail.text,/2\. Which field are you in\?\n {3}Other: Doors/);
 assert.match(mail.text,/- Email: Gmail \/ Google Workspace, Proton\n {3}- Paper or notebook/);
 assert.doesNotMatch(mail.text,/bogus|Hotmail/);
 assert.match(mail.text,/Yes, and it didn't stick\n {3}What happened\? Zapier broke/);
 assert.match(mail.text,/1\. Other: Payroll\n {3}2\. Quotes or invoices going out late\n {3}3\. Following up with customers\n {3}How much would that save you\? \(time \/ money \/ energy\) 10 hours/);
 assert.match(mail.text,/Time back; A calmer team\n/); // capped at 2
 assert.match(mail.text,/12\. Which of these are true for you right now\?\n {3}\(skipped\)/);
});
test('delivery only succeeds after Resend acknowledges',async()=>{
 let calls=0;
 await assert.rejects(deliverIntake(values,{},content,async()=>{calls++;return {ok:true};}),/not connected/);
 await assert.rejects(deliverIntake({name:'x'},{RESEND_API_KEY:'k'},content,async()=>{calls++;return {ok:true};}),/valid email/);
 assert.equal(calls,0);
 assert.deepEqual(await deliverIntake(values,{RESEND_API_KEY:'k'},content,async()=>({ok:true})),{ok:true});
 await assert.rejects(deliverIntake(values,{RESEND_API_KEY:'k'},content,async()=>({ok:false})),/could not send/);
});
