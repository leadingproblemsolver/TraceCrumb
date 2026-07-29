# TraceCrumb Reference Corpus v1

## Status

- Generated: 2026-07-29
- Records: 26
- Intended use: cold-start lexical-overlap retrieval for TraceCrumb First-60
- Source organizations: GitHub (16), Cloudflare (10)
- Source type: public first-party availability reports and technical postmortems

## Evidence boundary

The incident facts, symptoms, changes, mitigations and root causes are paraphrased from the linked first-party reports. `correct_first_branch`, `wrong_first_branch`, `failure_mode`, fingerprints and loss framing are curated analytical fields. They are not represented as quotations or claims made by the source organization. Null wrong branches mean the source did not disclose the responder's initial diagnostic path.

This corpus is suitable for mechanism testing, not for claiming that TraceCrumb has reduced MTTR or reproduced the original organizations' internal incident context.

## Distribution

- context_blindness: 14
- anchoring: 7
- false_pattern_match: 5
- other: 0

The distribution was not forced to match an earlier target. It reflects the curator's conservative classification of the selected cases.

## Inclusion criteria

1. First-party public incident report or postmortem.
2. Observable first-window symptoms can be separated from the final root cause.
3. A technically meaningful first diagnostic branch can be derived without inventing private facts.
4. The case provides discriminating terms likely to occur in responder-written symptom text.
5. Source provenance is retained per record.

## Known limitations

- Organization bias: all records come from two large infrastructure/software platforms.
- Publication bias: public reports overrepresent severe and explainable incidents.
- Vocabulary bias: fingerprints use English public-report terminology, not raw on-call messages.
- Counterfactual limitation: most reports do not disclose the exact wrong first branch.
- Retrieval limitation: current matching is token overlap rather than semantic or topology-aware retrieval.
- One medium-confidence case (`CF-2012-05-02-BGP-POLICY`) should be replaced if a richer first-party report is added.

## Required pre-production review

- Open every source URL and verify the paraphrase against the source.
- Have an SRE/platform engineer review all 26 proposed first branches.
- Run paraphrase retrieval tests using language not copied from the corpus.
- Keep evaluation holdouts in a separate file and never seed them into `reference_incidents`.

## Files

- `reference-incidents.v1.jsonl`: full evidence and review record.
- `reference-incidents.v1.csv`: human-review table.
- `seed_reference_incidents.sql`: schema-compatible production seed.
- `validate_reference_corpus.py`: deterministic validation.
