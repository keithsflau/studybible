import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { renderSvg, motifNames, PALETTES } from "../_shared/svg-motifs.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = path.resolve(ROOT, "..");
const ASSETS = "C:/Users/keith/.cursor/projects/c-Users-keith-OneDrive-Desktop-studybible/assets";
const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycby5jEjDAcEM6TttPbwwh1tvXPo_-W7YrNlKfJRV82PjkmAHvR_wILhA7h-zIRPF7oTRTw/exec";

const MOTIFS = motifNames();
const PALETTE_KEYS = Object.keys(PALETTES);

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripTags(html) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function firstSentence(html) {
  const text = stripTags(html);
  const m = text.match(/[^。！？\n]+[。！？]/);
  const s = (m ? m[0] : text).trim();
  return s.length > 90 ? s.slice(0, 88) + "…" : s;
}

function extractStyle(html) {
  const m = html.match(/<style>([\s\S]*?)<\/style>/i);
  return m ? m[1] : "";
}

function extractMeta(html, name, attr = "name") {
  const re = new RegExp(`<meta\\s+${attr}=["']${name}["']\\s+content=["']([^"']*)["']`, "i");
  const m = html.match(re);
  return m ? m[1] : "";
}

function extractTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? m[1].replace(/\s+/g, " ").trim() : "";
}

function extractLead(html) {
  const m =
    html.match(/<p class="text-lg sm:text-xl[^"]*"[^>]*>([\s\S]*?)<\/p>/i) ||
    html.match(/<p class="hero-lead"[^>]*>([\s\S]*?)<\/p>/i);
  return m ? stripTags(m[1]) : "";
}

function extractElement(html, start) {
  const open = html.slice(start).match(/^<([a-zA-Z][a-zA-Z0-9]*)/);
  if (!open) return "";
  const tag = open[1];
  const openRe = new RegExp(`<${tag}(?:\\s|>|/>)`, "gi");
  const closeRe = new RegExp(`</${tag}>`, "gi");
  let depth = 0;
  let i = start;
  while (i < html.length) {
    openRe.lastIndex = i;
    closeRe.lastIndex = i;
    const o = openRe.exec(html);
    const c = closeRe.exec(html);
    if (!c && !o) break;
    const oAt = o ? o.index : Infinity;
    const cAt = c ? c.index : Infinity;
    if (oAt < cAt) {
      depth += 1;
      i = oAt + o[0].length;
    } else {
      depth -= 1;
      i = cAt + c[0].length;
      if (depth === 0) return html.slice(start, i);
    }
  }
  return html.slice(start);
}

function extractById(html, id) {
  const re = new RegExp(`<([a-zA-Z][a-zA-Z0-9]*)([^>]*\\sid=["']${id}["'][^>]*)>`, "i");
  const m = re.exec(html);
  if (!m) return "";
  return extractElement(html, m.index);
}

function extractTopSections(html) {
  const mainM = html.match(/<main\b[^>]*>[\s\S]*<\/main>/i);
  const scope = mainM ? mainM[0] : html;
  const re = /<\/?section\b[^>]*>/gi;
  let depth = 0;
  let start = -1;
  let startTag = "";
  const out = [];
  let m;
  while ((m = re.exec(scope))) {
    const isClose = m[0][1] === "/";
    if (!isClose) {
      if (depth === 0) {
        start = m.index;
        startTag = m[0];
      }
      depth += 1;
    } else {
      depth -= 1;
      if (depth === 0 && start >= 0) {
        const end = m.index + m[0].length;
        const raw = scope.slice(start, end);
        const idM = startTag.match(/id=["']([^"']+)["']/i);
        const h2M = raw.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i);
        const title = h2M ? stripTags(h2M[1]) : "";
        out.push({ id: idM ? idM[1] : "", title, html: raw, start, end });
        start = -1;
      }
    }
  }
  const lastEnd = out.length ? out[out.length - 1].end : 0;
  let trailing = scope.slice(lastEnd).replace(/<\/main>\s*$/i, "").trim();
  trailing = trailing.replace(/^<\/div>\s*/i, "").trim();
  if (trailing && /<h2|<p|<div/.test(trailing) && stripTags(trailing).length > 40) {
    out.push({ id: "trailing", title: "附錄", html: `<section class="mb-8">${trailing}</section>`, start: lastEnd, end: lastEnd + trailing.length });
  }
  return out;
}

function extractInlineScripts(html) {
  const scripts = [...html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  return scripts.filter((js) => {
    if (!js.trim()) return false;
    if (/VisitCounter/.test(js)) return false;
    return true;
  });
}

function findSection(sections, sel, used) {
  const pool = used ? sections.filter((s) => !used.has(s)) : sections;
  if (sel.startsWith("#")) return sections.find((s) => s.id === sel.slice(1));
  if (sel.startsWith("~")) {
    const exact = pool.find((s) => s.title === sel.slice(1));
    if (exact) return exact;
    return pool.find((s) => s.title.includes(sel.slice(1)));
  }
  if (sel.startsWith("^")) return sections[Number(sel.slice(1))];
  return pool.find((s) => s.id === sel || s.title.includes(sel));
}

const TOPICS = [
  {
    dir: "以經解經",
    title: "以經解經",
    en: "Scripture Interprets Scripture",
    heroFile: "hero-hermeneutics.png",
    palette: "sky",
    skip: [],
    chapters: [
      { slug: "intro", from: ["~引言"], nav: "引言", motif: "scroll" },
      { slug: "principles", from: ["~核心原則"], nav: "核心原則", motif: "book" },
      { slug: "examples", from: ["~實踐範例"], nav: "實踐範例", motif: "path" },
      { slug: "method", from: ["~方法論指引"], nav: "方法論指引", motif: "compass" },
      { slug: "cautions", from: ["~注意事項"], nav: "注意事項與挑戰", motif: "keys" },
      { slug: "reflect", from: ["~互動思考"], nav: "互動思考", motif: "table" },
      { slug: "summary", from: ["~總結"], nav: "總結", motif: "beams" }
    ]
  },
  {
    dir: "四律",
    title: "四律",
    en: "Four Laws",
    heroFile: "hero-four-laws.png",
    palette: "sky",
    chapters: [
      { slug: "law-love", from: ["~神愛你"], nav: "第一律：神的愛", motif: "heart" },
      { slug: "law-sin", from: ["~人因有罪"], nav: "第二律：罪的隔絕", motif: "fork" },
      { slug: "law-christ", from: ["~耶穌基督是神"], nav: "第三律：唯一救法", motif: "beams" },
      { slug: "law-receive", from: ["~必須親自接受"], nav: "第四律：必須接受", motif: "door" },
      { slug: "after", from: ["~現在您已經接受"], nav: "接受之後", motif: "fountain" },
      { slug: "next", from: ["~還有什麼"], nav: "還有什麼呢", motif: "path" }
    ]
  },
  {
    dir: "因信稱義",
    title: "因信稱義",
    en: "Justification by Faith",
    heroFile: "hero-justification.png",
    palette: "violet",
    chapters: [
      { slug: "intro", from: ["~引言"], nav: "引言", motif: "scales" },
      { slug: "scripture", from: ["~聖經基礎"], nav: "聖經基礎", motif: "scroll" },
      { slug: "definition", from: ["~神學定義"], nav: "神學定義與內涵", motif: "book" },
      { slug: "not-works", from: ["~不是因行為"], nav: "不是因行為稱義", motif: "seal" },
      { slug: "faith-works", from: ["~信心與行為"], nav: "信心與行為", motif: "hands" },
      { slug: "history", from: ["~歷史發展"], nav: "歷史發展", motif: "candles" },
      { slug: "practice", from: ["~實際應用"], nav: "實際應用", motif: "path" },
      { slug: "close", from: ["~互動思考", "~結論"], nav: "思考與結論", motif: "table", children: ["互動思考題", "結論"] }
    ]
  },
  {
    dir: "預定論",
    title: "預定論",
    en: "Predestination",
    heroFile: "hero-predestination.png",
    palette: "indigo",
    chapters: [
      { slug: "intro", from: ["~引言"], nav: "引言", motif: "compass" },
      { slug: "questions", from: ["~核心問題"], nav: "核心問題", motif: "keys" },
      { slug: "scripture", from: ["~聖經基礎"], nav: "聖經基礎", motif: "scroll" },
      { slug: "positions", from: ["~主要神學立場"], nav: "主要神學立場", motif: "fork" },
      { slug: "our-position", from: ["~我們的立場"], nav: "我們的立場", motif: "beams" },
      { slug: "practice", from: ["~實踐意義"], nav: "實踐意義", motif: "path" },
      { slug: "reflect", from: ["~互動思考"], nav: "互動思考", motif: "table" },
      { slug: "close", from: ["~結語"], nav: "結語", motif: "lamp" }
    ]
  },
  {
    dir: "神人合作說",
    title: "神人合作說",
    en: "Synergism",
    heroFile: "hero-synergism.png",
    palette: "violet",
    chapters: [
      { slug: "intro", from: ["^0"], nav: "引言", motif: "hands" },
      { slug: "questions", from: ["^1"], nav: "核心問題", motif: "keys" },
      { slug: "image", from: ["^2"], nav: "神人合作的圖像", motif: "vine" },
      { slug: "scripture", from: ["^3"], nav: "聖經基礎", motif: "scroll" },
      { slug: "positions", from: ["^4"], nav: "立場比較", motif: "scales" },
      { slug: "our-position", from: ["^5"], nav: "我們的立場", motif: "beams" },
      { slug: "practice", from: ["^6"], nav: "實踐意義", motif: "path" },
      { slug: "close", from: ["^7", "^8"], nav: "思考與結語", motif: "table", children: ["互動思考", "結語"] }
    ]
  },
  {
    dir: "自由意志",
    title: "自由意志",
    en: "Free Will",
    heroFile: "hero-free-will.png",
    palette: "violet",
    skip: ["toc", "本篇目錄"],
    chapters: [
      { slug: "intro", from: ["#intro", "~核心問題"], nav: "引言與核心問題", motif: "fork" },
      { slug: "question", from: ["#question"], nav: "問題意識", motif: "book" },
      { slug: "creation", from: ["#creation"], nav: "創造與形象", motif: "vine" },
      { slug: "fallen", from: ["#fallen"], nav: "墮落後的意志", motif: "tares" },
      { slug: "sovereignty", from: ["#sovereignty"], nav: "主權與責任", motif: "scales" },
      { slug: "christ", from: ["#christ", "#spirit"], nav: "真自由與聖靈", motif: "fountain", children: ["基督與釋放", "聖靈與更新的意志"] },
      { slug: "distinction", from: ["#distinction"], nav: "不是絕對自主", motif: "compass" },
      { slug: "pastoral", from: ["#pastoral", "~實踐意義", "~互動思考", "~相關討論", "~結語"], nav: "牧養與結語", motif: "lamp" }
    ]
  },
  {
    dir: "千禧論",
    title: "千禧論",
    en: "Millennialism",
    heroFile: "hero-millennium.png",
    palette: "amber",
    extraIds: ["scripture-modal"],
    skip: ["detail-section"],
    chapters: [
      { slug: "intro", from: ["~引言"], nav: "引言", motif: "lamb" },
      { slug: "positions", from: ["~三大千禧年論立場", "#detail-section"], nav: "三大立場", motif: "fork", children: ["前千禧年論", "後千禧年論", "無千禧年論"] },
      { slug: "timeline", from: ["~時間線比較"], nav: "時間線比較", motif: "candles" },
      { slug: "table", from: ["~三大立場對照"], nav: "對照表", motif: "table" },
      { slug: "scripture", from: ["~關鍵經文"], nav: "關鍵經文", motif: "scroll" },
      { slug: "stance", from: ["~立場"], nav: "立場", motif: "compass" },
      { slug: "quiz", from: ["~互動練習"], nav: "認知測驗", motif: "keys" }
    ]
  },
  {
    dir: "教會歷史",
    title: "教會歷史",
    en: "Church History",
    heroFile: "hero-church-history.png",
    palette: "indigo",
    chapters: [
      { slug: "intro", from: ["~引言"], nav: "引言", motif: "chapel", img: "images/church-history-intro.jpg" },
      { slug: "questions", from: ["~核心問題"], nav: "核心問題", motif: "keys", img: "images/pentecost.jpg" },
      { slug: "timeline", from: ["~教會歷史時間軸"], nav: "歷史時間軸", motif: "candles", img: "images/early-church.jpg" },
      { slug: "doctrine", from: ["~重要教義"], nav: "重要教義的確立", motif: "seal", img: "images/nicaea-council.jpg" },
      { slug: "position", from: ["~我們的立場"], nav: "我們的立場", motif: "beams", img: "images/luther-95-theses.jpg" },
      { slug: "practice", from: ["~實踐意義"], nav: "實踐意義", motif: "path", img: "images/reformation.jpg" },
      { slug: "reflect", from: ["~互動思考"], nav: "互動思考", motif: "table", img: "images/augustine.jpg" },
      { slug: "close", from: ["~結語"], nav: "結語", motif: "city", img: "images/modern-period.jpg" }
    ]
  },
  {
    dir: "基督教各宗派",
    title: "基督教各宗派",
    en: "Christian Traditions",
    heroFile: "hero-traditions.png",
    palette: "slate",
    chapters: [
      { slug: "question", from: ["#question"], nav: "問題意識", motif: "fork" },
      { slug: "unity", from: ["#unity"], nav: "合一與界限", motif: "rings" },
      { slug: "map", from: ["#map"], nav: "大公傳統簡圖", motif: "dome" },
      { slug: "fundamentalist", from: ["#fundamentalist"], nav: "基要派", motif: "seal" },
      { slug: "evangelical", from: ["#evangelical"], nav: "福音派", motif: "path" },
      { slug: "charismatic", from: ["#charismatic"], nav: "靈恩派與五旬節", motif: "flame" },
      { slug: "other", from: ["#other"], nav: "華人教會張力", motif: "keys" },
      { slug: "pastoral", from: ["#pastoral"], nav: "牧養結論", motif: "chapel" }
    ]
  },
  {
    dir: "祈禱",
    title: "祈禱",
    en: "Prayer",
    heroFile: "hero-prayer.png",
    palette: "amber",
    chapters: [
      { slug: "question", from: ["#question"], nav: "問題意識", motif: "lamp" },
      { slug: "beginnings", from: ["#creation", "#patriarchs"], nav: "呼求與摔跤", motif: "hands", children: ["創造與呼求", "族長與出埃及"] },
      { slug: "psalms", from: ["#psalms"], nav: "詩篇：祈禱的學校", motif: "scroll" },
      { slug: "temple-exile", from: ["#temple", "#exile"], nav: "聖殿與被擄", motif: "chapel", children: ["聖殿、祭與代求", "先知與被擄"] },
      { slug: "jesus", from: ["#jesus"], nav: "耶穌的祈禱", motif: "beams" },
      { slug: "church", from: ["#church", "#paul"], nav: "教會與保羅", motif: "fountain", children: ["教會的祈禱", "兒子的呼叫"] },
      { slug: "close", from: ["#tension", "#pastoral"], nav: "張力與牧養", motif: "heart", children: ["未蒙應允", "牧養結論"] }
    ]
  },
  {
    dir: "靈修學",
    title: "靈修學",
    en: "Christian Spirituality",
    heroFile: "hero-spirituality.png",
    palette: "amber",
    chapters: [
      { slug: "question", from: ["#question"], nav: "問題意識", motif: "lamp" },
      { slug: "word", from: ["#walk", "#word"], nav: "同行與默想", motif: "book", children: ["與神同行", "聖言的默想"] },
      { slug: "worship", from: ["#psalms", "#prophets"], nav: "敬拜與真敬虔", motif: "flame", children: ["詩篇與敬拜", "先知的批判"] },
      { slug: "jesus", from: ["#jesus"], nav: "耶穌的生命", motif: "path" },
      { slug: "union", from: ["#union"], nav: "在基督裡", motif: "vine" },
      { slug: "practice", from: ["#disciplines", "#discernment"], nav: "操練與分辨", motif: "keys", children: ["操練的位置", "試驗諸靈"] },
      { slug: "pastoral", from: ["#pastoral"], nav: "牧養結論", motif: "chapel" }
    ]
  },
  {
    dir: "婚姻",
    title: "婚姻",
    en: "Marriage",
    heroFile: "hero-marriage.png",
    palette: "rose",
    skip: [],
    chapters: [
      { slug: "question", from: ["#s1"], nav: "問題意識", motif: "rings" },
      { slug: "creation", from: ["#s2"], nav: "創造秩序", motif: "vine" },
      { slug: "fall", from: ["#s3"], nav: "墮落的扭曲", motif: "tares" },
      { slug: "law", from: ["#s4"], nav: "律法與智慧", motif: "scroll" },
      { slug: "prophets", from: ["#s5"], nav: "先知的婚姻隱喻", motif: "heart" },
      { slug: "jesus", from: ["#s6"], nav: "耶穌的教導", motif: "beams" },
      { slug: "paul", from: ["#s7"], nav: "保羅書信", motif: "book" },
      { slug: "close", from: ["#s8", "#s9", "#trailing"], nav: "終末與牧養", motif: "city", children: ["終末視野", "牧養結論", "經文索引"] }
    ]
  },
  {
    dir: "興學傳道",
    title: "興學傳道",
    en: "Teaching in the Service of the Word",
    heroFile: "hero-teaching.png",
    palette: "amber",
    chapters: [
      { slug: "question", from: ["#question"], nav: "問題意識", motif: "book" },
      { slug: "torah", from: ["#torah", "#wisdom"], nav: "妥拉與智慧", motif: "scroll", children: ["家中教導", "智慧傳統"] },
      { slug: "office", from: ["#office"], nav: "教導的職分", motif: "keys" },
      { slug: "jesus", from: ["#jesus", "#apostles"], nav: "夫子與使徒", motif: "path", children: ["耶穌為夫子", "使徒的教訓"] },
      { slug: "paul", from: ["#paul", "#content"], nav: "保羅與內容", motif: "lamp", children: ["學房與交託", "所教的是基督"] },
      { slug: "discern", from: ["#discern"], nav: "張力與分辨", motif: "scales" },
      { slug: "pastoral", from: ["#pastoral"], nav: "牧養結論", motif: "chapel" }
    ]
  },
  {
    dir: "傳福音策略",
    title: "傳福音策略",
    en: "Evangelistic Witness",
    heroFile: "hero-evangelism.png",
    palette: "sky",
    chapters: [
      { slug: "intro", from: ["#intro"], nav: "問題意識", motif: "path" },
      { slug: "commission", from: ["#commission"], nav: "大使命與權柄", motif: "globe" },
      { slug: "jesus", from: ["#jesus"], nav: "耶穌的宣講", motif: "beams" },
      { slug: "acts", from: ["#acts"], nav: "使徒行傳的策略", motif: "city" },
      { slug: "paul", from: ["#paul"], nav: "保羅的自我說明", motif: "hands" },
      { slug: "content", from: ["#content", "#spirit"], nav: "內容與聖靈", motif: "flame", children: ["內容不可刪", "聖靈、禱告、品格"] },
      { slug: "close", from: ["#methods", "#pastoral"], nav: "方法與牧養", motif: "compass", children: ["對方法的分辨", "牧養結論"] }
    ]
  },
  {
    dir: "基督教職場倫理",
    title: "基督教職場倫理",
    en: "Christian Workplace Ethics",
    heroFile: "hero-workplace.png",
    palette: "slate",
    chapters: [
      { slug: "question", from: ["#question"], nav: "問題意識", motif: "tools" },
      { slug: "creation", from: ["#creation"], nav: "創造中的工作", motif: "vine" },
      { slug: "sabbath", from: ["#sabbath"], nav: "安息與界限", motif: "lamp" },
      { slug: "law-wisdom", from: ["#law", "#wisdom"], nav: "律法與智慧", motif: "scales", children: ["經濟倫理", "智慧傳統"] },
      { slug: "exile", from: ["#exile"], nav: "被擄與外邦職場", motif: "city" },
      { slug: "gospel", from: ["#jesus", "#paul"], nav: "耶穌與保羅", motif: "beams", children: ["瑪門與天國", "家戶訓詞"] },
      { slug: "close", from: ["#witness", "#pastoral", "#trailing"], nav: "見證與牧養", motif: "path", children: ["職場見證", "牧養結論", "經文索引"] }
    ]
  },
  {
    dir: "辨別神的聲音",
    title: "辨別神的聲音",
    en: "Discerning the Voice of God",
    heroFile: "hero-discernment.png",
    palette: "indigo",
    chapters: [
      { slug: "intro", from: ["#intro"], nav: "問題意識", motif: "ear" },
      { slug: "ot", from: ["#ot-prophet", "#written-torah"], nav: "舊約與已寫下的律法", motif: "scroll", children: ["先知職分", "律法已寫下"] },
      { slug: "son", from: ["#the-son"], nav: "耶穌是終極的話", motif: "beams" },
      { slug: "spirit", from: ["#spirit"], nav: "聖靈的工作", motif: "flame" },
      { slug: "testing", from: ["#testing"], nav: "試驗諸靈", motif: "scales" },
      { slug: "ordinary", from: ["#sufficiency", "#ordinary"], nav: "充足與日常引導", motif: "lamp", children: ["聖經的充足", "智慧、肢體、環境"] },
      { slug: "close", from: ["#pastoral", "#conclusion"], nav: "警告與結論", motif: "keys", children: ["不可妄稱主名", "辨別的優先序"] }
    ]
  },
  {
    dir: "猶大教、回教、天主教、基督教比較",
    title: "宗教比較",
    en: "Religious Comparisons",
    heroFile: "hero-religions.png",
    palette: "slate",
    chapters: [
      { slug: "judaism", from: ["#judaism"], nav: "猶太教", motif: "scroll" },
      { slug: "islam", from: ["#islam"], nav: "伊斯蘭教", motif: "dome" },
      { slug: "catholicism", from: ["#catholicism"], nav: "天主教", motif: "chapel" },
      { slug: "protestant", from: ["#protestant"], nav: "基督教", motif: "book" },
      { slug: "comparison", from: ["#comparison"], nav: "綜合比較", motif: "table" }
    ]
  },
  {
    dir: "基督教與世界宗教比較",
    title: "世界宗教比較",
    en: "Christianity and World Religions",
    heroFile: "hero-world-religions.png",
    palette: "forest",
    chapters: [
      { slug: "intro", from: ["#intro"], nav: "導論", motif: "compass" },
      { slug: "overview", from: ["#overview"], nav: "宗教導覽", motif: "globe" },
      { slug: "worldview", from: ["#worldview"], nav: "核心理論", motif: "book" },
      { slug: "god-creation", from: ["#creation", "#theology"], nav: "創造與神論", motif: "beams", children: ["創造論", "神論"] },
      { slug: "human", from: ["#anthropology", "#afterlife"], nav: "人論與來世", motif: "path", children: ["人論", "來世"] },
      { slug: "salvation", from: ["#salvation"], nav: "得救", motif: "fountain" },
      { slug: "scripture", from: ["#scripture"], nav: "經典典籍", motif: "scroll" },
      { slug: "takeaways", from: ["#takeaways"], nav: "課堂與牧養結語", motif: "table" }
    ]
  },
  {
    dir: "天使",
    title: "天使",
    en: "Angels as Messengers",
    heroFile: "hero-angels.png",
    palette: "sky",
    chapters: [
      { slug: "question", from: ["#question"], nav: "問題意識", motif: "wing" },
      { slug: "word", from: ["#word", "#creation"], nav: "詞與創造", motif: "book", children: ["本義是使者", "萬有藉基督而造"] },
      { slug: "cherubim", from: ["#cherubim"], nav: "聖所異象", motif: "flame" },
      { slug: "ot", from: ["#ot"], nav: "舊約敘事", motif: "path" },
      { slug: "lukeacts", from: ["#lukeacts"], nav: "路加行傳", motif: "city" },
      { slug: "christ", from: ["#christ", "#ministry"], nav: "基督與服役", motif: "beams", children: ["兒子遠超過天使", "效力不是迷信"] },
      { slug: "close", from: ["#fallen", "#pastoral"], nav: "墮落與牧養", motif: "tares", children: ["墮落的使者", "牧養結論"] }
    ]
  },
  {
    dir: "異端",
    title: "異端",
    en: "Heresy and the Apostolic Gospel",
    heroFile: "hero-heresy.png",
    palette: "wine",
    chapters: [
      { slug: "question", from: ["#question"], nav: "問題意識", motif: "seal" },
      { slug: "warnings", from: ["#ot", "#jesus"], nav: "假先知與警戒", motif: "wheat", children: ["舊約假先知", "耶穌的警戒"] },
      { slug: "apostles", from: ["#acts", "#paul"], nav: "使徒行傳與保羅", motif: "scroll", children: ["使徒行傳", "另一個福音"] },
      { slug: "tests", from: ["#john", "#tests"], nav: "檢驗真道", motif: "scales", children: ["約翰彼得猶大", "辨認核心"] },
      { slug: "ancient", from: ["#ancient"], nav: "古代異端", motif: "candles" },
      { slug: "modern", from: ["#modern"], nav: "近現代團體", motif: "city" },
      { slug: "close", from: ["#distinguish", "#pastoral"], nav: "分辨與牧養", motif: "keys", children: ["錯謬與異端", "牧養"] }
    ]
  }
];

function ensureSource(topicDir) {
  const live = path.join(ROOT, topicDir, "index.html");
  const src = path.join(ROOT, "_source", topicDir + ".html");
  fs.mkdirSync(path.join(ROOT, "_source"), { recursive: true });
  if (!fs.existsSync(src)) {
    if (!fs.existsSync(live)) throw new Error("missing " + live);
    fs.copyFileSync(live, src);
  }
  return src;
}

function copyHero(topic) {
  const destDir = path.join(ROOT, topic.dir, "images");
  fs.mkdirSync(destDir, { recursive: true });
  const dest = path.join(destDir, "hero.png");
  const from = path.join(ASSETS, topic.heroFile);
  if (fs.existsSync(from)) fs.copyFileSync(from, dest);
  else {
    const svg = renderSvg(topic.chapters[0].motif, topic.palette);
    fs.writeFileSync(path.join(destDir, "hero.svg"), svg);
  }
  return fs.existsSync(dest) ? "images/hero.png" : "images/hero.svg";
}

function writeChapterSvg(topic, ch) {
  const destDir = path.join(ROOT, topic.dir, "images");
  fs.mkdirSync(destDir, { recursive: true });
  if (ch.img && fs.existsSync(path.join(ROOT, topic.dir, ch.img))) return ch.img;
  const file = `images/${ch.slug}.svg`;
  fs.writeFileSync(path.join(ROOT, topic.dir, file), renderSvg(ch.motif, topic.palette));
  return file;
}

function navHtml(topic, currentSlug) {
  const items = [
    `<a href="index.html" data-nav-slug="index"${currentSlug === "index" ? ' class="is-on"' : ""}>總覽</a>`
  ];
  for (const ch of topic.chapters) {
    const on = currentSlug === ch.slug ? ' class="is-on"' : "";
    items.push(`<a href="${ch.slug}.html" data-nav-slug="${ch.slug}"${on}>${esc(ch.nav)}</a>`);
    if (ch.children && ch.children.length) {
      items.push(`<ul class="sub">${ch.children.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>`);
    }
  }
  return items.join("\n        ");
}

function pagerHtml(topic, i) {
  const prev = i > 0 ? topic.chapters[i - 1] : null;
  const next = i < topic.chapters.length - 1 ? topic.chapters[i + 1] : null;
  return `<nav class="pager">
        ${prev ? `<a href="${prev.slug}.html"><span class="dir">上一題</span><span class="serif">${esc(prev.nav)}</span></a>` : `<a class="is-empty"></a>`}
        ${next ? `<a class="next" href="${next.slug}.html"><span class="dir">下一題</span><span class="serif">${esc(next.nav)}</span></a>` : `<a class="is-empty"></a>`}
      </nav>`;
}

function pageShell(opts) {
  const {
    topic,
    slug,
    pageTitle,
    description,
    heroSrc,
    figureSrc,
    kicker,
    heading,
    sub,
    body,
    extraStyle,
    extraWidgets,
    extraScripts,
    visitId
  } = opts;
  const isIndex = slug === "index";
  return `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(pageTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Noto+Serif+TC:wght@500;600;700&family=Source+Sans+3:wght@400;500;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="../../visit-counter.css">
  <link rel="stylesheet" href="../_shared/topic.css">
  <style>${extraStyle || ""}</style>
</head>
<body class="topic-shell" data-slug="${esc(slug)}">
  <a class="skip" href="#content">跳到正文</a>
  <header class="topbar">
    <a href="../../index.html">
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
      主頁
    </a>
    <span class="topbar-sep">/</span>
    <a href="../index.html">討論</a>
    <span class="topbar-sep">/</span>
    <a href="index.html">${esc(topic.title)}</a>
    ${isIndex ? "" : `<span class="topbar-sep">/</span><div class="topbar-title">${esc(heading)}</div>`}
  </header>

  <section class="hero" aria-label="${esc(topic.title)}">
    <div class="hero-media"><img src="${heroSrc}" alt="" width="1600" height="900"></div>
    <div class="hero-shade"></div>
    <div class="hero-inner">
      <div class="eyebrow">${esc(topic.en)}</div>
      <h1 class="serif">${esc(isIndex ? topic.title : heading)}<em class="latin">${esc(isIndex ? topic.en : topic.title)}</em></h1>
      ${sub ? `<p class="hero-lead">${esc(sub)}</p>` : ""}
    </div>
  </section>

  <div class="wrap">
    <div class="layout">
      <aside class="sidenav" aria-label="分題導航">
        <h2>分題</h2>
        <div class="nav-links">
        ${navHtml(topic, slug)}
        </div>
      </aside>
      <div>
        <nav class="crumbs">
          <a href="../index.html">← 返回討論目錄</a>
          ${isIndex ? "" : `<a href="index.html">← 返回${esc(topic.title)}總覽</a>`}
        </nav>
        <article id="content" class="essay">
          ${figureSrc ? `<figure class="topic-figure"><img src="${figureSrc}" alt=""></figure>` : ""}
          ${kicker ? `<p class="essay-kicker">${esc(kicker)}</p>` : ""}
          ${isIndex ? "" : `<h2 class="page-title serif">${esc(heading)}</h2>`}
          ${body}
        </article>
        ${isIndex ? "" : pagerHtml(topic, topic.chapters.findIndex((c) => c.slug === slug))}
      </div>
    </div>
  </div>

  ${extraWidgets || ""}
  <div id="visit-counter-container"></div>
  <footer class="topic-footer">
    <p>「你當竭力在神面前得蒙喜悅，作無愧的工人，按著正意分解真理的道。」提摩太後書 2:15</p>
  </footer>
  <script src="../_shared/topic.js"></script>
  ${extraScripts || ""}
  <script src="../../visit-counter.js"></script>
  <script>
    if (window.VisitCounter) {
      VisitCounter.init(${JSON.stringify(visitId)}, {
        scriptUrl: ${JSON.stringify(SCRIPT_URL)},
        containerId: "visit-counter-container"
      });
    }
  </script>
</body>
</html>
`;
}

function rewriteLinks(html, maps, currentDir) {
  const topicNames = Object.keys(maps);
  html = html.replace(/href=(["'])([^"']+)\1/gi, (all, q, href) => {
    let next = href;
    const hashIdx = next.indexOf("#");
    const pathPart = hashIdx >= 0 ? next.slice(0, hashIdx) : next;
    const hash = hashIdx >= 0 ? next.slice(hashIdx + 1) : "";

    if (next.startsWith("#") && hash) {
      const local = maps[currentDir];
      if (local && local[hash]) next = local[hash] + (local[hash].includes("#") ? "" : "#" + hash);
      else if (local) {
        const file = Object.entries(local).find(([, v]) => v.includes(hash) || v === hash + ".html");
        if (file) next = file[1].split("#")[0] + "#" + hash;
      }
      return `href=${q}${next}${q}`;
    }

    for (const name of topicNames) {
      const encoded = encodeURI(name);
      const prefix = `../${name}/`;
      const prefixEnc = `../${encoded}/`;
      if (pathPart === `../${name}/index.html` || pathPart === `../${encoded}/index.html` || pathPart === prefix + "index.html") {
        if (hash && maps[name][hash]) next = `../${name}/` + maps[name][hash];
        else next = `../${name}/index.html`;
        return `href=${q}${next}${q}`;
      }
    }
    return all;
  });
  return html;
}

function buildTopic(topic) {
  const srcPath = ensureSource(topic.dir);
  const raw = fs.readFileSync(srcPath, "utf8");
  const sections = extractTopSections(raw);
  const style = extractStyle(raw);
  const scripts = extractInlineScripts(raw);
  const lead = extractLead(raw) || firstSentence(raw);
  const desc = extractMeta(raw, "description") || lead;
  topic._lead = lead;
  topic._desc = desc;

  const skipSet = new Set(topic.skip || []);
  const usable = sections.filter((s) => !skipSet.has(s.id) && !skipSet.has(s.title));

  const used = new Set();
  for (const ch of topic.chapters) {
    const parts = [];
    for (const sel of ch.from) {
      const found = findSection(sel.startsWith("^") ? sections : usable.concat(sections), sel, used);
      if (found) {
        parts.push(found);
        used.add(found);
      } else {
        console.warn("  missing", topic.dir, ch.slug, sel);
      }
    }
    ch.parts = parts;
    ch.body = parts.map((p) => p.html).join("\n");
    ch.blurb = ch.blurb || firstSentence(ch.body) || ch.nav;
  }

  for (const s of usable) {
    if (!used.has(s) && s.id !== "detail-section") {
      const last = topic.chapters[topic.chapters.length - 1];
      last.body += "\n" + s.html;
      used.add(s);
      console.log("  appended unused", topic.dir, s.id || s.title, "->", last.slug);
    }
  }

  const extraWidgets = (topic.extraIds || []).map((id) => extractById(raw, id)).join("\n");
  const extraScripts = scripts.map((js) => `<script>try{\n${js}\n}catch(e){console.warn(e)}</script>`).join("\n");

  const heroSrc = copyHero(topic);
  topic.heroSrc = heroSrc;

  const imgDir = path.join(ROOT, topic.dir, "images");
  fs.mkdirSync(imgDir, { recursive: true });

  const cards = topic.chapters
    .map((ch, i) => {
      const fig = writeChapterSvg(topic, ch);
      ch.fig = fig;
      const kids = ch.children && ch.children.length
        ? `<ul class="kids">${ch.children.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>`
        : "";
      return `<a class="chapter-card" href="${ch.slug}.html">
          <div class="media"><img src="${fig}" alt=""></div>
          <div class="body">
            <div class="num">${String(i + 1).padStart(2, "0")}</div>
            <h3 class="serif">${esc(ch.nav)}</h3>
            <p>${esc(ch.blurb)}</p>
            ${kids}
          </div>
        </a>`;
    })
    .join("\n        ");

  const overviewBody = `
          <div class="overview-lead">
            <p>${esc(lead)}</p>
            <p>本篇已按原有標題拆成可獨立閱讀的分題。請選一題進入；正文未經改寫，只把長頁分開。</p>
          </div>
          <div class="chapter-grid">
        ${cards}
          </div>`;

  const overview = pageShell({
    topic,
    slug: "index",
    pageTitle: `${topic.title}｜${topic.en}`,
    description: desc,
    heroSrc,
    figureSrc: heroSrc,
    kicker: "專論總覽",
    heading: topic.title,
    sub: lead,
    body: overviewBody,
    extraStyle: style,
    extraWidgets: "",
    extraScripts: "",
    visitId: `bible_study/信仰討論/${topic.dir}/index`
  });

  fs.writeFileSync(path.join(ROOT, topic.dir, "index.html"), overview);

  for (let i = 0; i < topic.chapters.length; i++) {
    const ch = topic.chapters[i];
    const html = pageShell({
      topic,
      slug: ch.slug,
      pageTitle: `${ch.nav}｜${topic.title}`,
      description: `${topic.title}：${ch.nav}。${ch.blurb}`,
      heroSrc,
      figureSrc: ch.fig,
      kicker: `分題 ${String(i + 1).padStart(2, "0")} / ${String(topic.chapters.length).padStart(2, "0")}`,
      heading: ch.nav,
      sub: ch.blurb,
      body: `<div class="topic-body">${ch.body}</div>`,
      extraStyle: style,
      extraWidgets,
      extraScripts,
      visitId: `bible_study/信仰討論/${topic.dir}/${ch.slug}`
    });
    fs.writeFileSync(path.join(ROOT, topic.dir, ch.slug + ".html"), html);
  }

  const anchorMap = {};
  for (const ch of topic.chapters) {
    for (const p of ch.parts) {
      if (p.id) anchorMap[p.id] = ch.slug + ".html";
    }
    for (const sel of ch.from) {
      if (sel.startsWith("#")) anchorMap[sel.slice(1)] = ch.slug + ".html";
    }
  }
  return anchorMap;
}

function patchCatalog(maps) {
  const indexPath = path.join(ROOT, "index.html");
  let html = fs.readFileSync(indexPath, "utf8");
  if (!html.includes("topic.img")) {
    html = html.replace(
      '<img src="\' + cat.img + \'" alt="">',
      '<img src="\' + (topic.img || cat.img) + \'" alt="">'
    );
    html = html.replace(
      /'<div class="card-media"><img src="' \+ cat\.img \+ '" alt="">/g,
      `'<div class="card-media"><img src="' + (topic.img || cat.img) + '" alt="">`
    );
  }
  for (const topic of TOPICS) {
    const img = `${topic.dir}/images/hero.png`;
    const re = new RegExp(`(href: "${topic.dir.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/index\\.html"[^}]*)(\\})`);
    if (html.includes(`href: "${topic.dir}/index.html"`) && !html.includes(`href: "${topic.dir}/index.html"`) === false) {
      // add img field if missing near this topic
    }
    const lineRe = new RegExp(
      `(\\{ cat: "[^"]+", href: "${topic.dir.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/index\\.html")([^}]*)(\\})`
    );
    html = html.replace(lineRe, (all, a, mid, z) => {
      if (/img:/.test(mid)) return all;
      return `${a}, img: "${img}"${mid}${z}`;
    });
  }
  fs.writeFileSync(indexPath, html);
}

function main() {
  const maps = {};
  for (const topic of TOPICS) {
    console.log("building", topic.dir);
    maps[topic.dir] = buildTopic(topic);
  }
  for (const topic of TOPICS) {
    const dir = path.join(ROOT, topic.dir);
    for (const file of fs.readdirSync(dir).filter((f) => f.endsWith(".html"))) {
      const p = path.join(dir, file);
      let html = fs.readFileSync(p, "utf8");
      html = rewriteLinks(html, maps, topic.dir);
      fs.writeFileSync(p, html);
    }
  }
  const catalog = path.join(ROOT, "index.html");
  let cat = fs.readFileSync(catalog, "utf8");
  if (cat.includes("topic.img || cat.img") === false && cat.includes("cat.img")) {
    cat = cat.replace(
      `'<div class="card-media"><img src="' + cat.img + '" alt="">`,
      `'<div class="card-media"><img src="' + (topic.img || cat.img) + '" alt="">`
    );
  }
  for (const topic of TOPICS) {
    const img = `${topic.dir}/images/hero.png`;
    const escaped = topic.dir.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const lineRe = new RegExp(`(\\{ cat: "[^"]+", href: "${escaped}/index\\.html")([^\\}]*)(\\})`);
    cat = cat.replace(lineRe, (all, a, mid, z) => {
      if (/\\bimg:/.test(mid) || /img:/.test(mid)) return all;
      return `${a}, img: "${img}"${mid}${z}`;
    });
  }
  fs.writeFileSync(catalog, cat);
  fs.writeFileSync(path.join(ROOT, "_tools", "section-map.json"), JSON.stringify({ topics: TOPICS.map((t) => ({ dir: t.dir, chapters: t.chapters.map((c) => ({ slug: c.slug, nav: c.nav, children: c.children || [], from: c.from })) })), maps }, null, 2));
  console.log("done");
}

main();
