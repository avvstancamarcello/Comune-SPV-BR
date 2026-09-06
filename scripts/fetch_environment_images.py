import concurrent.futures
import html
import json
import re
import urllib.parse
import urllib.request
import time
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "assets" / "beni-ambientali"

ITEMS = [
    ("flora", "leccio", "Quercus ilex"),
    ("flora", "roverella", "Quercus pubescens"),
    ("flora", "quercia-dalechampii", "Quercus dalechampii"),
    ("flora", "quercia-virgiliana", "Quercus virgiliana"),
    ("flora", "olmo-campestre", "Ulmus minor"),
    ("flora", "mirto", "Myrtus communis"),
    ("flora", "lentisco", "Pistacia lentiscus"),
    ("flora", "fillirea", "Phillyrea latifolia"),
    ("flora", "alaterno", "Rhamnus alaternus"),
    ("flora", "prugnolo", "Prunus spinosa"),
    ("flora", "biancospino", "Crataegus monogyna"),
    ("flora", "ligustro", "Ligustrum vulgare"),
    ("flora", "canna-palustre", "Phragmites australis"),
    ("flora", "giaggiolo-acqua", "Iris pseudacorus"),
    ("flora", "equiseto", "Equisetum arvense"),
    ("fauna", "poiana", "Buteo buteo"),
    ("fauna", "upupa", "Upupa epops"),
    ("fauna", "airone-cenerino", "Ardea cinerea"),
    ("fauna", "rana-verde", "Pelophylax esculentus"),
    ("fauna", "mollusco-acqua-dolce", "Lymnaea stagnalis"),
]

API = "https://commons.wikimedia.org/w/api.php"
QUERY_OVERRIDES = {
    "roverella": "Quercus pubescens tree", "olmo-campestre": "Ulmus minor tree leaves",
    "lentisco": "Pistacia lentiscus leaves fruit", "prugnolo": "Prunus spinosa flowers fruit",
    "poiana": "Buteo buteo adult bird"
}

def clean(value):
    value = re.sub(r"<[^>]+>", " ", value or "")
    return " ".join(html.unescape(value).split())

def fetch(item):
    group, slug, scientific = item
    params = {
        "action": "query", "generator": "search", "gsrsearch": QUERY_OVERRIDES.get(slug, scientific),
        "gsrnamespace": 6, "gsrlimit": 6, "prop": "imageinfo",
        "iiprop": "url|extmetadata", "iiurlwidth": 1000, "format": "json",
    }
    request_url = API + "?" + urllib.parse.urlencode(params)
    api_request = urllib.request.Request(request_url, headers={"User-Agent": "Comune-SPV-App/3.1 (educational civic app)"})
    payload = None
    for attempt in range(5):
        try:
            with urllib.request.urlopen(api_request, timeout=45) as response:
                payload = json.load(response)
            break
        except Exception:
            if attempt == 4:
                raise
            time.sleep(3 * (attempt + 1))
    pages = list(payload.get("query", {}).get("pages", {}).values())
    candidates = []
    for page in pages:
        info = (page.get("imageinfo") or [{}])[0]
        url = info.get("thumburl") or info.get("url")
        license_name = info.get("extmetadata", {}).get("LicenseShortName", {}).get("value", "")
        if url and any(token in license_name for token in ("CC", "Public domain")):
            candidates.append((page, info, license_name))
    if not candidates:
        raise RuntimeError(f"Nessuna fotografia riutilizzabile trovata per {scientific}")
    page, info, license_name = candidates[0]
    target_dir = OUT / group
    target_dir.mkdir(parents=True, exist_ok=True)
    source = target_dir / f"{slug}-source"
    image_request = urllib.request.Request(
        info.get("thumburl") or info["url"], headers={"User-Agent": "Comune-SPV-App/3.1"}
    )
    with urllib.request.urlopen(image_request, timeout=60) as image_response:
        source.write_bytes(image_response.read())
    target = target_dir / f"{slug}.webp"
    with Image.open(source) as image:
        converted = image.convert("RGB")
        converted.thumbnail((1200, 1200))
        converted.save(target, "WEBP", quality=79, method=6)
    source.unlink()
    metadata = info.get("extmetadata", {})
    return {
        "id": slug, "group": group, "scientificName": scientific,
        "file": str(target.relative_to(ROOT)), "commonsTitle": page.get("title"),
        "sourceUrl": info.get("descriptionurl"), "author": clean(metadata.get("Artist", {}).get("value")),
        "license": clean(license_name), "credit": clean(metadata.get("Credit", {}).get("value")),
    }

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        records = list(pool.map(fetch, ITEMS))
    (OUT / "image-credits.json").write_text(
        json.dumps(records, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"Created {len(records)} WebP images")

if __name__ == "__main__":
    main()
