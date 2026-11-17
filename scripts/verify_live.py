#!/usr/bin/env python3
"""Check the *deployed* Pages release, not only the build artifact.

Usage: PAGES_URL=https://.../ python3 scripts/verify_live.py
Exit nonzero if any SEO/GEO evidence or remote SHA-256 differs from repository.
"""
from __future__ import annotations

import hashlib
import json
import os
from pathlib import Path
import re
import time
from urllib.parse import urljoin
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
SITE = ROOT / "site"
EXPECTED_BASE = "https://aipmandy.github.io/restaurant-ai-customer-acquisition-handbook/"
PAGES_URL = os.environ.get("PAGES_URL", "").strip()
if not PAGES_URL:
    raise SystemExit("PAGES_URL is required; a build alone is not online evidence.")
BASE = PAGES_URL.rstrip("/") + "/"
if BASE != EXPECTED_BASE:
    raise SystemExit(f"Unexpected Pages URL {BASE!r} (wanted {EXPECTED_BASE!r})")

PDF_REL = "downloads/restaurant-ai-customer-acquisition-handbook-guide.pdf"
PDF_SOURCE = ROOT / "pdf/restaurant-ai-customer-acquisition-handbook-guide.pdf"
EDITION = json.loads((ROOT / "pdf/edition.json").read_text(encoding="utf-8"))
ASSETS = (
    "index.html", "handbook.html", "tools.html", "plan.html",
    "sources.html", "robots.txt", "sitemap.xml", "llms.txt",
    "contact.html", "privacy.html", "guide/01.html", "guide/26.html",
    "assets/app.js", "assets/style.css", PDF_REL,
)

def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()

def inspect_source_metadata() -> dict:
    doc = (SITE / "sources.html").read_text(encoding="utf-8")
    canonical = EXPECTED_BASE + "sources.html"
    assert f'<link rel="canonical" href="{canonical}">' in doc, "Sources canonical mismatch"
    match = re.search(r'<script type="application/ld\\+json">(.*?)</script>', doc, re.S)
    assert match, "No sources JSON-LD"
    graph = json.loads(match.group(1))
    assert graph.get("@context") == "https://schema.org"
    assert graph.get("@type") == "WebPage"
    assert graph.get("url") == canonical
    assert graph.get("author", {}).get("name") == "AI 酋长 Andy"
    assert graph.get("publisher", {}).get("url") == "https://www.a6no1.cn/"
    citations = graph.get("citation", [])
    assert len(citations) >= 3, "Too few independently documented citation URLs"
    assert all(c in doc for c in citations), "JSON-LD citation not visible on page"
    assert "2026-11-17" in doc, "Source QA record missing historical check date"
    assert "未核" in doc or "没有重新核对" in doc, "Missing unverified-source boundary"
    assert "https://metaver.vip/services" in doc
    assert 'data-copy="AIPMAndy"' in doc
    robot = (SITE / "robots.txt").read_text(encoding="utf-8")
    assert f"Sitemap: {EXPECTED_BASE}sitemap.xml" in robot
    root = ET.parse(SITE / "sitemap.xml").getroot()
    namespace = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    nodes = root.findall("sm:url", namespace)
    urls = [node.findtext("sm:loc", namespaces=namespace) for node in nodes]
    assert len(urls) >= 35, f"Sitemap unexpectedly small: {len(urls)}"
    assert len(urls) == len(set(urls)), "Duplicate canonical sitemap URLs"
    assert all(url.startswith(EXPECTED_BASE) for url in urls), "Unexpected sitemap host/path"
    for url in urls:
        name = url[len(EXPECTED_BASE):] or "index.html"
        assert (SITE / name).is_file(), f"Sitemap points at missing file: {name}"
    source_node = next(node for node in nodes if node.findtext("sm:loc", namespaces=namespace) == canonical)
    assert source_node.findtext("sm:lastmod", namespaces=namespace) == "2026-11-17"
    assert (SITE / PDF_REL).read_bytes() == PDF_SOURCE.read_bytes()
    assert digest(PDF_SOURCE.read_bytes()) == EDITION["sha256"]
    return {"source_citations": len(citations), "sitemap_html_urls": len(urls), "pdf_pages": EDITION["pages"]}

def download(relative: str) -> bytes:
    url = urljoin(BASE, relative)
    request = Request(url, headers={"User-Agent": "Xingjue-Site-Release-QA/1.0"})
    with urlopen(request, timeout=25) as response:
        if response.status != 200:
            raise RuntimeError(f"{relative}: HTTP {response.status}")
        if response.geturl().split("?")[0] != url:
            raise RuntimeError(f"Unexpected redirect: {url} -> {response.geturl()}")
        return response.read()

def verify() -> dict:
    qa = inspect_source_metadata()
    checked = {}
    for rel in ASSETS:
        local = (SITE / rel).read_bytes()
        remote = download(rel)
        if digest(remote) != digest(local):
            raise AssertionError(f"Live {rel} SHA-256 differs from checked-out repository")
        checked[rel] = digest(remote)
    qa["verified_live_files"] = checked
    qa["site_url"] = BASE
    qa["pdf_sha256"] = checked[PDF_REL]
    return qa

if __name__ == "__main__":
    inspect_source_metadata()  # fail fast on source-integrity errors
    for attempt in range(1, 13):
        try:
            report = verify()
            destination = ROOT / "live-qa.json"
            destination.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            print(f"PASS: {len(ASSETS)} exact live SHA-256 matches, {report['sitemap_html_urls']} sitemap URLs, {report['source_citations']} visible citations, {report['pdf_pages']}-page PDF")
            print(f"Report: {destination}")
            break
        except Exception as error:
            if attempt == 12:
                raise
            print(f"Deployment propagation check {attempt}/12: {error}", flush=True)
            time.sleep(5)
