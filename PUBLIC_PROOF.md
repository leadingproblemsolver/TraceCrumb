# TraceCrumb public proof distribution

Status date: 2026-08-19

## Canonical URL

**Canonical:** https://tracecrumb.leadingproblemsolver.workers.dev/

Why: this is the public product surface. GitHub remains the source/evidence surface; it should not compete with the product URL as the canonical destination.

The canonical is now encoded in `index.html` as both `rel="canonical"` and `og:url`.

## Browser/mobile verification

Mechanical checks are run by `npm run test:proof` and therefore by CI through `npm run validate`.

Verified in-repo:

- mobile viewport metadata is present;
- responsive breakpoints exist at 860px and 700px;
- landing actions wrap rather than overflow;
- the no-signup demo route exists;
- shared-demo and source-channel attribution exist;
- canonical and Open Graph URLs match.

Live-host caveat: the execution environment used for this proof could not fetch the `workers.dev` host, so this record does **not** claim a visual live-browser pass. The CI checks verify browser/mobile readiness mechanically; a human/live-browser check should remain a deployment gate.

## Proof input → output → impact

### Input entity

GitHub — October 21, 2018 MySQL incident, based on GitHub's public postmortem already used by the worked demo.

Key input facts used by the demo:

- planned network maintenance preceded the incident;
- the primary lost connectivity;
- Orchestrator promoted a replica that was 43 seconds behind;
- users saw mixed read/write failures across GitHub surfaces.

### TraceCrumb output

First diagnostic branch: validate replication topology and replica lag before assuming an application-layer failure.

Priority checks: promotion-time lag, primary/replica divergence, error-type split, and Orchestrator safety filters.

### Impact differentiation

**Product output:** an earlier replication-focused branch plus falsification checks.

**Observed historical outcome:** the promoted replica was missing transactions and the replication state required careful recovery.

**Claim boundary:** this is a worked counterfactual proof, not measured customer impact. The product asks whether the earlier branch would have reduced wrong-first-branch time; it does not claim that TraceCrumb would have prevented the historical outage.

## One external attempt

Public GitHub distribution attempt:

https://github.com/leadingproblemsolver/TraceCrumb/issues/1

Attributed demo URL used in that attempt:

https://tracecrumb.leadingproblemsolver.workers.dev/?demo=1&source_channel=github_public_proof

This is intentionally one attributable attempt, not broad distribution. Follow-up should depend on observed visits/outcome tags rather than adding more channels mechanically.
