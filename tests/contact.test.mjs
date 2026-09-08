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
 await assert.rejects(submitContact(valid),/not connected/);
});
test('build and test receives half the process scroll duration',async()=>{
 const url=new URL('../app/lib/process.mjs',import.meta.url);
 assert.ok(existsSync(url),'process mapping must exist');
 const {stageAtProgress}=await import(url);
 assert.deepEqual([0,.24,.25,.5,.74,.75,1].map(stageAtProgress),[0,0,1,1,1,2,2]);
});
