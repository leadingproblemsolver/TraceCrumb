import fs from 'node:fs';

const path = 'package-lock.json';
const internalPrefix =
  'https://packages.applied-caas-gateway1.internal.api.openai.org/artifactory/api/npm/npm-public/';
const publicPrefix = 'https://registry.npmjs.org/';

const original = fs.readFileSync(path, 'utf8');
const occurrences = original.split(internalPrefix).length - 1;
const normalized = original.replaceAll(internalPrefix, publicPrefix);

if (normalized.includes('packages.applied-caas-gateway1.internal.api.openai.org')) {
  throw new Error('Unsupported internal npm registry URL remains in package-lock.json');
}

if (occurrences > 0) {
  fs.writeFileSync(path, normalized);
}

console.log(JSON.stringify({ lock_registry_normalized: true, rewritten_urls: occurrences }));
