from pathlib import Path
import json,re
p=Path(__file__).with_name("reference-incidents.v1.jsonl")
rows=[json.loads(x) for x in p.read_text(encoding="utf-8").splitlines() if x.strip()]
assert len(rows)==26, len(rows)
assert len({r["case_id"] for r in rows})==26
allowed={"context_blindness","anchoring","false_pattern_match","other"}
for r in rows:
    assert r["failure_mode"] in allowed
    assert r["source_url"].startswith("https://")
    assert len(r["fingerprint"])>=6
    assert all(re.fullmatch(r"[a-z0-9-]+", x) for x in r["fingerprint"])
    assert "REPLACE" not in json.dumps(r)
print(f"PASS: {len(rows)} reference incidents; unique IDs and required fields valid")
