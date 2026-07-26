# Portfolio Evidence — TraceCrumb First-60

## Functional claim

An incident-response interface that turns live symptoms and prior incident memory into the safest first diagnostic branch.

## Engineering domain

SRE product / incident intelligence / React + Supabase

## Highest-signal surfaces

- incident-domain modeling
- safe frontend/server secret boundary
- graph consistency
- distribution-oriented product flow

## Reproduction commands

```bash
node scripts/static-ship-tests.mjs
node scripts/test-graph.mjs
npm run validate
```

## Validation completed in this upgrade

69 offline static and graph checks passed.

## Human competence evidence still required

- Complete one implementation/reconstruction sprint on a Tier-1 subsystem.
- Complete one evidence-led debugging sprint.
- Explain the end-to-end runtime flow without notes.
- Complete one bounded live modification and rerun verification.
- Record a deployment or production-like smoke test.

## Unverified or externally blocked

- The production build was not regenerated because the package registry was unavailable.
- Live Supabase auth, Edge Function, telemetry, and RLS behavior require credentials.

## Claim discipline

Repository state and passing offline checks may be claimed. Live scale, adoption, resilience, latency, and production reliability may not be claimed until measured. See `AI_HUMAN_PROVENANCE.md`.
