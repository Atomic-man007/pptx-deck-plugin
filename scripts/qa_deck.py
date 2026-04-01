#!/usr/bin/env python3
"""
qa_deck.py — Content QA for generated .pptx files.

Checks: slide count, each slide has text, no leftover placeholder text.

Usage:
    python3 qa_deck.py output.pptx
    python3 qa_deck.py output.pptx --expected-slides 10
"""
import sys, re, zipfile, xml.etree.ElementTree as ET

PLACEHOLDER = re.compile(r"\b(TODO|XXX|lorem|ipsum|\[insert|\bTBD\b|PLACEHOLDER)", re.I)


def qa(path, expected=None):
    issues, slides = [], []

    with zipfile.ZipFile(path) as z:
        pxml = z.read("ppt/presentation.xml").decode()
        rids = re.findall(r'r:id="(rId\d+)"', pxml)
        rels = dict(re.findall(r'Id="(rId\d+)"[^>]*Target="([^"]+)"',
                               z.read("ppt/_rels/presentation.xml.rels").decode()))

        for rid in rids:
            rel = rels.get(rid, "")
            if "slide" in rel and "Layout" not in rel and "Master" not in rel:
                try:
                    xml = z.read(f"ppt/{rel}").decode()
                except KeyError:
                    continue
                texts = [el.text.strip() for el in ET.fromstring(xml).iter()
                         if el.tag.split("}")[-1] == "t" and el.text and el.text.strip()]
                slides.append(" ".join(texts))

    for i, text in enumerate(slides, 1):
        if not text:
            issues.append(f"Slide {i}: empty — no text found")
        m = PLACEHOLDER.search(text)
        if m:
            issues.append(f"Slide {i}: placeholder text found → '{m.group()}'")

    if expected and len(slides) != expected:
        issues.append(f"Slide count: expected {expected}, got {len(slides)}")

    print(f"\nQA: {path}  ({len(slides)} slides)")
    for i, t in enumerate(slides, 1):
        print(f"  {i:>2}: {t[:70]}")
    print()

    if issues:
        print(f"ISSUES ({len(issues)}):")
        for iss in issues:
            print(f"  ✗ {iss}")
        sys.exit(1)
    else:
        print("✓ All checks passed")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 qa_deck.py output.pptx [--expected-slides N]")
        sys.exit(1)
    expected = None
    if "--expected-slides" in sys.argv:
        idx = sys.argv.index("--expected-slides")
        expected = int(sys.argv[idx + 1])
    qa(sys.argv[1], expected)
