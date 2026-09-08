import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('main process uses the approved three-stage support copy', () => {
 const {process} = JSON.parse(readFileSync(new URL('../app/content.json', import.meta.url), 'utf8'));
 assert.equal(process.title, 'The work process');
 assert.deepEqual(process.steps.map(step => step.title), ['Discover & Prioritize', 'Build & Test', 'Integrate & Support']);
 assert.equal(process.steps[2].note, 'Support that continues after launch.');
 assert.doesNotMatch(JSON.stringify(process.steps[2]), /improv/i);
});

test('main process presents all text stages without the illustrated pinned scene', () => {
 const source = readFileSync(new URL('../app/components/Process.tsx', import.meta.url), 'utf8');
 assert.match(source, /className="text-process"/);
 assert.doesNotMatch(source, /ProcessArtwork|role="tabpanel"|scene-stage|\shidden=/);
 assert.doesNotMatch(source, /scrollIntoView/);
 assert.match(source, /prefers-reduced-motion/);
});
