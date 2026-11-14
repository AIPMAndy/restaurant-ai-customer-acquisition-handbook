#!/usr/bin/env python3
"""Verify that the reviewed PDF is identical in the repository and Pages source.

This script performs structural checks and renders visual review samples. A
human must still inspect the images, especially on actual mobile devices.
"""
from __future__ import annotations
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
edition = json.loads((ROOT / "pdf/edition.json").read_text(encoding="utf-8"))
source = ROOT / edition["pdf_path"]
published = ROOT / "site/downloads" / source.name
homepage = ROOT / "site/index.html"

def verify_bytes(path: Path) -> str:
    assert path.is_file(), f"Missing PDF: {path}"
    assert path.stat().st_size == edition["bytes"], f"PDF byte-size mismatch: {path}"
    blob = path.read_bytes()
    assert blob.startswith(b"%PDF-"), f"Not a PDF: {path}"
    digest = hashlib.sha256(blob).hexdigest()
    assert digest == edition["sha256"], f"PDF SHA-256 mismatch: {path}"
    return digest

sha = verify_bytes(source)
assert verify_bytes(published) == sha
html = homepage.read_text(encoding="utf-8")
assert "downloads/" + source.name in html, "Site is missing the PDF link"
assert "https://aipmandy.github.io/restaurant-ai-customer-acquisition-handbook/" in html

try:
    import fitz
except ImportError as exc:
    raise RuntimeError("Install PyMuPDF before structural and rendered PDF QA") from exc

book = fitz.open(str(source))
assert len(book) == edition["pages"], f"Expected {edition['pages']} pages; found {len(book)}"
full_text = "\n".join(page.get_text() for page in book)
external_urls = [
    entry.get("uri", "")
    for page in book
    for entry in page.get_links()
    if entry.get("uri")
]
searchable = full_text + "\n" + "\n".join(external_urls)
assert "AIPMAndy" in searchable, "Missing author contact information in PDF"
for domain in ("metaver.vip", "a6no1.cn"):
    assert domain in searchable, f"Missing linked author/company website: {domain}"

bookmarks = len(book.get_toc())
links = sum(len(page.get_links()) for page in book)
warnings = []
if not bookmarks:
    warnings.append("No embedded PDF bookmarks; visually check the contents page")
if not links:
    warnings.append("No clickable PDF links; inspect printed URLs")

out = ROOT / "pdf-qa"
out.mkdir(exist_ok=True)
for title, i in (("cover", 0), ("middle", len(book) // 2), ("last", len(book) - 1)):
    book[i].get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False).save(str(out / f"{title}.png"))
report = {
    "source_pdf": str(source.relative_to(ROOT)),
    "pages": len(book),
    "bytes": edition["bytes"],
    "sha256": sha,
    "bookmarks": bookmarks,
    "links": links,
    "rendered_samples": ["pdf-qa/cover.png", "pdf-qa/middle.png", "pdf-qa/last.png"],
    "warnings": warnings,
    "visual_review_status": "awaiting human inspection; render is not visual approval",
}
(out / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(json.dumps(report, ensure_ascii=False, indent=2))
