/** Resend delivery intentionally deferred. Never claim success without confirmed delivery. */
export function validateContact(values){
 /** @type {Record<string,string>} */
 const errors={};
 for(const key of ['name','email','phone']) if(!String(values[key]??'').trim()) errors[key]='Please complete this field.';
 if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email??'').trim())) errors.email='Enter a valid email address.';
 const phone=String(values.phone??'').trim();
 if(phone && (!/^[+\d\s().-]+$/.test(phone)||phone.replace(/\D/g,'').length<7||phone.replace(/\D/g,'').length>15)) errors.phone='Enter a valid phone number, including your country code.';
 for(const key of ['name','email','phone','company','businessType','message']) if(String(values[key]??'').length>(key==='message'?5000:200)) errors[key]='Please shorten this field.';
 if(values.employees!==undefined&&String(values.employees)!==''&&(!/^\d+$/.test(String(values.employees))||Number(values.employees)>1000000)) errors.employees='Enter a whole number of employees.';
 return errors;
}
export async function submitContact(values){
 if(Object.keys(validateContact(values)).length) throw new Error('Please review the highlighted fields.');
 throw new Error('Email delivery is not connected yet. Your details have not been sent. Please call (850) 775-6906.');
}
