import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import test from 'node:test';
const path = new URL('../app/content.json', import.meta.url);
test('approved content is centralized and has valid navigation destinations', () => {
 assert.ok(existsSync(path), 'central content module must exist');
 const c=JSON.parse(readFileSync(path));
 assert.deepEqual(c.nav.map(n=>n.id), ['approach','process','work','contact']);
 assert.equal(c.hero.title,'There’s another way this day could go.');
 assert.equal(c.process.steps.length,3);
 assert.deepEqual(c.caseStudies,[]); assert.deepEqual(c.testimonials,[]);
 assert.equal(c.contact.phoneHref,'tel:+18507756906');
});
test('motion fallback and contact anchor exist',()=>{
 const page=readFileSync(new URL('../app/page.tsx',import.meta.url),'utf8');
 assert.match(page, /id="contact"/);
 assert.match(readFileSync(new URL('../app/globals.css',import.meta.url),'utf8'),/prefers-reduced-motion/);
});
test('no-JS intake cannot submit personal information through a native GET',()=>{
 const form=readFileSync(new URL('../app/components/Contact.tsx',import.meta.url),'utf8');
 assert.match(form,/disabled=\{!ready\}/);
});
