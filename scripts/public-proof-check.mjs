import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const canonical = 'https://tracecrumb.leadingproblemsolver.workers.dev/';
const index = readFileSync(join(root, 'index.html'), 'utf8');
const app = readFileSync(join(root, 'src', 'App.jsx'), 'utf8');
const styles = readFileSync(join(root, 'src', 'styles.css'), 'utf8');

const checks = [
  ['canonical URL', index.includes(`<link rel="canonical" href="${canonical}" />`)],
  ['Open Graph URL matches canonical', index.includes(`<meta property="og:url" content="${canonical}" />`)],
  ['mobile viewport meta', index.includes('name="viewport"') && index.includes('width=device-width')],
  ['primary responsive breakpoint', styles.includes('@media (max-width: 860px)')],
  ['small-screen responsive breakpoint', styles.includes('@media (max-width: 700px)')],
  ['landing actions wrap instead of overflow', styles.includes('.landing-actions') && styles.includes('flex-wrap: wrap')],
  ['public no-signup demo route', app.includes('?demo=1&source_channel=landing')],
  ['share-attributed demo route', app.includes('source_channel=shared_demo')],
  ['distribution source capture', app.includes("params.get('source_channel')")],
  ['high-relevance public proof input', app.includes('GitHub Oct 21 2018') && app.includes('43 seconds behind')],
  ['impact-separated demo output', app.includes('suggested_branch') && app.includes('loss_prevention_reason') && app.includes('what_actually_happened')],
];

let failed = false;
for (const [name, ok] of checks) {
  if (ok) console.log(`PASS: ${name}`);
  else {
    console.error(`FAIL: ${name}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log(`PUBLIC PROOF CHECKS OK: ${canonical}`);
