# -*- coding: utf-8 -*-
"""Download verified title-page images and write covers/{id}.jpg (~200-440px)."""
import io
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
COVERS = os.path.join(ROOT, "covers")
TMP = os.path.join(ROOT, "_tools", "_dl")
os.makedirs(TMP, exist_ok=True)

UA = "StudyBibleCoverFix/1.0 (personal static church-history site; replacing mismatched covers)"
TARGET_W = 360

# source: either commons file name, direct url, or ia:identifier[:leaf]
SOURCES = {
    # Screenshot 4 + related Reformation
    "luther-freedom": "commons:Von der Freiheit eines Christenmenschen.jpg",
    "luther-bondage": "commons:De servo arbitrio.jpg",
    "melanchthon-loci": "commons:Loci-communes.jpg",
    "calvin-institutes": "commons:Calvin Institutio christianae religionis 1559.jpg",
    "irenaeus-heresies": "commons:Irenaeus Contra haereses 1526 title page.jpg",
    "anselm-cur-deus": 'commons:Anselm of Canterbury\'s "Cur Deus Homo" mid 12th century manuscript.jpg',
    "gregory-pastoral": "commons:Pastoral Care - Bibliothèque municipale de Troyes, MS 504, f. 1r.jpg",
    "aquinas-summa": "commons:Thomas Aquinas Summa theologiae 1482.jpg",
    # IA historic / correctly titled editions
    "didache": "ia:teachingoftwelve00bryeiala",
    "clement-1": "ia:SClementOfRomeV1",
    "ignatius-letters": "ia:TheEpistlesOfIgnatiusAndPolycarp",
    "justin-apology": "ia:TranslationOfTheEpistlesOfClement",
    "tertullian-apology": "ia:apologytertullia00tertuoft",
    "gregory-nazianzus-orations": "ia:MN41531ucmf_2",
    "chrysostom-priesthood": "ia:stchrysostomonp00chrygoog",
    "bernard-loving-god": "ia:loving_god_202606",
    "wycliffe-scripture": "ia:johnwyclifsdever00buddiala",
    "tyndale-obedience": "ia:bim_early-english-books-1475-1640_the-obedience-of-christe_tyndale-wm_1528",
    "ursinus-heidelberg": "ia:commentaryofdrza00ursi",
    "edwards-affections": "ia:treatiseconcerni1746edwa",
    "wesley-journals": "ia:journalofrevjohn03wesl",
    "newton-cardiphonia": "ia:bim_eighteenth-century_cardiphonia-or-the-utt_newton-john_1781_2",
    "judson-memoir": "ia:amemoirofthelife01judsuoft",
    "ryle-knots": "ia:knotsuntied00ryleuoft",
    "machen-liberalism": "ia:christianitylibe00mach_0",
    "chambers-utmost": "ia:myutmostforhishi0000oswa_d2h9",
    "henry-uneasy": "ia:uneasyconscience0000carl_b2o1",
    "tozer-pursuit": "ia:pursuitofgod0000awto_q1z3",
    "warfield-inspiration": "ia:inspirationautho0000benj_c0k1",
}


def http_get(url, timeout=60):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "*/*"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read(), r.headers.get("Content-Type", "")


def commons_url(filename):
    api = (
        "https://commons.wikimedia.org/w/api.php?"
        + urllib.parse.urlencode(
            {
                "action": "query",
                "titles": "File:" + filename,
                "prop": "imageinfo",
                "iiprop": "url",
                "format": "json",
            }
        )
    )
    data = json.loads(http_get(api)[0])
    for p in data["query"]["pages"].values():
        ii = p.get("imageinfo")
        if ii:
            return ii[0]["url"].split("?")[0]
    raise RuntimeError("no commons url for " + filename)


def ia_page_urls(identifier, leaf=None):
    urls = []
    if leaf is not None:
        urls.append(f"https://archive.org/download/{identifier}/page/n{leaf}_w800.jpg")
    urls.append(f"https://archive.org/services/img/{identifier}")
    for n in (7, 9, 11, 13, 5, 15, 3, 17, 1, 0):
        urls.append(f"https://archive.org/download/{identifier}/page/n{n}_w800.jpg")
    return urls


def save_cover(book_id, raw, dest_name=None):
    im = Image.open(io.BytesIO(raw))
    im = ImageOps.exif_transpose(im)
    if im.mode in ("RGBA", "P", "LA"):
        bg = Image.new("RGB", im.size, (248, 244, 236))
        if im.mode == "P":
            im = im.convert("RGBA")
        bg.paste(im, mask=im.split()[-1] if im.mode in ("RGBA", "LA") else None)
        im = bg
    else:
        im = im.convert("RGB")
    w, h = im.size
    if w > TARGET_W:
        im = im.resize((TARGET_W, max(1, round(h * TARGET_W / w))), Image.Resampling.LANCZOS)
    path = os.path.join(COVERS, dest_name or f"{book_id}.jpg")
    im.save(path, "JPEG", quality=86, optimize=True)
    return path, im.size


def fetch_one(book_id, spec):
    print(f"== {book_id} :: {spec}")
    if spec.startswith("commons:"):
        fn = spec[len("commons:") :]
        url = commons_url(fn)
        raw, _ = http_get(url)
        path, size = save_cover(book_id, raw)
        print("   OK", path, size, "from", url[:80])
        return True
    if spec.startswith("url:"):
        raw, _ = http_get(spec[4:])
        path, size = save_cover(book_id, raw)
        print("   OK", path, size)
        return True
    if spec.startswith("ia:"):
        rest = spec[3:]
        ident, _, leaf = rest.partition(":")
        leaf = int(leaf) if leaf else None
        last_err = None
        for url in ia_page_urls(ident, leaf):
            try:
                raw, ctype = http_get(url, timeout=40)
                if len(raw) < 2500:
                    continue
                if "html" in (ctype or "") and raw[:20].lstrip().lower().startswith(b"<!do"):
                    continue
                # skip tiny service thumbs that are just bindings if we have leaf
                path, size = save_cover(book_id, raw)
                print("   OK", path, size, "from", url)
                return True
            except Exception as e:
                last_err = e
                continue
        print("   FAIL", last_err)
        return False
    print("   unknown spec")
    return False


def main():
    only = set(sys.argv[1:]) if len(sys.argv) > 1 else None
    ok = fail = 0
    for bid, spec in SOURCES.items():
        if only and bid not in only:
            continue
        try:
            if fetch_one(bid, spec):
                ok += 1
            else:
                fail += 1
        except Exception as e:
            print("   ERR", e)
            fail += 1
        time.sleep(0.4)
    print(f"\nDONE ok={ok} fail={fail}")


if __name__ == "__main__":
    main()
