# -*- coding: utf-8 -*-
"""Search Wikimedia Commons + Internet Archive for verified title-page sources."""
import json
import time
import urllib.parse
import urllib.request

UA = "StudyBibleCoverAudit/1.0 (personal static site; cover matching)"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read()


def commons_search(q, limit=6):
    url = (
        "https://commons.wikimedia.org/w/api.php?"
        + urllib.parse.urlencode(
            {
                "action": "query",
                "list": "search",
                "srsearch": q,
                "srnamespace": 6,
                "srlimit": limit,
                "format": "json",
            }
        )
    )
    data = json.loads(get(url))
    return [h["title"] for h in data.get("query", {}).get("search", [])]


def commons_info(titles):
    if not titles:
        return []
    url = (
        "https://commons.wikimedia.org/w/api.php?"
        + urllib.parse.urlencode(
            {
                "action": "query",
                "titles": "|".join(titles),
                "prop": "imageinfo",
                "iiprop": "url|size|mime",
                "format": "json",
            }
        )
    )
    data = json.loads(get(url))
    out = []
    for p in data.get("query", {}).get("pages", {}).values():
        ii = (p.get("imageinfo") or [None])[0]
        if ii:
            out.append((p["title"], ii.get("url", ""), ii.get("width"), ii.get("mime")))
    return out


def ia_search(q, rows=4):
    url = (
        "https://archive.org/advancedsearch.php?"
        + urllib.parse.urlencode(
            {
                "q": q,
                "fl[]": "identifier,title,creator,date,mediatype",
                "rows": rows,
                "page": 1,
                "output": "json",
            }
        )
    )
    # advancedsearch ignores repeated fl[] via urlencode; use raw
    url = (
        "https://archive.org/advancedsearch.php?q="
        + urllib.parse.quote(q)
        + "&fl[]=identifier&fl[]=title&fl[]=creator&fl[]=date&rows="
        + str(rows)
        + "&output=json"
    )
    data = json.loads(get(url))
    return data.get("response", {}).get("docs", [])


QUERIES = [
    ("didache", 'Didache "twelve apostles" title', 'title:"Didache" AND mediatype:texts'),
    ("clement-1", "1 Clement epistle Rome title page", 'title:"First Epistle of Clement" AND mediatype:texts'),
    ("ignatius-letters", "Ignatius epistles Antioch title page", 'title:"Epistles of Ignatius" AND mediatype:texts'),
    ("justin-apology", "Justin Martyr First Apology title page", 'title:"First Apology" Justin AND mediatype:texts'),
    ("tertullian-apology", "Tertullian Apologeticus title page", 'title:Apologeticus Tertullian AND mediatype:texts'),
    ("gregory-nazianzus-orations", "Gregory Nazianzus Theological Orations title", 'title:"Theological Orations" Gregory AND mediatype:texts'),
    ("gregory-nyssa-moses", "Gregory of Nyssa Life of Moses title page", 'title:"Life of Moses" Gregory AND mediatype:texts'),
    ("chrysostom-priesthood", "Chrysostom On the Priesthood De Sacerdotio", 'title:"On the Priesthood" Chrysostom AND mediatype:texts'),
    ("bernard-loving-god", "Bernard Clairvaux De diligendo Deo On Loving God", 'title:"On Loving God" Bernard AND mediatype:texts'),
    ("aquinas-summa", "Thomas Aquinas Summa theologiae 1482 title", 'title:"Summa theologiae" Aquinas AND date:[1400 TO 1600] AND mediatype:texts'),
    ("wycliffe-scripture", "Wycliffe De Veritate Sacrae Scripturae", 'title:"De Veritate Sacrae Scripturae" AND mediatype:texts'),
    ("zwingli-clarity", "Zwingli Clarheit gewüsse worts gottes", 'title:"Klarheit" Zwingli AND mediatype:texts'),
    ("bucer-kingdom", "Bucer De Regno Christi title page", 'title:"De Regno Christi" AND mediatype:texts'),
    ("vermigli-commonplaces", "Vermigli Loci Communes 1576", 'title:"Loci Communes" Vermigli AND mediatype:texts'),
    ("tyndale-obedience", "Tyndale Obedience of a Christen man", 'title:"obedience" Tyndale AND mediatype:texts'),
    ("ursinus-heidelberg", "Ursinus Commentary Heidelberg Catechism title", 'title:"Heidelberg Catechism" Ursinus AND mediatype:texts'),
    ("knox-reformation", "Knox History of the Reformation in Scotland title", 'title:"History of the Reformation" Knox AND mediatype:texts'),
    ("wesley-journals", "Journal of John Wesley title page", 'title:"Journal of the Rev. John Wesley" AND mediatype:texts'),
    ("newton-cardiphonia", "Newton Cardiphonia title page 1781", 'title:Cardiphonia Newton AND mediatype:texts'),
    ("judson-memoir", "Memoir of Adoniram Judson Wayland", 'title:"Memoir of the Life" Judson Wayland AND mediatype:texts'),
    ("muller-narratives", "Muller Narrative of the Lord's Dealings", 'title:"Narrative of the Lord" Muller AND mediatype:texts'),
    ("spurgeon-morning", "Spurgeon Morning and Evening title page", 'title:"Morning and Evening" Spurgeon AND mediatype:texts'),
    ("ryle-knots", "Ryle Knots Untied title page", 'title:"Knots Untied" Ryle AND mediatype:texts'),
    ("warfield-inspiration", "Warfield Inspiration and Authority of the Bible", 'title:"Inspiration and Authority of the Bible" Warfield AND mediatype:texts'),
    ("chambers-utmost", "Chambers My Utmost for His Highest 1935", 'title:"My Utmost for His Highest" Chambers AND mediatype:texts'),
    ("henry-uneasy", "Henry Uneasy Conscience of Modern Fundamentalism", 'title:"Uneasy Conscience" Henry AND mediatype:texts'),
    ("pascal-pensees", "Pascal Pensees 1670 title page", 'title:Pensees Pascal AND date:[1670 TO 1750] AND mediatype:texts'),
    ("machen-liberalism", "Machen Christianity and Liberalism 1923 title", 'title:"Christianity and Liberalism" Machen AND mediatype:texts'),
    ("tozer-pursuit", "Tozer The Pursuit of God 1948", 'title:"Pursuit of God" Tozer AND mediatype:texts'),
    ("wang-mingdao", "王明道 作主的門徒", 'title:"作主的門徒" OR title:"Wang Mingdao"'),
    ("john-sung", "宋尚節 靈歷集光", 'title:"靈歷集光" OR title:"John Sung"'),
    ("li-cheng-wanderer", "遊子吟 里程", 'title:"遊子吟" OR title:"Song of a Wanderer"'),
]

print("=== COMMONS ===")
for bid, cq, iq in QUERIES:
    try:
        hits = commons_search(cq)
        print(f"\n[{bid}] commons: {cq}")
        for t in hits:
            print("  ", t)
    except Exception as e:
        print(f"\n[{bid}] commons ERR {e}")
    time.sleep(0.35)

print("\n\n=== INTERNET ARCHIVE ===")
for bid, cq, iq in QUERIES:
    try:
        docs = ia_search(iq)
        print(f"\n[{bid}]")
        for d in docs:
            print(f"  {d.get('identifier')} | {d.get('date')} | {d.get('title')} | {d.get('creator')}")
    except Exception as e:
        print(f"\n[{bid}] ia ERR {e}")
    time.sleep(0.35)
