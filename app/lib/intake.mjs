/** Browser adapter for the pre-call interview: posts to /api/intake, which delivers through Resend. */
export function validateIntake(values){
 /** @type {Record<string,'required'|'email'>} */
 const errors={};
 if(typeof values?.name!=='string'||!values.name.trim()) errors.name='required';
 const email=typeof values?.email==='string'?values.email.trim():'';
 if(!email) errors.email='required';
 else if(email.length>200) errors.email='email';
 else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email='email';
 return errors;
}
export async function submitIntake(values){
 const res=await fetch('/api/intake',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(values)});
 const data=await res.json().catch(()=>({}));
 if(!res.ok||!data.ok) throw new Error(data.error||'Unable to send.');
 return data;
}
